import useBotStore from "../../store/useBotStore";
import PropertyInput from "./PropertyInput";
import ColorPicker from "./ColorPicker";
import propertyConfigs, { sizeOptions } from "../../constants/propertyConfigs";
import { useState } from "react";
import LayoutRow from "./LayoutRow";
import BackgroundPicker from "./BackgroundPicker";
import PropertyGroup from "./PropertyGroup";
import React from "react";

function PropertiesPanel({ setActiveTab }) {
  const components = useBotStore((state) => state.components);
  const selectedId = useBotStore((state) => state.selectedComponentId);
  const updateComponent = useBotStore((state) => state.updateComponent);

  const selected = components.find((comp) => comp.id === selectedId);
  const [activeSlider, setActiveSlider] = useState(null);

  if (!selected) {
    return (
      <div className="p-6 text-sm text-gray-500 bg-gray-50 rounded-2xl shadow-md border border-gray-100">
        Select a component to edit its properties.
      </div>
    );
  }

  const handleChange = (key, value) => {
    updateComponent(selected.id, { [key]: value });
  };

  const removeComponent = () => {
    useBotStore.setState((state) => ({
      components: state.components.filter((comp) => comp.id !== selected.id),
      selectedComponentId: null,
    }));
  };

  // Render a property input based on its config
  function renderPropertyInput(
    prop,
    value,
    onChange,
    { setActiveTab, selected }
  ) {
    if (prop.type === "background") {
      // Universal background picker
      return (
        <BackgroundPicker
          label={prop.label}
          valueObj={selected}
          onChange={(key, val) => handleChange(key, val)}
        />
      );
    }
    if (prop.type === "custom" && prop.key === "setImage") {
      return (
        <button
          className="mb-2 w-full bg-gray-300 py-1 text-black hover:cursor-pointer rounded-md text-xs font-semibold transition hover:bg-lime-200"
          onClick={() => {
            if (typeof setActiveTab === "function") setActiveTab("uploads");
          }}
        >
          Set Image
        </button>
      );
    }
    if (prop.type === "size") {
      return (
        <div className="flex gap-2 mb-4">
          {sizeOptions.map((opt) => (
            <button
              key={opt.value}
              className={`px-2 py-1 rounded text-xs border transition font-semibold shadow-sm ${
                value === opt.value
                  ? "bg-lime-500 text-white border-lime-500"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );
    }
    if (prop.type === "text") {
      return (
        <PropertyInput label={prop.label} value={value} onChange={onChange} />
      );
    }
    if (prop.type === "color") {
      return (
        <ColorPicker label={prop.label} value={value} onChange={onChange} />
      );
    }
    if (prop.type === "slider") {
      const max = prop.key === "borderRadius" ? 100 : 300;
      return (
        <PropertyInput
          label={prop.label}
          value={value}
          onChange={onChange}
          type="number"
          min={prop.min}
          max={max}
        />
      );
    }
    return null;
  }

  // Helper to group width, height, borderRadius into a layout row
  function groupLayoutFields(config) {
    const layoutKeys = ["width", "height", "borderRadius"];
    const layoutFields = config.filter((p) => layoutKeys.includes(p.key));
    if (layoutFields.length === 3) {
      const rest = config.filter((p) => !layoutKeys.includes(p.key));
      const firstIdx = config.findIndex((p) => p.key === "width");
      rest.splice(firstIdx, 0, {
        type: "layout",
        keys: layoutKeys,
        fields: layoutFields,
      });
      return rest;
    }
    return config;
  }

  // Group properties by logical sections (if groupLabel is present)
  function groupBySections(config) {
    const groups = [];
    let current = { label: null, fields: [] };
    config.forEach((prop) => {
      if (prop.type === "groupLabel") {
        if (current.fields.length) groups.push(current);
        current = { label: prop.label, fields: [] };
      } else {
        current.fields.push(prop);
      }
    });
    if (current.fields.length) groups.push(current);
    return groups;
  }

  const renderProperties = () => {
    let config = propertyConfigs[selected.type] || [];
    config = groupLayoutFields(config);
    const groups = groupBySections(config);
    return groups.map((group, idx) => (
      <PropertyGroup key={group.label || idx} label={group.label}>
        {group.fields.map((prop, propIdx) => {
          if (prop.showIf && !prop.showIf(selected)) return null;
          if (prop.type === "layout") {
            return (
              <LayoutRow
                key="layout-row"
                width={selected.width}
                height={selected.height}
                borderRadius={selected.borderRadius}
                onChange={handleChange}
                activeSlider={activeSlider}
                setActiveSlider={setActiveSlider}
              />
            );
          }
          return (
            <React.Fragment key={prop.key || propIdx}>
              {renderPropertyInput(
                prop,
                selected[prop.key],
                (val) => handleChange(prop.key, val),
                { setActiveTab, selected }
              )}
            </React.Fragment>
          );
        })}
      </PropertyGroup>
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="flex flex-col gap-0 mb-3">
        <h1 className="text-lg font-bold text-black">Properties</h1>
        <h2 className="font-semibold text-sm text-black capitalize">
          {selected.type} Component
        </h2>
      </div>
      {renderProperties()}
      {selected.type !== "header" && (
        <button
          className="mt-2 px-6 py-1 bg-red-500 hover:bg-red-600 text-white font-bold py- rounded-lg shadow transition active:scale-95"
          onClick={removeComponent}
        >
          Remove Element
        </button>
      )}
    </div>
  );
}

export default PropertiesPanel;
