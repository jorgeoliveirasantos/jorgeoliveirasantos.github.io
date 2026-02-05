///////////////    Este arquivo fornece os componentes para renderização da interface    ///////////////

// main.js
import { Content } from '/lib/acacia/content.js';
import { Renderer, } from '/lib/acacia/renderer.js';

//#region Id Control
export const IdControl = {
    Elements: [],
    Id: {
        AcaciaContainer: 0,
        Tooltip: 0,
        ContextMenu: 0,
        Popover: 0,
        Toast: 0,
        DataGrid: 0,
        Modal: 0
    },
    Type: {
        AcaciaContainer: "ac",
        Tooltip: "tt",
        Context: "cm",
        ProfilePopover: "pp",
        Toast: "ts",
        DataGrid: "dg",
        Modal: "md"
    },
    NextId: (type) => {
        return `${type}-${++IdControl.Id[type]}`;
    }
}
//#endregion

//#region CLASS DEFINITIONS
class AcaciaApp extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const acaciaApp = this;
        const topBar = document.createElement("app-top-bar");
        topBar.id = "top-bar";
        const topBarMenuIcon = document.createElement("img");
        topBarMenuIcon.id = "menu-icon";
        topBarMenuIcon.onclick = Renderer.SideMenu.Show;
        topBarMenuIcon.src = "https://kaatan.azurewebsites.net/files/menu.svg";
        const topBarIconsContainer = document.createElement("icons-container");
        const topBarLogo = document.createElement("img");
        topBarLogo.src = "https://kaatan.azurewebsites.net/files/conjunto_branco.svg"
        topBarLogo.id = "topbar-logo";
        topBarLogo.onclick = async () => window.location.reload();
        topBarIconsContainer.appendChild(topBarLogo);
        topBar.appendChild(topBarIconsContainer);
        topBar.appendChild(topBarMenuIcon);
        acaciaApp.appendChild(topBar);
        //
        const app = document.createElement("app-main");
        app.id = "app";
        const bottomBar = document.createElement("app-bottom-bar");
        bottomBar.id = "bottom-bar";
        acaciaApp.appendChild(app);
        acaciaApp.appendChild(bottomBar);

        const leftBar = document.createElement("left-bar");
        leftBar.id = "left-bar";
        const rightBar = document.createElement("right-bar");
        rightBar.id = "right-bar";
        const appView = document.createElement("app-view");
        appView.id = "app-view";
        app.appendChild(leftBar);
        app.appendChild(appView);
        app.appendChild(rightBar);


        window.ACACIA = acaciaApp;
        window.APP = app;
        window.BOTTOMBAR = bottomBar;
        window.TOPBAR = topBarIconsContainer;
        window.LEFTBAR = leftBar;
        window.RIGHTBAR = rightBar;
        window.APPVIEW = appView;
    }
}

class Accordion extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.querySelectorAll('accordion-item').forEach(item => {
            const title = item.querySelector('accordion-title');
            title.classList.add("elastic");
            const content = item.querySelector('accordion-content');
            content.style.display = 'none';
            item.querySelector('accordion-title').onclick = () => {
                const visible = content.style.display != 'none';
                this.querySelectorAll('accordion-item').forEach(item_ => {
                    item_.querySelector('accordion-content').style.display = 'none';
                });
                this.querySelectorAll('accordion-item').forEach(item_ => {
                    const title_ = item_.querySelector('accordion-title')
                    title_.textContent = title_.textContent.replace("▾", "▸");
                    title_.style.marginLeft = "10px";
                });
                // Se o conteúdo clicado não estava visível, exibe-o:
                if (!visible) {
                    content.style.display = 'block';
                    title.textContent = title.textContent.replace("▸", "▾");
                    title.style.marginLeft = "0px";
                }
            };
        });
    }
}

class CardBig extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.classList.add("elastic");
        this.classList.add("hoverable");
    }
}

class ButtonRounded extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.classList.add("elastic");
    }
}

class ButtonSquared extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.classList.add("elastic");
    }
}

class TxtLink extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let ref = this.getAttribute("href");
        if (ref) {
            let target = this.getAttribute("target");
            this.onclick = e => {
                if (target == "_blank") {
                    window.open(ref);
                } else {
                    window.location.replace(ref);
                }
            }
        }
    }
}

class ToastMini extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (this.getAttribute("autoclose") != null) {
            setTimeout(() => {
                try { document.body.removeChild(this) } catch { }
            }, (Number(this.getAttribute("autoclose")) * 1000));
        }
    }
}

class AppDrawerGroup extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.setAttribute('groupcollapsed', 'false');
    }
}

class GroupTitle extends HTMLElement {
    constructor() {
        super();
        let element = this;
        element.onclick = () => {
            let group = element.parentElement.querySelectorAll("app-drawer-row");
            if (element.parentElement.getAttribute('groupcollapsed') == 'true') {
                group.forEach(el => {
                    el.style.display = 'flex';
                    el.parentElement.setAttribute('groupcollapsed', 'false');
                });
                element.innerHTML = element.innerHTML.replaceAll('▸', '▾');
            } else {
                group.forEach(el => {
                    el.style.display = 'none';
                    el.parentElement.setAttribute('groupcollapsed', 'true');
                });
                element.innerHTML = element.innerHTML.replaceAll('▾', '▸');
            }
            //element = null;
        }
    }
}

