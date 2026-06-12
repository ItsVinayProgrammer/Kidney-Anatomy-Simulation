import { guidedSteps } from "../data/kidneyAnatomyData.js";

export default function GuidedLearning({ currentStep, onStepChange }) {
  const step = guidedSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === guidedSteps.length - 1;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Guided learning
          </p>
          <h2 className="text-lg font-bold text-slate-950">Urine formation path</h2>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
          {currentStep + 1}/{guidedSteps.length}
        </span>
      </div>

      <div className="mt-4 rounded-md bg-slate-50 p-3">
        <p className="text-sm font-semibold text-slate-950">{step.title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">{step.text}</p>
      </div>

      <div className="mt-4 grid gap-2">
        {guidedSteps.map((item, index) => (
          <button
            key={`${item.title}-${item.id}`}
            type="button"
            className={[
              "control-button rounded-md border px-3 py-2 text-left text-sm font-semibold transition",
              index === currentStep
                ? "border-teal-600 bg-teal-50 text-teal-900"
                : "border-slate-200 bg-white text-slate-700 hover:border-teal-300",
            ].join(" ")}
            onClick={() => onStepChange(index)}
          >
            {item.title}: {item.text}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="control-button rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-45"
          disabled={isFirst}
          onClick={() => onStepChange(currentStep - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="control-button rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
          disabled={isLast}
          onClick={() => onStepChange(currentStep + 1)}
        >
          Next step
        </button>
      </div>
    </section>
  );
}
