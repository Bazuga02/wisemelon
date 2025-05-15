import useBotStore from "../../store/useBotStore";

function ComponentList({ items }) {
  const addComponent = useBotStore((state) => state.addComponent);

  return (
    <div className="mt-2">
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => addComponent(item)}
          className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 mb-2 flex items-center gap-2 hover:ring-2 hover:ring-lime-400 hover:scale-90 transition-transform"
        >
          <span className="text-lg mr-2">{item.preview}</span>
          <span className="text-sm text-black font-semibold">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ComponentList;