class AcaciaSlider extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const range = document.createElement("input");
        range.type = "range";
        range.classList.add("slider-element");
        range.min = this.getAttribute("min");
        range.max = this.getAttribute("max");
        range.step = this.getAttribute("step");
        range.value = this.getAttribute("value");
        range.id = this.getAttribute("id") + "-range";
        range.onchange = e => {
            this.setAttribute("value", range.value);
        }
        this.appendChild(range);
    }
}

class AcaciaProgress extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const bar = document.createElement("progress-bar");
        const value = document.createElement("progress-value");
        bar.style.width = this.getAttribute("value") + "%";
        value.textContent = this.getAttribute("value");
        this.appendChild(bar);
        this.appendChild(value);
    }
}

class ImageGallery extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() { }
}

class AcaciaAudio extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const audio = document.createElement("audio");
        audio.classList.add("audio");
        audio.setAttribute("type", "audio/mp3");
        audio.setAttribute("src", this.getAttribute("src"));
        this.appendChild(audio);

        const playBtn = document.createElement("a");
        playBtn.classList.add("audio-buttons");
        playBtn.innerHTML = "&#9654;";
        this.appendChild(playBtn);

        const sliderTrack = document.createElement("acacia-slider");
        sliderTrack.setAttribute("min", "1");
        sliderTrack.setAttribute("max", "100");
        sliderTrack.setAttribute("value", "1");
        sliderTrack.setAttribute("step", "1");
        this.appendChild(sliderTrack);

        const muteBtn = document.createElement("a");
        muteBtn.classList.add("audio-buttons");
        muteBtn.innerHTML = "🕪";
        this.appendChild(muteBtn);

        const sliderVolume = document.createElement("acacia-slider");
        sliderVolume.setAttribute("min", "0");
        sliderVolume.setAttribute("max", "1");
        sliderVolume.setAttribute("value", "1");
        sliderVolume.setAttribute("step", "0.1");
        this.appendChild(sliderVolume);
        //
        const inputTrack = this.querySelectorAll("input")[0];
        const inputVolume = this.querySelectorAll("input")[1];

        playBtn.onclick = e => {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = '&#9868;';
            } else {
                audio.pause();
                playBtn.innerHTML = '&#9654;';
            }
        };
        audio.addEventListener('ended', () => {
            inputTrack.value = 1;
            playBtn.innerHTML = '&#9654;';
        });
        audio.addEventListener('timeupdate', () => {
            inputTrack.value = (audio.currentTime / audio.duration) * 100;
        });
        inputTrack.addEventListener('input', () => {
            audio.currentTime = Number((inputTrack.value / 100) * audio.duration);
        });
        muteBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteBtn.textContent = audio.muted ? '🕨' : '🕪';
        });
        inputVolume.addEventListener('input', () => {
            audio.volume = inputVolume.value;
        });
    }
}

class AcaciaDesktopApp extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const head = document.querySelector("head");
        const acaciaCSS = document.createElement("style");
        acaciaCSS.setAttribute("rel", "stylesheet");
        acaciaCSS.setAttribute("href", "/lib/acacia/acacia.css");
        head.appendChild(acaciaCSS);
        const favicon = document.createElement("link");
        favicon.setAttribute("rel", "shortcut icon");
        favicon.setAttribute("type", "image/x-icon");
        favicon.setAttribute("href", "https://kaatan.azurewebsites.net/files/ret_branco.svg");
        head.appendChild(favicon);

        const acaciaApp = this;
        const topBar = document.createElement("acacia-top-menu");
        topBar.id = "top-bar";

        const topBarLogo = document.createElement("img");
        topBarLogo.src = "https://kaatan.azurewebsites.net/files/conjunto_branco.svg"
        topBarLogo.id = "topbar-logo";
        topBarLogo.style.margin = "3px 7px";
        topBarLogo.style.height = "24px";
        topBarLogo.style.cursor = "pointer";
        topBarLogo.onclick = async () => window.location.reload();
        topBar.appendChild(topBarLogo);
        acaciaApp.appendChild(topBar);

        const appView = document.createElement("acacia-desktop-main");
        appView.id = "app-view";
        acaciaApp.appendChild(appView);

        const bottomBar = document.createElement("acacia-desktop-footer");
        bottomBar.id = "bottom-bar";
        acaciaApp.appendChild(bottomBar);


        window.ACACIA = acaciaApp;
        window.BOTTOMBAR = bottomBar;
        window.TOPBAR = topBar;
        window.APPVIEW = appView;
    }
}

