// ============================================
// APRESENTAÇÕES - GESTÃO PRINCIPAL
// ============================================

class PresentationManager {
  constructor() {
    this.currentPresentationId = null;
    this.init();
  }

  // Inicializar
  init() { }

  // Obter apresentação por ID
  getPresentation(id) {
    return presentations.find(p => p.id == id) || null;
  }

  // Criar nova apresentação
  createPresentation(title = 'Nova Apresentação', description = '') { }

  // Atualizar apresentação
  updatePresentation(id, updates) { }

  // Excluir apresentação
  deletePresentation(id) { }

  // Importar apresentação de JSON
  importPresentationFromJSON(jsonString) {
    // Este é o novo código em Node.js:
    try {
      const data = JSON.parse(jsonString);
      // Se for uma array de slides, criar nova apresentação
      if (Array.isArray(data)) {
        const newPresentation = {
          id: Date.now(),
          title: 'Apresentação Importada',
          description: 'Importada de arquivo JSON',
          createdAt: new Date().toISOString(),
          slides: data.map((slide, index) => ({
            id: slide.id || Date.now() + index + Math.trunc(Math.random() * 1000),
            title: slide.title || `Slide ${index + 1}`,
            subtitle: slide.subtitle || '',
            comment: slide.comment || '',
            presenterNote: slide.presenterNote || '',
            contentType: slide.contentType || 'paragraph',
            mediaType: slide.mediaType || 'none',
            media: slide.media || '',
            content: slide.content || '',
            createdAt: slide.createdAt || new Date().toISOString()
          }))
        };
        this.updatePresentation(newPresentation.id, newPresentation);
        return newPresentation;
      }
      // Se for uma apresentação completa
      else if (data.slides && Array.isArray(data.slides)) {
        const newPresentation = {
          id: data.id || Date.now(),
          title: data.title || 'Apresentação Importada',
          description: data.description || 'Importada de arquivo JSON',
          createdAt: data.createdAt || new Date().toISOString(),
          slides: data.slides.map(slide => ({
            id: slide.id || Date.now() + Math.trunc(Math.random() * 1000),
            title: slide.title || '',
            subtitle: slide.subtitle || '',
            comment: slide.comment || '',
            presenterNote: slide.presenterNote || '',
            contentType: slide.contentType || 'paragraph',
            mediaType: slide.mediaType || 'none',
            media: slide.media || '',
            content: slide.content || '',
            createdAt: slide.createdAt || new Date().toISOString()
          }))
        };
        this.updatePresentation(newPresentation.id, newPresentation);
        return newPresentation;
      }
      throw new Error('Formato JSON inválido');
    } catch (error) {
      console.error('Erro ao importar apresentação:', error);
      return null;
    }
  }

  // Exportar apresentação para JSON
  exportPresentationToJSON(id) {
    const presentation = this.getPresentation(id);
    return presentation ? JSON.stringify(presentation, null, 2) : null;
  }

