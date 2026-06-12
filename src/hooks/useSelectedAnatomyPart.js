import { useMemo, useState } from "react";
import { defaultPartId, kidneyParts } from "../data/kidneyAnatomyData.js";

export function useSelectedAnatomyPart(initialPartId = null) {
  const [selectedPartId, setSelectedPartId] = useState(initialPartId);

  const selectedPart = useMemo(
    () => kidneyParts[selectedPartId] ?? kidneyParts[defaultPartId],
    [selectedPartId]
  );

  return {
    selectedPartId,
    selectedPart,
    setSelectedPartId,
  };
}