class AcaciaTopMenu extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Estilo do menu
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                background-color: var(--DarkBlue, #001f3f);
                color: var(--LightGreen, #2ecc40);
                border-bottom: 1px solid var(--MediumBlue, #0074d9);
                padding: 0;
                font-size: 10pt;
            }
        `;

        shadow.appendChild(style);
        const slot = document.createElement('slot');
        shadow.appendChild(slot);
    }
}

class MenuItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Estilo do item do menu
        const style = document.createElement('style');
        style.textContent = `
            :host {
                position: relative;
                padding: 5px 15px;
                user-select: none;
            }
            :host(:hover) {
                background-color: var(--MediumBlue, #0074d9);
            }
        `;

        shadow.appendChild(style);
        const slot = document.createElement('slot');
        shadow.appendChild(slot);
    }
}

class MenuItemDropdown extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Estilo do dropdown
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                background-color: var(--DarkBlue, #001f3f);
                border: 1px solid var(--MediumBlue, #0074d9);
                border-radius: 5px;
                box-shadow: 2px 2px 10px var(--MediumBlue, #0074d9);
                padding: 5px;
                z-index: 2;
            }
        `;

        shadow.appendChild(style);
        const slot = document.createElement('slot');
        shadow.appendChild(slot);
    }
}

class DropdownItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Estilo do item do dropdown
        const style = document.createElement('style');
        style.textContent = `
            :host {
                padding: 5px 15px;
                white-space: nowrap;
                display: block;
                border-radius: 5px;
            }
            :host(:hover) {
                background-color: var(--MediumBlue, #0074d9);
            }
        `;

        shadow.appendChild(style);
        const slot = document.createElement('slot');
        shadow.appendChild(slot);
    }
}

// DEFINITIONS
customElements.define("acacia-app", AcaciaApp);
customElements.define("acacia-accordion", Accordion);
customElements.define("card-big", CardBig);
customElements.define("button-rounded", ButtonRounded);
customElements.define("button-squared", ButtonSquared);
customElements.define("text-link", TxtLink);
customElements.define("toast-mini", ToastMini);;
customElements.define("app-drawer-group", AppDrawerGroup);
customElements.define("group-title", GroupTitle);
customElements.define("acacia-slider", AcaciaSlider);
customElements.define("acacia-progress", AcaciaProgress);
customElements.define("image-gallery", ImageGallery);
customElements.define("acacia-audio", AcaciaAudio);
customElements.define("acacia-desktop-app", AcaciaDesktopApp);
customElements.define('acacia-top-menu', AcaciaTopMenu);
customElements.define('menu-item', MenuItem);
customElements.define('menu-item-dropdown', MenuItemDropdown);
customElements.define('dropdown-item', DropdownItem);
//#endregion

