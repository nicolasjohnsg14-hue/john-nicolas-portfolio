import { Check } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { ResumeLink } from "@/components/resume-link";
import { HeroPortrait } from "@/components/hero-portrait";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-12%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.16),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-stretch lg:gap-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.location}
            </p>

            <h1 className="mt-6 text-[clamp(2.7rem,6.6vw,4.9rem)] font-semibold leading-[0.97] tracking-[-0.04em]">
              {profile.displayName}
            </h1>

            <p className="mt-6 text-lg font-medium text-ink sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-1.5 text-[15px] text-muted sm:text-base">
              {profile.subtitle}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {profile.heroSummary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ResumeLink className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-deep">
                View my resume
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  &#8595;
                </span>
              </ResumeLink>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                Contact me
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  &#8594;
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col gap-5">
              <HeroPortrait />

              <div className="rounded-2xl border border-line bg-surface px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent-deep">
                    {profile.initials}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Currently
                    </p>
                    <p className="text-sm font-medium text-ink">
                      Senior Associate, Genpact LLC
                    </p>
                  </div>
                </div>

                <dl className="mt-3.5 space-y-2 border-t border-line pt-3.5">
                  {profile.focus.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden
                        strokeWidth={2.5}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                      />
                      <dd className="text-[13px] leading-snug text-muted">{item}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-20">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-paper px-6 py-6 transition-colors duration-300 hover:bg-surface"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-[-0.03em] text-ink">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
