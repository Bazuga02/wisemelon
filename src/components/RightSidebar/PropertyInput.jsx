function PropertyInput({ label, value, onChange, type = "text", min, max }) {
  return (
    <div className="space-y-1 mb-2">
      <label className="text-xs text-black font-semibold">{label}</label>
      <input
        type={type}
        value={type === "number" ? value ?? 0 : value ?? ""}
        onChange={(e) =>
          onChange(
            type === "number"
              ? e.target.value === ""
                ? ""
                : Number(e.target.value)
              : e.target.value
          )
        }
        min={min}
        max={max}
        className="w-full bg-gray-100 rounded-md px-2 py-1 text-xs text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
      />
    </div>
  );
}

export default PropertyInput;
