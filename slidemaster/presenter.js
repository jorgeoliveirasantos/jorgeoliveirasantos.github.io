async function initPresenter() {
    document.title = "Apresentador | SlideMaster";
    document.body.classList.add("presenter-mode");

    while (document.body.firstChild) {
        document.body.firstChild.remove();
    }
    //
    const presenterContainer = createPresenterContainer();
    const mediaElements = createMediaElements();
    // Renderiza os contêineres:
    document.body.appendChild(presenterContainer);
    document.body.appendChild(mediaElements);
}

function createPresenterContainer() {
    const presenterContainer = document.createElement("div");
    presenterContainer.classList.add("presenter-container");
    // Menu lateral (miniaturas):
    const sideBar = document.createElement("div");
    sideBar.classList.add("presenter-sidebar");
    sideBar.id = "presenterSidebar";
    const thumbs = document.createElement("div");
    thumbs.classList.add("slides-thumbnails");
    thumbs.id = "slidesThumbnails";
    sideBar.appendChild(thumbs);
    // Conteúdo principal:
    const mainContent = document.createElement("div");
    mainContent.classList.add("presenter-main");
    // Controles:
    const controls = document.createElement("div");
    controls.classList.add("presenter-controls");
    const backButton = document.createElement("button");
    backButton.classList.add("btn-icon");
    backButton.addEventListener("click", () => {
        window.location.href = "https://jorgesouza.com.br/slidemaster/";
    });
    const backButtonIcon = document.createElement("i");
    backButtonIcon.classList.add("fas", "fa-times");
    backButton.appendChild(backButtonIcon);
    controls.appendChild(backButton);
    const presentationInfo = document.createElement("div");
    presentationInfo.classList.add("presentation-info");
    const presentationInfoSpan1 = document.createElement("span");
    presentationInfoSpan1.id = "currentSlideNumber";
    presentationInfoSpan1.textContent = "0 / 0";
    const presentationInfoSpan2 = document.createElement("span");
    presentationInfoSpan2.id = "presentationTitle";
    presentationInfoSpan2.textContent = "Carregando...";
    presentationInfo.appendChild(presentationInfoSpan1);
    presentationInfo.appendChild(presentationInfoSpan2);
    controls.appendChild(presentationInfo);
    const controlButtons = document.createElement("div");
    controlButtons.classList.add("control-buttons");
    const btn1 = document.createElement("button");
    btn1.classList.add("btn-icon");
    btn1.id = "togglePresenterNote";
    const btn1Icon = document.createElement("i");
    btn1Icon.classList.add("fas", "fa-sticky-note");
    btn1.appendChild(btn1Icon);
    const btn2 = document.createElement("button");
    btn2.classList.add("btn-icon");
    btn2.id = "toggleFullscreen";
    const btn2Icon = document.createElement("i");
    btn2Icon.classList.add("fas", "fa-expand");
    btn2.appendChild(btn2Icon);
    const btn3 = document.createElement("button");
    btn3.classList.add("btn-icon");
    btn3.id = "prevSlide";
    const btn3Icon = document.createElement("i");
    btn3Icon.classList.add("fas", "fa-chevron-left");
    btn3.appendChild(btn3Icon);
    const btn4 = document.createElement("button");
    btn4.classList.add("btn-icon");
    btn4.id = "nextSlide";
    const btn4Icon = document.createElement("i");
    btn4Icon.classList.add("fas", "fa-chevron-right");
    btn4.appendChild(btn4Icon);
    controlButtons.appendChild(btn1);
    controlButtons.appendChild(btn2);
    controlButtons.appendChild(btn3);
    controlButtons.appendChild(btn4);
    controls.appendChild(controlButtons);
    // Display:
    const display = document.createElement("div");
    display.classList.add("slide-display-area");
    const slideContainer = document.createElement("div");
    slideContainer.classList.add("slide-container");
    slideContainer.id = "slideContainer";
    // Slide será renderizado aqui:
    const slideContent = document.createElement("div");
    slideContent.classList.add("slide-content");
    const slideHeader = document.createElement("div");
    slideHeader.classList.add("slide-header");
    const slideTitle = document.createElement("h1");
    slideTitle.classList.add("slide-title");
    slideTitle.textContent = "Carregando apresentação...";
    slideHeader.appendChild(slideTitle);
    slideContent.appendChild(slideHeader);
    slideContainer.appendChild(slideContent);
    display.appendChild(slideContainer);
    // Nota do apresentador:
    const presenterNoteContainer = document.createElement("div");
    presenterNoteContainer.classList.add("presenter-note-container");
    presenterNoteContainer.id = "presenterNoteContainer";

    const presenterNoteHeader = document.createElement("div");
    presenterNoteHeader.classList.add("presenter-note-header");

    const presenterNoteHeaderTitle = document.createElement("h4");
    presenterNoteHeaderTitle.innerHTML = '<i class="fas fa-sticky-note"></i> Nota do Apresentador';

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-icon", "close-note");
    closeButton.innerHTML = '<i class="fas fa-times"></i>';

    presenterNoteHeader.appendChild(presenterNoteHeaderTitle);
    presenterNoteHeader.appendChild(closeButton);  // ← Adiciona o botão

    const presenterNoteContent = document.createElement("div");
    presenterNoteContent.classList.add("presenter-note-content");
    presenterNoteContent.id = "presenterNoteContent";

    presenterNoteContainer.appendChild(presenterNoteHeader);
    presenterNoteContainer.appendChild(presenterNoteContent);
    display.appendChild(presenterNoteContainer);

    // Media controls:
    const mediaControls = document.createElement("div");
    mediaControls.classList.add("media-controls");
    mediaControls.id = "mediaControls";
    mediaControls.style.display = "none";

    const playPauseMedia = document.createElement("button");
    playPauseMedia.id = "playPauseMedia";
    playPauseMedia.classList.add("btn-icon");
    playPauseMedia.innerHTML = '<i class="fas fa-play"></i>';

    const mediaSeek = document.createElement("input");
    mediaSeek.id = "mediaSeek";
    mediaSeek.type = "range";
    mediaSeek.min = "0";
    mediaSeek.max = "100";
    mediaSeek.value = "0";

    const mediaTime = document.createElement("span");
    mediaTime.id = "mediaTime";
    mediaTime.textContent = "0:00 / 0:00";

    mediaControls.appendChild(playPauseMedia);
    mediaControls.appendChild(mediaSeek);
    mediaControls.appendChild(mediaTime);

    // Adicionar elementos ao contêiner:
    mainContent.appendChild(controls);
    mainContent.appendChild(display);
    mainContent.appendChild(mediaControls);
    presenterContainer.appendChild(sideBar);
    presenterContainer.appendChild(mainContent);
    //
    return presenterContainer;
}

