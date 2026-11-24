import { experience } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Experience"
            title="Five years of testing banking software"
            description="From electronic banking support to senior QA on credit bureau and core banking platforms."
          />
        </Reveal>

        <ol className="mt-14 space-y-10 border-l border-line pl-6 sm:pl-8">
          {experience.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delay={index * 60}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent sm:-left-[39px]"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                    {job.role}
                  </h3>
                  <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {job.period}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {job.company}
                  <span aria-hidden className="mx-2 text-line">
                    ·
                  </span>
                  {job.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink/30"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
