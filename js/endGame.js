import { startGame } from "./startGame.js";

const outcomeGifs = {
  won: '',
  lost: ''
}

export function endGame ({ points, gameOutcome }) {
  const restartSection = document.getElementById('restart');
  restartSection.style.display = 'block';
  if ( points !== undefined ) {
    const count = restartSection.querySelector('.count');
    count.innerHTML = points || 0;  
  }

  if ( gameOutcome ) {
    restartSection.querySelector(`.${gameOutcome}-addl`).style.display = 'block';
  }
}

export function bindRestart({ containerId, screenHelper }) {
  const { battleHelper } = screenHelper;
  const restartContainer = document.getElementById(containerId);
  const restartButton = restartContainer.querySelector('button');
  const restartBinding = () => restartGame({ restartContainer, screenHelper });
  restartButton.addEventListener('click', restartBinding);

  const acceptableKeys = [' ', 'Enter'];
  document.addEventListener('keydown', function(event) {
    const { gameOutcome } = battleHelper.get();
    if ( !!gameOutcome && acceptableKeys.includes(event.key)) {
      restartBinding();
    }
  });
};

function restartGame ({ restartContainer, screenHelper }) {
  screenHelper.resetGame();
  startGame({ screenHelper });
  restartContainer.style.display = 'none';
  restartContainer.querySelectorAll('.outcome-status')
    .forEach(el =>  el.style.display = 'none');
}