// TODO: pass this into drawCanvas instaed of importing
import { STATUS } from "../constants.js";

export function drawCanvas ({ canvas, screenHelper, colors }) {
  const { screenSettings, coordinateStatus } = screenHelper;
  const { rows, columns, cellWidth, cellHeight } = screenSettings;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, columns * cellWidth, rows * cellHeight);

  const activeElements = [];
  
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const index = rowIndex * columns + columnIndex + 1;
      const status = coordinateStatus.getStatus(index);
       
      // TODO: Move outside of this
      // const fillStyle = status == STATUS.ship 
      //   ? getRandomHexColor() : (colors[status] || colors.default);
      const fillStyle = colors[status] || colors.default;
      ctx.fillStyle = fillStyle;
     
      const rectProps = getRectProps({ 
        status, columnIndex, rowIndex, cellWidth, cellHeight 
      });

      if (rectProps.isCircle) {
        activeElements.push({ ...rectProps, fillStyle });
      } else {
        ctx.fillRect(
          rectProps.x, 
          rectProps.y, 
          rectProps.width, 
          rectProps.height
        );
      }
    }
  }
  
  activeElements.forEach(({ x, y, width, height, fillStyle }) => {
    const radius = width / 2;
    const centerX = x + radius;
    const centerY = y + radius;
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  });  
}

function getRectProps(props) {
  const { 
    status, 
    columnIndex, 
    rowIndex, 
    cellWidth, 
    cellHeight 
  } = props;

  const baseProps = {
    x: columnIndex * cellWidth,
    y: rowIndex * cellHeight,
    width: cellWidth,
    height: cellHeight
  };

  return { ...baseProps, isCircle: false };
}

function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
