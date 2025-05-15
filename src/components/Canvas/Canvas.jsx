import PhoneFrame from "./PhoneFrame";
import useBotStore from "../../store/useBotStore";
import PhoneContent from "./PhoneContent";

function Canvas() {
  const components = useBotStore((state) => state.components);

  return (
    <PhoneFrame>
      <PhoneContent />
    </PhoneFrame>
  );
}

export default Canvas;
