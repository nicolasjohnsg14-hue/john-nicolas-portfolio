import { approach } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Approach() {
  return (
    <section id="approach" className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="How I test"
            title="Plan, test, automate, report"
            description="The cycle I run on every release, from the requirement to the defect write-up."
          />
        </Reveal>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <li className="group lift flex h-full flex-col rounded-2xl border border-line bg-paper p-6 hover:border-accent/40">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
