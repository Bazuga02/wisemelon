import React from "react";
import { GripVertical } from "lucide-react";
import wisemelonLogo from "../../assets/wisemelon-logo.png";

function StatusItem({ comp, selectedId, setSelectedComponent, dragProps }) {
  const { attributes, listeners, setNodeRef, style } = dragProps;
  const borderRadius =
    typeof comp.borderRadius === "number" ? comp.borderRadius : 16;
  const width = typeof comp.width === "number" ? comp.width : 300;
  const height = typeof comp.height === "number" ? comp.height : undefined;
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width, height, borderRadius }}
      className={`bg-[#232323] px-4 py-3 flex items-center gap-3 shadow relative ${
        comp.id === selectedId ? "ring-2 ring-cyan-400" : ""
      }`}
      onClick={() => setSelectedComponent(comp.id)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-2 -top-2 w-6 h-6 bg-gray-800/80 rounded-full flex items-center justify-center cursor-grab hover:bg-gray-700/80 transition-colors z-10"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <img
        src={comp.logo || wisemelonLogo}
        alt="logo"
        className="w-7 h-7 object-contain rounded"
      />
      <div>
        <div className="font-semibold text-white text-base leading-tight">
          {comp.title || "Wisemelon.ai Status"}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`w-2 h-2 ${
              comp.statusColor || "bg-lime-400"
            } rounded-full inline-block`}
          ></span>
          <span className="text-xs text-gray-300">
            {comp.status || "All Services are Running Smoothly"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusItem;
