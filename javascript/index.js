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
      <a href=""><par>Informática Básica e Avançada</par></a>
      <a href=""><par>Design Gráfico</par></a>
      <a href=""><par>Web Design (HTML e CSS)</par></a>
      <a href=""><par>Javascript (Front-End e Back-End)</par></a>
      <a href=""><par>Programação de Gráficos e Multimídia</par></a>
      <a href=""><par>Programação para PC Desktop</par></a>
      <a href=""><par>Desenvolvimento de Apps Móveis</par></a>
      <a href=""><par>Desenvolvimento de Jogos</par></a>
    </div>
    <div style="min-width: 300px;">
      <tit>Manuais e Apostilas</tit>
      <a href=""><par>Informática Básica e Avançada</par></a>
      <a href=""><par>Design Gráfico</par></a>
      <a href=""><par>Web Design (HTML e CSS)</par></a>
      <a href=""><par>Javascript (Front-End e Back-End)</par></a>
      <a href=""><par>Programação de Gráficos e Multimídia</par></a>
      <a href=""><par>Programação para PC Desktop</par></a>
      <a href=""><par>Desenvolvimento de Apps Móveis</par></a>
      <a href=""><par>Desenvolvimento de Jogos</par></a>
    </div>
    <div style="min-width: 300px;">
      <tit>Contato</tit>
      <a target="_blank" href="mailto:jorge.sos777@outlook.com"><par>Gmail</par></a>
      <a target="_blank" href="https://wa.me/5577991161892"><par>Whatsapp</par></a>
      <a target="_blank" href="https://join.skype.com/invite/uMbQf0utKfUz"><par>Skype</par></a>
      <a target="_blank" href="https://www.facebook.com/artesgraficaseprojetos"><par>Facebook</par></a>
      <a target="_blank" href="https://www.instagram.com/jorgeoliveiraonline/"><par>Instagram</par></a>
      <a target="_blank" href="https://www.workana.com/freelancer/175498bc00eeda4731ad4044f609f5a5"><par>Workana (freelancer)</par></a>
    </div>
    <div style="min-width: 90%;">
      <hr style="width: 90%; margin: 25px auto 25px auto">
      <img src="/files/logo_amarela.svg" style="pointer-events: none; border: none; background-color: transparent; width: 40px; display: block; margin: auto; align-self: center;"/>
      <tit id="copy" style="align-self: center; text-align: center; padding: 20px; display: block;">Copyright © 2022 - Jorge Souza Oliveira dos Santos</tit>
    </div>
  </div>
    `;
  }
}
customElements.define('footer-bar', Footer);




class Toggle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {

    this.innerHTML = `
    <div class="js-index-toggle">
    <div class="js-index-icon" onclick="showSide()">
        <div style="width: 30px; height: 5px; margin: 5px; background-color: white;"></div>
        <div style="width: 30px; height: 5px; margin: 5px; background-color: white;"></div>
        <div style="width: 30px; height: 5px; margin: 5px; background-color: white;"></div>
    </div>
</div>
`;
  }
}
customElements.define('js-toggle-bar', Toggle);

let sideVisible = false;
function showSide() {
    if (sideVisible) {
        let sideBar = document.querySelector('.js-side-left');
        sideBar.style.display = 'none';
        sideVisible = false;
    }else{
        let sideBar = document.querySelector('.js-side-left');
        sideBar.style.display = 'block';
        sideVisible = true;
        window.scroll(0, 150);
      }
    }

