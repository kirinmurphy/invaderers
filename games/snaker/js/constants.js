export const CANVAS_ID = 'snaker';

export const STATUS_ACTIVE = 'active';
export const STATUS_VISITED = 'visited';

export const COLORS = {
  active: '#fff',
  visited: '#aaa',
  default: '#346'
};

export const DIRECTIONS = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
};

export const ELIGIBLE_DIRECTIONS = {
  left: [DIRECTIONS.up, DIRECTIONS.down],
  right: [DIRECTIONS.up, DIRECTIONS.down],
  up: [DIRECTIONS.left, DIRECTIONS.right],
  down: [DIRECTIONS.left, DIRECTIONS.right],
};