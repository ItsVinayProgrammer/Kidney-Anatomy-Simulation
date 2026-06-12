export default function AnatomyInfoPanel({ selectedPart }) {
  const sections = [
    ["What is it?", selectedPart.definition],
    ["Main function", selectedPart.function],
    ["Why it matters", selectedPart.importance],
    ["Class 11 connection", selectedPart.class11Connection],
    ["Remember this", selectedPart.memoryTip],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <span
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: selectedPart.color }}
          aria-hidden="true"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Selected part
          </p>
          <h2 className="text-2xl font-bold text-slate-950">{selectedPart.name}</h2>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map(([title, text]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
