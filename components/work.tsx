import { work } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Work() {
  return (
    <section id="work" className="border-t border-line bg-surface/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title="Testing work that changed the outcome"
            description="Projects and initiatives taken directly from my QA experience in banking and credit bureau systems."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {work.map((item, index) => (
            <Reveal key={item.title} delay={index * 60}>
              <article className="group lift flex h-full flex-col rounded-2xl border border-line bg-paper p-6 hover:border-accent/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                <div className="mt-auto pt-6">
                  <div className="flex items-start gap-2 rounded-xl bg-accent-soft/70 px-3.5 py-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <p className="text-[13px] font-medium leading-snug text-accent-deep">
                      {item.outcome}
                    </p>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-300 group-hover:border-accent/25 group-hover:text-ink/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
