class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
<div class="js-nav">
  <ul>
    <li tabindex="1"><a href="https://www.jorgesouza.com.br/">Início</a></li>
    <li class="js-drop-button" tabindex="2">
      <a>Aprendizado <i class="seta"></i></a>
      <div class="js-drop-content">
        <a href="https://www.jorgesouza.com.br/informatica/intro">Informática</a>
        <a href="#">Design Gráfico</a>
        <hr>
        <pre><small>Desenvolvimento Web:</small></pre>
        <a>1. Web Design</a>
        <a>2. Javascript</a>
        <a>3. Aplicações Web e APIs</a>
        <hr>
        <pre><small>Programação:</small></pre>
        <a>1. Desktop</a>
        <a>2. Móvel</a>
        <a>3. Gráficos e Multimídia</a>
        <a>4. Jogos</a>
      </div>
    </li>
    <li tabindex="3"><a>Apostilas</a></li>
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
</div>
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
    <div style="min-width: 300px;">
      <tit>Aprendizado On-Line</tit>
      <par onclick="window.location = 'https://www.jorgesouza.com.br/informatica/intro'">Informática Básica e Avançada</par>
      <par onclick="window.location = '#'">Design Gráfico</par>
      <par onclick="window.location = '#'">Web Design (HTML e CSS)</par>
      <par onclick="window.location = '#'">Javascript (Front-End e Back-End)</par>
      <par onclick="window.location = '#'">Programação de Gráficos e Multimídia</par>
      <par onclick="window.location = '#'">Programação para PC Desktop</par>
      <par onclick="window.location = '#'">Desenvolvimento de Apps Móveis</par>
      <par onclick="window.location = '#'">Desenvolvimento de Jogos</par>
    </div>
    <div style="min-width: 300px;">
      <tit>Manuais e Apostilas</tit>
      <par onclick="window.location = '#'">Informática Básica e Avançada</par>
      <par onclick="window.location = '#'">Design Gráfico</par>
      <par onclick="window.location = '#'">Web Design (HTML e CSS)</par>
      <par onclick="window.location = '#'">Javascript (Front-End e Back-End)</par>
      <par onclick="window.location = '#'">Programação de Gráficos e Multimídia</par>
      <par onclick="window.location = '#'">Programação para PC Desktop</par>
      <par onclick="window.location = '#'">Desenvolvimento de Apps Móveis</par>
      <par onclick="window.location = '#'">Desenvolvimento de Jogos</par>
    </div>
    <div style="min-width: 300px;">
      <tit>Contato</tit>
      <par onclick="window.open('mailto:jorge.sos777@gmail.com')">Gmail</par>
      <par onclick="window.open('https://wa.me/5577991161892')">Whatsapp</par>
      <par onclick="window.open('https://join.skype.com/invite/uMbQf0utKfUz')">Skype</par>
      <par onclick="window.open('https://www.facebook.com/artesgraficaseprojetos')">Facebook</par>
      <par onclick="window.open('https://www.instagram.com/jorgeoliveiraonline/')">Instagram</par>
      <par onclick="window.open('https://www.workana.com/freelancer/175498bc00eeda4731ad4044f609f5a5')">Workana (Freelancer)</par>
    </div>
    <div style="min-width: 90%;">
      <hr style="width: 90%; margin: 25px auto 25px auto">
      <img src="../files/logo_amarela.svg" style="pointer-events: none; border: none; background-color: transparent; width: 40px; display: block; margin: auto; align-self: center;"/>
      <tit style="align-self: center; text-align: center; padding: 20px; display: block;">Copyright © 2022 - Jorge Souza Oliveira dos Santos</tit>
    </div>
  </div>
    `;
  }
}
customElements.define('footer-bar', Footer);
