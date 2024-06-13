import { startGame } from "./startGame.js";
import { useCanvasHelper } from "./platform/canvasHelper.js";

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

export function bindRestart({ containerId }) {
  const { battleHelper } = useCanvasHelper();
  const restartContainer = document.getElementById(containerId);
  const restartButton = restartContainer.querySelector('button');
  const restartBinding = () => restartGame({ restartContainer });
  restartButton.addEventListener('click', restartBinding);

  const acceptableKeys = [' ', 'Enter'];
  document.addEventListener('keydown', function(event) {
    const { gameOutcome } = battleHelper.get();
    if ( !!gameOutcome && acceptableKeys.includes(event.key)) {
      restartBinding();
    }
  });
};

function restartGame ({ restartContainer }) {
  const { resetGame } = useCanvasHelper();
  resetGame();
  startGame();
  restartContainer.style.display = 'none';
  restartContainer.querySelectorAll('.outcome-status')
    .forEach(el =>  el.style.display = 'none');
}