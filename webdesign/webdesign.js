
class SideLeft extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="js-side-left">
    
    <p>HTML Básico</p>
    
    <a href="./intro.html">Curso de Web Design</a>
    <a href="./intro2.html">Introdução</a>
    <a href="./ohtml.html">O HTML</a>
    <a href="./marcas.html">Marcas</a>
    <a href="./estrutura.html">Estrutura de um documento HTML</a>
    <a href="./formatacao.html">Formatação</a>
    <a href="./fontes.html">Fontes</a>
    <a href="./cores.html">Cores</a>
    <a href="./margemborda.html">Margem e borda</a>
    <a href="./estilos.html">Estilos</a>
    <a href=".">Atributos Globais</a>
    <a href=".">Ids e classes</a>
    
    <p>Elementos HTML</p>
    
    <a href=".">Elementos HTML</a>
    <a href=".">Listas</a>
    <a href=".">Links</a>
    <a href=".">Tabelas</a>
    <a href=".">Conteúdo incorporado</a>
    <a href=".">Div e Span</a>
    <a href=".">Tags personalizadas</a>
    
    <p>Formulários</p>
    
    <a href=".">Formulários</a>
    <a href=".">Estrutura do formulário</a>
    <a href=".">Comportamento dos controles</a>
    <a href=".">Grupos fieldset</a>
    <a href=".">Atributos do formulário</a>
    <a href=".">Atributos dos controles</a>
    <a href=".">Controles em detalhes</a>
    <a href=".">Estilização do formulário</a>
    <a href=".">Manipulação de formulários com Javascript</a>
    
    <p>CSS</p>
    
    <a href=".">CSS</a>
    <a href=".">Introdução</a>
    <a href=".">Seletores</a>
    <a href=".">Box Sizing</a>
    <a href=".">Display</a>
    <a href=".">Cores</a>
    <a href=".">Gradientes</a>
    <a href=".">Funções e Variáveis</a>
    <a href=".">Bordas e Sombras</a>
    <a href=".">Fontes</a>
    <a href=".">Pseudo-classes e Pseudo-elementos</a>
    <a href=".">Posicionamento de elementos</a>
    <a href=".">Filtros e Mesclagens</a>
    <a href=".">Transições</a>
    <a href=".">Animações</a>
    
    <p>Web Design Responsivo</p>
    
    <a href=".">Layout de página</a>
    <a href=".">Flexbox</a>
    <a href=".">Grade</a>
    <a href=".">Posicionamento em grades</a>
    <a href=".">Media Query</a>
    <a href=".">Tipografia responsiva</a>
    <a href=".">Overflow</a>
    <a href=".">Tema escuro</a>
    
    <p>Metadados e SEO</p>
    <a href=".">Metadados e SEO</a>
    
    <p>O Autor</p>
    <a href=".">O Autor</a>
</div>
      `;
  }
}
customElements.define('side-bar-left', SideLeft);

/*
 
*/
