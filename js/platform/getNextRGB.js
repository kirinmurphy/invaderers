function getNewRgb (rgbConfig) {
  return rgbConfig.map((color) => {
    const incrementer = 1;
    const directioner = color[1];
    const newColor = color[0] + (incrementer * directioner);

    const atZero = newColor <= 50;
    const atTop = newColor >= 150;

    const newDirectioner = atZero
      ? 1 : atTop
      ? -1 : directioner;

    return [newColor, newDirectioner];        
  });
}