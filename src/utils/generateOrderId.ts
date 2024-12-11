const generateOrderID = (route: "LT-UK" | "UK-LT" | null) => {
  if (!route) {
    return null;
  }
  const prefix = route.split("-")[0];
  const timestamp = new Date().getTime();
  const orderNumber = String(timestamp).slice(-6);
  return `${prefix}-${orderNumber}`;
};

export default generateOrderID;
