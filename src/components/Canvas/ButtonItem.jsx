import React from "react";

function ButtonItem({ comp, selectedId, setSelectedComponent, getBgStyle }) {
  const width = comp.width || 120;
  const height = comp.height || 40;
  const borderRadius =
    comp.borderRadius !== undefined ? comp.borderRadius : 100;
  return (
    <div
      className={`relative shrink-0 transition-all cursor-pointer select-none overflow-hidden ${
        comp.id === selectedId ? "ring-2 ring-lime-400" : ""
      }`}
      style={{
        width,
        height,
        borderRadius,
      }}
      onClick={() => setSelectedComponent(comp.id)}
    >
      <div
        className="w-full h-full flex items-center justify-center px-6 font-bold text-base shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
        style={{
          ...getBgStyle(comp),
          color: comp.textColor || "#ffffff",
          borderRadius,
        }}
      >
        {comp.text || "Button"}
      </div>
    </div>
  );
}

export default ButtonItem;
