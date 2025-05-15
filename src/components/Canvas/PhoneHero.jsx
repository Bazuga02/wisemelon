import React from "react";
import useBotStore from "../../store/useBotStore";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import CardItem from "./CardItem";
import ButtonItem from "./ButtonItem";
import RecentMessagesItem from "./RecentMessagesItem";
import StatusItem from "./StatusItem";

function SortableLayoutItem({ comp, selectedId, setSelectedComponent }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: comp.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const dragProps = { attributes, listeners, setNodeRef, style };

  if (comp.type === "recentMessages") {
    return (
      <RecentMessagesItem
        comp={comp}
        selectedId={selectedId}
        setSelectedComponent={setSelectedComponent}
        dragProps={dragProps}
      />
    );
  } else if (comp.type === "status") {
    return (
      <StatusItem
        comp={comp}
        selectedId={selectedId}
        setSelectedComponent={setSelectedComponent}
        dragProps={dragProps}
      />
    );
  }
  return null;
}

function PhoneHero() {
  const components = useBotStore((state) => state.components);
  const selectedId = useBotStore((state) => state.selectedComponentId);
  const setSelectedComponent = useBotStore(
    (state) => state.setSelectedComponent
  );
  const reorderLayoutComponents = useBotStore(
    (state) => state.reorderLayoutComponents
  );

  // Filter components by type
  const updateComponents = components.filter(
    (comp) => comp.type === "card" || comp.type === "button"
  );
  const layoutComponents = components.filter(
    (comp) => comp.type === "recentMessages" || comp.type === "status"
  );

  const sensors = useSensors(useSensor(PointerSensor));

  // Universal background logic for a component
  function getBgStyle(comp) {
    if (comp.bgType === "solid") {
      return { background: comp.bgSolid || "#19b6e7" };
    } else {
      return {
        background: `linear-gradient(135deg, ${
          comp.bgGradientFrom || "#19b6e7"
        } 0%, ${comp.bgGradientVia || "#19b6e7"} 60%, ${
          comp.bgGradientTo || "#19b6e7"
        } 100%)`,
      };
    }
  }

  return (
    <div className="bg-[#181818] px-4 pt-4 pb-2 -mt-4 rounded-t-3xl">
      {/* Updates Section */}
      <h4 className="text-lg font-bold mb-3 text-white">Updates</h4>
      <div
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {updateComponents.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No cards. Add some from the left sidebar.
          </div>
        ) : (
          updateComponents.map((comp) => {
            if (comp.type === "card") {
              return (
                <CardItem
                  key={comp.id}
                  comp={comp}
                  selectedId={selectedId}
                  setSelectedComponent={setSelectedComponent}
                  getBgStyle={getBgStyle}
                />
              );
            } else if (comp.type === "button") {
              return (
                <ButtonItem
                  key={comp.id}
                  comp={comp}
                  selectedId={selectedId}
                  setSelectedComponent={setSelectedComponent}
                  getBgStyle={getBgStyle}
                />
              );
            }
            return null;
          })
        )}
      </div>

      {/* Main Phone Layout */}
      <div className="mt-4 space-y-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              const oldIndex = layoutComponents.findIndex(
                (comp) => comp.id === active.id
              );
              const newIndex = layoutComponents.findIndex(
                (comp) => comp.id === over.id
              );
              reorderLayoutComponents(oldIndex, newIndex);
            }
          }}
        >
          <SortableContext
            items={layoutComponents.map((comp) => comp.id)}
            strategy={verticalListSortingStrategy}
          >
            {layoutComponents.map((comp) => (
              <SortableLayoutItem
                key={comp.id}
                comp={comp}
                selectedId={selectedId}
                setSelectedComponent={setSelectedComponent}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="text-white text-xl pl-1 mt-4">
        Explore various options
      </div>
    </div>
  );
}

export default PhoneHero;
