import { Paintbrush, Settings, Code2, Rocket, Share2, PlugZap } from "lucide-react";

function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 shadow-sm bg-white relative">
      
      <h1 className="text-xl font-bold ">Bots Designer</h1>

      <div className="absolute left-1/2 -translate-x-1/2 flex gap-16 items-center">
        <div className=" bg-gray-200 p-2 rounded-md">
        <Paintbrush className="w-6 h-6" />
        </div>
        <Settings className="w-6 h-6" />
        <Code2 className="w-6 h-6" />
        <PlugZap className="w-6 h-6" />
        <Rocket className="w-6 h-6" />
      </div>

      <button className="flex items-center gap-2 bg-gray-900   text-white text-sm font-medium px-4 py-2 rounded-md">
        <Share2 className="w-4 h-4" />
        Configure Bot Flow
      </button>
    </div>
  );
}

export default TopBar;
