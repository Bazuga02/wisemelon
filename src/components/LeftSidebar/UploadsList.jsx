import React, { useRef } from "react";
import useBotStore from "../../store/useBotStore";
import telegram from "../../assets/telegram.png";
import redHand from "../../assets/red-hand.png";
import whatsapp from "../../assets/whatsapp.png";
import wisemelonLogo from "../../assets/wisemelon-logo.png";
import reactLogo from "../../assets/react.svg";

const defaultImages = [
  { src: telegram, name: "telegram.png" },
  { src: redHand, name: "red-hand.png" },
  { src: whatsapp, name: "whatsapp.png" },
  { src: wisemelonLogo, name: "wisemelon-logo.png" },
  { src: reactLogo, name: "react.svg" },
];

const UploadsList = () => {
  const selectedId = useBotStore((state) => state.selectedComponentId);
  const updateComponent = useBotStore((state) => state.updateComponent);
  const components = useBotStore((state) => state.components);
  const selected = components.find((comp) => comp.id === selectedId);
  const [userImages, setUserImages] = React.useState([]);
  const fileInputRef = useRef();

  const handleImageClick = (img) => {
    if (selected && selected.type === "card") {
      updateComponent(selected.id, { image: img.src });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserImages((prev) => [
        ...prev,
        { src: ev.target.result, name: file.name },
      ]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="font-semibold text-xs mb-1">Your Uploads</div>
      <div className="grid grid-cols-2 gap-2">
        {[...defaultImages, ...userImages].map((img) => (
          <div
            key={img.name}
            className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-sm hover:ring-2 hover:ring-lime-400 hover:scale-95 duration-150 transition-transform flex flex-col items-center aspect-square min-h-[90px] justify-center"
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-full h-[60px] object-contain rounded-lg mb-1"
            />
            <div className="text-xs text-gray-500 text-center py-0.5 truncate w-full px-1">
              {img.name}
            </div>
          </div>
        ))}
        {/* + Upload Box */}
        <div
          className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-xl shadow-sm cursor-pointer hover:border-lime-400 hover:bg-gray-50 transition aspect-square min-h-[90px]"
          onClick={() => fileInputRef.current.click()}
        >
          <span className="text-3xl text-gray-300 font-bold mb-1">+</span>
          <span className="text-xs text-gray-400">Upload</span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
};

export default UploadsList;
