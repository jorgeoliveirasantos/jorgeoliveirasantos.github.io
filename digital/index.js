import { Howl, Howler } from "https://kaatan.azurewebsites.net/radio/lib/howler.js";
const _URL = "./content/";
const _VOLUME = 0.1;

const App = {
    Chapters: {},
    User: {
        Name: "Anônimo",
        Steps: 1,
        LastChapter: "Boas-vindas",
    },
    Music: false,
    Render: {
        Section: async (title) => {
            document.body.innerHTML = "";

            let div = document.createElement("div");

            div.innerHTML = `
            <div class="body-effect"></div>
            `;
            document.body.appendChild(div.firstElementChild);

            div = document.createElement("div");

            div.innerHTML = `
                <div class="level">
                    <div id="progress">
                        <div id="bar"></div>
                    </div>
                    <span id="chapters-done">0/100</span>
                </div>
            `;
            document.body.appendChild(div.firstElementChild);

            div = document.createElement("div");
            div.innerHTML = `
                <div class="credits">
                    <span>Criado por:</span>
                    <a href="https://www.jorgesouza.com.br/" target="_blank">Jorge Souza Oliveira dos Santos</a>
                    <span>04/02/2025</span>
                </div>
            `;
            document.body.appendChild(div.firstElementChild);

            if (localStorage.getItem("progress")) {
                App.User = JSON.parse(localStorage.getItem("progress"));
                const totalChapters = Object.keys(App.Chapters).length;
                const doneChapthers = App.User.Steps;
                document.getElementById("chapters-done").textContent = doneChapthers + "/" + totalChapters;
                const percentDone = (doneChapthers / totalChapters) * 100;
                document.querySelector(".level #bar").style.width = percentDone + "%";
            } else {
                localStorage.setItem("progress", JSON.stringify(App.User));
            }

            const container = document.createElement("div");
            container.classList.add("fun-container");
            const h1 = document.createElement("h1");
            h1.innerText = title;
            container.appendChild(h1);

            const contentContainer = document.createElement("div");
            contentContainer.style.width = "100%";
            contentContainer.style.height = "100%";
            contentContainer.style.overflowY = "auto";
            contentContainer.style.display = "flex";
            contentContainer.style.flexDirection = "column";
            contentContainer.style.gap = "20px";
            contentContainer.style.padding = "20px";
            contentContainer.style.boxSizing = "border-box";
            container.appendChild(contentContainer);

            document.body.appendChild(container);

            if (!App.Music) {
                App.Music = new Howl({
                    src: ['fx/background.mp3'],
                    loop: true,
                    autoplay: true,
                    volume: _VOLUME
                });
                App.Music.play();
            }
            return contentContainer;
        },
        Content: async (container, chapter, callback) => {
            if (!App.Music) {
                App.Music = new Howl({
                    src: ['fx/background.mp3'],
                    loop: true,
                    autoplay: true,
                    volume: _VOLUME
                });
                App.Music.play();
            }

            const content = (await (await fetch(`${_URL}${chapter}.txt`)).text())
                .replace(/\r/g, '')
                .split('\n')
                .filter(str => str.trim() !== "")
                .filter(str => !str.startsWith("// "));
            let count = 0;

            function read() {
                console.log(count);
                console.log(content.length);
                container.innerHTML = "";
                let line = content[count];
                // Video:
                if (line.startsWith("#video: ")) {
                    //App.Render.Video(container, line, callback);
                }
                // Image:
                else if (line.startsWith("#image: ")) {
                    const media = JSON.parse(line.replace("#image: ", "").replace(/'/g, ""));
                    const mediaContainer = document.createElement("div");
                    mediaContainer.style.width = "100%";
                    mediaContainer.style.position = "relative";
                    mediaContainer.style.paddingBottom = "56.25%";
                    mediaContainer.style.overflow = "hidden";
                    mediaContainer.style.borderRadius = "10px";
                    mediaContainer.style.border = "var(--MediumBlue) 3px solid;";
                    const img = document.createElement("img");
                    img.src = _URL + media["path"];
                    img.style.position = "absolute";
                    img.style.border = "none";
                    img.style.top = "0";
                    img.style.left = "0";
                    img.style.width = "100%";
                    img.style.height = "100%";
                    img.style.pointerEvents = "none";
                    mediaContainer.appendChild(img);
                    container.appendChild(mediaContainer);
                    const p = document.createElement("p");
                    p.innerHTML = "<small>" + media["legend"] + "</small>";
                    container.appendChild(p);

                    const nextBtn = document.createElement("button");
                    nextBtn.classList.add("fun-button");
                    nextBtn.textContent = "Leia mais...";
                    if (count == content.length - 1) nextBtn.textContent = "Concluir";
                    nextBtn.style.width = "fit-content";
                    nextBtn.style.margin = "auto";

                    const prevBtn = document.createElement("button");
                    prevBtn.classList.add("fun-button");
                    prevBtn.textContent = "Voltar";
                    prevBtn.style.width = "fit-content";
                    prevBtn.style.margin = "auto";

                    const btnContainer = document.createElement("div");
                    btnContainer.style.display = "flex";

                    btnContainer.appendChild(prevBtn);
                    btnContainer.appendChild(nextBtn);
                    container.appendChild(btnContainer);

                    prevBtn.onclick = e => {
                        if (count == 0) {
                            funButton(prevBtn, "no", null);
                        } else {
                            funButton(prevBtn, "whoosh", null);
                            --count;
                            read();
                        }
                    };

                    nextBtn.onclick = e => {
                        if (count == content.length - 1) {
                            funButton(nextBtn, "levelup", () => {
                                App.User.Steps++;
                                App.User.LastChapter = App.Chapters[App.User.Steps];
                                localStorage.setItem("progress", JSON.stringify(App.User));
                                callback();
                            });
                        } else {
                            // Aqui:
                            funButton(nextBtn, "whoosh", null);
                            ++count;
                            read();
                        }
                    };
                }
                // Quiz:
                else if (line.startsWith("#quiz: ")) {
                    const quiz = JSON.parse(line.replace("#quiz: ", "").replace(/'/g, ""));

                    const txt = document.createElement("p");
                    txt.innerHTML = quiz["question"];
                    container.appendChild(txt);
                    document.getElementById("user-name") ? document.getElementById("user-name").innerText = " " + App.User.Name : 0;

                    const nextBtn = document.createElement("button");
                    nextBtn.classList.add("fun-button");
                    nextBtn.textContent = quiz["option2"]["choice"];
                    nextBtn.style.width = "fit-content";
                    nextBtn.style.margin = "auto";

                    const prevBtn = document.createElement("button");
                    prevBtn.classList.add("fun-button");
                    prevBtn.textContent = quiz["option1"]["choice"];
                    prevBtn.style.width = "fit-content";
                    prevBtn.style.margin = "auto";

                    const btnContainer = document.createElement("div");
                    btnContainer.style.display = "flex";

                    if (Math.random() > 0.5) {
                        btnContainer.appendChild(prevBtn);
                        btnContainer.appendChild(nextBtn);
                    }
                    else {
                        btnContainer.appendChild(nextBtn);
                        btnContainer.appendChild(prevBtn);
                    }
                    container.appendChild(btnContainer);

                    prevBtn.onclick = e => {
                        txt.innerHTML = quiz["option1"]["answer"];
                        prevBtn.textContent = "Voltar";
                        nextBtn.textContent = "Avançar";
                        if (count == content.length - 1) nextBtn.textContent = "Concluir";
                        funButton(prevBtn, "no", null);

                        prevBtn.remove();
                        nextBtn.remove();

                        btnContainer.appendChild(prevBtn);
                        btnContainer.appendChild(nextBtn);

                        prevBtn.onclick = e => {
                            if (count == 0) {
                                funButton(prevBtn, "no", null);
                            } else {
                                funButton(prevBtn, "whoosh", null);
                                --count;
                                read();
                            }
                        };
                        nextBtn.onclick = e => {
                            if (count == content.length - 1) {
                                funButton(nextBtn, "levelup", () => {
                                    App.User.Steps++;
                                    App.User.LastChapter = App.Chapters[App.User.Steps];
                                    localStorage.setItem("progress", JSON.stringify(App.User));
                                    callback();
                                });
                            } else {
                                funButton(nextBtn, "whoosh", null);
                                ++count;
                                read();
                            }
                        };
                    };

                    nextBtn.onclick = e => {
                        txt.innerHTML = quiz["option2"]["answer"];
                        prevBtn.textContent = "Voltar";
                        nextBtn.textContent = "Avançar";
                        if (count == content.length - 1) nextBtn.textContent = "Concluir";
                        funButton(nextBtn, "ok", null);

                        prevBtn.remove();
                        nextBtn.remove();

                        btnContainer.appendChild(prevBtn);
                        btnContainer.appendChild(nextBtn);

                        prevBtn.onclick = e => {
                            if (count == 0) {
                                funButton(prevBtn, "no", null);
                            } else {
                                funButton(prevBtn, "whoosh", null);
                                --count;
                                read();
                            }
                        };
                        nextBtn.onclick = e => {
                            if (count == content.length - 1) {
                                funButton(nextBtn, "levelup", () => {
                                    App.User.Steps++;
                                    App.User.LastChapter = App.Chapters[App.User.Steps];
                                    localStorage.setItem("progress", JSON.stringify(App.User));
                                    callback();
                                });
                            } else {
                                funButton(nextBtn, "whoosh", null);
                                ++count;
                                read();
                            }
                        };
                    };
                }
                // Comment:
                else {
                    const txt = document.createElement("p");
                    txt.innerHTML = line;
                    container.appendChild(txt);
                    document.getElementById("user-name") ? document.getElementById("user-name").innerText = " " + App.User.Name : 0;

                    const nextBtn = document.createElement("button");
                    nextBtn.classList.add("fun-button");
                    nextBtn.textContent = "Leia mais...";
                    if (count == content.length - 1) nextBtn.textContent = "Concluir";
                    nextBtn.style.width = "fit-content";
                    nextBtn.style.margin = "auto";

                    const prevBtn = document.createElement("button");
                    prevBtn.classList.add("fun-button");
                    prevBtn.textContent = "Voltar";
                    prevBtn.style.width = "fit-content";
                    prevBtn.style.margin = "auto";

                    const btnContainer = document.createElement("div");
                    btnContainer.style.display = "flex";

                    btnContainer.appendChild(prevBtn);
                    btnContainer.appendChild(nextBtn);
                    container.appendChild(btnContainer);

                    prevBtn.onclick = e => {
                        if (count == 0) {
                            funButton(prevBtn, "no", null);
                        } else {
                            funButton(prevBtn, "whoosh", null);
                            --count;
                            read();
                        }
                    };

                    nextBtn.onclick = e => {
                        if (count == content.length - 1) {
                            funButton(nextBtn, "levelup", () => {
                                App.User.Steps++;
                                App.User.LastChapter = App.Chapters[App.User.Steps];
                                localStorage.setItem("progress", JSON.stringify(App.User));
                                callback();
                            });
                        } else {
                            // Aqui:
                            funButton(nextBtn, "whoosh", null);
                            ++count;
                            read();
                        }
                    };
                }
            }
            read();
        },
    },
    "Boas-vindas": async () => {
        const container = await App.Render.Section("Digite seu nome:");

        const input = document.createElement("input");
        input.classList.add("fun-input");
        container.appendChild(input);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("fun-button");
        nextBtn.textContent = "Avançar";
        nextBtn.style.width = "fit-content";
        nextBtn.style.margin = "auto";
        container.appendChild(nextBtn);

        nextBtn.onclick = e => {
            if (input.value.length > 2) {
                App.User.Name = input.value;
                App.User.Steps++;
                App.User.LastChapter = App.Chapters[App.User.Steps];
                localStorage.setItem("progress", JSON.stringify(App.User));
                funButton(nextBtn, "levelup", App["Introdução"]);
            } else {
                funButton(nextBtn, "no", () => { });
            }
        }

        input.focus();
    },
    "Introdução": async (done = false) => {
        const container = await App.Render.Section("Introdução");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "2", () => App["Mundo Virtual"](true));
    },
    "Mundo Virtual": async (done = false) => {
        const container = await App.Render.Section("Mundo Virtual");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "3", () => App["Primeiro Passo"](true));
    },
    "Primeiro Passo": async (done = false) => {
        const container = await App.Render.Section("Primeiro Passo");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "4", () => App["Identidade no mundo digital"](true));
    },
    "Identidade no mundo digital": async (done = false) => {
        const container = await App.Render.Section("Identidade no mundo digital");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "5", () => App["Idade de início"](true));
    },
    "Idade de início": async (done = false) => {
        const container = await App.Render.Section("Idade de Início");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "6", () => App["Riscos e benefícios"](true));
    },
    "Riscos e benefícios": async (done = false) => {
        const container = await App.Render.Section("Riscos e benefícios");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "7", () => App["Aplicações e plataformas"](true));
    },
    "Aplicações e plataformas": async (done = false) => {
        const container = await App.Render.Section("Aplicações e plataformas");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "8", () => App["On-line e off-line"](true));
    },
    "On-line e off-line": async (done = false) => {
        const container = await App.Render.Section("On-line e off-line");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "9", () => App["Permissões"](true));
    },
    "Permissões": async (done = false) => {
        const container = await App.Render.Section("Permissões");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "10", () => App["Segundo plano"](true));
    },
    "Segundo plano": async (done = false) => {
        const container = await App.Render.Section("Segundo plano");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "11", () => App["Termos de uso"](true));
    },
    "Termos de uso": async (done = false) => {
        const container = await App.Render.Section("Termos de uso");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "12", () => App["Antivírus"](true));
    },
    "Antivirus": async (done = false) => {
        const container = await App.Render.Section("Antivírus");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "13", () => App["Download"](true));
    },
    "Download": async (done = false) => {
        const container = await App.Render.Section("Download");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "14", () => App["Conta Google"](true));
    },
    "Conta Google": async (done = false) => {
        const container = await App.Render.Section("Conta Google");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "15", () => App["Conta Microsoft"](true));
    },
    "Conta Microsoft": async (done = false) => {
        const container = await App.Render.Section("Conta Microsoft");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "16", () => App["Senhas"](true));
    },
    "Senhas": async (done = false) => {
        const container = await App.Render.Section("Senhas");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "17", () => App["Algoritmo"](true));
    },
    "Algoritmo": async (done = false) => {
        const container = await App.Render.Section("Algoritmo");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "18", () => App["Engenharia social"](true));
    },
    "Engenharia social": async (done = false) => {
        const container = await App.Render.Section("Engenharia social");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "19", () => App["Hackers"](true));
    },
    "Hackers": async (done = false) => {
        const container = await App.Render.Section("Hackers");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "20", () => App["Vazamento de dados"](true));
    },
    "Vazamento de dados": async (done = false) => {
        const container = await App.Render.Section("Vazamento de dados");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "21", () => App["LGPD"](true));
    },
    "LGPD": async (done = false) => {
        const container = await App.Render.Section("LGPD");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "22", () => App["Saúde financeira"](true));
    },
    "Saúde financeira": async (done = false) => {
        const container = await App.Render.Section("Saúde financeira");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "23", () => App["Cartões de crédito"](true));
    },
    "Cartões de crédito": async (done = false) => {
        const container = await App.Render.Section("Cartões de crédito");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "24", () => App["Controle parental"](true));
    },
    "Controle parental": async (done = false) => {
        const container = await App.Render.Section("Controle parental");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "25", () => App["Professores e escolas"](true));
    },
    "Professores e escolas": async (done = false) => {
        const container = await App.Render.Section("Professores e escolas");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "26", () => App["Cuidados com a segurança"](true));
    },
    "Cuidados com a segurança": async (done = false) => {
        const container = await App.Render.Section("Cuidados com a segurança");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "27", () => App["Reportar e restringir"](true));
    },
    "Reportar e restringir": async (done = false) => {
        const container = await App.Render.Section("Reportar e restringir");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "28", () => App["Melhorar o ambiente"](true));
    },
    "Melhorar o ambiente": async (done = false) => {
        const container = await App.Render.Section("Melhorar o ambiente");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "29", () => App["Próximos passos?"](true));
    },
    "Próximos passos?": async (done = false) => {
        const container = await App.Render.Section("Próximos passos?");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "30", () => App["Certified"]());
    },
    "Certified": async (done = false) => {
        if (done) toast("Você passou de nível!", 5);
    },
    _: () => { },
};

