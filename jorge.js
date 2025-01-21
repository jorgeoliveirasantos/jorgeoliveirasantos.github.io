
const App = {
    Cursos: [],
    Livros: [],
    Posts: [],
    Preload: [false, false, false],
    Main: async (callback = null) => {
        // Add icons to the TOPBAR:
        const icons = [
            {
                icon: "files/home.svg",
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
                icon: "https://kaatan.azurewebsites.net/files/logo128.png",
                title: "Kaatan",
                display: "none",
                action: () => window.open('https://www.kaatan.com.br')
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
        TOPBAR.style.justifyContent = "center";

        App.Footer();

        document.head.querySelectorAll("link").forEach(lnk => {
            if (lnk.getAttribute("rel") == "shortcut icon") {
                lnk.setAttribute("href", "https://www.jorgesouza.com.br/files/logo.svg");
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
        if (callback) recall();
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
            <span style="justify-content: space-around; display: flex; flex-direction: row; padding: 10px; gap: 5px; flex-wrap: wrap;">
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="window.location = '/'">início</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Blog()">blog</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Learn()">cursos</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Books()">livros</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="window.open('https://www.kaatan.com.br')">kaatan</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="Modal.Message('Em breve...', 'Retorne em breve para mais novidades.')">educação digital</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Community()">comunidade</text-link>
                <text-link class="footer-link" style="padding: 0; font-size: small; background-color: transparent;" onclick="App.Contact()">contato</text-link>
            </span>
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
                    <text-link onclick="window.open('https://youtu.be/Kgre-n-Rf3A')" style="font-size: small; text-align: center;" class="footer-link">Como ler e-books Kindle no celular</text-link>
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
    // Checkout:
    Checkout: (id) => {
        const appContainer = document.createElement("app-container");

        const cursoContainer = document.createElement("card-big");
        cursoContainer.innerHTML = `
            <text-heading>Finalizar compra</text-heading>
            <horizontal-divider></horizontal-divider>
            <text-paragraph>
                Para finalizar a compra, entre em contato pelo formulário abaixo.
                O preenchimento do formulário é indispensável, por meio dele você informará qual e-book deseja adquirir e também por ele receberá o arquivo em PDF. Qualquer dúvida ou sugestão, fique à vontade para entrar em contato pelo meios disponíveis neste site.
            </text-paragraph>
            <horizontal-divider></horizontal-divider>
            <!-- <iframe hiddens src="https://docs.google.com/forms/d/e/1FAIpQLSdgI7zlnpYJ-fw3DJZLvzhWTsjXWNbY2i-oGIRNLVevEKGBPQ/viewform?embedded=true" width="100%" height="1000px" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe> -->
            <iframe hiddens src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAASV1IhlUN0VNWE5FQVBPODRQVkNNSDlPWjRERU1ROS4u" width="100%" height="1500px" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>
        `;
        cursoContainer.classList.add("no-elastic");
        cursoContainer.id = id;
        appContainer.appendChild(cursoContainer);

        appContainer.appendChild(document.createElement("horizontal-divider"));

        APPVIEW.innerHTML = "";
        APPVIEW.appendChild(appContainer);
        App.Footer();
        document.getElementById("app-view").scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },

    // Cursos:
    /*
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
    */
    Contact: () => {
        window.open('https://wa.me/5577999030420');
    },
    _: () => { },
}

window.App = App;