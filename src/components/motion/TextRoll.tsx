/** Hover effect: the label rolls up and an identical copy rolls in. CSS only. */
export function TextRoll({ children }: { children: string }) {
  return (
    <span className="group/roll relative inline-flex overflow-hidden align-bottom leading-tight">
      <span className="block transition-transform duration-300 ease-out group-hover/roll:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full block transition-transform duration-300 ease-out group-hover/roll:-translate-y-full motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}
