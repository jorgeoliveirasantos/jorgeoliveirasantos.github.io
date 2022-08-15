class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
<nav class="js-nav">
  <ul>
    <li><a href="../index.html">Início</a></li>
    <li><a href="../Informatica/informatica.html">Informática</a></li>
    <li class="js-drop-button">
      <a>Programação <i class="seta"></i></a>
      <div class="js-drop-content">
        <a href="../Web Design/webdesign.html">Web Design</a>
        <hr>
        <a>em construção...</a>
      </div>
    </li>
    <li class="right"><a href="../Sobre/sobre.html">Sobre</a></li>
  </ul>
  <style>
    .seta {
      border: solid #ddd;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 2px;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      margin: auto 5px auto 5px;
    }
  </style>
</nav>
    `;
  }
}
customElements.define('menu-bar', Menu);



class BtnUp extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
<div onclick="window.scroll(0,0)" title="Voltar para o topo">
  <svg class="btnUp" width="50" height="50" viewBox="0 0 50 50"><path style="stroke:none" d="M 25 0 C 11.1875 0 -2.3684758e-15 11.1875 0 25 L 0 50 L 25 50 L 50 50 L 50 25 C 50 11.1875 38.812502 -4.7369516e-15 25 0 z M 25 13.005859 L 36.994141 25 L 27.998047 25 L 27.998047 36.994141 L 22.001953 36.994141 L 22.001953 25 L 13.005859 25 L 25 13.005859 z "/></svg>
</div>
    `;
  }
}
customElements.define('btn-up', BtnUp);



class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <div class="js-footer">
        <table>
          <tr>
            <td>
              <tit>Manuais e Apostilas</tit>
            </td>
            <td>
              <tit>Aprendizado On-Line</tit>
            </td>
            <td>
              <tit>Contato</tit>
            </td>
          </tr>
          <tr>
            <td>
              <par onclick="window.location.replace('#')">Informática Básica e Avançada</par>
              <par onclick="window.location.replace('#')">Design Gráfico</par>
              <par onclick="window.location.replace('#')">Web Design (HTML e CSS)</par>
              <par onclick="window.location.replace('#')">Javascript (Front-End e Back-End)</par>
              <par onclick="window.location.replace('#')">Programação de Gráficos e Multimídia</par>
              <par onclick="window.location.replace('#')">Programação para PC Desktop</par>
              <par onclick="window.location.replace('#')">Desenvolvimento de Apps Móveis</par>
              <par onclick="window.location.replace('#')">Desenvolvimento de Jogos</par>
            </td>
            <td>
              <par onclick="window.location.replace('../Informatica/informatica.html')">Informática Básica e Avançada</par>
              <par onclick="window.location.replace('#')">Design Gráfico</par>
              <par onclick="window.location.replace('../Web Design/webdesign.html')">Web Design (HTML e CSS)</par>
              <par onclick="window.location.replace('#')">Javascript (Front-End e Back-End)</par>
              <par onclick="window.location.replace('#')">Programação de Gráficos e Multimídia</par>
              <par onclick="window.location.replace('#')">Programação para PC Desktop</par>
              <par onclick="window.location.replace('#')">Desenvolvimento de Apps Móveis</par>
              <par onclick="window.location.replace('#')">Desenvolvimento de Jogos</par>
            </td>
            <td>
              <par onclick="window.open('mailto:jorge.sos777@gmail.com')">Gmail</par>
              <par onclick="window.open('https://wa.me/5577991161892')">Whatsapp</par>
              <par onclick="window.open('https://join.skype.com/invite/uMbQf0utKfUz')">Skype</par>
              <par onclick="window.open('https://www.facebook.com/artesgraficaseprojetos')">Facebook</par>
              <par onclick="window.open('https://www.instagram.com/jorgeoliveiraonline/')">Instagram</par>
              <par onclick="window.open('https://www.workana.com/freelancer/175498bc00eeda4731ad4044f609f5a5')">Workana (Freelancer)</par>
            </td>
          </tr>
        </table>
        <hr>
        <img src="../files/logo_amarela.svg" style="pointer-events: none; vertical-align: middle; border: none; background-color: transparent; width: 40px; display: inline-block; margin: auto;"/>
        <tit style="vertical-align: middle; text-align: center; padding: 20px; display: inline-block;">Copyright © 2022 - Jorge Souza Oliveira dos Santos</tit>
      </div>
    `;
  }
}
customElements.define('footer-bar', Footer);