function createMediaElements() {
    const mediaElements = document.createElement("div");
    mediaElements.id = "mediaElements";
    mediaElements.style.display = "none";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.id = "audioPlayer";
    const video = document.createElement("video");
    video.controls = true;
    video.id = "videoPlayer";
    mediaElements.appendChild(audio);
    mediaElements.appendChild(video);
    return mediaElements;
}

function presenter(presentationId) {
    initPresenter();

    // Variáveis
    let presenter = null;
    let currentSlide = null;
    let slides = [];

    // Elementos DOM
    const slideContainer = document.getElementById('slideContainer');
    const presenterNoteContainer = document.getElementById('presenterNoteContainer');
    const presenterNoteContent = document.getElementById('presenterNoteContent');
    const currentSlideNumber = document.getElementById('currentSlideNumber');
    const presentationTitle = document.getElementById('presentationTitle');
    const slidesThumbnails = document.getElementById('slidesThumbnails');
    const togglePresenterNote = document.getElementById('togglePresenterNote');
    const toggleFullscreen = document.getElementById('toggleFullscreen');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const presenterSidebar = document.getElementById('presenterSidebar');
    const mediaControls = document.getElementById('mediaControls');
    const playPauseMedia = document.getElementById('playPauseMedia');
    const mediaSeek = document.getElementById('mediaSeek');
    const mediaTime = document.getElementById('mediaTime');
    const audioPlayer = document.getElementById('audioPlayer');
    const videoPlayer = document.getElementById('videoPlayer');

    // Inicializar apresentador
    function init() {
        presenter = new SlidePresenter(presentationId);
        const pm = new PresentationManager();
        const presentation = pm.getPresentation(presentationId);

        slides = presenter.sm.getSlides();
        presentationTitle.textContent = presentation.title;

        // Carregar slide atual
        updateSlideDisplay();

        // Carregar miniaturas
        loadThumbnails();

        // Configurar event listeners para controles
        setupEventListeners();

        // Configurar event listeners para eventos customizados
        document.addEventListener('slideChanged', (e) => {
            currentSlide = e.detail.slide;
            updateSlideDisplay();
            updateThumbnailSelection(e.detail.index);
        });
    }

    // Atualizar display do slide
    function updateSlideDisplay() {
        const slide = presenter.getCurrentSlide();
        if (!slide) return;

        currentSlideNumber.textContent = `${presenter.currentSlideIndex + 1} / ${slides.length}`;

        // Renderizar slide
        renderSlide(slide);

        // Atualizar nota do apresentador
        presenterNoteContent.textContent = slide.presenterNote || 'Sem nota do apresentador';

        // Configurar controles de mídia
        setupMediaControls(slide);

        // Atualizar estado do botão de nota
        if (presenter.showPresenterNote) {
            presenterNoteContainer.classList.add('active');
        } else {
            presenterNoteContainer.classList.remove('active');
        }
    }

    // Renderizar slide
    function renderSlide(slide) {
        const hasMedia = slide.mediaType !== 'none' && slide.media;
        const twoColumn = hasMedia && (slide.mediaType == 'image' || slide.mediaType == 'video');

        let mediaHtml = '';
        let mediaElement = null;

        if (hasMedia) {
            switch (slide.mediaType) {
                case 'image':
                    mediaHtml = `<div class="slide-media"><img id="midiaElement" src="${slide.media}" alt="${slide.title}"></div>`;
                    window.addEventListener("keydown", e => {
                        if (e.key == " ") {
                            if (document.fullscreenElement == null) {
                                document.getElementById("midiaElement").requestFullscreen();
                            } else if (document.fullscreenElement.id == "midiaElement") {
                                document.exitFullscreen();
                            } else {
                                document.getElementById("midiaElement").requestFullscreen();
                            }
                        }
                    });
                    break;
                case 'video':
                    mediaHtml = `
                                <div class="slide-media">
                                    <video id="currentVideo" src="${slide.media}" controls></video>
                                </div>
                            `;
                    window.addEventListener("keydown", e => {
                        if (e.key == " ") {
                            if (document.getElementById("currentVideo")) {
                                if (document.getElementById("currentVideo").paused) {
                                    document.getElementById("currentVideo").play();
                                    document.getElementById("currentVideo").requestFullscreen();
                                } else {
                                    document.getElementById("currentVideo").pause();
                                }
                            }
                        }
                    });
                    break;
                case 'audio':
                    mediaHtml = `
                                <div class="slide-media" style="display: none;">
                                    <audio id="currentAudio" src="${slide.media}"></audio>
                                </div>
                            `;
                    window.addEventListener("keydown", e => {
                        if (e.key == " ") {
                            if (document.getElementById("currentAudio")) {
                                if (document.getElementById("currentAudio").paused) {
                                    document.getElementById("currentAudio").play();
                                } else {
                                    document.getElementById("currentAudio").pause();
                                }
                            }
                        }
                    });
                    break;
            }
            // Configurar elemento de mídia se existir
            if (mediaElement) {
                presenter.setMediaElement(mediaElement);
            } else {
                presenter.setMediaElement(null);
            }
        }

        let contentHtml = '';
        if (slide.content) {
            switch (slide.contentType) {
                case 'paragraph':
                    contentHtml = `<div class="slide-text paragraph">${slide.content}</div>`;
                    break;
                case 'bullet-list':
                    const bullets = slide.content.split('\n').filter(line => line.trim());
                    contentHtml = `
                                <div class="slide-text bullet-list">
                                    <ul>
                                        ${bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                                    </ul>
                                </div>
                            `;
                    break;
                case 'numbered-list':
                    const numbers = slide.content.split('\n').filter(line => line.trim());
                    contentHtml = `
                                <div class="slide-text numbered-list">
                                    <ol>
                                        ${numbers.map(number => `<li>${number}</li>`).join('')}
                                    </ol>
                                </div>
                            `;
                    break;
            }
        }

        const slideHtml = `
                    <div class="slide-header">
                        ${slide.title ? `<h1 class="slide-title">${slide.title}</h1>` : ''}
                        ${slide.subtitle ? `<h2 class="slide-subtitle">${slide.subtitle}</h2>` : ''}
                        ${slide.comment ? `<p class="slide-comment">${slide.comment}</p>` : ''}
                    </div>
                    <div class="${twoColumn ? "slide-content two-column" : "slide-content"}"">
                        <div class="slide-body">
                            ${twoColumn ? `
                                <div class="column text-column">
                                    ${contentHtml}
                                </div>
                                ` : `
                                ${mediaHtml}
                                ${contentHtml}
                                `}
                        </div>
                        <div class="column media-column">
                            ${mediaHtml}
                        </div>
                    </div>
                `;

        slideContainer.innerHTML = slideHtml;

    }

    // Configurar controles de mídia
    function setupMediaControls(slide) {
        if (slide.mediaType == 'audio') {
            mediaControls.style.display = 'flex';

            const mediaElement = slide.mediaType == 'audio' ?
                document.getElementById('currentAudio') :
                document.getElementById('currentVideo');

            if (mediaElement) {
                // Atualizar tempo
                mediaElement.addEventListener('timeupdate', () => {
                    const currentTime = mediaElement.currentTime;
                    const duration = mediaElement.duration || 0;
                    mediaSeek.value = duration ? (currentTime / duration) * 100 : 0;

                    const formatTime = (seconds) => {
                        const mins = Math.floor(seconds / 60);
                        const secs = Math.floor(seconds % 60);
                        return `${mins}:${secs.toString().padStart(2, '0')}`;
                    };

                    mediaTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
                });

                // Atualizar botão play/pause
                mediaElement.addEventListener('play', () => {
                    playPauseMedia.innerHTML = '<i class="fas fa-pause"></i>';
                });

                mediaElement.addEventListener('pause', () => {
                    playPauseMedia.innerHTML = '<i class="fas fa-play"></i>';
                });

                // Controlar seek
                mediaSeek.addEventListener('input', (e) => {
                    if (mediaElement.duration) {
                        mediaElement.currentTime = (e.target.value / 100) * mediaElement.duration;
                    }
                });

                // Botão play/pause
                playPauseMedia.addEventListener('click', () => {
                    if (mediaElement.paused) {
                        mediaElement.play();
                    } else {
                        mediaElement.pause();
                    }
                });
            }
        } else {
            mediaControls.style.display = 'none';
        }
    }

    // Carregar miniaturas
    function loadThumbnails() {
        slidesThumbnails.innerHTML = '';

        slides.forEach((slide, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'slide-thumbnail';
            if (index == presenter.currentSlideIndex) {
                thumbnail.classList.add('active');
            }

            thumbnail.innerHTML = `
                        <span class="thumbnail-number">${index + 1}</span>
                        <div class="thumbnail-content">
                            <h4>${slide.title || 'Slide ' + (index + 1)}</h4>
                            ${slide.subtitle ? `<p>${slide.subtitle.substring(0, 30)}${slide.subtitle.length > 30 ? '...' : ''}</p>` : ''}
                        </div>
                    `;

            thumbnail.addEventListener('click', () => {
                presenter.goToSlide(index);
            });

            slidesThumbnails.appendChild(thumbnail);
        });
    }

    // Atualizar seleção da miniatura
    function updateThumbnailSelection(index) {
        document.querySelectorAll('.slide-thumbnail').forEach((thumb, i) => {
            if (i == index) {
                thumb.classList.add('active');
                // Rolagem suave para a miniatura ativa
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Navegação
        prevSlide.addEventListener('click', () => presenter.previousSlide());
        nextSlide.addEventListener('click', () => presenter.nextSlide());

        // Nota do apresentador
        togglePresenterNote.addEventListener('click', () => presenter.togglePresenterNote());
        presenterNoteContainer.querySelector('.close-note').addEventListener('click', () => {
            presenter.showPresenterNote = false;
            presenterNoteContainer.classList.remove('active');
        });

        // Tela cheia
        toggleFullscreen.addEventListener('click', () => presenter.toggleFullscreen());

        // Detectar mudança de tela cheia
        document.addEventListener('fullscreenchange', () => {
            presenter.isFullscreen = !!document.fullscreenElement;
        });
    }

    // Inicializar
    init();

    // Atalhos de teclado já são gerenciados pela classe SlidePresenter
    document.documentElement.requestFullscreen().catch(console.log);
}