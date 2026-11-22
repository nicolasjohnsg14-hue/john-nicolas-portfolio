import { skillGroups } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SkillIcon } from "@/components/skill-icon";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line bg-surface/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Technical skills"
            title="The toolkit behind every test cycle"
            description="Testing practice, automation tooling and the technologies I work with day to day."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <article className="group lift flex h-full flex-col rounded-2xl border border-line bg-paper p-6 hover:border-accent/40">
                <h3 className="text-base font-semibold text-ink">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{group.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1.5 pl-2.5 pr-3 text-[13px] text-ink/80 transition-colors duration-300 group-hover:border-accent/25"
                    >
                      <SkillIcon
                        name={item}
                        className="h-3.5 w-3.5 shrink-0 text-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
