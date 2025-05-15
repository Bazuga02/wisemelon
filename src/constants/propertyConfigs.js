// Property configuration for each component type
const propertyConfigs = {
  header: [
    { type: "text", label: "Greeting", key: "greeting" },
    { type: "size", label: "Greeting Size", key: "greetingSize" },
    { type: "color", label: "Greeting Color", key: "greetingColor" },
    { type: "text", label: "Help Text", key: "helpText" },
    { type: "size", label: "Help Text Size", key: "helpTextSize" },
    { type: "color", label: "Help Text Color", key: "helpTextColor" },
    { type: "background", label: "Background", key: "bg" },
  ],
  card: [
    { type: "text", label: "Label Text", key: "name" },
    { type: "background", label: "Background", key: "bg" },
    { type: "custom", label: "Set Image", key: "setImage" },
    { type: "slider", label: "Width", key: "width", min: 100, max: 300 },
    { type: "slider", label: "Height", key: "height", min: 50, max: 300 },
    {
      type: "slider",
      label: "Border Radius",
      key: "borderRadius",
      min: 0,
      max: 100,
    },
  ],
  button: [
    { type: "text", label: "Button Text", key: "text" },
    { type: "background", label: "Background", key: "bg" },
    { type: "color", label: "Text Color", key: "textColor" },
    { type: "slider", label: "Width", key: "width", min: 80, max: 300 },
    { type: "slider", label: "Height", key: "height", min: 30, max: 100 },
    {
      type: "slider",
      label: "Border Radius",
      key: "borderRadius",
      min: 0,
      max: 50,
    },
  ],
  recentMessages: [
    { type: "slider", label: "Width", key: "width", min: 100, max: 300 },
    { type: "slider", label: "Height", key: "height", min: 50, max: 200 },
    {
      type: "slider",
      label: "Border Radius",
      key: "borderRadius",
      min: 0,
      max: 100,
    },
    { type: "text", label: "Title", key: "title" },
    { type: "text", label: "Message", key: "message" },
    { type: "text", label: "Author", key: "author" },
    { type: "text", label: "Time", key: "time" },
    { type: "text", label: "Avatar URL", key: "avatar" },
  ],
  status: [
    { type: "slider", label: "Width", key: "width", min: 100, max: 300 },
    { type: "slider", label: "Height", key: "height", min: 50, max: 200 },
    {
      type: "slider",
      label: "Border Radius",
      key: "borderRadius",
      min: 0,
      max: 100,
    },
    { type: "text", label: "Title", key: "title" },
    { type: "text", label: "Status Message", key: "status" },
    { type: "text", label: "Logo URL", key: "logo" },
  ],
};

export const sizeOptions = [
  { label: "XS", value: "xs" },
  { label: "SM", value: "sm" },
  { label: "MD", value: "md" },
  { label: "LG", value: "lg" },
  { label: "XL", value: "xl" },
];

export default propertyConfigs;
