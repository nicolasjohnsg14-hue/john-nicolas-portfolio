"use client";

import { useEffect, useRef, useState } from "react";
import {
  answerQuestion,
  starterTopics,
  type ChatAction,
  type Topic,
} from "@/lib/career-chat";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
  actions?: ChatAction[];
};

const welcome: Message = {
  id: 0,
  role: "bot",
  text: "Hi — I'm Puti, John Michael's career assistant. I answer only from his CV: QA experience, tools, projects, education and how to reach him. What would you like to know?",
};

export function CareerChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [suggestions, setSuggestions] = useState<Topic[]>(starterTopics);
  const [lastIntent, setLastIntent] = useState<string | undefined>(undefined);
  const [canExpand, setCanExpand] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [typing, setTyping] = useState(false);
  const [halo, setHalo] = useState(false);
  const typingTimer = useRef<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Attention ring: only on a visitor's very first load, then never again.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const key = "puti-first-visit-seen";
    let seen = false;
    try {
      seen = window.localStorage.getItem(key) === "1";
    } catch {
      return;
    }
    if (seen) return;

    try {
      window.localStorage.setItem(key, "1");
    } catch {
      // private mode: show it once for this page view only
    }

    setHalo(true);
    const timer = window.setTimeout(() => setHalo(false), 12000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open, typing]);

  useEffect(
    () => () => {
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
    },
    [],
  );

  const copyAction = async (action: ChatAction) => {
    if (!action.value) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(action.value);
      } else {
        const field = document.createElement("textarea");
        field.value = action.value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      setCopiedId(action.id);
      setAnnouncement(`${action.value} copied to clipboard`);
      window.setTimeout(() => {
        setCopiedId((current) => (current === action.id ? null : current));
      }, 2000);
    } catch {
      setAnnouncement(`Couldn't copy automatically — the value is ${action.value}`);
    }
  };

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || typing) return;

    const reply = answerQuestion(trimmed, lastIntent);

    setMessages((current) => [
      ...current,
      { id: current.length, role: "user", text: trimmed },
    ]);
    setDraft("");
    setCanExpand(false);
    setTyping(true);

    // A short pause proportional to the answer, capped so it never drags.
    const delay = Math.min(1300, 420 + reply.text.length * 1.8);
    typingTimer.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((current) => [
        ...current,
        {
          id: current.length + 1,
          role: "bot",
          text: reply.text,
          actions: reply.actions,
        },
      ]);
      setSuggestions(reply.suggestions);
      setLastIntent(reply.intent);
      setCanExpand(Boolean(reply.canExpand));
      inputRef.current?.focus();
    }, delay);
  };

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-label="Career questions about John Michael Nicolas"
          className="chat-panel fixed inset-x-3 bottom-28 z-[60] flex h-[min(38rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_60px_-24px_rgba(16,24,32,0.45)] sm:inset-x-auto sm:right-6 sm:w-[400px]"
        >
          <header className="flex items-center gap-4 border-b border-line bg-surface/70 px-4 py-4">
            <img
              src="/assistant-avatar.jpg"
              alt=""
              width={112}
              height={112}
              className="h-28 w-28 shrink-0 rounded-full border border-line object-cover"
            />
            <div className="min-w-0">
              <p className="text-lg font-semibold text-ink">Career Q&amp;A</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Answers straight from his CV
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launchRef.current?.focus();
              }}
              aria-label="Close career Q&A"
              className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-muted transition-colors hover:border-ink/30 hover:text-ink"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div
            ref={listRef}
            aria-live="polite"
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "flex justify-end"
                    : "flex items-end gap-2"
                }
              >
                {message.role === "bot" && (
                  <img
                    src="/assistant-avatar.jpg"
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full border border-line object-cover"
                  />
                )}
                <div className="max-w-[85%] space-y-1.5">
                  <p
                    className={`whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-ink text-paper"
                        : "rounded-bl-md border border-line bg-surface text-ink/90"
                    }`}
                  >
                    {message.text}
                  </p>

                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {message.actions.map((action) => {
                        const base =
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors";

                        if (action.href) {
                          return (
                            <a
                              key={action.id}
                              href={action.href}
                              download={action.download}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${base} border-line bg-surface text-ink/80 hover:border-accent/40 hover:text-ink`}
                            >
                              <svg
                                aria-hidden
                                viewBox="0 0 24 24"
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
                              </svg>
                              <span>{action.label}</span>
                              <span className="font-mono text-[10px] text-muted">
                                PDF
                              </span>
                            </a>
                          );
                        }

                        const copied = copiedId === action.id;
                        return (
                          <button
                            key={action.id}
                            type="button"
                            onClick={() => copyAction(action)}
                            aria-label={
                              copied
                                ? `${action.label} copied`
                                : `${action.label}: ${action.value}`
                            }
                            className={`${base} ${
                              copied
                                ? "border-accent/50 bg-accent-soft text-accent-deep"
                                : "border-line bg-surface text-ink/80 hover:border-accent/40 hover:text-ink"
                            }`}
                          >
                            <svg
                              aria-hidden
                              viewBox="0 0 24 24"
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {copied ? (
                                <path d="M20 6 9 17l-5-5" />
                              ) : (
                                <>
                                  <rect x="9" y="9" width="11" height="11" rx="2" />
                                  <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                                </>
                              )}
                            </svg>
                            <span>{copied ? "Copied" : action.label}</span>
                            <span className="font-mono text-[10px] text-muted">
                              {action.value}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>


              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2">
                <img
                  src="/assistant-avatar.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full border border-line object-cover"
                />
                <div
                  role="status"
                  aria-label="Puti is typing"
                  className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3.5"
                >
                  <span aria-hidden className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
                  <span aria-hidden className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
                  <span aria-hidden className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
                </div>
              </div>
            )}
          </div>

          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>

          <div className="border-t border-line px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Suggested topics
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {canExpand && (
                <li>
                  <button
                    type="button"
                    onClick={() => ask("Tell me more")}
                    className="rounded-full border border-accent/40 bg-accent-soft/60 px-2.5 py-1 text-[12px] font-medium text-accent-deep transition-colors hover:border-accent"
                  >
                    Tell me more
                  </button>
                </li>
              )}
              {suggestions.map((topic) => (
                <li key={topic.id}>
                  <button
                    type="button"
                    onClick={() => ask(topic.prompt)}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] text-ink/80 transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    {topic.label}
                  </button>
                </li>
              ))}
            </ul>

            <form
              className="mt-3 flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                ask(draft);
              }}
            >
              <label className="sr-only" htmlFor="career-chat-input">
                Ask a question about his work and career
              </label>
              <input
                ref={inputRef}
                id="career-chat-input"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about John's work…"
                autoComplete="off"
                className="h-10 min-w-0 flex-1 rounded-full border border-line bg-surface px-3.5 text-[13px] text-ink placeholder:text-muted/80"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label="Send question"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-opacity disabled:opacity-40"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </section>
      )}

      <div className="fixed bottom-6 right-6 z-40">
      <span className={halo ? "halo" : "inline-flex"}>
      <button
        ref={launchRef}
        type="button"
        onClick={() => {
          setHalo(false);
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-label={open ? "Close career Q&A" : "Open career Q&A chat"}
        className="inline-flex h-20 items-center gap-3 rounded-full border border-line bg-surface pl-3 pr-6 text-base font-medium text-ink shadow-[0_8px_24px_-12px_rgba(16,24,32,0.45)] transition-colors hover:border-accent/40 hover:text-accent-deep"
      >
        <img
          src="/assistant-avatar.jpg"
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border border-line object-cover"
        />
        Ask about John&rsquo;s work
      </button>
      </span>
      </div>
    </>
  );
}
