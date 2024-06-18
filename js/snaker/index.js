const STATUS_ACTIVE = 'active';
const STATUS_VISITED = 'visited';

const COLORS = {
  active: '#fff',
  visited: '#aaa',
  default: '#346'
};

(function () {
  const screenHelper = getScreenHelper({ containerId: 'canvas' }); 
  bindKeypress({ screenHelper });
  bindRestart({ containerId: 'restart', screenHelper });
  startGame({ screenHelper });
})();
 
function startGame ({ screenHelper }) {
  const { screenSettings } = screenHelper;
  const starterPosition = getStarterPosition(screenSettings);
  setStarterPosition({ screenHelper, starterPosition })
  move({ screenHelper, lastPosition: starterPosition });  
}

function getStarterPosition (screenSettings) {
  const { rows, columns } = screenSettings;
  return Math.floor(rows/2)*columns + Math.floor(columns/2);  
}

function setStarterPosition ({ screenHelper, starterPosition }) {
  const { coordinateStatus, updateScreen } = screenHelper;
  coordinateStatus.setStatus(starterPosition, 'active');
  updateScreen(coordinateStatus);    
}

function move ({ screenHelper, lastPosition }) {
  const { updateScreen, coordinateStatus, getNextPosition } = screenHelper;

  const newPos = getNextPosition(lastPosition);

  if ( newPos === undefined 
      || coordinateStatus.getStatus(newPos) === STATUS_VISITED) {
    const points = coordinateStatus.getFinalCount(STATUS_VISITED);
    endGame({ points });
    return;
  }

  coordinateStatus.setStatus(lastPosition, STATUS_VISITED);
  coordinateStatus.setStatus(newPos, 'active');
  updateScreen(coordinateStatus); 

  requestAnimationFrame(() => { 
    return move({ screenHelper, lastPosition: newPos });
  });
}

function endGame ({ points }) {
  const restartSection = document.getElementById('restart');
  restartSection.style.display = 'block';
  const count = restartSection.querySelector('.count');
  count.innerHTML = points;
}

function getScreenHelper ({ containerId }) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const rows = Number(canvas.getAttribute('rows'));
  const columns = Number(canvas.getAttribute('columns'));
  const cellWidth = canvas.width / columns;
  const cellHeight = canvas.height / rows;
  const cellCount = rows * columns;

  const directions = {
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down'
  }
  
  const eligibleDirections = {
    left: [directions.up, directions.down],
    right: [directions.up, directions.down],
    up: [directions.left, directions.right],
    down: [directions.left, directions.right],
  }

  const starterDirection = directions.right;
  let currentDirection = starterDirection;
  
  const changeDirection = (direction) => {
    if ( !directions[direction] ) { return; }
    if ( !eligibleDirections[currentDirection].includes(direction) ) { return; }
    currentDirection = direction;
  };

  const getNextPosition = {
    right: (currentPos) => {
      const stillMoreToGo = currentPos % rows !== 0;
      return stillMoreToGo ? currentPos + 1 : undefined; 
    },
    left: (currentPos) => {
      const stillMoreToGo = currentPos % rows !== 1;
      return stillMoreToGo ? currentPos - 1 : undefined; 
    }, 
    up: (currentPos) => { 
      // TODO: double check if at the last one 
      const stillMoreToGo = currentPos > columns;
      return stillMoreToGo ? currentPos - columns : undefined; 
    },
    down: (currentPos) => { 
      const stillMoreToGo = currentPos - 1 < (cellCount - columns);
      return stillMoreToGo ? (currentPos + columns) : undefined; 
    },
  };
  
  const coordinateStatus = createCoordinateStatusHelper();
  
  const updateScreen = (coordinateStatus) => {
    // createAndAppendSpans({
    //   containerId: 'canvas', rows, columns, cellCount, coordinateStatus 
    // });      
    drawCanvas({ ctx, rows, columns, cellWidth, cellHeight, coordinateStatus });
  }
  
  return {
    screenSettings: { rows, columns, cellCount },
    directions,
    changeDirection,
    coordinateStatus,
    updateScreen,
    getNextPosition: (currentPos) => {
      return getNextPosition[currentDirection](currentPos);
    }, 
    resetGame: () => {
      changeDirection(starterDirection);
      coordinateStatus.resetStatus();
    },
  }; 
}

function drawCanvas(props) {
  const { ctx, rows, columns, cellWidth, cellHeight, coordinateStatus } = props;
  
  ctx.clearRect(0, 0, columns * cellWidth, rows * cellHeight);

  const activeElements = [];
  
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const index = rowIndex * columns + columnIndex + 1;
      const status = coordinateStatus.getStatus(index);
      const fillStyle = COLORS[status] || COLORS.default;
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

  if (status === 'active') {
    const multiplier = 2;
    const offset = (multiplier - 1) / 2;

    return {
      ...baseProps,
      x: baseProps.x - (cellWidth * offset),
      y: baseProps.y - (cellHeight * offset),
      width: cellWidth * multiplier,
      height: cellHeight * multiplier,
      isCircle: true 
    };
  } else {
    return { ...baseProps, isCircle: false };
  }
}

function createCoordinateStatusHelper() {
  const initialStatusMap = new Map();
  const coordinateStatusMap = new Map(initialStatusMap);

  function setStatus(pos, status) {
    coordinateStatusMap.set(pos, status);
  }

  function getStatus(pos) {
    return coordinateStatusMap.get(pos);
  }

  function hasStatus(pos) {
    return coordinateStatusMap.has(pos);
  }
  
  function getFinalCount (status) {
    return [...coordinateStatusMap.values()].reduce((count, value) => {
      return value === status ? count + 1 : count;
    }, 0);        
  }

  function resetStatus() {
    coordinateStatusMap.clear();
    for (const [key, value] of initialStatusMap.entries()) {
      coordinateStatusMap.set(key, value);
    }
  }

  return {
    getStatus,
    setStatus,
    hasStatus,
    resetStatus,
    getFinalCount
  };
}

function bindKeypress({ screenHelper }) {
  const { directions } = screenHelper;

  document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    switch (event.key) {
      case 'ArrowLeft':
        screenHelper.changeDirection(directions.left)
        break;
      case 'ArrowRight':
        screenHelper.changeDirection(directions.right)
        break;
      case 'ArrowUp':
        screenHelper.changeDirection(directions.up)
        break;
      case 'ArrowDown':
        screenHelper.changeDirection(directions.down)
        break;
      default:
        console.log('Other key pressed');
        break;
    }
  });
}

function bindRestart({ containerId, screenHelper }) {
  const restartContainer = document.getElementById(containerId);
  const restartButton = restartContainer.querySelector('button');
  restartButton.addEventListener('click', () => {
    screenHelper.resetGame();
    startGame({ screenHelper });
    restartContainer.style.display = 'none';
  });
};

