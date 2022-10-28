
class SideLeft extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="js-side-left">
      <a href="./intro.html">Introdução</a>
      <p>O Curso</p>
      <a href="./praquem.html">Para quem este curso é destinado?</a>
      <a href=".">Sobre a metodologia deste curso</a>
      <a href=".">O que aprenderemos neste curso</a>
      
      <p>O que é o Design Gráfico?</p>
      <a href=".">O Design Gráfico</a>
      
      <p>Fundamentos do Design Gráfico</p>
      <a href=".">Bitmaps</a>
      <a href=".">Vetores</a>
      <a href=".">Desenho a Mão Livre</a>
      <a href=".">Desenho Assistido por Computador</a>
      <a href=".">Métodos de Vetor</a>
      <a href=".">Como o computador cria vetores?</a>
      <a href=".">Coordenadas Cartesianas</a>
      <a href=".">Inkscape</a>
      <a href=".">Desenhando no Inkscape</a>
      <a href=".">Arranjando os objetos</a>
      <a href=".">Operações booleanas</a>
      
      <p>Curvas Bézier</p>
      <a href=".">Curvas e Formas Primitivas</a>
      <a href=".">Desenhando curvas</a>
      <a href=".">Edição de vértices</a>
      <a href=".">Vértice, borda e face</a>
      <a href=".">Usando guias e snaps</a>
      
      <p>Glifos</p>
      <a href=".">Glifo</a>
      <a href=".">Desenhando um ícone</a>
      <a href=".">Desenhando uma logomarca</a>
      
      <p>Trabalhando com bitmaps</p>
      <a href=".">Redesenho</a>
      <a href=".">Rastreio</a>
      <a href=".">Rasterização</a>
      
      <p>Recursos de desenho</p>
      <a href=".">Camadas</a>
      <a href=".">Balde e Conta-Gotas</a>
      <a href=".">Grupos</a>
      <a href=".">Clipagem</a>
      <a href=".">Opacidade</a>
      <a href=".">Mesclagem</a>
      <a href=".">Desfoque</a>
      <a href=".">Sombras e brilhos</a>
      
      <p>Efeitos de design</p>
      <a href=".">Simetria</a>
      <a href=".">Perspectiva e Profundidade</a>
      <a href=".">Sombra e Brilho</a>
      <a href=".">Espaço vazio e espaço negativo</a>
      
      <p>Teoria das cores</p>
      <a href=".">Fundamentos da Cor</a>
      <a href=".">Sistemas de Cores</a>
      <a href=".">RGB, HSL, RGBA e HSLA</a>
      <a href=".">Escala Hexadecimal RGB</a>
      <a href=".">Cores quentes e frias</a>
      <a href=".">Paleta de Cores</a>
      <a href=".">Harmonia das cores</a>
      <a href=".">Mídia impressa</a>
      
      <p>Tipografia</p>
      <a href=".">Tipografia</a>
      <a href=".">Família de Fontes</a>
      <a href=".">Estilo de Caractere</a>
      <a href=".">Estilos de Parágrafo</a>
      
      <p>Microsoft Publisher</p>
      <a href=".">Caixas de Texto</a>
      <a href=".">Formas</a>
      <a href=".">Guias</a>
      <a href=".">Criando uma publicação no Publisher</a>
      
      <p>Adobe Illustrator</p>
      <a href=".">Illustrator</a>
      
      <p>CorelDraw</p>
      <a href=".">CorelDraw</a>
      
      <p>Tutorial Illustrator</p>
      <a href=".">Tutorial</a>
      
      <p>Fundamentos de Bitmap</p>
      <a href=".">Bitmaps</a>
      
      <p>Tratamento e Manipulação de Imagens</p>
      <a href=".">GIMP</a>
      <a href=".">Seleção</a>
      <a href=".">Retoque e correção</a>
      <a href=".">Aplicando filtros e ajustes</a>
      <a href=".">Mesclagem</a>
      <a href=".">Alterações de cor</a>
      <a href=".">Pintura e Ilustração</a>
      <a href=".">Animação Digital</a>
      
      <p>Adobe Photoshop</p>
      <a href=".">Montagem de fotos</a>
      
      <p>Princípios do Design Gráfico</p>
      <a href=".">Contraste</a>
      <a href=".">Balanço</a>
      <a href=".">Ênfase</a>
      <a href=".">Repetição</a>
      <a href=".">Proporção</a>
      <a href=".">Hierarquia</a>
      <a href=".">Ritmo</a>
      <a href=".">Padrão</a>
      <a href=".">Espaço vazio</a>
      <a href=".">Movimento</a>
      <a href=".">Variedade</a>
      <a href=".">Unidade</a>
      
      <p>Desafios</p>
      <a href=".">Desafio Inkscape</a>
      <a href=".">Desafio Publisher</a>
      <a href=".">Desafio GIMP</a>
      
      <p>Considerações sobre Softwares</p>
      <a href=".">Considerações sobre Softwares</a>
      
      <p>O Autor</p>
      <a href=".">O Autor</a>
    </div>
      `;
  }
}
customElements.define('side-bar-left', SideLeft);

/*

*/
