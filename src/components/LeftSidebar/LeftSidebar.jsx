import Tabs from "./Tabs";
import ComponentList from "./ComponentList";
import UploadsList from "./UploadsList";
import { componentsData } from "../../constants/componentsList";

function LeftSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden shadow border border-gray-200 rounded-xl p-3 ml-2">
      <h2 className="text-lg font-bold mb-2">Assets Library</h2>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-y-auto mt-2">
        {activeTab === "uploads" ? (
          <UploadsList />
        ) : (
          <ComponentList items={componentsData[activeTab]} />
        )}
      </div>
    </div>
  );
}

export default LeftSidebar;
