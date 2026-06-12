import { useMemo, useState } from "react";
import { kidneyParts } from "../data/kidneyAnatomyData.js";

export function useSelectedAnatomyPart(initialPartId = null) {
  const [selectedPartId, setSelectedPartId] = useState(initialPartId);

  const selectedPart = useMemo(
    () => (selectedPartId ? kidneyParts[selectedPartId] ?? null : null),
    [selectedPartId]
  );

  return {
    selectedPartId,
    selectedPart,
    setSelectedPartId,
  };
}
