import { defenderDefend } from './defenderDefend.js';
import { defenderMove } from './defenderMove.js';

export function bindDefenderActions() {
  document.addEventListener('keydown', (event) => {
    if (event.target.getAttribute('data-last-key') !== event.key) {
      event.target.setAttribute('data-last-key', event.key);
      defenderMove({ event });
    }
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.target.getAttribute('data-last-key') === event.key) {
      event.target.setAttribute('data-keydown', 'none');
      event.target.removeAttribute('data-last-key');
    }
  });

  document.addEventListener('keydown', function(event) {
    if ( event.key === ' ' ) {
      defenderDefend();
    }
  });
}

