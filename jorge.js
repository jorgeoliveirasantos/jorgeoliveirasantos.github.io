
const App = {
    Cursos: [],
    Livros: [],
    Posts: [],
    Preload: [false, false, false],
    Main: async (callback = null) => {
        // Add icons to the TOPBAR:
        const icons = [
            {
                icon: "https://kaatan.azurewebsites.net/files/home.svg",
                title: "Início",
                display: "block",
                action: () => { window.location = '/' }
            },
            {
                icon: "https://kaatan.azurewebsites.net/files/learn.svg",
                title: "Cursos",
                display: "block",
                action: App.Learn
            },
            {
                icon: "https://kaatan.azurewebsites.net/files/learn.svg",
                title: "Livros",
                display: "none",
                action: App.Books
            },
            {
                icon: "https://kaatan.azurewebsites.net/files/logo128.png",
                title: "Kaatan",
                display: "none",
                action: () => window.open('https://www.kaatan.com.br')
            },/*
            {
                icon: "https://kaatan.azurewebsites.net/files/comunity.svg",
                title: "Comunidade",
                action: App.Community
            },*/
            {
                icon: "https://kaatan.azurewebsites.net/files/news.svg",
                title: "Blog",
                display: "block",
                action: App.Blog
            }
        ];
        TOPBAR.innerHTML = "";
        icons.forEach(x => {
            const span = document.createElement("span");
            span.classList = "icon";
            span.style.height = "30px";
            span.style.padding = "3px 5px";
            span.style.cursor = "pointer";
            span.style.opacity = "0.5";
            span.style.display = x.display;
            span.onclick = e => {
                document.querySelectorAll(".icon").forEach(x => x.classList.remove('active'));
                span.classList.add('active');
                x.action();
            };
            span.onmouseover = () => {
                Tooltip.Tooltip(x.title, span);
                span.style.opacity = "1";
            };
            span.onmouseleave = () => {
                span.style.opacity = "0.5";
            };

            const img = document.createElement("img");
            img.src = x.icon;
            img.style.height = "24px";
            span.appendChild(img);
            TOPBAR.appendChild(span);
        });
        TOPBAR.style.justifyContent = "center";

        App.Footer();

        document.head.querySelectorAll("link").forEach(lnk => {
            if (lnk.getAttribute("rel") == "shortcut icon") {
                lnk.setAttribute("href", "/files/logo.svg");
            }
        });

        setInterval(() => {
            if (Renderer.Layout.IsPortraitLayout) {
                try {
                    document.getElementById("js-video-present-V").style.display = "flex";
                    document.getElementById("js-video-present-H").style.display = "none";
                } catch { }
            } else {
                try {
                    document.getElementById("js-video-present-V").style.display = "none";
                    document.getElementById("js-video-present-H").style.display = "flex";
                } catch { }
            }
        }, 2001);
        fetch("cursos.json").then(x => x.json()).then(cursos => {
            App.Cursos = cursos;
            App.Preload[0] = true;
        });
        fetch("blog.json").then(x => x.json()).then(posts => {
            App.Posts = posts;
            App.Preload[1] = true;
        });

        fetch("livros.json").then(x => x.json()).then(livros => {
            App.Livros = livros;
            App.Preload[2] = true;
        });

        document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
        function recall() {
            if (document.querySelector("app-view") && App.Preload.every(y => y)) {
                callback();
            } else {
                setTimeout(recall, 100);
            }
        }
        document.querySelector(".icon").classList.add("active");
        if (callback) recall();
    },
    Footer: () => {
        const footer = document.createElement("card-big");
        footer.classList = "no-elastic";
        footer.style.backgroundColor = "transparent";
        footer.style.border = "var(--MediumBlue) 1px solid";
        footer.innerHTML = `
            <grid-row class="social-icons" style="justify-content: center;">
                <img src="files/outlook.svg" onmouseover="Tooltip.Tooltip('E-mail', this)" onclick="window.open('mailto:jorge.sos777@outlook.com')">
                <img src="files/whatsapp.svg" onmouseover="Tooltip.Tooltip('Whatsapp', this)" onclick="window.open('https://wa.me/5577999030420')">
                <img src="files/amazon.svg" onmouseover="Tooltip.Tooltip('Amazon', this)" onclick="window.open('https://amazon.com.br/kindle-dbs/entity/author?asin=B0CM13195T')">
                <img src="files/instagram.svg" onmouseover="Tooltip.Tooltip('Instagram', this)" onclick="window.open('https://www.instagram.com/jorgesouzaonline/')">
                <img src="files/youtube.svg" onmouseover="Tooltip.Tooltip('Youtube', this)" onclick="window.open('https://www.youtube.com/@jorgesouzaonline')">
            </grid-row>

            <horizontal-divider></horizontal-divider>
            
            <text-paragraph style="text-align: center;">
                "Se um homem não descobriu nada pelo qual morreria, não está pronto para viver."<br>
                <i>Martin Luther King</i>
            </text-paragraph>
            <horizontal-divider></horizontal-divider>
            <text-paragraph style="text-align: center;">
            Copyright © <span id="home-credit-ano">1999</span> | Jorge Souza Oliveira dos Santos
            </text-paragraph>
            <span style="justify-content: space-around; display: flex; flex-direction: row; padding: 10px; gap: 5px; flex-wrap: wrap;">
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="window.location = '/'">início</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Blog()">blog</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Learn()">cursos</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="window.open('https://www.kaatan.com.br')">kaatan</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Digital()">educação digital</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Contact()">contato</text-link>
            </span>
        `;
        document.querySelector("app-container").appendChild(footer);
        document.getElementById("home-credit-ano").textContent = new Date().getFullYear();
        if (document.querySelector("app-container")) {
        }
    },
    Course: (id, title, description, cover, sale = true, downloads, ebook, kindle, print, preview) => {
        const cursoContainer = document.createElement("card-big");
        cursoContainer.classList.add("no-elastic");
        cursoContainer.id = id;

        const titleElement = document.createElement("text-heading");
        titleElement.textContent = title;
        cursoContainer.appendChild(titleElement);

        cursoContainer.appendChild(document.createElement("horizontal-divider"));

        const coverElement = document.createElement("img");
        coverElement.src = cover;
        coverElement.style.width = "100%";
        coverElement.style.maxWidth = "300px";
        coverElement.style.border = "var(--MediumBlue) 5px solid";
        coverElement.style.pointerEvents = "none";
        cursoContainer.appendChild(coverElement);

        const descriptionElement = document.createElement("text-paragraph");
        descriptionElement.innerHTML = description;
        cursoContainer.appendChild(descriptionElement);

        cursoContainer.appendChild(document.createElement("horizontal-divider"));

        if (sale) {
            const listElement = document.createElement("compact-list");
            listElement.innerHTML = `
                    <list-item onclick="window.open('${preview}')" style="display: ${preview == null ? 'none' : 'flex'};">
                        <img src="./files/see.svg">
                        <text-label>Ver uma prévia</text-label>
                    </list-item>
                    <list-item onclick="window.open('${ebook}')" style="display: ${print == null ? 'none' : 'flex'};">
                        <img src="./files/${id}.svg">
                        <text-label>Obter o livro impresso</text-label>
                    </list-item>
                    <list-item onclick="window.open('${kindle}')" style="display: ${kindle == null ? 'none' : 'flex'};">
                        <img src="./files/amazon.svg">
                        <text-label>Obter o Ebook Kindle</text-label>
                    </list-item>
                    <list-item onclick="window.open('${ebook}')" style="display: ${ebook == null ? 'none' : 'flex'};">
                        <img src="./files/${id}.svg">
                        <text-label>Obter o Ebook em PDF</text-label>
                    </list-item>
                    <list-item onclick="window.open('${downloads}')" style="display: ${downloads == null ? 'none' : 'flex'};">
                        <img src="./files/download.svg">
                        <text-label>Downloads do curso</text-label>
                    </list-item>
                    <span style="width: 100%; text-align: center;">
                        <text-link ${kindle == null ? 'style="display: none;' : {}} onclick="window.open('https://youtu.be/Kgre-n-Rf3A')" style="font-size: small; text-align: center;">Como ler e-books Kindle no celular</text-link>
                        <text-link ${kindle == null ? 'style="display: none;' : {}} onclick="window.open('https://www.amazon.com.br/b?node=17877530011')" style="font-size: small; text-align: center;">Baixe o Kindle para PC</text-link>
                    </span>
                `;
            listElement.style.borderRadius = "5px";
            cursoContainer.appendChild(listElement);
            //document.getElementById(`${id}-kindle`). onclick = e => window.open(kindle);
            //document.getElementById(`${id}-ebook`). onclick = e => window.open(ebook);
            //document.getElementById(`${id}-downloads`). onclick = e => window.open(downloads);
            //document.getElementById(`${id}-preview`). onclick = e => window.open(preview);
        } else {
            const obs = document.createElement("text-paragraph");
            obs.textContent = "Este curso é feito em parceria com instituições de ensino e seu material só pode ser adquirido junto com um curso presencial.";
            obs.style.fontStyle = "italic";
            cursoContainer.appendChild(obs);
            const btn = document.createElement("button-squared");
            btn.onclick = App.Contact;
            btn.textContent = "Contato";
            cursoContainer.appendChild(btn);
        }
        //
        cursoContainer.style.placeItems = "none";
        cursoContainer.style.justifyItems = "center";
        return cursoContainer;
    },
    Books: () => {
        const appContainer = document.createElement("app-container");
        App.Livros.forEach(curso => {
            appContainer.appendChild(App.Course(
                curso["id"],
                curso["titulo"],
                curso["descrição"],
                curso["capa"],
                curso["a-venda"],
                curso["downloads"],
                curso["ebook"],
                curso["kindle"],
                curso["print"],
                curso["preview"]
            ));
            appContainer.appendChild(document.createElement("horizontal-divider"));
        });
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
        document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    Blog: () => {
        Renderer.Load("blog", APPVIEW).then(() => {
            let startIndex = 0;
            let endIndex = 4;
            document.getElementById("blog-next-btn").onclick = () => {
                if (endIndex >= App.Posts.length) return;
                document.getElementById("blog-content").innerHTML = "";
                startIndex += 5;
                endIndex += 5;
                updatePosts(startIndex, endIndex);
            };
            document.getElementById("blog-prev-btn").onclick = () => {
                if (startIndex <= 0) return;
                document.getElementById("blog-content").innerHTML = "";
                startIndex -= 5;
                endIndex -= 5;
                updatePosts(startIndex, endIndex);
            };
            function updatePosts(start, end) {
                for (let i = start; i <= end; i++) {
                    const post = App.Posts[i];
                    const coverType = post.video.endsWith(".jpg") ||
                        post.video.endsWith(".jpeg") ||
                        post.video.endsWith(".svg") ||
                        post.video.endsWith(".png") ||
                        post.video.endsWith(".gif");
                    //
                    const postContainer = document.createElement("grid-column");
                    postContainer.classList = "post-container";
                    postContainer.innerHTML = `
                    <card-big class="post-container no-elastic no-hover">
                        <grid-column class="no-elastic">
                            <text-heading>${post.titulo}</text-heading>
                        </grid-column>
                        <horizontal-divider></horizontal-divider>
                        <grid-column class="no-elastic">
                            <text-label style="opacity: 0.7;">Postado em ${post.data}</text-label>
                            <span class="video-container" style="display: ${post.video == null ? 'none' : 'flex'};">
                                <iframe src="${post.video}" allowfullscreen style="display: ${coverType ? 'none' : 'flex'};"></iframe>
                                <img src="${post.video}" style="display: ${coverType ? 'flex' : 'none'};"></iframe>
                            </span>
                        </grid-column>
                        <grid-column>
                            <text-paragraph style="text-align: left;">${post.descrição}</text-paragraph>
                        </grid-column>
                        <grid-column style="display: ${post.links == null ? 'none' : 'flex'};">
                            <horizontal-divider></horizontal-divider>
                            <button-squared onclick="window.open('${post.links ? post.links.link : ''}')">${post.links ? post.links.titulo : ''}</button-squared>
                        </grid-column>
                    </card-big>
                    <horizontal-divider></horizontal-divider>
                `;
                    //
                    document.getElementById("blog-content").appendChild(postContainer);
                }
                document.getElementById("blog-content").scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
            updatePosts(startIndex, endIndex);
        });
    },
    Learn: () => {
        const appContainer = document.createElement("app-container");
        App.Cursos.forEach(curso => {
            appContainer.appendChild(App.Course(
                curso["id"],
                curso["titulo"],
                curso["descrição"],
                curso["capa"],
                curso["a-venda"],
                curso["downloads"],
                curso["ebook"],
                curso["kindle"],
                curso["print"],
                curso["preview"]
            ));
            appContainer.appendChild(document.createElement("horizontal-divider"));
        });
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
        document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    Community: () => {
        // Load comments from Disqus:
        function disqus() {
            const appContainer = document.createElement("app-container");
            // 
            const card = document.createElement("card-big");
            card.classList = "no-elastic no-hover";
            const commentSecion = document.createElement("div");
            commentSecion.id = "disqus_thread";
            commentSecion.style.width = "100%";
            card.appendChild(commentSecion);
            // 
            APPVIEW.innerHTML = "";
            appContainer.appendChild(card);
            APPVIEW.appendChild(appContainer);
            App.Footer();

            var d = document, s = d.createElement('script');
            s.src = 'https://jorgeoliveirasantos.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        // Load a Kaatan Chat Room:
        function community() {
            window.location.href = "/community";
        }
        //community();
        disqus();
    },
    // IA & ML:
    IA: {
        Learn: async () => {
            await Renderer.Load("ia/learn", APPVIEW);
            //
            //App.Footer();
            document.getElementById("learn-tab").onclick = App.IA.Learn;
            document.getElementById("train-tab").onclick = App.IA.Train;
            document.getElementById("chat-tab").onclick = App.IA.Chat;
            document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        Train: async () => {
            await Renderer.Load("ia/train", APPVIEW);
            const corpus = {
                name: "Corpus",
                locale: "pt-BR",
                data: []
            }
            let data = {
                intent: "assistente.oi",
                utterances: [],
                answers: []
            }
            const utterance = document.getElementById("utterance");
            const intent = document.getElementById("intent");
            const answer = document.getElementById("answer");
            const addDataToCorpusBtn = document.getElementById("addDataToCorpus");
            const inputName = document.getElementById("name");
            const locale = document.getElementById("locale");

            document.getElementById("addDataToCorpus").onclick = addDataToCorpus;
            document.getElementById("downloadCorpus").onclick = downloadCorpus;
            document.getElementById("viewCorpus").onclick = viewCorpus;
            document.getElementById("applyCorpus").onclick = applyCorpus;
            document.getElementById("importCorpus").onclick = importCorpus;
            document.getElementById("clearCorpus").onclick = clearCorpus;
            answer.addEventListener("keydown", addData);
            utterance.addEventListener("keydown", next);
            utterance.focus();

            inputName.value = corpus.name;
            locale.value = corpus.locale
            intent.value = data.intent;
            window.addEventListener("keydown", e => {
                if (e.ctrlKey && e.key == "Enter") {
                    addDataToCorpus();
                }
            });

            function addData(e) {
                if (e.key == "Enter") {
                    if (utterance.value == "" && answer.value == "") return;
                    data.utterances.push(utterance.value);
                    data.answers.push(answer.value);
                    console.clear();
                    console.log(data);
                    utterance.value = "";
                    utterance.focus();
                }
            }

            function addDataToCorpus() {
                data.intent = intent.value;
                if (data.intent == "" || data.answers.length == 0 || data.utterances.length == 0) {
                    console.log("Empty intent, utterance or answer");
                    return;
                }
                corpus.data.push(data);
                data = {
                    intent: intent.value,
                    utterances: [],
                    answers: []
                }
                console.clear();
                console.log("Added to corpus");
            }

            function downloadCorpus(e) {
                let a = document.createElement("a");
                a.download = corpus.name;
                let blob = new Blob([JSON.stringify(corpus, null, 4)], { type: 'application/json' });
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.click();
                window.URL.revokeObjectURL(url);
                a = null;
            }

            function next(e) {
                if (e.key != "Enter") return;
                answer.focus();
            }

            function viewCorpus() {
                var url = "data:text/html;charset=utf-8," + encodeURIComponent();
                var blob = new Blob([JSON.stringify(corpus, false, 4)], { type: "application/json" });
                var url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            }

            function applyCorpus() {
                corpus.name = inputName.value;
                corpus.locale = locale.value;
                alert("Applied!");
            }

            function importCorpus() {
                let ok = confirm("This will replace in-memory corpus!");
                if (!ok) return;
                const uploadInput = document.createElement("input");
                uploadInput.type = "file";
                uploadInput.oninput = () => {
                    const file = uploadInput.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const content = JSON.parse(event.target.result);
                            if (!content.data) throw new Error("Invalid");
                            if (!content.locale) throw new Error("Invalid");
                            if (!content.name) throw new Error("Invalid");
                            corpus.name = content.name;
                            corpus.locale = content.locale;
                            corpus.data = content.data;
                            inputName.value = corpus.name;
                            locale.value = corpus.locale;
                            alert("Corpus loaded!");
                        } catch (error) {
                            alert(error);
                        }
                    };
                    reader.readAsText(file);
                }
                uploadInput.click();
            }

            function clearCorpus() {
                let ok = confirm("This will clear all corpus data!");
                if (!ok) return;
                corpus.data = [];
                alert("Corpus data cleared!");
            }

            //App.Footer();
            document.getElementById("learn-tab").onclick = App.IA.Learn;
            document.getElementById("train-tab").onclick = App.IA.Train;
            document.getElementById("chat-tab").onclick = App.IA.Chat;
            document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        Chat: async () => {
            await Renderer.Load("ia/chat", APPVIEW);
            //
            //App.Footer();
            document.getElementById("learn-tab").onclick = App.IA.Learn;
            document.getElementById("train-tab").onclick = App.IA.Train;
            document.getElementById("chat-tab").onclick = App.IA.Chat;
            document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
    },
    // Cursos:
    Digital: () => {
        Modal.ConfirmAction("Curso de Segurança Digital para a Família", "Este é um curso interativo, divertido e, com certificado de conclusão! Então o que está esperando? Quer aprender a excitante experiência da tecnologia de forma segura e consciente? Clique no botão abaixo e comece sua jornada!", () => window.open("/digital"));
    },
    Contact: () => {
        window.open('https://wa.me/5577999030420');
    },
    _: () => { },
}

window.App = App;


