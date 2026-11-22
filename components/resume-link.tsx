"use client";

import { profile } from "@/data/profile";

type ResumeLinkProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function ResumeLink({ className = "", children, onClick }: ResumeLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    // Embedded preview iframes block downloads, so show the PDF in a new tab there.
    if (window.self !== window.top) {
      event.preventDefault();
      window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <a
      href={profile.resumeUrl}
      download={profile.resumeFileName}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
