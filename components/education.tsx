import { award, education, languages } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section id="education" className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Education & recognition"
            title="Qualifications and recognition"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Education
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
                {education.degree}
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                {education.institution}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {education.period}
              </p>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="h-full rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Award
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
                {award.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{award.issuer}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {award.year}
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-line bg-surface px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Languages
            </p>
            <ul className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <li
                  key={language}
                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-[13px] text-ink/80"
                >
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
