export function endGame ({ points, gameOutcome }) {
  const restartSection = document.getElementById('restart');
  restartSection.style.display = 'block';
  
  if ( points !== undefined ) {
    const count = restartSection.querySelector('.count');
    count.innerHTML = points || 0;  
  }

  if ( gameOutcome ) {
    const gameOutcomeDiv = restartSection.querySelector(`.${gameOutcome}-addl`);
    if ( gameOutcomeDiv ) { gameOutcomeDiv.style.display = 'block'; }
  }
}
