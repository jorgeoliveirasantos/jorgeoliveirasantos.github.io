import { Howl, Howler } from "./howler.js";
const _URL = "./content/";
const _VOLUME = 0.1;

const App = {
    Chapters: {},
    Reading: 1,
    User: {
        Name: "Anônimo",
        Steps: 1,
        LastChapter: "Boas-vindas",
    },
    Music: false,
    Render: {
        Section: async (title) => {
            // Generate page tools:

            document.body.innerHTML = "";
            document.body.appendChild(toolsContainer());

            // Container

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
                                if (App.User.Steps < 31 && App.User.Steps == App.Reading) App.User.Steps++;
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
                                    if (App.User.Steps < 31 && App.User.Steps == App.Reading) App.User.Steps++;
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
                                    if (App.User.Steps < 31 && App.User.Steps == App.Reading) App.User.Steps++;
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
                                if (App.User.Steps < 31 && App.User.Steps == App.Reading) App.User.Steps++;
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
        App.Reading = 1;
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
                if (App.User.Steps < 31 && App.User.Steps == App.Reading) App.User.Steps++;
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
        App.Reading = 2;
        const container = await App.Render.Section("Introdução");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "2", () => App["Mundo virtual"](true));
    },
    "Mundo virtual": async (done = false) => {
        App.Reading = 3;
        const container = await App.Render.Section("Mundo virtual");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "3", () => App["Primeiro passo"](true));
    },
    "Primeiro passo": async (done = false) => {
        App.Reading = 4;
        const container = await App.Render.Section("Primeiro passo");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "4", () => App["Identidade no mundo digital"](true));
    },
    "Identidade no mundo digital": async (done = false) => {
        App.Reading = 5;
        const container = await App.Render.Section("Identidade no mundo digital");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "5", () => App["Idade de início"](true));
    },
    "Idade de início": async (done = false) => {
        App.Reading = 6;
        const container = await App.Render.Section("Idade de Início");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "6", () => App["Riscos e benefícios"](true));
    },
    "Riscos e benefícios": async (done = false) => {
        App.Reading = 7;
        const container = await App.Render.Section("Riscos e benefícios");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "7", () => App["Aplicações e plataformas"](true));
    },
    "Aplicações e plataformas": async (done = false) => {
        App.Reading = 8;
        const container = await App.Render.Section("Aplicações e plataformas");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "8", () => App["On-line e off-line"](true));
    },
    "On-line e off-line": async (done = false) => {
        App.Reading = 9;
        const container = await App.Render.Section("On-line e off-line");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "9", () => App["Permissões"](true));
    },
    "Permissões": async (done = false) => {
        App.Reading = 10;
        const container = await App.Render.Section("Permissões");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "10", () => App["Segundo plano"](true));
    },
    "Segundo plano": async (done = false) => {
        App.Reading = 11;
        const container = await App.Render.Section("Segundo plano");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "11", () => App["Termos de uso"](true));
    },
    "Termos de uso": async (done = false) => {
        App.Reading = 12;
        const container = await App.Render.Section("Termos de uso");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "12", () => App["Antivirus"](true));
    },
    "Antivirus": async (done = false) => {
        App.Reading = 13;
        const container = await App.Render.Section("Antivirus");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "13", () => App["Download"](true));
    },
    "Download": async (done = false) => {
        App.Reading = 14;
        const container = await App.Render.Section("Download");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "14", () => App["Conta Google"](true));
    },
    "Conta Google": async (done = false) => {
        App.Reading = 15;
        const container = await App.Render.Section("Conta Google");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "15", () => App["Conta Microsoft"](true));
    },
    "Conta Microsoft": async (done = false) => {
        App.Reading = 16;
        const container = await App.Render.Section("Conta Microsoft");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "16", () => App["Senhas"](true));
    },
    "Senhas": async (done = false) => {
        App.Reading = 17;
        const container = await App.Render.Section("Senhas");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "17", () => App["Algoritmo"](true));
    },
    "Algoritmo": async (done = false) => {
        App.Reading = 18;
        const container = await App.Render.Section("Algoritmo");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "18", () => App["Engenharia social"](true));
    },
    "Engenharia social": async (done = false) => {
        App.Reading = 19;
        const container = await App.Render.Section("Engenharia social");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "19", () => App["Hackers"](true));
    },
    "Hackers": async (done = false) => {
        App.Reading = 20;
        const container = await App.Render.Section("Hackers");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "20", () => App["Vazamento de dados"](true));
    },
    "Vazamento de dados": async (done = false) => {
        App.Reading = 21;
        const container = await App.Render.Section("Vazamento de dados");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "21", () => App["LGPD"](true));
    },
    "LGPD": async (done = false) => {
        App.Reading = 22;
        const container = await App.Render.Section("LGPD");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "22", () => App["Saúde financeira"](true));
    },
    "Saúde financeira": async (done = false) => {
        App.Reading = 23;
        const container = await App.Render.Section("Saúde financeira");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "23", () => App["Cartões de crédito"](true));
    },
    "Cartões de crédito": async (done = false) => {
        App.Reading = 24;
        const container = await App.Render.Section("Cartões de crédito");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "24", () => App["Controle parental"](true));
    },
    "Controle parental": async (done = false) => {
        App.Reading = 25;
        const container = await App.Render.Section("Controle parental");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "25", () => App["Escolas e educadores"](true));
    },
    "Escolas e educadores": async (done = false) => {
        App.Reading = 26;
        const container = await App.Render.Section("Escolas e educadores");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "26", () => App["Cuidados com a segurança"](true));
    },
    "Cuidados com a segurança": async (done = false) => {
        App.Reading = 27;
        const container = await App.Render.Section("Cuidados com a segurança");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "27", () => App["Reportar e restringir"](true));
    },
    "Reportar e restringir": async (done = false) => {
        App.Reading = 28;
        const container = await App.Render.Section("Reportar e restringir");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "28", () => App["Melhorar o ambiente"](true));
    },
    "Melhorar o ambiente": async (done = false) => {
        App.Reading = 29;
        const container = await App.Render.Section("Melhorar o ambiente");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "29", () => App["Próximos passos?"](true));
    },
    "Próximos passos?": async (done = false) => {
        App.Reading = 30;
        const container = await App.Render.Section("Próximos passos?");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "30", () => App["Esclarecimentos"](true));
    },
    "Esclarecimentos": async (done = false) => {
        App.Reading = 31;
        const container = await App.Render.Section("Esclarecimentos");
        if (done) toast("Você passou de nível!", 5);
        App.Render.Content(container, "31", () => App["Certificado"](true));
    },
    "Certificado": async (done = false) => {
        App.Reading = 32;
        App.User = {
            "Name": "Anônimo",
            "Steps": 32,
            "LastChapter": "Certificado"
        }
        localStorage.setItem("progress", JSON.stringify(App.User));

        function formatDate() {
            const diasDaSemana = [
                "Domingo", "Segunda-feira", "Terça-feira",
                "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
            ];

            const mesesDoAno = [
                "janeiro", "fevereiro", "março", "abril", "maio",
                "junho", "julho", "agosto", "setembro", "outubro",
                "novembro", "dezembro"
            ];

            const dataAtual = new Date();

            const diaSemana = diasDaSemana[dataAtual.getDay()];
            const dia = dataAtual.getDate();
            const mes = mesesDoAno[dataAtual.getMonth()];
            const ano = dataAtual.getFullYear();

            return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
        }

        // Renderizar o certificado:
        async function certificado() {
            try { document.getElementById("video-background").remove() } catch { }
            try { App.Music.stop(); } catch { }

            const container = await App.Render.Section("Digite seu nome:");

            const input = document.createElement("input");
            input.classList.add("fun-input");
            container.appendChild(input);

            const p = document.createElement("p");
            p.textContent = "Insira o nome como você gostaria que aparecesse em seu certificado."
            container.appendChild(p);

            const nextBtn = document.createElement("button");
            nextBtn.classList.add("fun-button");
            nextBtn.textContent = "Gerar certificado";
            nextBtn.style.width = "fit-content";
            nextBtn.style.margin = "auto";
            container.appendChild(nextBtn);

            nextBtn.onclick = e => {
                document.body.innerHTML = "";
                document.body.style.width = "2245px";
                document.body.style.height = "1587px";

                const div = document.createElement("div");
                div.id = "container";
                div.style.position = "absolute";
                div.style.width = "2245px";
                div.style.height = "1587px";
                div.style.padding = "0";
                div.style.margin = "0";
                div.style.textAlign = "center";
                div.style.backgroundImage = "url('./content/a.jpg')";
                div.style.backgroundSize = "cover";
                div.style.backgroundPosition = "center";
                div.style.display = "grid";
                div.style.gridTemplateRows = "1.3fr 1fr 1fr 1fr 1fr auto";
                div.style.alignItems = "center";
                div.style.justifyContent = "center";
                div.style.zIndex = "1";

                const nameSpan = document.createElement("span");
                nameSpan.id = "name";
                nameSpan.textContent = "Jorge Souza";

                const footerSpan = document.createElement("span");
                footerSpan.id = "footer";
                footerSpan.textContent = "Luis Eduardo Magalhães-BA | Quarta feira, 23 de Janeiro de 2025";

                // Adicionar ao div
                div.appendChild(document.createElement("span"));
                div.appendChild(document.createElement("span"));
                div.appendChild(document.createElement("span"));
                div.appendChild(nameSpan);
                div.appendChild(document.createElement("span"));
                div.appendChild(footerSpan);
                div.appendChild(document.createElement("span"));
                document.body.appendChild(div);

                const canvas = document.createElement('canvas');
                canvas.style.display = "none";
                canvas.width = 2245;
                canvas.height = 1587;
                document.body.appendChild(canvas);

                const name = input.value;

                const nameElement = document.getElementById("name"); // Acessando corretamente o elemento #name
                nameElement.textContent = name || "Jorge Souza Oliveira dos Santos";

                if (name.length > 35) {
                    document.getElementById("name").style.fontSize = "100px";
                } else if (name.length < 20) {
                    document.getElementById("name").style.fontSize = "150px";
                } else {
                    document.getElementById("name").style.fontSize = "120px";
                }
                document.getElementById("footer").textContent = "Luis Eduardo Magalhães-BA | " + formatDate();

                html2canvas(div, {
                    useCORS: true, // Permite carregar imagens de fontes externas
                    allowTaint: false, // Previne a contaminação de imagens de outras origens
                    logging: true,
                    scale: 1, // Aumenta a qualidade da imagem
                }).then(async function (canvas) {
                    var image = canvas.toDataURL("image/png");
                    var link = document.createElement('a');
                    link.href = image;
                    link.download = 'certificado.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    //
                    document.body.style.width = "100%";
                    document.body.style.height = "100%";
                    const container = await App.Render.Section("Pronto!");
                    const p = document.createElement("p");
                    p.innerHTML = "Você baixou seu certificado, aproveite. Você sempre poderá baixá-lo novamente retornando a esta página.<br>Dica: <i>Se limpou os dados do navegador ou teve que acessar de outro dispositivo, você pode abrir o console do navegador e digitar o comando:</i> <b>concluir(\"Seu Nome\");</b> e pressionar enter.<br>Se quiser reiniciar todo o curso, abra o console do navegador e digite o comando:</i> <b>reiniciar();</b> e pressione enter."
                    container.appendChild(p);
                    const nextBtn = document.createElement("button");
                    nextBtn.classList.add("fun-button");
                    nextBtn.textContent = "OK";
                    nextBtn.style.width = "fit-content";
                    nextBtn.style.margin = "auto";
                    container.appendChild(nextBtn);

                    nextBtn.onclick = e => window.location.reload();
                });

            }
            input.focus();
        }

        document.body.innerHTML = "";

        document.body.appendChild(toolsContainer());

        if (done) {
            toast("Parabéns! Você acabou de concluir o curso Guia de Segurança Digital para a Família!", 10)
            try { App.Music.stop(); } catch { }
            App.Music = new Howl({
                src: ['fx/victory.mp3'],
                loop: true,
                autoplay: true,
                volume: _VOLUME
            });
            App.Music.play();

            const background = document.createElement("div");
            background.id = "video-background";
            background.classList.add("video-background");
            const video = document.createElement("video");
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.src = "fx/fireworks.mp4";
            video.setAttribute("type", "video/mp4");
            background.appendChild(video);
            const close = document.createElement("span");
            close.classList.add("close");
            close.innerHTML = "✖";
            close.onclick = certificado;
            background.appendChild(close);
            document.body.appendChild(background);
        } else {
            certificado();
        }
    },
    _: () => { },
};

