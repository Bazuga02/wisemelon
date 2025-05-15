function Tabs({ activeTab, onTabChange }) {
  const tabs = ["components", "uploads", "plugins"];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg shadow-sm px-1 py-1 mb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1 rounded-md text-xs capitalize transition-colors font-semibold
            ${
              activeTab === tab
                ? "bg-white shadow text-black font-bold"
                : "text-gray-500 hover:text-black hover:bg-gray-200"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
