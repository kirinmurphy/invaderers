export function endGame ({ points }) {
  const restartSection = document.getElementById('restart');
  restartSection.style.display = 'block';
  const count = restartSection.querySelector('.count');
  count.innerHTML = points;
}

export function bindRestart({ containerId, screenHelper }) {
  const restartContainer = document.getElementById(containerId);
  const restartButton = restartContainer.querySelector('button');
  restartButton.addEventListener('click', () => {
    screenHelper.resetGame();
    startGame({ screenHelper });
    restartContainer.style.display = 'none';
  });
};

