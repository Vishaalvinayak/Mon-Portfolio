import { profile } from "@/content/resume";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-[clamp(20px,5vw,64px)] py-8 text-sm text-dim">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
