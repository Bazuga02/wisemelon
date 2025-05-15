import ColorPicker from "./ColorPicker";
import React, { useState, useEffect } from "react";

function BackgroundPicker({ label, valueObj, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bgType = valueObj.bgType || "solid";

  // Reset showPicker and interaction when switching to a different element
  useEffect(() => {
    setShowPicker(false);
    setHasInteracted(false);
    // eslint-disable-next-line
  }, [valueObj.id || valueObj._internalId || JSON.stringify(valueObj)]);

  const handleTypeChange = (type) => {
    onChange("bgType", type);
    setShowPicker(true);
    setHasInteracted(true);
  };

  return (
    <div className="mb-2 border border-gray-100 rounded-md p-3">
      <div className="text-xs font-bold text-black mb-2 uppercase tracking-wide">
        Background Color
      </div>
      <div className="flex gap-1 items-center bg-gray-100 rounded-lg p-1 w-fit mb-2">
        <button
          className={`px-4 py-1 rounded-lg text-xs font-semibold transition-colors focus:outline-none hover:cursor-pointer focus:ring-2 focus:ring-lime-400
            ${
              hasInteracted && bgType === "solid"
                ? "bg-white shadow text-black"
                : "bg-gray-100 text-gray-500 hover:text-black"
            }`}
          style={{ minWidth: 64 }}
          onClick={() => handleTypeChange("solid")}
        >
          Solid
        </button>
        <button
          className={`px-4 py-1 rounded-lg text-xs font-semibold transition-colors focus:outline-none hover:cursor-pointer focus:ring-2 focus:ring-lime-400
            ${
              hasInteracted && bgType === "gradient"
                ? "bg-white shadow text-black"
                : "bg-gray-100 text-gray-500 hover:text-black"
            }`}
          style={{ minWidth: 64 }}
          onClick={() => handleTypeChange("gradient")}
        >
          Gradient
        </button>
      </div>
      {showPicker && bgType === "solid" && (
        <ColorPicker
          label={label + " Color"}
          value={valueObj.bgSolid || "#000"}
          onChange={(val) => onChange("bgSolid", val)}
        />
      )}
      {showPicker && bgType === "gradient" && (
        <>
          <ColorPicker
            label={label + " From"}
            value={valueObj.bgGradientFrom || "#000"}
            onChange={(val) => onChange("bgGradientFrom", val)}
          />
          <ColorPicker
            label={label + " Via"}
            value={valueObj.bgGradientVia || "#0f2b0f"}
            onChange={(val) => onChange("bgGradientVia", val)}
          />
          <ColorPicker
            label={label + " To"}
            value={valueObj.bgGradientTo || "#163b15"}
            onChange={(val) => onChange("bgGradientTo", val)}
          />
        </>
      )}
    </div>
  );
}

export default BackgroundPicker;
