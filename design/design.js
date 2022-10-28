
class SideLeft extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="js-side-left">
      <a href="./intro.html">Introdução</a>
      <p>O Computador</p>
      <a href="./oque.html">O que é um computador</a>
    </div>
      `;
  }
}
customElements.define('side-bar-left', SideLeft);

/*
Para quem este curso é destinado?
Sobre a metodologia deste curso
O que aprenderemos neste curso

O que é o Design Gráfico?
Fundamentos do Design Gráfico
Bitmaps
Vetores
Desenho a Mão Livre
Desenho Assistido por Computador
Métodos de Vetor
Como o computador cria vetores?
Coordenadas Cartesianas
Inkscape
Desenhando no Inkscape
Arranjando os objetos
Operações booleanas
Curvas Bézier
Curvas e Formas Primitivas
Desenhando curvas
Edição de vértices
Vértice, borda e face
Usando guias e snaps
Glifos
Glifo
 Desenhando um ícone
Desenhando uma logomarca
Trabalhando com bitmaps
Redesenho
Rastreio
Rasterização
Recursos de desenho
Camadas
Balde e Conta-Gotas
Grupos
Clipagem
Opacidade
Mesclagem
Desfoque
Sombras e brilhos
Efeitos de design
Simetria
Perspectiva e Profundidade
Sombra e Brilho
Espaço vazio e espaço negativo
Teoria das cores
Fundamentos da Cor
Sistemas de Cores
RGB, HSL, RGBA e HSLA
Escala Hexadecimal RGB
Cores quentes e frias
Paleta de Cores
Harmonia das cores
Mídia impressa
Tipografia
Tipografia
Família de Fontes
Estilo de Caractere
Estilos de Parágrafo
Microsoft Publisher
Caixas de Texto
Formas
Guias
Criando uma publicação no Publisher
Adobe Illustrator
CorelDraw
Tutorial Illustrator
Fundamentos de Bitmap
Tratamento e Manipulação de Imagens
GIMP
Seleção
Retoque e correção
Aplicando filtros e ajustes
Mesclagem
Alterações de cor
Pintura e Ilustração
Animação Digital
Adobe Photoshop
Montagem de fotos
Princípios do Design Gráfico
Contraste
Balanço
Ênfase
Repetição
Proporção
Hierarquia
Ritmo
Padrão
Espaço vazio
Movimento
Variedade
Unidade
Desafios
Desafio Inkscape
Desafio Publisher
Desafio GIMP
Considerações sobre Softwares
O Autor
*/
