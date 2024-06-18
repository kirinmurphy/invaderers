export function getScreenSettings({ canvas, bindCustomSettings }) {
  const rows = Number(canvas.getAttribute('rows'));
  const columns = Number(canvas.getAttribute('columns'));

  const settings = { 
    rows, 
    columns, 
    cellCount: rows * columns, 
    cellWidth: canvas.width / columns,
    cellHeight: canvas.height / rows,
    ...bindCustomSettings(canvas)
  };

  return settings;
}
