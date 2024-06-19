import { dropdownTemplate } from './template.js';

const DROPDOWN_DIRECTIONS = {
  up: '▲',
  down: '▼'
}

class Dropdown extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = dropdownTemplate;
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.dt = this.shadowRoot.querySelector('dt');
    this.triggerText = this.dt.querySelector('.text');
    this.arrow = this.dt.querySelector('.arrow');

    this.dd = this.shadowRoot.querySelector('dd');
    this.links = this.shadowRoot.querySelectorAll('a');
    
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.direction = this.getAttribute('direction');
  }

  static get observedAttributes() {
    return ['title', 'direction'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this.triggerText.textContent = newValue;
    }

    if (name === 'direction') {
      this.arrow.textContent = DROPDOWN_DIRECTIONS[newValue];
    }
  }

  connectedCallback() {
    this.dt.addEventListener('click', this.toggleDropdown);
    document.addEventListener('click', this.closeDropdown);
    this.links.forEach(link => link.addEventListener('click', this.handleLinkClick));
  }

  disconnectedCallback() {
    this.dt.removeEventListener('click', this.toggleDropdown);
    document.removeEventListener('click', this.closeDropdown);
    this.links.forEach(link => link.removeEventListener('click', this.handleLinkClick));
  }

  toggleDropdown(event) {
    event.stopPropagation();
    const isAlreadyOpen = this.dd.style.display === 'block';
    this.dd.style.display = isAlreadyOpen ? 'none' : 'block';
    if ( !isAlreadyOpen ) {
      const isUp = this.arrow.textContent === DROPDOWN_DIRECTIONS.up;
      this.arrow.textContent = isUp ? DROPDOWN_DIRECTIONS.down : DROPDOWN_DIRECTIONS.up;
    }
  }

  closeDropdown(event) {
    if (!this.contains(event.target)) {
      this.dd.style.display = 'none';
      const originalDirection = this.getAttribute('direction');
      this.arrow.textContent = DROPDOWN_DIRECTIONS[originalDirection];
    }
  }

  handleLinkClick() {
    this.dd.style.display = 'none';
  }
}

customElements.define('dropdown-menu', Dropdown);