//#region TOOLTIP
export const Tooltip = {
    Tooltip: (txt, element) => {
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.innerText = txt;
        if (document.getElementsByClassName('tooltip').length > 0) {
            document.body.removeChild(document.getElementsByClassName('tooltip')[0]);
        }
        document.body.appendChild(tooltip);

        const x = event.clientX;
        const y = event.clientY;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let left = x + 10;
        let top = y + 10;

        if (left + tooltipWidth > windowWidth) {
            left = x - tooltipWidth - 10;
        }

        if (top + tooltipHeight > windowHeight) {
            top = y - tooltipHeight - 10;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.display = 'block';

        element.addEventListener('mouseout', () => {
            try { document.body.removeChild(tooltip) } catch { }
        });
    },
    Context: (content) => {
        // Creation:
        const contextContainer = document.createElement('span');
        contextContainer.classList.add('context-container');
        // Content setting:
        for (const menu of content) {
            let button = document.createElement("button-squared");
            button.onclick = () => ContextFunc(menu.Action);
            let img = document.createElement("img");
            img.src = menu.Ico;
            let span = document.createElement("span");
            span.innerHTML = menu.Title;
            button.appendChild(img);
            button.appendChild(span);
            contextContainer.appendChild(button);
        }
        //
        const context = document.createElement('span');
        context.classList.add('context');
        context.appendChild(contextContainer);
        // Viewing setting:
        if (document.getElementsByClassName('context').length > 0) {
            document.body.removeChild(
                document.getElementsByClassName('context')[0]
            );
        }

        let cc = document.createElement("div");
        cc.style.position = "fixed";
        cc.style.top = "0";
        cc.style.left = "0";
        cc.style.width = "100%";
        cc.style.height = "100%";
        cc.style.zIndex = "1000";

        cc.appendChild(context);
        document.body.appendChild(cc);
        const x = event.clientX;
        const y = event.clientY;
        const contextWidth = context.offsetWidth;
        const contextHeight = context.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let left = x + 10;
        let top = y + 10;
        if (left + contextWidth > windowWidth) left = x - contextWidth - 10;
        if (top + contextHeight > windowHeight) top = y - contextHeight - 10;
        context.style.left = `${left}px`;
        context.style.top = `${top}px`;
        context.style.display = 'block';

        cc.addEventListener('click', e => {
            // Verifica se o clique foi fora do elemento filho
            if (!context.contains(e.target)) {
                document.body.removeChild(cc);
            }
        });
        function ContextFunc(callback) {
            callback();
            document.body.removeChild(cc);
        }
    },
    ProfilePopover: (user, element) => {
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');

        let tooltipProfile = document.createElement("tooltip-profile");

        let img = document.createElement("img");
        img.src = user["Thumbnail"];
        let tooltipProfilePic = document.createElement("tooltip-profile-pic");
        tooltipProfilePic.appendChild(img);
        tooltipProfile.appendChild(tooltipProfilePic);

        let tooltipProfileName = document.createElement("profile-name");
        tooltipProfileName.innerHTML = user["Name"];
        let tooltipProfileUsername = document.createElement("profile-username");
        tooltipProfileUsername.innerHTML = user["Username"];
        let tooltipProfileData = document.createElement("profile-data");
        tooltipProfileData.appendChild(tooltipProfileName);
        tooltipProfileData.appendChild(tooltipProfileUsername);
        tooltipProfile.appendChild(tooltipProfileData);
        tooltip.appendChild(tooltipProfile);

        if (document.getElementsByClassName('tooltip').length > 0) document.body.removeChild(document.getElementsByClassName('tooltip')[0]);
        document.body.appendChild(tooltip);
        const x = event.clientX;
        const y = event.clientY;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let left = x + 10;
        let top = y + 10;
        if (left + tooltipWidth > windowWidth) left = x - tooltipWidth - 10;
        if (top + tooltipHeight > windowHeight) top = y - tooltipHeight - 10;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.display = 'block';
        element.addEventListener('mouseout', () => { try { document.body.removeChild(tooltip) } catch { } });
    },
    Toast: (txt, close) => {
        try { document.body.removeChild(document.getElementById("toast-mini")) } catch { };
        let off = document.createElement("toast-mini");
        off.id = "toast-mini";
        off.innerHTML = txt;
        if (close) off.setAttribute("autoclose", close);
        document.body.appendChild(off);
    }
}
//#endregion

//#region MODAL
export const Modal = {
    modalId: 0,
    callback: null,
    ESCKey: (e) => {
        if (e.key == "Escape") {
            Modal.Close(Modal.modalId);
            if (Modal.callback != null) Modal.callback();
        }
    },
    Close: (id) => {
        try {
            //let el = document.getElementById("modal-container");
            let el = document.querySelector(`[modal-id=${id}]`);
            document.body.removeChild(el);
            window.removeEventListener("keydown", Modal.ESCKey);
            Modal.modalId--;
        } catch (e) { }
    },

    Waiting: (title, msg, callback = null) => {
        return new Promise(resolve => {
            let modal = document.createElement("div");
            modal.setAttribute("class", "modal-container");
            let id = `modal-id-${++Modal.modalId}`;
            modal.setAttribute("modal-id", id);

            modal.id = "modal-container";
            let box = document.createElement("div");
            box.id = "modal-box";
            modal.appendChild(box);

            let close = document.createElement("span");
            close.id = "modal-close";
            close.innerHTML = "&times;";
            close.onclick = () => {
                Modal.Close(id);
                resolve(false);
                if (callback != null) callback();
            };
            box.appendChild(close);

            let h1 = document.createElement("h1");
            h1.id = "modal-title";
            h1.innerHTML = title;
            box.appendChild(h1);

            let anm = document.createElement("div");
            anm.id = "animation-container";
            let img = document.createElement("img");
            img.setAttribute("src", "/lib/acacia/loading.svg");
            anm.appendChild(img);
            box.appendChild(anm);

            let p = document.createElement("p");
            p.id = "modal-content";
            p.setAttribute("style", "text-align: center; text-indent: 0;");
            p.innerHTML = msg;
            box.appendChild(p);
            document.body.appendChild(modal);

            window.addEventListener("keydown", Modal.ESCKey);
        });
    },

    Message: (title, msg, callback = null) => {
        return new Promise(resolve => {
            let modal = document.createElement("div");
            modal.setAttribute("class", "modal-container");
            modal.id = "modal-container";
            let id = `modal-id-${++Modal.modalId}`;
            modal.setAttribute("modal-id", id);

            let modalBox = document.createElement("div");
            modalBox.setAttribute("id", "modal-box");

            let modalTitle = document.createElement("h1");
            modalTitle.setAttribute("id", "modal-title");
            modalTitle.innerHTML = title;

            let modalContent = document.createElement("p");
            modalContent.setAttribute("id", "modal-content");
            modalContent.innerHTML = msg;

            let modalButtonsContainer = document.createElement("div");
            modalButtonsContainer.setAttribute("id", "modal-buttons-container");

            let confirmButton = document.createElement("button-squared");
            confirmButton.onclick = () => {
                Modal.Close(id);
                resolve(true);
                if (callback != null) callback();
            };
            confirmButton.innerHTML = "Confirmar";

            let span = document.createElement("span");

            modalButtonsContainer.appendChild(span);
            modalButtonsContainer.appendChild(confirmButton);

            modalBox.appendChild(modalTitle);
            modalBox.appendChild(modalContent);
            modalBox.appendChild(modalButtonsContainer);

            modal.appendChild(modalBox);

            document.body.appendChild(modal);
            window.addEventListener("keydown", Modal.ESCKey);
        });
    },

    Error: (title, msg, fatal, callback = null) => {
        return new Promise(resolve => {
            let modal = document.createElement("div");
            modal.setAttribute("class", "modal-container");
            modal.id = "modal-container";
            let id = `modal-id-${++Modal.modalId}`;
            modal.setAttribute("modal-id", id);

            let modalBox = document.createElement("div");
            modalBox.setAttribute("id", "modal-box");

            let modalClose = document.createElement("span");
            modalClose.setAttribute("id", "modal-close");
            modalClose.innerHTML = "&times;";
            modalClose.onclick = () => Modal.Close(id);

            let modalTitle = document.createElement("h1");
            modalTitle.setAttribute("id", "modal-title");
            modalTitle.innerHTML = title;

            let animationContainer = document.createElement("div");
            animationContainer.setAttribute("id", "animation-container");

            let img = document.createElement("img");
            img.setAttribute("src", "/lib/acacia/erro.svg");

            animationContainer.appendChild(img);

            let modalContent = document.createElement("p");
            modalContent.setAttribute("id", "modal-content");
            modalContent.setAttribute("style", "text-align: center; text-indent: 0;");
            modalContent.innerHTML = msg;

            let modalButtonsContainer = document.createElement("div");
            modalButtonsContainer.setAttribute("id", "modal-buttons-container");

            let backButton = document.createElement("button-squared");
            backButton.onclick = () => {
                Modal.Close(id);
                resolve(true);
                if (callback != null) callback();
            };
            backButton.innerHTML = "Voltar";

            let closeButton = document.createElement("button-squared");
            if (fatal) {
                closeButton.onclick = () => window.location.reload();
                closeButton.innerHTML = "Reiniciar aplicação";
            } else {
                closeButton.innerHTML = "Cancelar";
            }

            modalButtonsContainer.appendChild(backButton);
            modalButtonsContainer.appendChild(closeButton);

            modalBox.appendChild(modalClose);
            modalBox.appendChild(modalTitle);
            modalBox.appendChild(animationContainer);
            modalBox.appendChild(modalContent);
            modalBox.appendChild(modalButtonsContainer);

            modal.appendChild(modalBox);

            document.body.appendChild(modal);
            window.addEventListener("keydown", Modal.ESCKey);
        });
    },
    /** @description The action callback is always called */
    Confirm: (title, msg, callback = null) => {
        return new Promise(resolve => {
            let modal = document.createElement("div");
            modal.setAttribute("class", "modal-container");
            modal.id = "modal-container";
            let id = `modal-id-${++Modal.modalId}`;
            modal.setAttribute("modal-id", id);

            let modalBox = document.createElement("div");
            modalBox.setAttribute("id", "modal-box");

            let modalTitle = document.createElement("h1");
            modalTitle.setAttribute("id", "modal-title");
            modalTitle.innerHTML = title;

            let modalContent = document.createElement("p");
            modalContent.setAttribute("id", "modal-content");
            modalContent.innerHTML = msg;

            let modalButtonsContainer = document.createElement("div");
            modalButtonsContainer.setAttribute("id", "modal-buttons-container");

            let confirmButton = document.createElement("button-squared");
            confirmButton.onclick = async () => {
                Modal.Close(id);
                resolve(true);
                if (callback != null) callback();
            };
            confirmButton.innerHTML = "Confirmar";

            let cancelButton = document.createElement("button-squared");
            cancelButton.onclick = async () => {
                Modal.Close(id);
                resolve(false);
                if (callback != null) callback();
            };
            cancelButton.innerHTML = "Cancelar";

            modalButtonsContainer.appendChild(confirmButton);
            modalButtonsContainer.appendChild(cancelButton);

            modalBox.appendChild(modalTitle);
            modalBox.appendChild(modalContent);
            modalBox.appendChild(modalButtonsContainer);

            modal.appendChild(modalBox);

            document.body.appendChild(modal);

            window.addEventListener("keydown", Modal.ESCKey);
        });
    },
    /** @description The action callback is only called if the user confirms */
    ConfirmAction: (title, msg, callback = null) => {
        return new Promise(resolve => {
            let modal = document.createElement("div");
            modal.setAttribute("class", "modal-container");
            modal.id = "modal-container";
            let id = `modal-id-${++Modal.modalId}`;
            modal.setAttribute("modal-id", id);

            let modalBox = document.createElement("div");
            modalBox.setAttribute("id", "modal-box");

            let modalTitle = document.createElement("h1");
            modalTitle.setAttribute("id", "modal-title");
            modalTitle.innerHTML = title;

            let modalContent = document.createElement("p");
            modalContent.setAttribute("id", "modal-content");
            modalContent.innerHTML = msg;

            let modalButtonsContainer = document.createElement("div");
            modalButtonsContainer.setAttribute("id", "modal-buttons-container");

            let confirmButton = document.createElement("button-squared");
            confirmButton.onclick = async () => {
                Modal.Close(id);
                resolve(true);
                if (callback != null) callback();
            };
            confirmButton.innerHTML = "Confirmar";

            let cancelButton = document.createElement("button-squared");
            cancelButton.onclick = async () => {
                Modal.Close(id);
                resolve(false);
            };
            cancelButton.innerHTML = "Cancelar";

            modalButtonsContainer.appendChild(confirmButton);
            modalButtonsContainer.appendChild(cancelButton);

            modalBox.appendChild(modalTitle);
            modalBox.appendChild(modalContent);
            modalBox.appendChild(modalButtonsContainer);

            modal.appendChild(modalBox);

            document.body.appendChild(modal);

            window.addEventListener("keydown", Modal.ESCKey);
        });
    },

    Input: (title, msg, callback = null) => {
        return new Promise((resolve, reject) => {
            let modal = document.createElement("div");
            modal.setAttribute("class", "modal-container");
            modal.id = "modal-container";
            let id = `modal-id-${++Modal.modalId}`;
            modal.setAttribute("modal-id", id);

            let modalBox = document.createElement("div");
            modalBox.setAttribute("id", "modal-box");

            let modalTitle = document.createElement("h1");
            modalTitle.setAttribute("id", "modal-title");
            modalTitle.innerHTML = title;

            let modalContent = document.createElement("p");
            modalContent.setAttribute("id", "modal-content");
            modalContent.innerHTML = msg;

            let modalButtonsContainer = document.createElement("div");
            modalButtonsContainer.setAttribute("id", "modal-buttons-container");

            let confirmButton = document.createElement("button-squared");
            confirmButton.onclick = async () => {
                let res = modalInput.value;
                Modal.Close(id);
                resolve(res);
                if (callback != null) callback();
            };
            confirmButton.innerHTML = "Confirmar";

            let cancelButton = document.createElement("button-squared");
            cancelButton.onclick = async () => {
                Modal.Close(id);
                resolve("");
                if (callback != null) callback();
            };
            cancelButton.innerHTML = "Cancelar";

            modalButtonsContainer.appendChild(confirmButton);
            modalButtonsContainer.appendChild(cancelButton);

            let modalInput = document.createElement("input");
            modalInput.classList = "acacia-input";

            modalBox.appendChild(modalTitle);
            modalBox.appendChild(modalContent);
            modalBox.appendChild(modalInput);
            modalBox.appendChild(modalButtonsContainer);

            modal.appendChild(modalBox);

            document.body.appendChild(modal);

            window.addEventListener("keydown", Modal.ESCKey);
            function resolveInput(e) {
                if (e.key == "Enter") {
                    Modal.Close(id);
                    resolve(modalInput.value);
                    if (callback != null) callback();
                    window.removeEventListener("keydown", resolveInput);
                }
            }
            window.addEventListener("keydown", resolveInput);
            modalInput.focus();
        });
    },
    Window: (title, content) => {
        let modal = document.createElement("acacia-container");
        modal.id = "modal-container";
        let id = `modal-id-${++Modal.modalId}`;
        modal.setAttribute("modal-id", id);

        let modalWnd = document.createElement("grid-column");
        modalWnd.setAttribute("id", "modal-window");

        let modalTitleBar = document.createElement("span");
        modalTitleBar.style.display = "grid";
        modalTitleBar.style.gridTemplateColumns = "1fr auto";
        modalTitleBar.style.alignItems = "center";
        modalTitleBar.style.width = "100%";

        let close = document.createElement("span");
        close.id = "modal-close";
        close.innerHTML = "&times;";
        close.onclick = () => Modal.Close(id);

        let modalTitle = document.createElement("text-subheading");
        modalTitle.setAttribute("id", "modal-title");
        modalTitle.innerHTML = title;
        modalWnd.appendChild(modalTitle);
        modalTitleBar.appendChild(modalTitle);
        modalTitleBar.appendChild(close);
        modalWnd.appendChild(modalTitleBar);
        let contentElement = document.createElement("grid-column");
        contentElement.innerHTML = content;
        modalWnd.appendChild(contentElement);

        modal.appendChild(modalWnd);

        document.body.appendChild(modal);
        window.addEventListener("keydown", Modal.ESCKey);
    }
}
//#endregion

//#region DATAGRID
export class Datagrid {
    allSelected = false;
    selectionCount = 0;
    selectedValues = [];
    sourceLength = 0;

    /**
     * @description Creates a new Datagrid element with the gridID as its `id` attribute and appends it to the target element.
     * the grid columns is specified using the number of headers, columns can be truncated or filled with empty strings.
     * @param {string} gridID the id of the Datagrid element
     * @param {string} title The title of the datagrid
     * @param {Array<Array<string>>} sourceData A multidimensional array with the data to be displayed
     * @param {*} target The target element where the grid will be appended
     * @param {*} selectCB A function called when a row is selected; this function returns all selected values
     * @param {*} allSelectedCB A function called when all rows are selected; this function returns the count of selected values
     * @example const dataGrid = new Datagrid("myGrid", "My Grid", [["Head1", "Head2"], ["Cell1", "Cell2"]], container, selectCB, allSelectedCB);
     */
    constructor(gridID, title, sourceData, target, selectCB, allSelectedCB) {
        // Handles the input array:
        sourceData = this.dataHandle(sourceData);
        // Generates the main HTMLElement:
        const datagridElement = document.createElement("data-grid");
        datagridElement.id = gridID;
        target.appendChild(datagridElement);

        // Guardar o número total de linhas (excluindo o cabeçalho)
        this.sourceLength = sourceData.length - 1;

        // Adicionar título
        const datagridTitle = document.createElement("data-grid-title");
        datagridTitle.textContent = title;
        datagridElement.appendChild(datagridTitle);

        // Criar os elementos para o cabeçalho
        const headersElement = document.createElement("data-grid-headers");
        headersElement.onclick = () => this.selectAll(gridID, selectCB, allSelectedCB);

        // Checkbox "Selecionar todos"
        const headCheckbox = document.createElement("data-grid-head");
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `${gridID}-chk`);
        headCheckbox.append(input);
        headersElement.append(headCheckbox);

        // Adicionar cabeçalhos das colunas (primeira linha da matriz)
        const headers = sourceData[0];
        headers.forEach(header => {
            const head = document.createElement("data-grid-head");
            head.textContent = header;
            headersElement.append(head);
        });
        datagridElement.appendChild(headersElement);

        // Criar as linhas
        sourceData.slice(1).forEach((rowData, rowIndex) => {
            const row = document.createElement("data-grid-row");

            // Checkbox para selecionar a linha
            const cellCheckbox = document.createElement("data-grid-cell");
            const input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", `${gridID}-chk-${rowIndex}`);
            cellCheckbox.append(input);
            row.append(cellCheckbox);

            // Adicionar células da linha
            rowData.forEach(cellData => {
                const cell = document.createElement("data-grid-cell");
                cell.textContent = cellData;
                row.append(cell);
            });

            row.setAttribute("id", `${gridID}-${rowIndex}`);
            row.onclick = () => this.selectRow(`${gridID}-${rowIndex}`, `${gridID}`, selectCB, allSelectedCB);
            datagridElement.appendChild(row);
        });
    }

    selectRow(rowID, gridID, selectCB, allSelectedCB) {
        const row = document.getElementById(rowID);
        const cells = row.querySelectorAll("data-grid-cell");
        const headers = document.querySelectorAll(`data-grid#${gridID} data-grid-headers data-grid-head`);
        const input = document.querySelector(`#${rowID} input[type="checkbox"]`);
        const obj = {};

        input.checked = !input.checked;

        for (let index = 1; index < headers.length; index++) {
            const key = headers[index].textContent;
            const value = cells[index].textContent;
            obj[key] = value;
        }

        this.selectedRows(gridID, selectCB, allSelectedCB);
    }

    selectedRows(gridID, selectCB, allSelectedCB) {
        this.selectedValues = [];
        const headers = document.querySelectorAll(`data-grid#${gridID} data-grid-headers data-grid-head`);
        const rows = document.querySelectorAll(`data-grid#${gridID} data-grid-row`);

        rows.forEach(row => {
            const input = row.querySelector(`input[type="checkbox"]`);
            const cells = row.querySelectorAll("data-grid-cell");

            if (input.checked) {
                const obj = {};
                for (let index = 1; index < headers.length; index++) {
                    const key = headers[index].textContent;
                    const value = cells[index].textContent;
                    obj[key] = value;
                }
                this.selectedValues.push(obj);
            }
        });

        this.selectionCount = this.selectedValues.length;
        const allSelected = this.selectionCount === this.sourceLength;
        this.allSelected = allSelected;
        document.getElementById(`${gridID}-chk`).checked = allSelected;

        allSelected ? allSelectedCB(this.selectionCount) : selectCB(this.selectedValues);
    }

    selectAll(gridID, selectCB, allSelectedCB) {
        const rows = document.querySelectorAll(`data-grid#${gridID} data-grid-row`);
        const inputAll = document.getElementById(`${gridID}-chk`);

        inputAll.checked = !inputAll.checked;
        this.selectedValues = [];

        rows.forEach(row => {
            const input = row.querySelector(`input[type="checkbox"]`);
            input.checked = inputAll.checked;

            if (inputAll.checked) {
                const headers = document.querySelectorAll(`data-grid#${gridID} data-grid-headers data-grid-head`);
                const cells = row.querySelectorAll("data-grid-cell");
                const obj = {};

                for (let index = 1; index < headers.length; index++) {
                    const key = headers[index].textContent;
                    const value = cells[index].textContent;
                    obj[key] = value;
                }
                this.selectedValues.push(obj);
            }
        });

        this.selectionCount = this.selectedValues.length;
        this.allSelected = this.selectionCount === this.sourceLength;
        allSelectedCB(this.selectionCount);
    }

    /**
     * @description Adjusts a multidimensional array to ensure consistency with headers.
     * @param {Array<Array<string>>} data A multidimensional array where the first subarray contains headers.
     * @returns {Array<Array<string>>} The adjusted multidimensional array.
     * @example
     * const data = [
     *   ["Head 1", "Head 2", "Head 3"],
     *   ["Value 1", "Value 2", "Value 3", "Extra Value"],
     *   ["Value 4", "Value 5"]
     * ];
     * const result = adjustMatrix(data);
     * console.log(result);
     * // Output:
     * // [
     * //   ["Head 1", "Head 2", "Head 3"],
     * //   ["Value 1", "Value 2", "Value 3"],
     * //   ["Value 4", "Value 5", ""]
     * // ]
     */
    dataHandle(data) {
        if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
            throw new Error("Invalid input: data must be a non-empty multidimensional array.");
        }

        const headers = data[0]; // Assume the first subarray contains headers
        const maxLength = headers.length;

        // Adjust each row based on the headers length
        return data.map((row, rowIndex) => {
            if (rowIndex === 0) {
                // Keep headers as is
                return row.slice(0, maxLength);
            }

            // If the row has more items than headers, truncate it
            if (row.length > maxLength) {
                return row.slice(0, maxLength);
            }

            // If the row has fewer items than headers, pad with empty strings
            return [...row, ...Array(maxLength - row.length).fill("")];
        });
    }
}
//#endregion