// #region FX

let particles = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Função para ajustar o tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Ajustar o canvas inicialmente e sempre que a janela for redimensionada
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticles(button) {
    const buttonRect = button.getBoundingClientRect();
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Calculando posição inicial
        particle.style.left = `${buttonRect.left + buttonRect.width / 2 + window.scrollX}px`;
        particle.style.top = `${buttonRect.top + buttonRect.height / 2 + window.scrollY}px`;

        // Definindo cor aleatória
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Adicionando deslocamento horizontal e vertical aleatórios
        const moveX = (Math.random() - 0.5) * 200; // Movimento lateral entre -100px e 100px
        const moveY = (Math.random() - 0.5) * 200; // Movimento vertical entre -100px e 100px
        particle.style.setProperty('--moveX', `${moveX}px`);
        particle.style.setProperty('--moveY', `${moveY}px`);

        // Duração aleatória da animação
        particle.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;

        document.body.appendChild(particle);

        // Removendo a partícula após a animação
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function funButton(button, action, callback) {
    const audioUrl = "fx/" + action + ".mp3";
    const soundEffect = new Audio(audioUrl);
    soundEffect.currentTime = 0;
    soundEffect.play();
    if (action == "next" || action == "levelup" || action == "ok") {
        createParticles(button);
        /*
        const rect = button.getBoundingClientRect()
        createParticles(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );
        */
        button.classList.add("yes");
        if (action == "levelup") {
            button.style.opacity = "0.5";
            button.style.pointerEvents = "none";
        }
        setTimeout(callback, 1999);
    } else if (action == "no") {
        button.classList.add("no");
        setTimeout(() => {
            button.classList.remove("no");
        }, 2999);
    }
}

function toast(content, time = 5) {
    try { document.body.removeChild(document.getElementById("toast-mini")) } catch { };
    let off = document.createElement("span");
    off.classList.add("toast");
    off.id = "toast-mini";
    off.innerHTML = content;
    document.body.appendChild(off);
    setTimeout(() => {
        try { document.body.removeChild(document.getElementById("toast-mini")) } catch { };
    }, (time * 1000));
}

// #endregion



// #region INIT
(async () => {
    App.Chapters = (await (await fetch(`${_URL}0.txt`)).json());

    if (localStorage.getItem("progress")) {
        App.User = JSON.parse(localStorage.getItem("progress"));

        const container = await App.Render.Section("Continuar");
        const p = document.createElement("p");
        p.innerHTML = 'Sua última sessão foi: <b style="color: #0fb;">' + App.User.LastChapter + '</b>, continue de onde você parou.';
        container.appendChild(p);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("fun-button");
        nextBtn.textContent = "Continuar";
        nextBtn.style.width = "fit-content";
        nextBtn.style.margin = "auto";
        container.appendChild(nextBtn);

        nextBtn.onclick = e => {
            funButton(nextBtn, "whoosh", null);
            App[App.User.LastChapter]();

            if (!App.Music) {
                App.Music = new Howl({
                    src: ['fx/background.mp3'],
                    loop: true,
                    autoplay: true,
                    volume: _VOLUME
                });
                App.Music.play();
            }
        }
    } else {
        App[App.User.LastChapter]();
    }

    window.oncontextmenu = e => {
        e.preventDefault();
        return false;
    };
})()
// #endregion


//