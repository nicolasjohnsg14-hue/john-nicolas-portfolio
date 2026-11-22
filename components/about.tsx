import { profile } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading index="01" eyebrow="About" title="Quality is a process, not a final check" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-[1.8] text-muted sm:text-base">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <dl className="overflow-hidden rounded-2xl border border-line bg-surface">
              {profile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-line px-5 py-4 last:border-b-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
