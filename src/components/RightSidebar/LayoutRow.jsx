import { LayoutGrid, CornerDownRight } from "lucide-react";
import { useRef, useEffect } from "react";

function LayoutRow({
  width,
  height,
  borderRadius,
  onChange,
  activeSlider,
  setActiveSlider,
}) {
  const sliderRef = useRef();
  const minMax = {
    width: { min: 0, max: 300 },
    height: { min: 0, max: 300 },
    borderRadius: { min: 0, max: 100 },
  };

  useEffect(() => {
    if (!activeSlider) return;
    function handleClick(e) {
      if (sliderRef.current && sliderRef.current.contains(e.target)) return;
      setActiveSlider(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [activeSlider, setActiveSlider]);

  return (
    <div className="mb-5">
      <div className="font-semibold mb-1">Layout</div>
      <div className="grid grid-cols-2 gap-2">
        {/* Width (editable) */}
        <button
          type="button"
          className={`flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-2 w-full text-left transition ring-0 border-0 ${
            activeSlider === "width"
              ? "ring-2 ring-lime-400 border-lime-400"
              : ""
          }`}
          onClick={() => setActiveSlider("width")}
        >
          <span className="text-xs text-gray-400 font-semibold">W</span>
          <span className="text-base font-semibold text-gray-800">{width}</span>
        </button>
        {/* Height (editable) */}
        <button
          type="button"
          className={`flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-2 w-full text-left transition ring-0 border-0 ${
            activeSlider === "height"
              ? "ring-2 ring-lime-400 border-lime-400"
              : ""
          }`}
          onClick={() => setActiveSlider("height")}
        >
          <span className="text-xs text-gray-400 font-semibold">H</span>
          <span className="text-base font-semibold text-gray-800">
            {height}
          </span>
        </button>
        {/* 100% with grid icon (static) */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-2 w-full">
          <LayoutGrid className="w-4 h-4 text-gray-400" />
          <span className="text-base font-semibold text-gray-800">100%</span>
        </div>
        {/* Border Radius (editable) */}
        <button
          type="button"
          className={`flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-2 w-full text-left transition ring-0 border-0 ${
            activeSlider === "borderRadius"
              ? "ring-2 ring-lime-400 border-lime-400"
              : ""
          }`}
          onClick={() => setActiveSlider("borderRadius")}
        >
          <CornerDownRight className="w-4 h-4 text-gray-400" />
          <span className="text-base font-semibold text-gray-800">
            {borderRadius}
          </span>
        </button>
      </div>
      {activeSlider && (
        <div ref={sliderRef} className="w-full flex flex-col items-center mt-3">
          <input
            type="range"
            min={minMax[activeSlider].min}
            max={minMax[activeSlider].max}
            value={
              activeSlider === "width"
                ? width
                : activeSlider === "height"
                ? height
                : borderRadius
            }
            onChange={(e) => onChange(activeSlider, Number(e.target.value))}
            className="w-full accent-lime-500"
          />
          <div className="text-xs text-gray-500 mt-1">
            {activeSlider === "width"
              ? width
              : activeSlider === "height"
              ? height
              : borderRadius}
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutRow;
