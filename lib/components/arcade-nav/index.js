import '../dropdown/index.js';

class ArcadeNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = /* html */`
      <style>
        dropdown-menu {
          display: block;
        }

        dropdown-menu a {
          display: block;
          padding: 1rem;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
        }

        dropdown-menu a:hover {
          background: #777;
        }

        dropdown-meun a:not(:last-of-type) {
          border-bottom: 1px solid #eee;
        }

        .active {
          background: #888;
          color: #bbb;
          pointer-events: none;
        }
      </style>
      <dropdown-menu title="Switch Game" direction="up">
        <a data-iframe-url="invaderers.html">Space Invaderers</a>
        <a data-iframe-url="snaker.html">Snaker Game</a>        
      </dropdown-menu>
    `;
    
    this.dropdownMenu = this.shadowRoot.querySelector('dropdown-menu');
  }

  connectedCallback() {
    this.addClickHandlers();
    this.highlightActiveMenuItem();
  }

  addClickHandlers() {
    const anchors = this.dropdownMenu.querySelectorAll('a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', this.handleAnchorClick.bind(this));
    });
  }
  
  handleAnchorClick(event) {
    event.preventDefault();
    const iframeUrl = event.target.getAttribute('data-iframe-url');
    const iframe = document.getElementById('iframe');
    if (iframe) {
      iframe.src = iframeUrl;
      this.highlightActiveMenuItem();
    } else {
      console.warn('Iframe with id "iframe" not found.');
    }
  }

  highlightActiveMenuItem() {
    const iframe = document.getElementById('iframe');
    if (!iframe) {
      console.warn('Iframe with id "iframe" not found.');
      return;
    }
    
    const currentIframeUrl = iframe.src;
    const anchors = this.dropdownMenu.querySelectorAll('a');
    
    anchors.forEach(anchor => {
      const iframeUrl = anchor.getAttribute('data-iframe-url');
      anchor.classList.remove('active');
      if (currentIframeUrl.includes(iframeUrl)) {
        anchor.classList.add('active');
        anchor.removeEventListener('click', this.handleAnchorClick.bind(this));
      }
    });
  }
}

customElements.define('arcade-nav', ArcadeNav);
