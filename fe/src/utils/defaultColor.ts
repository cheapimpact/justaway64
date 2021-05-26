export const defaultColor: any = () => {
  const bgColor = { light: "white", dark: "#2D3748" };
  const bdColor = { light: "gray.200", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const bgColorReadOnly = { dark: "gray", light: "lightgray" };

  return {
    bgColor: bgColor,
    bdColor: bdColor,
    color: color,
    bgColorReadOnly: bgColorReadOnly,
  };
};
