import React, { useState } from "react";
import { Home, HelpCircle, Megaphone, MessageCircle } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={20} className="text-lime-400" />,
    className:
      "w-15 h-15 bg-[#9b9a9a] rounded-full flex items-center justify-center",
  },
  {
    id: "help",
    label: "Help",
    icon: <HelpCircle size={20} className="text-white" />,
    className:
      "w-15 h-15 bg-[#9b9a9a] bg-opacity-50 rounded-full flex items-center justify-center",
  },
  {
    id: "events",
    label: "Events",
    icon: <Megaphone size={20} className="text-white" />,
    className:
      "w-15 h-15 bg-[#9b9a9a] bg-opacity-50 rounded-full flex items-center justify-center",
  },
  {
    id: "chat",
    label: "Chat",
    icon: <MessageCircle size={18} />,
    className:
      "bg-lime-400 text-black px-5 h-15 rounded-full flex items-center gap-2 font-medium text-sm",
    isChat: true,
  },
];

function SortableNavItem({ id, icon, label, className, isChat }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className + (isChat ? " select-none" : " select-none")}
    >
      {icon}
      {isChat && <span>Chat</span>}
    </div>
  );
}

function PhoneBottomNav() {
  const [items, setItems] = useState(NAV_ITEMS.map((item) => item.id));
  const sensors = useSensors(useSensor(PointerSensor));

  const idToItem = Object.fromEntries(NAV_ITEMS.map((item) => [item.id, item]));

  return (
    <div className="absolute left-0 right-0 flex justify-center z-50 bottom-0">
      <div className="bg-[#626261] px-3 py-2 rounded-full flex gap-1 shadow-2xl border border-black/20">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((id) => {
              const item = idToItem[id];
              return (
                <SortableNavItem
                  key={id}
                  id={id}
                  icon={item.icon}
                  label={item.label}
                  className={item.className}
                  isChat={item.isChat}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default PhoneBottomNav;
