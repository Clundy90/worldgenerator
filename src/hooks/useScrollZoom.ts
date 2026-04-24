import { useState, useEffect, useCallback } from "react";

type ViewLayer = "MACRO" | "REGION" | "MICRO";

export const useScrollZoom = () => {
  const [scrollPos, setScrollPos] = useState(500); // Start in the middle (REGION)
  const [currentLayer, setCurrentLayer] = useState<ViewLayer>("REGION");

  // Normalized zoom level for visual scaling (0 to 1 range)
  const [zoomLevel, setZoomLevel] = useState(0.5);

  const handleScroll = useCallback((e: WheelEvent) => {
    setScrollPos((prev) => {
      // Clamp scroll between 0 and 1000
      const next = Math.min(Math.max(prev + e.deltaY, 0), 1000);

      // Determine Layer based on scroll depth
      if (next < 300) setCurrentLayer("MACRO");
      else if (next > 700) setCurrentLayer("MICRO");
      else setCurrentLayer("REGION");

      setZoomLevel(next / 1000);
      return next;
    });
  }, []);

  // Manual jump function for the HUD buttons/Inspect
  const setLayerManually = (layer: ViewLayer) => {
    setCurrentLayer(layer);
    if (layer === "MACRO") setScrollPos(150);
    if (layer === "REGION") setScrollPos(500);
    if (layer === "MICRO") setScrollPos(850);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return {
    scrollPos,
    zoomLevel,
    currentLayer,
    setLayerManually,
  };
};
