import React from "react";
import { GripVertical } from "lucide-react";

function RecentMessagesItem({
  comp,
  selectedId,
  setSelectedComponent,
  dragProps,
}) {
  const { attributes, listeners, setNodeRef, style } = dragProps;
  const borderRadius =
    typeof comp.borderRadius === "number" ? comp.borderRadius : 16;
  const width = typeof comp.width === "number" ? comp.width : 300;
  const height = typeof comp.height === "number" ? comp.height : 70;
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width, height, borderRadius }}
      className={`bg-[#181818] border border-lime-400 flex items-center px-4 py-3 gap-3 shadow relative ${
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
        src={comp.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover border-2 border-white"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white text-base leading-tight">
          {comp.title || "Recent Messages"}
        </div>
        <div className="text-xs text-gray-300 truncate">
          {comp.message || "Hi there, I am wisemelon.ai, How can i..."}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-white">
            {comp.author || "wisemelon"}
          </span>
          <span className="text-xs text-gray-400">
            · {comp.time || "7 min ago"}
          </span>
        </div>
      </div>
      <span className="text-gray-400 text-lg font-bold ml-2">&#8250;</span>
    </div>
  );
}

export default RecentMessagesItem;
