import { profile } from "@/data/profile";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft/70">
            07 / Contact
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div>
              <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.75rem]">
                Let&rsquo;s talk about your next release.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-paper/65">
                I&rsquo;m open to QA engineering roles where careful manual testing
                and practical automation both matter. The quickest way to reach me
                is on Viber — {profile.phone}.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
                >
                  Email me
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    &#8594;
                  </span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper/60"
                >
                  LinkedIn
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    &#8599;
                  </span>
                </a>
              </div>
            </div>

            <dl className="space-y-6 border-t border-paper/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="break-all text-sm text-paper underline decoration-paper/25 underline-offset-4 transition-colors hover:decoration-paper"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                  LinkedIn
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="break-all text-sm text-paper underline decoration-paper/25 underline-offset-4 transition-colors hover:decoration-paper"
                  >
                    {profile.linkedinLabel}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                  Location
                </dt>
                <dd className="mt-1.5 text-sm text-paper/85">
                  {profile.location}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
