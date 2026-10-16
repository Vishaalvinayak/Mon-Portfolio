"use client";

import { useEffect, useRef, useState } from "react";
import {
  achievements,
  certifications,
  education,
  experience,
  links,
  profile,
  projects,
  skills,
} from "@/content/resume";

type Line = { id: number; kind: "in" | "out"; text: string };

// What the idle prompt types out by itself, in this order and then around again, until
// someone clicks the terminal. It only types — nothing is run, so the output never jumps.
const DEMO_COMMANDS = ["projects", "skills", "contact", "help"] as const;

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
  "resume",
  "github",
  "linkedin",
  "clear",
] as const;

let uid = 0;
const nextId = () => ++uid;

function open(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function findLink(label: string) {
  return links.find((l) => l.label.toLowerCase() === label)?.href;
}

/** Builds the text output for one command. Returns one string per output line. */
function runCommand(raw: string): string[] {
  const [cmd, ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(" ").toLowerCase();

  switch (cmd?.toLowerCase()) {
    case "":
      return [];
    case "help":
      return ["Available commands:", COMMANDS.map((c) => `  ${c}`).join("\n")];
    case "whoami":
      return [`${profile.role.toLowerCase()} `];
    case "about":
      return [profile.summary];
    case "skills":
      return skills.map((g) => `${g.label}: ${g.items.join(", ")}`);
    case "projects": {
      const n = parseInt(rest[0], 10);
      if (!Number.isNaN(n) && projects[n - 1]) {
        const p = projects[n - 1];
        return [
          `${p.name}${p.tag ? ` (${p.tag})` : ""}`,
          ...p.bullets.map((b) => `  - ${b}`),
        ];
      }
      return [
        ...projects.map(
          (p, i) => `${i + 1}. ${p.name}${p.tag ? ` — ${p.tag}` : ""}`,
        ),
        "type 'projects <number>' for details",
      ];
    }
    case "experience":
      return experience
        .map((e) =>
          [
            `${e.role} · ${e.company} (${e.start} – ${e.end})`,
            ...e.bullets.map((b) => `  - ${b}`),
          ].join("\n"),
        )
        .concat(achievements.map((a) => `${a.title} — ${a.event}, ${a.year}`));
    case "education":
      return education.map((e) => `${e.degree}, ${e.school} — ${e.grade}`);
    case "certifications":
      return certifications.map((c) => `${c.name} — ${c.issuer}`);
    case "contact":
      return [
        profile.email,
        profile.phone,
        findLink("github") ?? "",
        findLink("linkedin") ?? "",
      ].filter(Boolean);
    case "resume":
    case "cv": // unlisted shortcut — people try it, so it works, but `help` stays uncluttered
      open("/resume.pdf");
      return ["opening resume.pdf …"];
    case "github":
      if (findLink("github")) open(findLink("github")!);
      return ["opening github …"];
    case "linkedin":
      if (findLink("linkedin")) open(findLink("linkedin")!);
      return ["opening linkedin …"];
    case "sudo":
      return [`Permission denied: nice try${arg ? ` with "${arg}"` : ""} 😄`];
    case "clear":
      return ["__clear__"];
    default:
      return [`command not found: ${cmd} — type 'help'`];
  }
}

const BOOT: Line[] = [
  { id: nextId(), kind: "in", text: "whoami" },
  {
    id: nextId(),
    kind: "out",
    text: `${profile.role.toLowerCase()} `,
  },
  { id: nextId(), kind: "in", text: "cat stack.txt" },
  {
    id: nextId(),
    kind: "out",
    text: [
      ...(skills.find((g) => g.label === "Frontend")?.items ?? []),
      ...(skills.find((g) => g.label === "Backend")?.items ?? []),
    ].join(" · "),
  },
  { id: nextId(), kind: "in", text: "open_to_work --status" },
  { id: nextId(), kind: "out", text: "true" },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const [lastCmd, setLastCmd] = useState("whoami");
  const [demoActive, setDemoActive] = useState(true);
  const [demoText, setDemoText] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ends the typing demo for good (this visit) and hands the prompt to the visitor.
  function stopDemo() {
    setDemoActive(false);
    setDemoText("");
  }

  // The typing demo: waits for the intro to finish, then types each command, holds it,
  // deletes it, and moves on. Skipped entirely for visitors who asked for reduced motion.
  useEffect(() => {
    if (!demoActive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDemoActive(false);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)));
    const root = document.documentElement;

    (async () => {
      await wait(50); // let the intro mark the page as "playing" before we look
      while (!cancelled && root.dataset.intro === "playing") await wait(200);
      await wait(1200); // let the hero finish fading in
      let i = 0;
      while (!cancelled) {
        const word = DEMO_COMMANDS[i % DEMO_COMMANDS.length];
        for (let n = 1; n <= word.length && !cancelled; n++) {
          setDemoText(word.slice(0, n));
          await wait(70 + Math.random() * 50);
        }
        await wait(1100);
        for (let n = word.length - 1; n >= 0 && !cancelled; n--) {
          setDemoText(word.slice(0, n));
          await wait(35);
        }
        await wait(350);
        i++;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [demoActive]);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  function submit(raw: string) {
    const cmd = raw.trim();
    const echo: Line = { id: nextId(), kind: "in", text: cmd };
    const output = runCommand(cmd);

    if (output[0] === "__clear__") {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        echo,
        ...output.map((text) => ({ id: nextId(), kind: "out" as const, text })),
      ]);
    }
    if (cmd) {
      setHistory((prev) => [...prev, cmd]);
      setLastCmd(cmd.split(/\s+/)[0]);
    }
    setHistIndex(null);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next =
        histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(null);
        setValue("");
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    }
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/[0.12] bg-[#0a0e14] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      onClick={() => {
        stopDemo();
        inputRef.current?.focus();
      }}
    >
      <div className="flex items-center gap-[7px] border-b border-white/[0.08] bg-white/[0.02] px-3.5 py-[11px]">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[11px] text-dim">
          vishaal@portfolio ~ {lastCmd}
        </span>
      </div>

      <div
        ref={bodyRef}
        className="max-h-[280px] overflow-y-auto p-[18px] font-mono text-[13px] leading-[1.9]"
      >
        <div role="log" aria-live="polite">
          {lines.map((l) =>
            l.kind === "in" ? (
              <div key={l.id}>
                <span className="select-none text-accent">$</span> {l.text}
              </div>
            ) : (
              <div key={l.id} className="whitespace-pre-wrap pl-4 text-dim">
                {l.text}
              </div>
            ),
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="select-none text-accent">$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={stopDemo}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input — type help for a list of commands"
              placeholder={demoActive ? "" : "try: projects, skills, help"}
              className="w-full bg-transparent text-ink caret-accent outline-none placeholder:text-dim/60"
            />
            {demoActive && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center text-ink"
              >
                {demoText}
                <span className="typing-caret ml-px inline-block h-[1.15em] w-[7px] translate-y-px bg-accent" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
