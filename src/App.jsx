import { useState } from "react";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import Canvas from "./components/Canvas/Canvas";
import RightSidebar from "./components/RightSidebar/PropertiesPanel";
import TopBar from "./components/TopBar/TopBar";

function App() {
  const [activeTab, setActiveTab] = useState("components");
  return (
    <div className="h-screen w-screen flex flex-col gap-2">
      <TopBar />
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="w-[400px] h-full overflow-hidden ">
          <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <Canvas />
        </div>
        <div className="w-[400px] h-full overflow-hidden">
          <RightSidebar setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