// #region FX
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

function toolsContainer() {
    const tools = document.createElement("div");
    tools.id = "tools";

    const menu = document.createElement("div");
    menu.classList.add("minimenu-container");
    const icon = document.createElement("div");
    icon.innerHTML = "☰";
    icon.classList.add("menu-icon");
    const options = document.createElement("ul");
    options.classList.add("menu-options");
    Object.keys(App.Chapters).forEach(key => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        if (Number(key) <= App.User.Steps) {
            a.textContent = `✅ ${App.Chapters[key]}`;
            li.onclick = App[App.Chapters[key]];
        } else {
            a.textContent = App.Chapters[key];
            li.style.opacity = "0.66";
        }
        li.appendChild(a);
        options.appendChild(li);
    });
    menu.appendChild(icon);
    menu.appendChild(options);
    document.body.appendChild(menu);

    const bodyEffect = document.createElement("div");
    bodyEffect.className = "body-effect";
    tools.appendChild(bodyEffect);
    const level = document.createElement("div");
    level.className = "level";

    const progress = document.createElement("div");
    progress.id = "progress";
    const bar = document.createElement("div");
    bar.id = "bar";
    progress.appendChild(bar);
    const chaptersDone = document.createElement("span");
    chaptersDone.id = "chapters-done";
    chaptersDone.textContent = "0/100";
    level.appendChild(progress);
    level.appendChild(chaptersDone);
    tools.appendChild(level);
    const credits = document.createElement("small");
    credits.className = "credits";
    const createdBy = document.createElement("span");
    createdBy.textContent = "Criado por:";
    const authorLink = document.createElement("a");
    authorLink.href = "https://www.jorgesouza.com.br/";
    authorLink.target = "_blank";
    authorLink.textContent = "Jorge Souza Oliveira dos Santos";
    credits.appendChild(createdBy);
    credits.appendChild(authorLink);
    tools.appendChild(credits);
    if (localStorage.getItem("progress")) {
        App.User = JSON.parse(localStorage.getItem("progress"));
        const totalChapters = Object.keys(App.Chapters).length;
        const doneChapters = App.User.Steps;
        chaptersDone.textContent = `${doneChapters}/${totalChapters}`;
        const percentDone = (doneChapters / totalChapters) * 100;
        bar.style.width = `${percentDone}%`;
    } else {
        localStorage.setItem("progress", JSON.stringify(App.User));
    }
    return tools;
}

// #endregion

window.concluir = (name = "Anônimo") => {
    App.User = {
        "Name": name,
        "Steps": 32,
        "LastChapter": "Certificado"
    }
    localStorage.setItem("progress", JSON.stringify(App.User));
}
window.reiniciar = () => {
    App.User = {
        "Name": "Anônimo",
        "Steps": 1,
        "LastChapter": "Boas-vindas"
    }
    localStorage.setItem("progress", JSON.stringify(App.User));
}

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
    //

    window.oncontextmenu = e => {
        e.preventDefault();
        return false;
    };

    function _back() {
        let btn = document.querySelectorAll(".fun-button")[0];
        if (btn.textContent != "Concluir") btn.click();
    }
    function _forward() {
        let btn = document.querySelectorAll(".fun-button")[1];
        if (btn.textContent != "Concluir") btn.click();
    }
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey) {
            switch (event.key) {
                case 'ArrowLeft':
                    _back();
                    break;
                case 'ArrowRight':
                    _forward();
                    break;
            }
        }
    });
})()
// #endregion


//