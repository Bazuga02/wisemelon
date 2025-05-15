function PropertyGroup({ label, children }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
      {label && (
        <div className="text-xs font-bold text-black mb-2 uppercase tracking-wide">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export default PropertyGroup;