//#region GALLERY
export class Gallery {
    id; slideIndex = 1;
    constructor(galleryID, sources = [], target) {
        const gallery = document.createElement("image-gallery");
        gallery.id = galleryID;
        this.id = galleryID;
        const dots = document.createElement("div");
        dots.classList.add("dots-container");

        for (let i = 0; i < 6; i++) {
            if (i >= sources.length) break;
            const slide = document.createElement("div");
            const img = document.createElement("img");
            slide.classList.add("slide");
            slide.classList.add("fade");
            img.src = sources[i];
            slide.appendChild(img);
            gallery.appendChild(slide);
            // Dots
            const span = document.createElement("span");
            span.classList.add("dot");
            span.onclick = e => this.currentSlide(i + 1);
            dots.appendChild(span);
        }

        const prev = document.createElement("a");
        prev.classList.add("prev");
        prev.innerHTML = "&#10094;";
        prev.onclick = e => this.changeSlide(-1);
        const next = document.createElement("a");
        next.classList.add("next");
        next.innerHTML = "&#10095;";
        next.onclick = e => this.changeSlide(1);

        gallery.appendChild(next);
        gallery.appendChild(prev);
        gallery.appendChild(dots);

        target.appendChild(gallery);

        this.showSlides(1);
        this.element = gallery;
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    changeSlide(n) {
        this.showSlides(this.slideIndex += n);
    }

    showSlides(n) {
        let slides = document.getElementById(this.id).querySelectorAll('.slide');
        let dots = document.getElementById(this.id).querySelectorAll('.dot');

        if (n > slides.length) this.slideIndex = 1;
        if (n < 1) this.slideIndex = slides.length;

        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.className = dot.className.replace(' active', ''));
        slides[this.slideIndex - 1].style.display = 'block';
        dots[this.slideIndex - 1].className += ' active';
    }
}
//#endregion

