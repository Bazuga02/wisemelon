import React from "react";

function CardItem({ comp, selectedId, setSelectedComponent, getBgStyle }) {
  const width = comp.width || 168;
  const height = comp.height || 174;
  const borderRadius = comp.borderRadius !== undefined ? comp.borderRadius : 20;
  return (
    <div
      className={`rounded-lg overflow-hidden relative shrink-0 shadow-lg border transition-all ${
        comp.id === selectedId
          ? "border-cyan-400 border-2"
          : "border-transparent"
      }`}
      style={{
        ...getBgStyle(comp),
        width,
        height,
        borderRadius,
      }}
      onClick={() => setSelectedComponent(comp.id)}
    >
      {comp.id === selectedId && (
        <>
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-2 border-cyan-400 bg-[#181818] rounded" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-2 border-cyan-400 bg-[#181818] rounded" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-2 border-cyan-400 bg-[#181818] rounded" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-2 border-cyan-400 bg-[#181818] rounded" />
        </>
      )}
      {comp.image && (
        <img
          src={comp.image}
          alt={comp.name || "Card"}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-3 left-3 bg-white/90 text-black text-xs px-3 py-1 rounded font-semibold shadow z-10">
        {comp.name || "Card"}
      </div>
    </div>
  );
}

export default CardItem;
