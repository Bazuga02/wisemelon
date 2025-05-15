import React from "react";
import wisemelonLogo from "../../assets/wisemelon-logo.png";
import useBotStore from "../../store/useBotStore";

function PhoneHeader() {
  const components = useBotStore((state) => state.components);
  const selectedId = useBotStore((state) => state.selectedComponentId);
  const setSelectedComponent = useBotStore(
    (state) => state.setSelectedComponent
  );

  // Find the header component or create default values
  const headerComponent = components.find((comp) => comp.type === "header");

  // Map size to Tailwind text size
  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  // Universal background logic for 'bg'
  let backgroundStyle = {};
  if (headerComponent.bgType === "solid") {
    backgroundStyle.background = headerComponent.bgSolid || "#000";
  } else {
    backgroundStyle.background = `linear-gradient(135deg, ${
      headerComponent.bgGradientFrom || "#000"
    } 0%, ${headerComponent.bgGradientVia || "#0f2b0f"} 60%, ${
      headerComponent.bgGradientTo || "#163b15"
    } 100%)`;
  }

  return (
    <div
      style={backgroundStyle}
      className="w-full h-[220px] px-6 pt-6 pb-4 flex flex-col justify-between relative"
      onClick={() => setSelectedComponent(headerComponent.id)}
    >
      <div className="flex items-center p-2">
        <img
          src={wisemelonLogo}
          alt="wisemelon"
          className="w-8 h-8 mr-2 object-contain rounded-sm"
        />
        <span
          className="text-white text-2xl tracking-tight"
          style={{ fontFamily: "inherit" }}
        >
          wisemelon
        </span>
      </div>
      <div className="p-2">
        <div
          className={`leading-tight ${
            sizeMap[headerComponent.greetingSize || "md"]
          }`}
          style={{ color: headerComponent.greetingColor || "#fff" }}
        >
          {headerComponent.greeting}
        </div>
        <div
          className={`font-semibold leading-tight ${
            sizeMap[headerComponent.helpTextSize || "md"]
          }`}
          style={{ color: headerComponent.helpTextColor || "#a3e635" }}
        >
          {headerComponent.helpText}
        </div>
      </div>
    </div>
  );
}

export default PhoneHeader;
