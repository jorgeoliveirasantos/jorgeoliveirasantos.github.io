//#region Menu
class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
  <div class="js-nav-conteiner">
    <div class="js-nav">
        <a href="/index.html" tabindex="1" title="Início">
            <img src="/files/home.svg" alt="">
            <small>
                Início
            </small>
        </a>
        <a href="/blog/3.html" tabindex="2" title="Blog">
            <img src="/files/blog.svg" alt="">
            <small>
                Blog
            </small>
        </a>
        <a href="/cursos.html" tabindex="3" title="Cursos">
            <img src="/files/learn.svg" alt="">
            <small>
                Cursos
            </small>
        </a>
        <a href="/downloads.html" tabindex="4" title="Downloads">
            <img src="/files/download.svg" alt="">
            <small>
                Downloads
            </small>
        </a>
        <a href="/contato.html" tabindex="5" title="Contato">
            <img src="/files/contacts.svg" alt="">
            <small>
                Contato
            </small>
        </a>
    </div>
  </div>`;
  }
}
customElements.define('menu-bar', Menu);


//#endregion

//#region BTN-UP
class BtnUp extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
<div onclick="window.scrollTo( { top: 0, left: 0, behavior: 'smooth' } )" title="Voltar para o topo">
  <svg class="btnUp" width="50" height="50" viewBox="0 0 50 50"><path style="stroke:none" d="M 25 0 C 11.1875 0 -2.3684758e-15 11.1875 0 25 L 0 50 L 25 50 L 50 50 L 50 25 C 50 11.1875 38.812502 -4.7369516e-15 25 0 z M 25 13.005859 L 36.994141 25 L 27.998047 25 L 27.998047 36.994141 L 22.001953 36.994141 L 22.001953 25 L 13.005859 25 L 25 13.005859 z "/></svg>
</div>
    `;
  }
}
customElements.define('btn-up', BtnUp);
//#endregion

//#region Footer
class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="js-footer">
    <div style="grid-area: col1;">
      <h3>Cursos</h3>
      <a href="/cursos.html#informatica">
        <p>Informática Básica e Avançada</p>
      </a>
      <a href="/cursos.html#designgrafico">
        <p>Design Gráfico</p>
      </a>
      <a href="/cursos.html#webdesign">
        <p>Web Design</p>
      </a>
      <a href="/cursos.html#javascript">
        <p>Javascript</p>
      </a>
      <a href="/cursos.html#webapp">
        <p>Aplicações Web</p>
      </a>
    </div>
    <div style="grid-area: col2;">
      <h3>Manuais e Apostilas</h3>
      <a href="https://clubedeautores.com.br/livro/curso-de-informatica-basica-e-avancada" target="_blank">
        <p>Informática Básica e Avançada</p>
      </a>
      <a href="https://clubedeautores.com.br/livro/curso-completo-de-design-grafico" target="_blank">
        <p>Design Gráfico</p>
      </a>
      <a href="https://clubedeautores.com.br/livro/curso-de-web-design-2" target="_blank">
        <p>Web Design (HTML e CSS)</p>
      </a>
      <a href="https://clubedeautores.com.br/livro/curso-de-javascript" target="_blank">
        <p>Javascript</p>
      </a>
      <a href="https://clubedeautores.com.br/livro/desenvolvimento-de-aplicacoes-web" target="_blank">
        <p>Aplicações Web</p>
      </a>
    </div>
    <div style="grid-area: col3;">
      <h3>Contato</h3>
      <a target="_blank" href="mailto:jorge.sos777@outlook.com">
        <p>Gmail</p>
      </a>
      <a target="_blank" href="https://wa.me/5577991161892">
        <p>Whatsapp</p>
      </a>
      <a target="_blank" href="https://www.youtube.com/@jorgeoliveiraonline">
        <p>Youtube</p>
      </a>
      <a target="_blank" href="https://www.facebook.com/artesgraficaseprojetos">
        <p>Facebook</p>
      </a>
      <a target="_blank" href="https://www.instagram.com/jorgeoliveiraonline/">
        <p>Instagram</p>
      </a>
      <a target="_blank" href="https://clubedeautores.com.br/livros/autores/jorge-souza-oliveira-dos-santos">
        <p>Clube de Autores (Apostilas)</p>
      </a>
      <a target="_blank" href="https://www.workana.com/freelancer/175498bc00eeda4731ad4044f609f5a5">
        <p>Workana (freelancer)</p>
      </a>
    </div>
    <div style="grid-area: logo;">
      <hr style="width: 90%; margin: 25px auto 25px auto">
      <img src="/files/logo_amarela.svg"
        style="pointer-events: none; border: none; background-color: transparent; width: 40px; display: block; margin: auto; align-self: center;" />
      <h3 id="copy" style="align-self: center; text-align: center; padding: 20px; display: block;">Copyright © ${new
        Date().getFullYear()} - Jorge Souza Oliveira dos Santos</h3>
    </div>
  </div>
    `;
  }
}
customElements.define('footer-bar', Footer);
//#endregion

//#region Toggle Sidebar
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
  } else {
    let sideBar = document.querySelector('.js-side-left');
    sideBar.style.display = 'block';
    sideVisible = true;
    window.scroll(0, 150);
  }
}
//#endregion
