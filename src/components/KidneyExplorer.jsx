import { useMemo, useRef, useState } from "react";
import AnatomyInfoPanel from "./AnatomyInfoPanel.jsx";
import GuidedLearning from "./GuidedLearning.jsx";
import KidneyModel from "./KidneyModel.jsx";
import KidneyQuiz from "./KidneyQuiz.jsx";
import { guidedSteps, interactivePartIds, kidneyParts } from "../data/kidneyAnatomyData.js";
import { useSelectedAnatomyPart } from "../hooks/useSelectedAnatomyPart.js";

const tabs = [
  { id: "learn", label: "Learn" },
  { id: "guide", label: "Path" },
  { id: "quiz", label: "Quiz" },
];

const cameraViewOptions = [
  { id: "full", label: "Full system" },
  { id: "leftKidney", label: "Left kidney" },
  { id: "rightKidney", label: "Right kidney" },
  { id: "bladder", label: "Bladder" },
];

function getDefaultSideForPart(partId, fallbackSide = "left") {
  return kidneyParts[partId]?.side ?? (kidneyParts[partId]?.internal ? fallbackSide : null);
}

export default function KidneyExplorer() {
  const viewerRef = useRef(null);
  const { selectedPartId, selectedPart, setSelectedPartId } = useSelectedAnatomyPart();
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [selectedLabelVisible, setSelectedLabelVisible] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [cameraView, setCameraView] = useState("full");
  const [activeSide, setActiveSide] = useState("left");
  const [activeTab, setActiveTab] = useState("learn");
  const [guideStep, setGuideStep] = useState(0);

  const partList = useMemo(
    () => interactivePartIds.map((partId) => kidneyParts[partId]),
    []
  );

  const selectPart = (partId, sideOverride) => {
    setSelectedLabelVisible(true);
    const nextSide = sideOverride ?? getDefaultSideForPart(partId, activeSide);
    setSelectedPartId(partId);
    if (nextSide) setActiveSide(nextSide);
  };

  const handleGuideStep = (nextStep) => {
    const safeStep = Math.min(Math.max(nextStep, 0), guidedSteps.length - 1);
    const stepPartId = guidedSteps[safeStep].id;
    setGuideStep(safeStep);
    selectPart(stepPartId, getDefaultSideForPart(stepPartId, activeSide));
    setActiveTab("guide");
  };

  const handleFullscreen = async () => {
    if (!viewerRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await viewerRef.current.requestFullscreen();
  };

  return (
    <main className="min-h-screen bg-[#eef5f4] p-3 text-slate-900 lg:p-4">
      <div className="viewer-grid mx-auto grid max-w-[1700px] gap-4">
        <section
          ref={viewerRef}
          className="relative min-h-[430px] overflow-hidden rounded-lg border border-white/70 bg-[#c7d2d6] shadow-lab h-[62vh] lg:h-[calc(100vh-2rem)]"
          aria-label="Interactive 3D kidney model viewer"
        >
          <KidneyModel
            selectedPartId={selectedPartId}
            activeSide={activeSide}
            onSelectPart={selectPart}
            labelsVisible={labelsVisible}
            selectedLabelVisible={selectedLabelVisible}
            resetSignal={resetSignal}
            viewPreset={cameraView}
          />

          <div className="pointer-events-none absolute left-3 top-3 max-w-[78%] rounded-lg bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Class 11 Biology
            </p>
            <h1 className="text-lg font-bold text-slate-950 sm:text-2xl">
              Kidney Anatomy Explorer
            </h1>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 sm:bottom-4 sm:left-4 sm:right-4">
            <button
              type="button"
              className="control-button rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm"
              onClick={() => {
                setCameraView("full");
                setResetSignal((value) => value + 1);
              }}
            >
              Reset view
            </button>
            <button
              type="button"
              className={[
                "control-button rounded-md px-3 py-2 text-sm font-semibold shadow-sm",
                labelsVisible
                  ? "bg-teal-700 text-white"
                  : "bg-white/95 text-slate-800",
              ].join(" ")}
              onClick={() => {
                setLabelsVisible((value) => {
                  if (value) setSelectedLabelVisible(false);
                  return !value;
                });
              }}
            >
              Labels
            </button>
            <button
              type="button"
              className="control-button rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm"
              onClick={handleFullscreen}
            >
              Fullscreen
            </button>
          </div>
        </section>

        <aside className="panel-scroll flex flex-col gap-4 overflow-y-auto rounded-lg border border-white/70 bg-slate-50/90 p-3 shadow-lab lg:h-[calc(100vh-2rem)] lg:p-4">
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-white p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={[
                  "control-button rounded-md px-3 py-2 text-sm font-bold transition",
                  activeTab === tab.id
                    ? "bg-teal-700 text-white"
                    : "text-slate-700 hover:bg-slate-100",
                ].join(" ")}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab !== "quiz" && <AnatomyInfoPanel selectedPart={selectedPart} />}

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Quick views
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {cameraViewOptions.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={[
                    "control-button rounded-md border px-3 py-2 text-left text-sm font-semibold transition",
                    cameraView === view.id
                      ? "border-teal-600 bg-teal-50 text-teal-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-teal-300",
                  ].join(" ")}
                  onClick={() => {
                    setCameraView(view.id);
                    if (view.id === "leftKidney") setActiveSide("left");
                    if (view.id === "rightKidney") setActiveSide("right");
                    setResetSignal((value) => value + 1);
                  }}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </section>

          {activeTab === "learn" && (
            <>
              <details className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-700">
                  Anatomy parts
                </summary>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {partList.map((part) => (
                    <button
                      key={part.id}
                      type="button"
                      className={[
                        "control-button rounded-md border px-3 py-2 text-left text-sm font-semibold transition",
                        selectedPartId === part.id
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-slate-200 bg-white text-slate-700 hover:border-teal-300",
                      ].join(" ")}
                      onClick={() => selectPart(part.id, getDefaultSideForPart(part.id, activeSide))}
                    >
                      {part.shortLabel}
                    </button>
                  ))}
                </div>
              </details>
            </>
          )}

          {activeTab === "guide" && (
            <>
              <GuidedLearning currentStep={guideStep} onStepChange={handleGuideStep} />
            </>
          )}

          {activeTab === "quiz" && <KidneyQuiz />}
        </aside>
      </div>
    </main>
  );
}