  // Salvar apresentação em arquivo JSON
  downloadPresentation(id) {
    const json = this.exportPresentationToJSON(id);
    if (!json) return false;

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const presentation = this.getPresentation(id);

    a.href = url;
    a.download = `${presentation.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  }
}

// ============================================
// SLIDES - GESTÃO
// ============================================

class SlideManager {
  constructor(presentationId) {
    this.presentationId = presentationId;
    this.pm = new PresentationManager();
    this.currentSlideId = null;
  }

  // Obter todos os slides da apresentação
  getSlides() {
    const presentation = this.pm.getPresentation(this.presentationId);
    return presentation ? presentation.slides : [];
  }

  // Criar slide vazio
  createEmptySlide() {
    return {
      id: Date.now() + Math.random(),
      title: 'Novo Slide',
      subtitle: '',
      comment: '',
      presenterNote: '',
      contentType: 'paragraph',
      mediaType: 'none',
      media: '',
      content: '',
      createdAt: new Date().toISOString()
    };
  }

  // Adicionar novo slide
  addSlide(slideData = null, position = null) {
    const presentation = this.pm.getPresentation(this.presentationId);
    if (!presentation) return null;

    let newSlide;
    if (slideData) {
      // Garantir que o slide tenha um ID único
      newSlide = {
        ...slideData,
        id: slideData.id || Date.now() + Math.random(),
        createdAt: slideData.createdAt || new Date().toISOString()
      };
    } else {
      newSlide = this.createEmptySlide();
    }

    const slides = presentation.slides;

    if (position !== null && position >= 0 && position <= slides.length) {
      slides.splice(position, 0, newSlide);
    } else {
      slides.push(newSlide);
    }

    this.pm.updatePresentation(this.presentationId, { slides });
    return newSlide;
  }

  // Atualizar slide
  updateSlide(slideId, updates) {
    const presentation = this.pm.getPresentation(this.presentationId);
    if (!presentation) return false;

    const slideIndex = presentation.slides.findIndex(s => s.id == slideId);
    if (slideIndex == -1) return false;

    presentation.slides[slideIndex] = {
      ...presentation.slides[slideIndex],
      ...updates,
      // Garantir que o ID não seja alterado
      id: slideId
    };

    return this.pm.updatePresentation(this.presentationId, { slides: presentation.slides });
  }

  // Remover slide
  removeSlide(slideId) {
    const presentation = this.pm.getPresentation(this.presentationId);
    if (!presentation) return false;

    const filteredSlides = presentation.slides.filter(s => s.id !== slideId);
    return this.pm.updatePresentation(this.presentationId, { slides: filteredSlides });
  }

  // Reordenar slides
  reorderSlides(fromIndex, toIndex) {
    const presentation = this.pm.getPresentation(this.presentationId);
    if (!presentation) return false;

    const slides = [...presentation.slides];
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);

    return this.pm.updatePresentation(this.presentationId, { slides });
  }

  // Obter slide por ID
  getSlide(slideId) {
    const slides = this.getSlides();
    return slides.find(s => s.id == slideId) || null;
  }

  // Mover slide para cima/baixo
  moveSlide(slideId, direction) {
    const slides = this.getSlides();
    const currentIndex = slides.findIndex(s => s.id == slideId);

    if (currentIndex == -1) return false;

    let newIndex;
    if (direction == 'up' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction == 'down' && currentIndex < slides.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return false;
    }

    return this.reorderSlides(currentIndex, newIndex);
  }
}

// ============================================
// APRESENTADOR DE SLIDES
// ============================================

class SlidePresenter {
  constructor(presentationId) {
    this.presentationId = presentationId;
    this.sm = new SlideManager(presentationId);
    this.currentSlideIndex = 0;
    this.isFullscreen = false;
    this.showPresenterNote = false;
    this.isPlaying = false;
    this.audioVideoElement = null;

    this.initKeyboardShortcuts();
  }

  // Inicializar atalhos de teclado
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return;

      switch (e.key) {
        case 'i':
        case 'I':
          this.togglePresenterNote();
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          break;
        case 'Escape':
          this.exitToSlideList();
          break;
        case 'ArrowRight':
        case 'PageDown':
          this.nextSlide();
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          this.previousSlide();
          e.preventDefault();
          break;
      }
    });
  }

  // Obter slide atual
  getCurrentSlide() {
    const slides = this.sm.getSlides();
    return slides[this.currentSlideIndex] || null;
  }

  // Ir para slide específico
  goToSlide(index) {
    const slides = this.sm.getSlides();
    if (index >= 0 && index < slides.length) {
      this.currentSlideIndex = index;
      this.updateDisplay();
      return true;
    }
    return false;
  }

  // Próximo slide
  nextSlide() {
    const slides = this.sm.getSlides();
    if (this.currentSlideIndex < slides.length - 1) {
      this.currentSlideIndex++;
      this.updateDisplay();
      return true;
    }
    return false;
  }

  // Slide anterior
  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.updateDisplay();
      return true;
    }
    return false;
  }

  // Alternar nota do apresentador
  togglePresenterNote() {
    this.showPresenterNote = !this.showPresenterNote;
    this.updateDisplay();
  }

  // Alternar tela cheia
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.log);
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  // Sair para lista de slides
  exitToSlideList() {
    // Navegação será tratada pelo AppManager
    window.location.href = `presentation.html?presentationId=${this.presentationId}`;
  }

  // Atualizar display do slide
  updateDisplay() {
    // Esta função será implementada no HTML específico
    // Disparar evento customizado para atualizar a UI
    const event = new CustomEvent('slideChanged', {
      detail: {
        slide: this.getCurrentSlide(),
        index: this.currentSlideIndex,
        total: this.sm.getSlides().length,
        showPresenterNote: this.showPresenterNote
      }
    });
    document.dispatchEvent(event);
  }

  // Configurar elemento de mídia
  setMediaElement(element) {
    this.audioVideoElement = element;
    if (element) {
      element.addEventListener('play', () => this.isPlaying = true);
      element.addEventListener('pause', () => this.isPlaying = false);
      element.addEventListener('ended', () => this.isPlaying = false);
    }
  }
}

// ============================================
// GESTOR DE NAVEGAÇÃO E APLICAÇÃO
// ============================================

class AppManager {
  constructor() {
    this.currentPage = null;
    this.currentPresentationId = null;
    this.currentSlideId = null;
    this.init();
  }

  init() {
    // Inicializar gestor de apresentações
    this.pm = new PresentationManager();

    // Verificar parâmetros da URL
    this.parseUrlParams();

    // Configurar listeners de navegação
    this.setupNavigationListeners();
  }

  // Analisar parâmetros da URL
  parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('presentationId')) {
      this.currentPresentationId = parseInt(urlParams.get('presentationId'));
    }

    if (urlParams.has('slideId')) {
      this.currentSlideId = urlParams.get('slideId');
    }
  }

  // Configurar listeners de navegação
  setupNavigationListeners() {
    // Interceptar cliques em links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-navigation]');
      if (link) {
        e.preventDefault();
        const page = link.getAttribute('href');
        const presentationId = link.dataset.presentationId;
        const slideId = link.dataset.slideId;

        this.navigateTo(page, {
          presentationId,
          slideId
        });
      }
    });

    // Lidar com botões voltar/avançar
    window.addEventListener('popstate', (e) => {
      this.handlePopState(e.state);
    });
  }

  // Navegar para página específica
  static navigateTo(page, params = {}) {
    const url = new URL(page, window.location.origin);

    if (params.id) {
      url.searchParams.set('presentationId', params.id);
    }

    if (params.slideId) {
      url.searchParams.set('slideId', params.slideId);
    }

    window.location.href = url.toString();
  }

  // Lidar com alterações no histórico
  handlePopState(state) {
    if (state) {
      this.currentPresentationId = state.presentationId;
      this.currentSlideId = state.slideId;
      this.loadPageContent();
    }
  }

  // Carregar conteúdo da página
  loadPageContent() {
    // Esta função será expandida nas páginas HTML específicas
    console.log('Carregando conteúdo para:', window.location.pathname);
  }

  // Abrir apresentação do arquivo JSON
  openPresentationFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const jsonString = e.target.result;
        const presentation = this.pm.importPresentationFromJSON(jsonString);

        if (presentation) {
          resolve(presentation);
        } else {
          reject(new Error('Falha ao importar apresentação'));
        }
      };

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  }

  // Criar nova apresentação
  createNewPresentation(title, description) {
    const presentation = this.pm.createPresentation(title, description);
    if (presentation) {
      this.currentPresentationId = presentation.id;
      return presentation;
    }
    return null;
  }

  // Obter apresentação atual
  getCurrentPresentation() {
    return this.pm.getPresentation(this.currentPresentationId);
  }

  // Obter slide atual
  getCurrentSlide() {
    if (!this.currentPresentationId || !this.currentSlideId) return null;
    const sm = new SlideManager(this.currentPresentationId);
    return sm.getSlide(this.currentSlideId);
  }
}

// ============================================
// EDITOR DE SLIDES - FORMULÁRIO
// ============================================

class SlideEditor {
  constructor(presentationId, slideId = null) {
    this.presentationId = presentationId;
    this.slideId = slideId;
    this.sm = new SlideManager(presentationId);
    this.currentSlide = slideId ? this.sm.getSlide(slideId) : null;
    this.formElement = null;
  }

  // Preencher formulário com dados do slide
  populateForm(slide) {
    if (!this.formElement || !slide) return;

    const fields = [
      'title', 'subtitle', 'comment', 'presenterNote',
      'contentType', 'mediaType', 'media', 'content'
    ];

    fields.forEach(field => {
      const input = this.formElement.querySelector(`[name="${field}"]`);
      if (input) {
        if (input.type == 'radio') {
          const radio = this.formElement.querySelector(`[name="${field}"][value="${slide[field] || ''}"]`);
          if (radio) radio.checked = true;
        } else {
          input.value = slide[field] || '';
        }
      }
    });

    // Atualizar visualização em tempo real
    this.updatePreview();
  }

  // Limpar formulário
  clearForm() {
    if (!this.formElement) return;

    const defaultSlide = this.sm.createEmptySlide();
    this.populateForm(defaultSlide);
  }

  // Configurar listeners do formulário
  setupFormListeners() {
    if (!this.formElement) return;

    // Atualizar preview em tempo real
    this.formElement.addEventListener('input', () => this.updatePreview());

    // Salvar slide
    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveSlide();
    });
  }

  // Obter dados do formulário
  getFormData() {
    if (!this.formElement) return null;

    const formData = new FormData(this.formElement);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    return data;
  }

  // Salvar slide
  saveSlide(formData) {
    if (!formData) return false;

    if (this.currentSlide) {
      // Atualizar slide existente
      const success = this.sm.updateSlide(this.currentSlide.id, formData);
      if (success) {
        this.showMessage('Slide atualizado com sucesso!', 'success');
        // Atualizar o slide atual com os novos dados
        this.currentSlide = { ...this.currentSlide, ...formData };
      }
      return success;
    } else {
      // Criar novo slide
      const newSlide = this.sm.addSlide(formData);
      if (newSlide) {
        this.currentSlide = newSlide;
        this.slideId = newSlide.id;
        this.showMessage('Slide criado com sucesso!', 'success');
        return newSlide;
      }
    }

    this.showMessage('Erro ao salvar slide', 'error');
    return false;
  }

  // Atualizar preview do slide
  updatePreview() {
    const formData = this.getFormData();
    if (!formData) return;

    // Disparar evento para atualizar preview
    const event = new CustomEvent('slidePreviewUpdate', {
      detail: formData
    });
    document.dispatchEvent(event);
  }

  // Exibir mensagem
  showMessage(message, type = 'info') {
    // Disparar evento para mostrar mensagem
    const event = new CustomEvent('showMessage', {
      detail: { message, type }
    });
    document.dispatchEvent(event);
  }
}

// ============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================

// Instância global da aplicação
window.App = {
  PresentationManager,
  SlideManager,
  SlidePresenter,
  AppManager,
  SlideEditor,

  init() {
    this.appManager = new AppManager();

    // Inicializar baseado na página atual
    const page = window.location.pathname.split('/').pop();

    switch (page) {
      case 'index.html':
      case '':
        this.initHomePage();
        break;
      case 'presentation.html':
        this.initPresentationPage();
        break;
      case 'presenter.html':
        this.initPresenterPage();
        break;
      case 'editor.html':
        this.initEditorPage();
        break;
    }
  },

  initHomePage() {
    const pm = new PresentationManager();
    // Disparar evento com as apresentações
    document.dispatchEvent(new CustomEvent('presentationsLoaded', {
      detail: presentations
    }));
  },

  initPresentationPage() {
    const appManager = this.appManager;
    const presentation = appManager.getCurrentPresentation();

    if (presentation) {
      const sm = new SlideManager(presentation.id);
      const slides = sm.getSlides();

      document.dispatchEvent(new CustomEvent('presentationLoaded', {
        detail: { presentation, slides }
      }));
    }
  },

  initPresenterPage() {
    const appManager = this.appManager;
    const presentation = appManager.getCurrentPresentation();

    if (presentation) {
      const presenter = new SlidePresenter(presentation.id);
      window.currentPresenter = presenter; // Para acesso global

      document.dispatchEvent(new CustomEvent('presenterInitialized', {
        detail: { presenter }
      }));
    }
  },

  initEditorPage() {
    const appManager = this.appManager;
    const presentation = appManager.getCurrentPresentation();
    const slideId = appManager.currentSlideId;

    if (presentation) {
      const editor = new SlideEditor(presentation.id, slideId);
      window.currentEditor = editor; // Para acesso global

      document.dispatchEvent(new CustomEvent('editorInitialized', {
        detail: { editor }
      }));
    }
  }
};

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});

// Exportar para uso em módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PresentationManager,
    SlideManager,
    SlidePresenter,
    AppManager,
    SlideEditor
  };
}

// Oi?