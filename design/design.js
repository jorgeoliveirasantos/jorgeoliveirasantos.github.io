
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
      <a href="./software.html">Software e Hardware</a>
      <a href="./gabinete.html">Gabinete e Periféricos</a>
      <a href="./processador.html">Processador</a>
      <a href="./placamae.html">Placa Mãe</a>
      <a href="./discorigido.html">Disco Rígido e Disco Sólido</a>
      <a href="./memoriaram.html">Memória RAM</a>
      <p>Introdução ao Windows</p>
      <a href="./umpouco.html">Um pouco de História</a>
      <a href="./oconceito.html">O Conceito de Janela</a>
      <a href="./areatrabalho.html">Área de Trabalho</a>
      <a href="./mouse.html">Mouse</a>
      <a href="./barratarefas.html">Barra de Tarefas e Menu Iniciar</a>
      <a href="./configuracoes.html">Configurações do Windows</a>
      <a href="./explorador.html">Explorador de Arquivos</a>
      <a href="./teclado.html">Teclado</a>
      <a href="./unidades.html">Unidades de Armazenamento</a>
      <a href="./acessorios.html">Acessórios do Windows</a>
      <a href="./manipulando.html">Manipulando Textos</a>
      <p>Introdução à Internet</p>
      <a href="./msedge.html">Microsoft Edge</a>
      <a href="./pesquisa.html">Pesquisa na Web</a>
      <a href="./downloadarquivos.html">Download de Arquivos</a>
      <a href="./downloadapps.html">Download de Aplicativos e Programas</a>
      <a href="./google.html">Google</a>
      <a href="./msaccount.html">Conta Microsoft</a>
      <a href="./sitesuteis.html">Sites Úteis</a>
      <a href="./cachecookies.html">Cache e Cookies</a>
      <p>Introdução ao Office</p>
      <a href="./msoffice.html">Microsoft Office</a>
      <a href="./msword.html">Microsoft Word</a>
      <a href="./mspowerpoint.html">Microsoft PowerPoint</a>
      <a href="./msexcel.html">Microsoft Excel</a>
      <a href="./mspublisher.html">Microsoft Publisher</a>
      <p>Introdução à Informática Avançada</p>
      <a href="./esteja.html">Esteja protegido</a>
      <a href="./senhas.html">Senhas</a>
      <a href="./nuvem.html">Serviços de Nuvem</a>
      <a href="./instalacao.html">Instalação e Desinstalação de Aplicativos</a>
      <a href="./msdefender.html">Microsoft Defender</a>
      <a href="./taskmgr.html">Gerenciador de Tarefas</a>
      <a href="./saude.html">Saúde do Computador</a>
      <a href="./limpezadisco.html">Limpeza de Disco</a>
      <a href="./verdisco.html">Verificação de Disco</a>
      <a href="./verarquivos.html">Verificação de Arquivos</a>
      <a href="./seguranca.html">Modo de Segurança</a>
      <a href="./restauracao.html">Restauração, Backup e Formatação</a>
      <p>O Sistema Operacional</p>
      <a href="./raiz.html">A Pasta Raiz</a>
      <a href="./log.html">Log de Eventos</a>
      <a href="./servicos.html">Serviços</a>
      <a href="./drivers.html">Drivers e Dispositivos</a>
      <a href="./agendador.html">Agendador de Tarefas</a>
      <a href="./diskmgmt.html">Gerenciamento de Disco</a>
      <a href="./powershell.html">Microsoft PowerShell</a>
      <a href="./rede.html">Rede e Compartilhamento</a>
      <p>Próximos Passos</p>
      <a href="./proximos.html">Próximos passos</a>
      <a href="./dev.html">Desenvolvimento de Software</a>
      <a href="./design.html">Design Gráfico</a>
      <a href="./opensource.html">Software Livre</a>
      <p>O Autor</p>
      <a href="./oautor.html">O Autor</a>
    </div>
      `;
    }
  }
  customElements.define('side-bar-left', SideLeft);

