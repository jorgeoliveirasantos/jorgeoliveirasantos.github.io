
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
    <a href="./sobreameto.html">Sobre a metodologia deste curso</a>
    <a href="./oqueaprend.html">O que aprenderemos neste curso</a>

    <p>O que é o Design Gráfico?</p>
    <a href="./designgrafico.html">O Design Gráfico</a>

    <p>Fundamentos do Design Gráfico</p>
    <a href="./fundamentosdesign.html">Fundamentos</a>
    <a href="./bitmaps.html">Bitmaps</a>
    <a href="./vetores.html">Vetores</a>
    <a href="./desenhoamao.html">Desenho a Mão Livre</a>
    <a href="./desenhoassit.html">Desenho Assistido por Computador</a>
    <a href="./metodosvetor.html">Primitivas</a>
    <a href="./comoocomputa.html">Como o computador cria vetores?</a>
    <a href="./coordenadascar.html">Coordenadas Cartesianas</a>
    <a href="./inkscape.html">Inkscape</a>
    <a href="./desenhandoink.html">Desenhando no Inkscape</a>
    <a href="./arranjandoobj.html">Arranjando os objetos</a>
    <a href="./operacoesbool.html">Operações booleanas</a>

    <p>Curvas Bézier</p>
    <a href="./curvasefor.html">Curvas e Formas Primitivas</a>
    <a href="./desenhandocur.html">Desenhando curvas</a>
    <a href="./edicaodever.html">Edição de vértices</a>
    <a href="./verticebor.html">Vértice, borda e face</a>
    <a href="./usandoguias.html">Usando guias e snaps</a>

    <p>Glifos</p>
    <a href="./glifo.html">Glifo</a>
    <a href="./desenhandoico.html">Desenhando um ícone</a>
    <a href="./desenhandologo.html">Desenhando uma logomarca</a>

    <p>Trabalhando com bitmaps</p>
    <a href="./redesenho.html">Redesenho</a>
    <a href="./rastreio.html">Rastreio</a>
    <a href="./raster.html">Rasterização</a>

    <p>Recursos de desenho</p>
    <a href="./camadas.html">Camadas</a>
    <a href="./baldecon.html">Balde e Conta-Gotas</a>
    <a href="./grupos.html">Grupos</a>
    <a href="./clipagem.html">Clipagem</a>
    <a href="./opacidade.html">Opacidade</a>
    <a href="./mesclagem.html">Mesclagem</a>
    <a href="./desfoque.html">Desfoque</a>
    <a href="./sombrasbri.html">Sombras e brilhos</a>

    <p>Efeitos de design</p>
    <a href="./simetria.html">Simetria</a>
    <a href="./perspectiva.html">Perspectiva e Profundidade</a>
    <a href="./sombraebri.html">Sombra e Brilho</a>
    <a href="./espacovazneg.html">Espaço vazio e espaço negativo</a>

    <p>Teoria das cores</p>
    <a href="./fundamentoscor.html">Fundamentos da Cor</a>
    <a href="./sistemacor.html">Sistemas de Cores</a>
    <a href="./rgbhsl.html">RGB, HSL, RGBA e HSLA</a>
    <a href="./escalahex.html">Escala Hexadecimal RGB</a>
    <a href="./coresque.html">Cores quentes e frias</a>
    <a href="./paletacor.html">Paleta de Cores</a>
    <a href="./harmoniacor.html">Harmonia das cores</a>
    <a href="./midiaimp.html">Mídia impressa</a>

    <p>Tipografia</p>
    <a href="./tipografia.html">Tipografia</a>
    <a href="./familiafon.html">Família de Fontes</a>
    <a href="./estilocar.html">Estilo de Caractere</a>
    <a href="./estilospar.html">Estilos de Parágrafo</a>

    <p>Microsoft Publisher</p>
    <a href="./caixastex.html">Caixas de Texto</a>
    <a href="./formas.html">Formas</a>
    <a href="./guias.html">Guias</a>
    <a href="./criandopublisher.html">Criando uma publicação no Publisher</a>

    <p>Adobe Illustrator</p>
    <a href="./illustrator.html">Illustrator</a>

    <p>CorelDraw</p>
    <a href="./coreldraw.html">CorelDraw</a>

    <p>Tutorial Illustrator</p>
    <a href="./tutorialill.html">Tutorial</a>

    <p>Fundamentos de Bitmap</p>
    <a href="./fundamentosbit.html">Bitmaps</a>

    <p>Tratamento e Manipulação de Imagens</p>
    <a href="./gimp.html">GIMP</a>
    <a href="./selecao.html">Seleção</a>
    <a href="./retoque.html">Retoque e correção</a>
    <a href="./filtros.html">Aplicando filtros e ajustes</a>
    <a href="./mesclagembit.html">Mesclagem</a>
    <a href="./corbitmap.html">Alterações de cor</a>
    <a href="./ilustracao.html">Pintura e Ilustração</a>
    <a href="./animacao.html">Animação Digital</a>

    <p>Adobe Photoshop</p>
    <a href="./montagem.html">Montagem de fotos</a>

    <p>Princípios do Design Gráfico</p>
    <a href="./contraste.html">Contraste</a>
    <a href="./balanco.html">Balanço</a>
    <a href="./enfase.html">Ênfase</a>
    <a href="./repeticao.html">Repetição</a>
    <a href="./proporcao.html">Proporção</a>
    <a href="./hierarquia.html">Hierarquia</a>
    <a href="./ritmo.html">Ritmo</a>
    <a href="./padrao.html">Padrão</a>
    <a href="./espacovaz.html">Espaço vazio</a>
    <a href="./movimento.html">Movimento</a>
    <a href="./variedade.html">Variedade</a>
    <a href="./unidade.html">Unidade</a>

    <p>Desafios</p>
    <a href="./desafioink.html">Desafio Inkscape</a>
    <a href="./desafiopub.html">Desafio Publisher</a>
    <a href="./desafiogimp.html">Desafio GIMP</a>

    <p>Considerações sobre Softwares</p>
    <a href="./consideracoes.html">Considerações sobre Softwares</a>

    <p>O Autor</p>
    <a href="./oautor.html">O Autor</a>

    <p>Sessão de Downloads</p>
    <a href="./downloads.html">Downloads</a>
</div>
    `;
  }
}
customElements.define('side-bar-left', SideLeft);

/*

*/