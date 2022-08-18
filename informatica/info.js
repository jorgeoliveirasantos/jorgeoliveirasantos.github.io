
class SideLeft extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
      <div class="js-side-left">
      <a href="/informatica/intro.html">Introdução</a>
      <p>O Computador</p>
      <a href="/informatica/oque.html">O que é um computador</a>
      <a href="/informatica/software.html">Software e Hardware</a>
      <a href="/informatica/gabinete.html">Gabinete e Periféricos</a>
      <a href="/informatica/processador.html">Processador</a>
      <a href="/informatica/placamae.html">Placa Mãe</a>
      <a href="/informatica/discorigido.html">Disco Rígido e Disco Sólido</a>
      <a href="/informatica/memoriaram.html">Memória RAM</a>
      <p>Introdução ao Windows</p>
      <a href="/informatica/umpouco.html">Um pouco de História</a>
      <a href="/informatica/oconceito.html">O Conceito de Janela</a>
      <a href="/informatica/areatrabalho.html">Área de Trabalho</a>
      <a href="/informatica/mouse.html">Mouse</a>
      <a href="/informatica/barratarefas.html">Barra de Tarefas e Menu Iniciar</a>
      <a href="/informatica/configuracoes.html">Configurações do Windows</a>
      <a href="/informatica/explorador.html">Explorador de Arquivos</a>
      <a href="/informatica/teclado.html">Teclado</a>
      <a href="/informatica/unidades.html">Unidades de Armazenamento</a>
      <a href="/informatica/acessorios.html">Acessórios do Windows</a>
      <a href="/informatica/manipulando.html">Manipulando Textos</a>
      <p>Introdução à Internet</p>
      <a href="/informatica/msedge.html">Microsoft Edge</a>
      <a href="/informatica/pesquisa.html">Pesquisa na Web</a>
      <a href="/informatica/downloadarquivos.html">Download de Arquivos</a>
      <a href="/informatica/downloadapps.html">Download de Aplicativos e Programas</a>
      <a href="/informatica/google.html">Google</a>
      <a href="/informatica/msaccount.html">Conta Microsoft</a>
      <a href="/informatica/sitesuteis.html">Sites Úteis</a>
      <a href="/informatica/cachecookies.html">Cache e Cookies</a>
      <p>Introdução ao Office</p>
      <a href="/informatica/msoffie.html">Microsoft Office</a>
      <a href="/informatica/msword.html">Microsoft Word</a>
      <a href="/informatica/mspowerpoint.html">Microsoft PowerPoint</a>
      <a href="/informatica/msexcel.html">Microsoft Excel</a>
      <a href="/informatica/mspublisher.html">Microsoft Publisher</a>
      <p>Introdução à Informática Avançada</p>
      <a href="/informatica/esteja.html">Esteja protegido</a>
      <a href="/informatica/senhas.html">Senhas</a>
      <a href="/informatica/nuvem.html">Serviços de Nuvem</a>
      <a href="/informatica/instalacao.html">Instalação e Desinstalação de Aplicativos</a>
      <a href="/informatica/msdefender.html">Microsoft Defender</a>
      <a href="/informatica/taskmgr.html">Gerenciador de Tarefas</a>
      <a href="/informatica/saude.html">Saúde do Computador</a>
      <a href="/informatica/limpezadisco.html">Limpeza de Disco</a>
      <a href="/informatica/verdisco.html">Verificação de Disco</a>
      <a href="/informatica/verarquivos.html">Verificação de Arquivos</a>
      <a href="/informatica/seguranca.html">Modo de Segurança</a>
      <a href="/informatica/restauracao.html">Restauração, Backup e Formatação</a>
      <p>O Sistema Operacional</p>
      <a href="/informatica/raiz.html">A Pasta Raiz</a>
      <a href="/informatica/log.html">Log de Eventos</a>
      <a href="/informatica/servicos.html">Serviços</a>
      <a href="/informatica/drivers.html">Drivers e Dispositivos</a>
      <a href="/informatica/agendador.html">Agendador de Tarefas</a>
      <a href="/informatica/diskmgmt.html">Gerenciamento de Disco</a>
      <a href="/informatica/powershell.html">Microsoft PowerShell</a>
      <a href="/informatica/rede.html">Rede e Compartilhamento</a>
      <p>Próximos Passos</p>
      <a href="/informatica/proximos.html">Próximos passos</a>
      <a href="/informatica/dev.html">Desenvolvimento de Software</a>
      <a href="/informatica/design.html">Design Gráfico</a>
      <a href="/informatica/opensource.html">Software Livre</a>
      <p>O Autor</p>
      <a href="/informatica/oautor.html">O Autor</a>
    </div>
      `;
    }
  }
  customElements.define('side-bar-left', SideLeft);
  





/* 
<div class="js-side-left">
  <a href="/informatica/intro.html">Introdução</a>
  <p>O Computador</p>
  <a href="/informatica/oque.html">O que é um computador</a>
  <a href="/informatica/software.html">Software e Hardware</a>
  <a href="/informatica/gabinete.html">Gabinete e Periféricos</a>
  <a href="/informatica/processador.html">Processador</a>
  <a href="/informatica/placamae.html">Placa Mãe</a>
  <a href="/informatica/discorigido.html">Disco Rígido e Disco Sólido</a>
  <a href="/informatica/memoriaram.html">Memória RAM</a>
  <p>Introdução ao Windows</p>
  <a href="/informatica/umpouco.html">Um pouco de História</a>
  <a href="/informatica/oconceito.html">O Conceito de Janela</a>
  <a href="/informatica/areatrabalho.html">Área de Trabalho</a>
  <a href="/informatica/mouse.html">Mouse</a>
  <a href="/informatica/barratarefas.html">Barra de Tarefas e Menu Iniciar</a>
  <a href="/informatica/configuracoes.html">Configurações do Windows</a>
  <a href="/informatica/explorador.html">Explorador de Arquivos</a>
  <a href="/informatica/teclado.html">Teclado</a>
  <a href="/informatica/unidades.html">Unidades de Armazenamento</a>
  <a href="/informatica/acessorios.html">Acessórios do Windows</a>
  <a href="/informatica/manipulando.html">Manipulando Textos</a>
  <p>Introdução à Internet</p>
  <a href="/informatica/msedge.html">Microsoft Edge</a>
  <a href="/informatica/pesquisa.html">Pesquisa na Web</a>
  <a href="/informatica/downloadarquivos.html">Download de Arquivos</a>
  <a href="/informatica/downloadapps.html">Download de Aplicativos e Programas</a>
  <a href="/informatica/google.html">Google</a>
  <a href="/informatica/msaccount.html">Conta Microsoft</a>
  <a href="/informatica/sitesuteis.html">Sites Úteis</a>
  <a href="/informatica/cachecookies.html">Cache e Cookies</a>
  <p>Introdução ao Office</p>
  <a href="/informatica/msword.html">Microsoft Word</a>
  <a href="/informatica/mspowerpoint.html">Microsoft PowerPoint</a>
  <a href="/informatica/msexcel.html">Microsoft Excel</a>
  <a href="/informatica/mspublisher.html">Microsoft Publisher</a>
  <p>Introdução à Informática Avançada</p>
  <a href="/informatica/esteja.html">Esteja protegido</a>
  <a href="/informatica/senhas.html">Senhas</a>
  <a href="/informatica/nuvem.html">Serviços de Nuvem</a>
  <a href="/informatica/instalacao.html">Instalação e Desinstalação de Aplicativos</a>
  <a href="/informatica/msdefender.html">Microsoft Defender</a>
  <a href="/informatica/taskmgr.html">Gerenciador de Tarefas</a>
  <a href="/informatica/saude.html">Saúde do Computador</a>
  <a href="/informatica/limpezadisco.html">Limpeza de Disco</a>
  <a href="/informatica/verdisco.html">Verificação de Disco</a>
  <a href="/informatica/verarquivos.html">Verificação de Arquivos</a>
  <a href="/informatica/seguranca.html">Modo de Segurança</a>
  <a href="/informatica/restauracao.html">Restauração, Backup e Formatação</a>
  <p>O Sistema Operacional</p>
  <a href="/informatica/raiz.html">A Pasta Raiz</a>
  <a href="/informatica/log.html">Log de Eventos</a>
  <a href="/informatica/servicos.html">Serviços</a>
  <a href="/informatica/drivers.html">Drivers e Dispositivos</a>
  <a href="/informatica/agendador.html">Agendador de Tarefas</a>
  <a href="/informatica/diskmgmt.html">Gerenciamento de Disco</a>
  <a href="/informatica/powershell.html">Microsoft PowerShell</a>
  <a href="/informatica/rede.html">Rede e Compartilhamento</a>
  <p>Próximos Passos</p>
  <a href="/informatica/proximos.html">Próximos passos</a>
  <a href="/informatica/dev.html">Desenvolvimento de Software</a>
  <a href="/informatica/design.html">Design Gráfico</a>
  <a href="/informatica/opensource.html">Software Livre</a>
  <p>O Autor</p>
  <a href="/informatica/oautor.html">O Autor</a>
</div>
 */

