// Remover para retornar à pesquisa:
localStorage.setItem("confirmed-survey-2026", true);

const App = {
    Cursos: [],
    Livros: [],
    Apps: [],
    Posts: [],
    Preload: [false, false, false, false],
    Nav: (btn) => {
        document.querySelectorAll("icons-container .icon").forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
    },
    Main: async (callback = null) => {
        // Add icons to the TOPBAR:
        const icons = [
            {
                icon: "/files/home.svg",
                id: "btn-home",
                title: "Início",
                display: "block",
                action: () => { window.location = "/" }
            },
            {
                icon: "/files/learn.svg",
                id: "btn-cursos",
                title: "Cursos",
                display: "block",
                action: App.Learn
            },
            {
                icon: "/files/ret_branco.svg",
                id: "btn-kaatan",
                title: "Kaatan",
                display: "none",
                action: () => window.open('https://www.kaatan.com.br')
            },
            {
                icon: "/files/comunity.svg",
                title: "Comunidade",
                display: "none",
                action: App.Community
            },
            {
                icon: "/files/blog.svg",
                id: "btn-blog",
                title: "Atualizações",
                display: "block",
                action: App.Blog
            },
            {
                icon: "/files/cad.svg",
                id: "btn-cad",
                title: "Projetos",
                display: "block",
                action: App.Projects
            },
            {
                icon: "/files/web.svg",
                id: "btn-dev",
                title: "Desenvolvimento",
                display: "block",
                action: App.Dev
            },
            {
                icon: "/files/default.svg",
                id: "btn-contato",
                title: "Jorge Souza Oliveira dos Santos",
                display: "block",
                action: App.Contact
            },
            {
                icon: "/files/radio_signal.svg",
                id: "btn-radio",
                title: "Rádio Kaatan",
                display: "block",
                action: App.Radio.startStopRadio
            },
            {
                icon: "/files/radio_signal_on.svg",
                id: "btn-radio-on",
                title: "Rádio Kaatan",
                display: "none",
                action: App.Radio.startStopRadio
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
            span.id = x.id;
            span.onclick = x.action;
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
        fetch("/cursos.json").then(x => x.json()).then(cursos => {
            App.Cursos = cursos;
            App.Preload[0] = true;
        });
        fetch("/blog.json").then(x => x.json()).then(posts => {
            App.Posts = posts;
            App.Preload[1] = true;
        });

        fetch("/livros.json").then(x => x.json()).then(livros => {
            App.Livros = livros;
            App.Preload[2] = true;
        });

        fetch("/apps.json").then(x => x.json()).then(apps => {
            App.Apps = apps;
            App.Preload[3] = true;
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
        const routes = {
            blog: App.Blog,
            cursos: App.Learn,
            comunidade: App.Community,
            dev: App.Dev,
            digital: App.Digital,
            projetos: App.Projects,
            ia: App.IA.Learn,
            livros: App.Books,
            contato: App.Contact
        };
        const urlId = new URLSearchParams(window.location.search).get("call");
        if (routes[urlId]) {
            console.log(urlId);
            routes[urlId]();
        }
        const confirmed = localStorage.getItem("confirmed-survey-2026");
        if (!confirmed) {
            const res = await Modal.Confirm("Olá!", `<div style="width: 100%;"><div style="color: #00ffbb; font-weight: 600; width: 100%; text-align: center;">Posso tomar dez minutinhos do seu tempo?</div><br><div>Você é pequeno/médio empresário ou empreendedor individual e sente que seu empreendimento tem chances de crescer mais que o estado atual? Ou sente que a desorganização lhe toma tempo e dinheiro? Talvez estejamos construindo neste momento a solução que você esperava! Confirme no botão abaixo e responda a uma pesquisa rápida.</div></div>`, null);
            if (res) {
                localStorage.setItem("confirmed-survey-2026", "true");
                window.open('https://www.jorgesouza.com.br/pesquisa');
            }
        }
        if (callback) recall();
    },
    Footer: () => {
        const footer = document.createElement("card-big");
        footer.classList = "no-elastic";
        footer.style.backgroundColor = "transparent";
        footer.style.border = "var(--MediumBlue) 1px solid";
        footer.innerHTML = `
            <grid-row class="social-icons" style="justify-content: center;">
                <img src="/files/outlook.svg" onmouseover="Tooltip.Tooltip('E-mail', this)" onclick="window.open('mailto:jorge.sos777@outlook.com')">
                <img src="/files/whatsapp.svg" onmouseover="Tooltip.Tooltip('Whatsapp', this)" onclick="window.open('https://wa.me/5577999030420')">
                <img src="/files/amazon.svg" onmouseover="Tooltip.Tooltip('Amazon', this)" onclick="window.open('https://amazon.com.br/kindle-dbs/entity/author?asin=B0CM13195T')">
                <img src="/files/instagram.svg" onmouseover="Tooltip.Tooltip('Instagram', this)" onclick="window.open('https://www.instagram.com/jorgesouzaonline/')">
                <img src="/files/youtube.svg" onmouseover="Tooltip.Tooltip('Youtube', this)" onclick="window.open('https://www.youtube.com/@jorgesouzaonline')">
                <img src="/files/linkedin.svg" onmouseover="Tooltip.Tooltip('LinkedIn', this)" onclick="window.open('https://www.linkedin.com/in/jorge-souza-oliveira-dos-santos-2191923a9/')">
                <img src="/files/github.svg" onmouseover="Tooltip.Tooltip('GitHub', this)" onclick="window.open('https://github.com/jorgeoliveirasantos')">
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
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="window.location = "/"">início</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Blog()">blog</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Learn()">cursos</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="window.open('https://www.kaatan.com.br')">kaatan</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Digital()">educação digital</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Contact()">contato</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Books()">livros</text-link>
            </span>
        `;
        document.querySelector("app-container").appendChild(footer);
        document.getElementById("home-credit-ano").textContent = new Date().getFullYear();
        if (document.querySelector("app-container")) {
        }
    },
    Course: (id, title, description, cover, sale = true, downloads, ebook, kindle, print, preview, book = false) => {
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
        coverElement.style.maxWidth = book ? "100%" : "300px";
        coverElement.style.border = "var(--MediumBlue) 5px solid";
        coverElement.style.pointerEvents = "none";
        cursoContainer.appendChild(coverElement);

        const descriptionElement = document.createElement("text-paragraph");
        descriptionElement.innerHTML = description;
        cursoContainer.appendChild(descriptionElement);

        if (sale) {
            const listElement = document.createElement("compact-list");
            listElement.innerHTML = `
                    <list-item onclick="window.open('${preview}')" style="display: ${preview == null ? 'none' : 'flex'};">
                        <img src="/files/see.svg">
                        <text-label>Ver uma prévia</text-label>
                    </list-item>
                    <list-item onclick="window.open('${print}')" style="display: ${print == null ? 'none' : 'flex'};">
                        <img src="/files/book.svg">
                        <text-label>Obter o livro impresso</text-label>
                    </list-item>
                    <list-item onclick="window.open('${kindle}')" style="display: ${kindle == null ? 'none' : 'flex'};">
                        <img src="/files/amazon.svg">
                        <text-label>Obter o Ebook Kindle</text-label>
                    </list-item>
                    <list-item onclick="window.open('${ebook}')" style="display: ${ebook == null ? 'none' : 'flex'};">
                        <img src="/files/${id}.svg">
                        <text-label>Obter o Ebook em PDF</text-label>
                    </list-item>
                    <list-item onclick="window.open('${downloads}')" style="display: ${downloads == null ? 'none' : 'flex'};">
                        <img src="/files/download.svg">
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
            cursoContainer.appendChild(document.createElement("horizontal-divider"));
        } else {
            const obs = document.createElement("text-paragraph");
            obs.textContent = "Este curso é feito em parceria com instituições de ensino e seu material só pode ser adquirido junto com um curso presencial.";
            obs.style.fontStyle = "italic";
            cursoContainer.appendChild(obs);
            const btn = document.createElement("button-squared");
            btn.onclick = App.Contact;
            btn.textContent = "Contato";
            cursoContainer.appendChild(btn);
            cursoContainer.style.display = "none";
        }
        //
        cursoContainer.style.placeItems = "none";
        cursoContainer.style.justifyItems = "center";
        return cursoContainer;
    },
    Dev: () => {
        function renderApps(id, title, description, cover, sale = true, downloads, github, kindle, android, preview, book = false) {
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
            coverElement.style.maxWidth = book ? "100%" : "300px";
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
                        <img src="/files/see.svg">
                        <text-label>Acesse a aplicação online</text-label>
                    </list-item>
                    <list-item onclick="window.open('${android}')" style="display: ${android == null ? 'none' : 'flex'};">
                        <img src="/files/book.svg">
                        <text-label>Obter o livro impresso</text-label>
                    </list-item>
                    <list-item onclick="window.open('${kindle}')" style="display: ${kindle == null ? 'none' : 'flex'};">
                        <img src="/files/amazon.svg">
                        <text-label>Obter o Ebook Kindle</text-label>
                    </list-item>
                    <list-item onclick="window.open('${github}')" style="display: ${github == null ? 'none' : 'flex'};">
                        <img src="/files/github.svg">
                        <text-label>Veja o código fonte no GitHub</text-label>
                    </list-item>
                    <list-item onclick="window.open('${downloads}')" style="display: ${downloads == null ? 'none' : 'flex'};">
                        <img src="/files/info.svg">
                        <text-label>Baixe a aplicação para Windows</text-label>
                    </list-item>
                    <span style="width: 100%; text-align: center;">
                        <text-link ${kindle == null ? 'style="display: none;' : {}} onclick="window.open('https://youtu.be/Kgre-n-Rf3A')" style="font-size: small; text-align: center;">Como ler e-books Kindle no celular</text-link>
                        <text-link ${kindle == null ? 'style="display: none;' : {}} onclick="window.open('https://www.amazon.com.br/b?node=17877530011')" style="font-size: small; text-align: center;">Baixe o Kindle para PC</text-link>
                    </span>
                `;
                listElement.style.borderRadius = "5px";
                cursoContainer.appendChild(listElement);
            } else {
                const obs = document.createElement("text-paragraph");
                obs.textContent = "Este curso é feito em parceria com instituições de ensino e seu material só pode ser adquirido junto com um curso presencial.";
                obs.style.fontStyle = "italic";
                cursoContainer.appendChild(obs);
                const btn = document.createElement("button-squared");
                btn.onclick = App.Contact;
                btn.textContent = "Contato";
                cursoContainer.appendChild(btn);
                cursoContainer.style.display = "none";
            }
            //
            cursoContainer.style.placeItems = "none";
            cursoContainer.style.justifyItems = "center";
            return cursoContainer;
        }
        const appContainer = document.createElement("app-container");
        App.Apps.forEach(curso => {
            appContainer.appendChild(renderApps(
                curso["id"], // id
                curso["titulo"], // title
                curso["descrição"], // description
                curso["capa"], // cover
                curso["a-venda"], // sale
                curso["downloads"], // downloads
                curso["github"], // github
                curso["kindle"], // kindle
                curso["android"], // android
                curso["preview"], // preview
                true // book
            ));
            appContainer.appendChild(document.createElement("horizontal-divider"));
        });
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
        document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
        App.Nav(document.getElementById("btn-dev"));
    },
    // A Jornada do Ser:
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
                            <span class="${coverType ? 'image-container' : 'video-container'}" style="display: ${post.video == null ? 'none' : 'flex'};">
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
        App.Nav(document.getElementById("btn-blog"));
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
        App.Nav(document.getElementById("btn-cursos"));
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
            window.location.href = "/jorge/community";
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
            console.log("Loading chat interface...");
            await Renderer.Load("ia/chat", APPVIEW);
            const input = document.getElementById("chatInput");
            input.value = "";
            const form = input.closest("form");
            form?.addEventListener("submit", e => {
                e.preventDefault();
                sendMessage(e);
            });
            input.addEventListener("keydown", e => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                }
            });
            const sendBtn = document.getElementById("sendBtn");
            sendBtn.addEventListener("click", e => {
                e.preventDefault();
                sendMessage(e);
            });

            function escapeHtml(unsafe) {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }

            function sendMessage(e) {
                if (e && e.type === 'keydown' && e.key !== 'Enter') return;
                const msg = (input.value || input.textContent || '').toString().trim();
                if (!msg) return;
                const chatContainer = document.getElementById("chatMessages");

                // Create user message element
                const userMessage = document.createElement("div");
                userMessage.classList.add("message", "user");
                userMessage.innerHTML = `<strong>Você</strong><span class="bubble user-bubble">${escapeHtml(msg)}</span>`;
                chatContainer.appendChild(userMessage);
                chatContainer.scrollTo({ top: chatContainer.scrollHeight, left: 0, behavior: "smooth" });

                // Send to server
                const url = `https://www.jorgesouza.com.br/prompt`;
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: msg })
                }).then(response => response.json()).then(data => {
                    const reply = data.answer || '';
                    // Create bot message element
                    const botMessage = document.createElement("div");
                    botMessage.classList.add("message", "bot");
                    botMessage.innerHTML = `<strong>Kaatan Bot</strong><span class="bubble bot-bubble">${escapeHtml(reply)}</span>`;
                    chatContainer.appendChild(botMessage);
                    chatContainer.scrollTo({ top: chatContainer.scrollHeight, left: 0, behavior: "smooth" });
                    // Clear input
                    if ('value' in input) input.value = ""; else input.textContent = "";
                    input.focus();
                }).catch(error => {
                    Modal.Message("Error", "An error occurred while sending the message. Please try again later.");
                    console.error("Error:", error);
                });
            }
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
        Modal.ConfirmAction("Curso de Segurança Digital para a Família", "Este é um curso interativo, divertido e, com certificado de conclusão! Então o que está esperando? Quer aprender a excitante experiência da tecnologia de forma segura e consciente? Clique no botão abaixo e comece sua jornada!", () => window.open("/digital/"));
    },
    Projects: () => {
        APPVIEW.innerHTML = "";
        const tabs = document.createElement("acacia-tabs");

        // Galeria
        const galleryContainer = document.createElement("card-big");
        galleryContainer.classList.add("no-hover");
        galleryContainer.classList.add("no-elastic");
        const appContainer = document.createElement("app-container");

        // Título:
        const title = document.createElement("text-heading");
        title.textContent = "Projetos";

        // Subtítulo:
        const subtitle1 = document.createElement("text-subheading");
        subtitle1.textContent = "Maquete eletrônica";

        // Descrição:
        const description = document.createElement("text-paragraph");
        description.textContent = "Aqui apresento alguns dos projetos de Arquitetura e Interiores, que desenvolvi ao longo de 18 anos de experiência, atuando como freelancer para clientes em todo o Brasil, com resultados reconhecidos pela alta satisfação.\nVocê pode ainda verificar meus projetos como freelancer na Workana no link abaixo";

        // Descrição:
        const link = document.createElement("text-link");
        link.textContent = "Meu perfil na Workana";
        link.onclick = e => window.open("https://www.workana.com/freelancer/175498bc00eeda4731ad4044f609f5a5");

        const headerContainer = document.createElement("card-big");
        const titleContainer = document.createElement("card-big");
        titleContainer.classList.add("no-hover", "no-elastic");
        const subtitleContainer = document.createElement("card-big");
        subtitleContainer.classList.add("no-hover", "no-elastic");
        titleContainer.classList.add();
        headerContainer.classList.add("no-hover");
        headerContainer.classList.add("no-elastic");
        titleContainer.appendChild(title);
        subtitleContainer.appendChild(subtitle1);
        headerContainer.appendChild(description);
        headerContainer.appendChild(link);

        // Subtítulo 2:
        const subtitleContainer2 = document.createElement("card-big");
        subtitleContainer2.classList.add("no-hover", "no-elastic");
        const subtitle2 = document.createElement("text-subheading");
        subtitle2.textContent = "Detalhamentos 2D";
        subtitleContainer2.appendChild(subtitle2);
        const iframe1 = document.createElement("card-big");
        iframe1.classList.add("no-hover", "no-elastic");
        iframe1.innerHTML = `
            <iframe src="projects files/Detalhamentos.pdf" width="100%" height="600px" style="border: none;">
                <p>O seu navegador não suporta a visualização de PDFs. 
                <a href="projects files/Detalhamentos.pdf">Clique aqui para baixar o arquivo</a>.</p>
            </iframe>
        `;

        // Subtítulo 3:
        const subtitleContainer3 = document.createElement("card-big");
        subtitleContainer3.classList.add("no-hover", "no-elastic");
        const subtitle3 = document.createElement("text-subheading");
        subtitle3.textContent = "Aprovação";
        subtitleContainer3.appendChild(subtitle3);
        const iframe2 = document.createElement("card-big");
        iframe2.classList.add("no-hover", "no-elastic");
        iframe2.innerHTML = `
            <iframe src="projects files/Aprovação.pdf" width="100%" height="600px" style="border: none;">
                <p>O seu navegador não suporta a visualização de PDFs. 
                <a href="projects files/Aprovação.pdf">Clique aqui para baixar o arquivo</a>.</p>
            </iframe>
        `;

        // Adicionar elementos:
        appContainer.appendChild(titleContainer);
        appContainer.appendChild(headerContainer);
        appContainer.appendChild(document.createElement("horizontal-divider"));
        appContainer.appendChild(subtitleContainer);
        appContainer.appendChild(galleryContainer);
        appContainer.appendChild(document.createElement("horizontal-divider"));
        appContainer.appendChild(subtitleContainer2);
        appContainer.appendChild(iframe1);
        appContainer.appendChild(document.createElement("horizontal-divider"));
        appContainer.appendChild(subtitleContainer3);
        appContainer.appendChild(iframe2);

        // Final
        tabs.appendChild(appContainer);
        APPVIEW.appendChild(tabs);

        const sources = [
            "/projects files/5.jpg",
            "/projects files/7.jpg",
            "/projects files/8.jpg",
            "/projects files/9.jpg",
            "/projects files/10.jpg",
            "/projects files/11.jpg",
            "/projects files/12.jpg",
            "/projects files/18.jpg",
            "/projects files/19.jpg",
            "/projects files/21.jpg",
            "/projects files/22.jpg",
            "/projects files/23.jpg",
            "/projects files/24.jpg",
            "/projects files/13.jpg"
        ];
        const gallery = new Gallery("myGallery", sources, galleryContainer);
        App.Footer();
        App.Nav(document.getElementById("btn-cad"));
    },
    Contact: () => {
        Renderer.Load("me", APPVIEW).then(() => {
            App.Footer();
        });
        App.Nav(document.getElementById("btn-contato"));
    },
    Radio: {
        startStopRadio: async () => {
            // Implementation for starting the radio
            if (!document.getElementById("radio-script")) {
                // Create and append the radio script
                const script = document.createElement("script");
                script.id = "radio-script";
                script.type = "module";
                script.src = "https://kaatan.azurewebsites.net/radio/lib/radiokaatan.js";
                document.head.appendChild(script);
                // Wait for the script to load and initialize the radio
                script.onload = App.Radio.toggle;
            } else {
                App.Radio.toggle();
            }
        },
        toggle: () => {
            if (Radio.Stream()) {
                document.getElementById("btn-radio").style.display = "none";
                document.getElementById("btn-radio-on").style.display = "block";
                Tooltip.Toast("Iniciando Rádio Kaatan, aguarde...", 7);
            } else {
                Tooltip.Toast("Encerrando a transmissão da Rádio Kaatan.", 3);
                document.getElementById("btn-radio-on").style.display = "none";
                document.getElementById("btn-radio").style.display = "block";
            }
        }
    },
    _: () => { },
}

window.App = App;


