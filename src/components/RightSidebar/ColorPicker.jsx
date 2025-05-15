import { useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

function ColorPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const swatchRef = useRef();
  const popupRef = useRef();

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (swatchRef.current && swatchRef.current.contains(e.target)) {
        return;
      }
      if (popupRef.current && popupRef.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="flex items-center gap-2 mb-2 relative">
      <label className="text-xs text-black font-semibold">{label}</label>
      <button
        type="button"
        ref={swatchRef}
        className="w-5 h-5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
        style={{ background: value }}
        onClick={() => setOpen((v) => !v)}
        aria-label={`Pick ${label}`}
      />
      {open && (
        <div ref={popupRef} className="absolute left-20 z-50 mt-2">
          <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100">
            <HexColorPicker color={value} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
