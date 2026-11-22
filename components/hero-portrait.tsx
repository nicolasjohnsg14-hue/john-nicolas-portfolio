import { profile } from "@/data/profile";

/**
 * Hero portrait. On large screens it stretches to fill the space above the
 * "Currently" card, so the right column matches the height of the name block
 * on the left. On small screens it keeps a portrait-friendly 4:5 crop.
 */
export function HeroPortrait() {
  const frame =
    "mx-auto flex w-full max-w-[340px] flex-col overflow-hidden rounded-2xl border border-line bg-surface lg:max-w-none lg:flex-1";

  if (profile.portrait) {
    return (
      <div className={frame}>
        <img
          src={profile.portrait}
          alt={`Portrait of ${profile.name}`}
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[260px] lg:flex-1"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`${frame} aspect-[4/5] items-center justify-center gap-3 lg:aspect-auto`}
    >
      <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft font-mono text-sm font-semibold tracking-[0.08em] text-accent-deep">
        {profile.initials}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        Portrait
      </span>
    </div>
  );
}
