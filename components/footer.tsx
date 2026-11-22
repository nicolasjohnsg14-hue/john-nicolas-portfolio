import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold text-paper">
            {profile.initials}
          </span>
          <p className="text-sm font-medium text-ink">
            {profile.name}
            <span aria-hidden className="mx-2 text-line">
              /
            </span>
            <span className="font-normal text-muted">{profile.title}</span>
          </p>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          &copy; {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
