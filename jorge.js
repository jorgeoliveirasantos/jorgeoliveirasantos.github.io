
const App = {
    Cursos: [],
    Livros: [],
    Posts: [],
    Main: async () => {
        // Add icons to the TOPBAR:
        const icons = [
            {
                icon: "files/logo.svg",
                title: "Início",
                display: "block",
                action: () => { window.location = '/' }
            },
            {
                icon: "files/blog.svg",
                title: "Blog",
                display: "block",
                action: App.Blog
            },
            {
                icon: "files/learn.svg",
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
                icon: "files/chat.svg",
                title: "Comunidade",
                action: App.Community
            }
        ];
        TOPBAR.innerHTML = "";
        icons.forEach(x => {
            const span = document.createElement("span");
            span.style.height = "30px";
            span.style.padding = "3px 5px";
            span.style.cursor = "pointer";
            span.style.opacity = "0.5";
            span.style.display = x.display;
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
        fetch("cursos.json").then(x => x.json()).then(cursos => App.Cursos = cursos);
        fetch("blog.json").then(x => x.json()).then(posts => {
            App.Posts = posts;
        });
        fetch("livros.json").then(x => x.json()).then(livros => App.Livros = livros);
        document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    Footer: () => {
        const footer = document.createElement("card-big");
        footer.classList = "no-elastic";
        footer.style.backgroundColor = "transparent";
        footer.style.border = "var(--MediumBlue) 1px solid";
        footer.innerHTML = `
            <grid-row class="social-icons" style="justify-content: center;">
                <img src="../files/outlook.svg" onmouseover="Tooltip.Tooltip('E-mail', this)" onclick="window.open('mailto:jorge.sos777@outlook.com')">
                <img src="../files/whatsapp.svg" onmouseover="Tooltip.Tooltip('Whatsapp', this)" onclick="window.open('https://wa.me/5577999030420')">
                <img src="../files/amazon.svg" onmouseover="Tooltip.Tooltip('Amazon', this)" onclick="window.open('https://amazon.com.br/kindle-dbs/entity/author?asin=B0CM13195T')">
                <img src="../files/instagram.svg" onmouseover="Tooltip.Tooltip('Instagram', this)" onclick="window.open('https://www.instagram.com/jorgesouzaonline/')">
                <img src="../files/youtube.svg" onmouseover="Tooltip.Tooltip('Youtube', this)" onclick="window.open('https://www.youtube.com/@jorgesouzaonline')">
                <img src="../files/chat.svg" onmouseover="Tooltip.Tooltip('Enviar mensagem', this)" onclick="App.Community()">
            </grid-row>

            <horizontal-divider></horizontal-divider>

            <text-paragraph style="text-align: center;">
            "'Ame o Senhor, o seu Deus, de todo o seu coração, de toda a sua alma e de todo o seu entendimento'. Este é o primeiro e maior mandamento. E o segundo é semelhante a ele: 'Ame o seu próximo como a si mesmo'. Destes dois mandamentos dependem toda a Lei e os Profetas"<br>
            <i>Mateus 22:36-40</i>
            </text-paragraph>
            <horizontal-divider></horizontal-divider>
            <text-paragraph style="text-align: center;">
            Copyright © <span id="home-credit-ano">1999</span> | Jorge Souza Oliveira dos Santos
            </text-paragraph>
        `;
        document.querySelector("app-container").appendChild(footer);
        document.getElementById("home-credit-ano").textContent = new Date().getFullYear();
    },
    Course: (id, title, description, cover, sale = true, downloads, ebook, kindle, preview) => {
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
        descriptionElement.textContent = description;
        cursoContainer.appendChild(descriptionElement);

        cursoContainer.appendChild(document.createElement("horizontal-divider"));

        if (sale) {
            const listElement = document.createElement("compact-list");
            listElement.innerHTML = `
                    <list-item onclick="window.open('${preview}')" style="display: ${preview == null ? 'none' : 'flex'};">
                        <img src="./files/see.svg">
                        <text-label>Ver uma prévia</text-label>
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
            let endIndex = 3;
            App.Posts.forEach(post => {
                //return;
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
                                <iframe src="${post.video}" allowfullscreen></iframe>
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
            });
            //
            document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
    },
    Cad: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "cad");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    "3d": () => {
        const curso = App.Cursos.find(cursos => cursos.id == "3d");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    Info: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "info");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    Design: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "design");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    Web: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "web");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    JS: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "js");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    App: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "app");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    IA: () => {
        const curso = App.Cursos.find(cursos => cursos.id == "ia");
        const appContainer = document.createElement("app-container");
        appContainer.appendChild(App.Course(
            curso["id"],
            curso["titulo"],
            curso["descrição"],
            curso["capa"],
            curso["a-venda"],
            curso["downloads"],
            curso["ebook"],
            curso["kindle"],
            curso["preview"]
        ));
        appContainer.appendChild(document.createElement("horizontal-divider"));
        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
    },
    Contact: () => {
        window.open('https://wa.me/5577999030420');
    },
    _: () => { },
}

window.App = App;

let i = 23;
for (let index = y.length; index <= 0; index--) {
    y[index].data = i + " de nov. de 2024";
    if (i == 31) i = 1;
    else i++;
}