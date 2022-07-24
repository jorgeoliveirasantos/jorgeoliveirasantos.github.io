class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <link rel="stylesheet" href="../css/index.css"/>
    <nav class="js-nav">
      <ul>
        <li class="active"><a href="index.html">Início</a></li>
        <li><a href="Informatica/informatica.html">Informática</a></li>
        <li class="js-drop-button">
          <a>Programação ▼</a>
          <div class="js-drop-content">
            <a href="Web Design/webdesign.html">Web Design</a>
          </div>
        </li>
        <li class="right"><a href="sobre.html">Sobre</a></li>
      </ul>
    </nav>
    `;
  }
}
customElements.define('menuBar', Menu);