// #region APP CREATION:
export class Acacia {
    SideMenuContent;
    constructor(appName = "Acácia App", hideBottomBar = false, sideMenuContent = null, callback = null) {
        this.SideMenuContent = sideMenuContent || null;
        const head = document.querySelector("head");
        head.querySelector("title").innerText = appName;
        document.body.appendChild(document.createElement("acacia-app"));
        window.SideMenuContent = this.SideMenuContent;
        Renderer.Home(hideBottomBar, callback);
    }
}

export class AcaciaDesktop {
    TopMenuContent;
    constructor(appName = "Acácia App", topMenuContent = null, callback = null) {
        this.TopMenuContent = topMenuContent || null;
        const head = document.querySelector("head");
        head.querySelector("title").innerText = appName;
        document.body.appendChild(document.createElement("acacia-desktop-app"));
        Renderer.Desktop(callback);
        Object.keys(topMenuContent).forEach(menu => {
            const menuItem = document.createElement("menu-item");
            menuItem.textContent = menu;
            const dropdown = document.createElement("menu-item-dropdown");
            menuItem.appendChild(dropdown);
            TOPBAR.appendChild(menuItem);
            topMenuContent[menu].forEach(item => {
                const dropdownItem = document.createElement("dropdown-item");
                dropdownItem.textContent = item.title;
                dropdownItem.onclick = item.action;
                dropdown.appendChild(dropdownItem);
            });
            menuItem.addEventListener('mouseenter', () => {
                dropdown.style.display = "flex";
            });
            menuItem.addEventListener('mouseleave', () => {
                dropdown.style.display = "none";
            });
        });
    }
}
// #endregion

window.Content = Content;
window.Renderer = Renderer;
window.Modal = Modal;
window.Tooltip = Tooltip;
window.Datagrid = Datagrid;
window.Gallery = Gallery;
window.IdControl = IdControl;