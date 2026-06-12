import { useMemo, useState } from "react";
import { quizQuestions } from "../data/kidneyAnatomyData.js";

export default function KidneyQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
        0
      ),
    [answers]
  );

  const handleAnswer = (questionIndex, option) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [questionIndex]: option }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Learning check
          </p>
          <h2 className="text-lg font-bold text-slate-950">5 quick MCQs</h2>
        </div>
        {submitted && (
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            {score}/5
          </span>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {quizQuestions.map((item, index) => (
          <div key={item.question} className="border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
            <p className="text-sm font-semibold text-slate-950">
              {index + 1}. {item.question}
            </p>
            <div className="mt-2 grid gap-2">
              {item.options.map((option) => {
                const isPicked = answers[index] === option;
                const isCorrect = submitted && option === item.answer;
                const isWrong = submitted && isPicked && option !== item.answer;

                return (
                  <button
                    key={option}
                    type="button"
                    className={[
                      "quiz-option rounded-md border px-3 py-2 text-left text-sm transition",
                      isCorrect
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : isWrong
                          ? "border-rose-400 bg-rose-50 text-rose-900"
                          : isPicked
                            ? "border-teal-500 bg-teal-50 text-teal-900"
                            : "border-slate-200 bg-white text-slate-700 hover:border-teal-300",
                    ].join(" ")}
                    onClick={() => handleAnswer(index, option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted && answers[index] !== item.answer && (
              <p className="mt-2 text-xs font-medium text-slate-600">
                Correct answer: {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="control-button rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
          disabled={Object.keys(answers).length !== quizQuestions.length}
          onClick={() => setSubmitted(true)}
        >
          Check score
        </button>
        <button
          type="button"
          className="control-button rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
          onClick={resetQuiz}
        >
          Reset quiz
        </button>
      </div>
    </section>
  );
}
