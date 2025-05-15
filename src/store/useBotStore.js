import { create } from "zustand";
import redHandImg from "../assets/red-hand.png";
import wisemelonLogo from "../assets/wisemelon-logo.png";

const useBotStore = create((set) => ({
  selectedComponentId: null,
  components: [
    {
      id: Date.now(),
      type: "header",
      greeting: "Hello",
      helpText: "How Can We Help?",
      category: "Category Bot",
      greetingSize: "md",
      helpTextSize: "md",
      greetingColor: "#ffffff",
      helpTextColor: "#a3e635",
      bgType: "gradient",
      bgSolid: "#000000",
      bgGradientFrom: "#000000",
      bgGradientVia: "#0f2b0f",
      bgGradientTo: "#163b15",
    },
    {
      id: Date.now() + 1,
      type: "card",
      name: "Introducing magAI",
      bgType: "solid",
      bgSolid: "#19b6e7",
      bgGradientFrom: "#19b6e7",
      bgGradientVia: "#19b6e7",
      bgGradientTo: "#19b6e7",
      image: redHandImg,
      width: 168,
      height: 174,
      borderRadius: 20,
    },
    {
      id: Date.now() + 2,
      type: "recentMessages",
      title: "Recent Messages",
      message: "Hi there, I am wisemelon.ai, How can I help you?",
      author: "wisemelon",
      time: "7 min ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      width: 300,
      height: 70,
      borderRadius: 16,
    },
    {
      id: Date.now() + 3,
      type: "status",
      title: "Wisemelon.ai Status",
      status: "All Services are Running Smoothly",
      statusColor: "bg-lime-400",
      logo: wisemelonLogo,
      width: 300,
      height: 70,
      borderRadius: 16,
    },
  ],

  setSelectedComponent: (id) => set({ selectedComponentId: id }),

  addComponent: (component) =>
    set((state) => {
      let defaults = {};
      if (component.type === "card") {
        defaults = { width: 168, height: 174, borderRadius: 20 };
      } else if (component.type === "button") {
        defaults = { width: 120, height: 40, borderRadius: 100 };
      } else if (
        component.type === "recentMessages" ||
        component.type === "status"
      ) {
        defaults = { width: 300, height: 70, borderRadius: 16 };
      }
      return {
        components: [
          ...state.components,
          { ...defaults, ...component, id: Date.now() },
        ],
      };
    }),

  updateComponent: (id, updatedProps) =>
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, ...updatedProps } : comp
      ),
    })),

  reorderLayoutComponents: (oldIndex, newIndex) =>
    set((state) => {
      const layoutTypes = ["recentMessages", "status"];
      // Find layout and non-layout components
      const layoutComps = state.components.filter((c) =>
        layoutTypes.includes(c.type)
      );
      const otherComps = state.components.filter(
        (c) => !layoutTypes.includes(c.type)
      );
     
      const moved = [...layoutComps];
      const [removed] = moved.splice(oldIndex, 1);
      moved.splice(newIndex, 0, removed);
  
      return { components: [...otherComps, ...moved] };
    }),
}));

export default useBotStore;
