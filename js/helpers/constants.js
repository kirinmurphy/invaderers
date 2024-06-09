export const STATUS = {
  active: 'active',
  visited: 'visited',
  ship: 'ship',
  defender: 'defender',
  defenderShot: 'defenderShot',
  invaderShot: 'invaderShot',
}

export const DIRECTIONS = {
  left: 'left',
  right: 'right',
}

export const COLORS = {
  [STATUS.active]: '#fff',
  [STATUS.visited]: '#aaa',
  [STATUS.ship]: '#6f6',
  [STATUS.defender]: '#F84',
  [STATUS.defenderShot]: 'orange',
  [STATUS.invaderShot]: 'red',
  default: '#346'
};
