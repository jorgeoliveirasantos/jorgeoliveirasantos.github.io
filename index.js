const urlId = new URLSearchParams(window.location.search).get('id');
let portrait = true;
let MainPage;
let Blog = [{ "title": null, "description": null, "video": null, "obs": null, "link": [null, null] }];
let CurrentPost = 0;

window.onload = () => LOOP.Start().then(LOOP.Update);

const Renderer = {
    Home: () => {
        Renderer.ClearPage().then(() => {
            document.getElementById("js-page").innerHTML = MainPage;
            Renderer.SwitchMenu(document.getElementById("menu-home"));
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            document.getElementById("js-video-present1").playbackRate = 0.5;
            document.getElementById("js-video-present2").playbackRate = 0.5;
            window.location.hash = "";
        });
        //
    },
    Blog: () => {
        Renderer.ClearPage().then(() => {
            let post, btns, a;

            btns = document.createElement("div");
            btns.classList = "js-post";
            btns.id = "btns";
            let btnsStyle = document.createElement("style");
            btnsStyle.innerHTML = `
                .js-post#btns {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                }

                .js-button.disabled {
                    opacity: 0.3;
                    cursor: inherit;
                }

                .js-button.disabled:hover {
                    color: inherit;
                    background-color: inherit;
                }
            `;
            btns.appendChild(btnsStyle);

            a = document.createElement("a");
            a.removeAttribute("href");
            a.classList = "js-button  disabled";
            a.id = "blog-back";
            a.innerHTML = "Anterior";
            //a.addEventListener("click", back);
            btns.appendChild(a);
            btns.appendChild(document.createElement("span"));

            a = document.createElement("a");
            a.removeAttribute("href");
            a.classList = "js-button";
            a.id = "blog-next";
            a.innerHTML = "Próximo";
            a.addEventListener("click", next);
            btns.appendChild(a);
            document.getElementById("js-page").appendChild(btns);

            // 1. Busca o arquivo blog.json:
            fetch("blog.json").then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar o arquivo: ${response.status} ${response.statusText}`);
                }
                return response.json();
            }).then(posts => {
                Blog = posts;
                // 2. Adiciona o primeiro post à página:
                newPost(Blog[0]["title"], Blog[0]["description"], Blog[0]["video"], Blog[0]["obs"], Blog[0]["link"]);
            }).catch(error => {
                console.error('Erro ao buscar o arquivo:', error);
            });

            //
            // Código dos botões para avançar, voltar e verificar se é o último ou primeiro post
            //

            // Função para adicionar posts à página:
            function newPost(title, description, video, obs, link) {
                post = document.createElement("div");
                post.classList = "js-post banner";
                post.id = "blog-post";
                post.style.marginTop = "50px";
                post.innerHTML = `
                    <h1>${title}</h1>
                    <p>${description}</p>
                    <div class="js-video">
                        <iframe src="${video}" title="${title}" frameborder="0" allow="accelerometer; encrypted-media; picture-in-picture;" allowfullscreen loading="lazy"></iframe>
                    </div>
                    <p>${obs}</p>
                    <a class="js-button-full" target="_blank" href="${link[1]}">${link[0]}</a>
                `
                document.getElementById("js-page").appendChild(post);
            };
            function next() {
                // Se é o primeiro post:
                // Habilitar o botão de voltar (propriedade e evento)
                if (CurrentPost == 0) {
                    document.getElementById("blog-back").classList.remove("disabled");
                    document.getElementById("blog-back").addEventListener("click", back);
                }
                // Se é o penúltimo post:
                // Desabilitar o botão de avançar (propriedade e evento)
                if (CurrentPost == Blog.length - 2) {
                    document.getElementById("blog-next").classList.add("disabled");
                    document.getElementById("blog-next").removeEventListener("click", next);
                }
                // Avançar o post
                ++CurrentPost;
                document.getElementById("js-page").removeChild(document.getElementById("blog-post"));
                newPost(
                    Blog[CurrentPost]["title"],
                    Blog[CurrentPost]["description"],
                    Blog[CurrentPost]["video"],
                    Blog[CurrentPost]["obs"],
                    Blog[CurrentPost]["link"]
                );
            }
            function back() {
                // Se é o segundo post:
                // Desabilitar o botão de voltar (propriedade e evento)
                if (CurrentPost == 1) {
                    document.getElementById("blog-back").classList.add("disabled");
                    document.getElementById("blog-back").removeEventListener("click", back);
                }

                // Se é o último post:
                // Habilitar o botão de avançar (propriedade e evento)
                if (CurrentPost == Blog.length - 1) {
                    document.getElementById("blog-next").classList.remove("disabled");
                    document.getElementById("blog-next").addEventListener("click", next);
                }

                --CurrentPost;
                document.getElementById("js-page").removeChild(document.getElementById("blog-post"));
                newPost(
                    Blog[CurrentPost]["title"],
                    Blog[CurrentPost]["description"],
                    Blog[CurrentPost]["video"],
                    Blog[CurrentPost]["obs"],
                    Blog[CurrentPost]["link"]
                );
            }
            //
            // AJUSTES FINAIS
            //
            Renderer.SwitchMenu(document.getElementById("menu-blog"));
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            { a = null; post = null; btns = null; }
            window.location.hash = "";
        });
    },
    Learn: () => {
        Renderer.ClearPage().then(() => {
            let post, btns, img, h1, p, a;
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.id = "ia";
            h1 = document.createElement("h1");
            h1.innerHTML = "Inteligência Artificial e Aprendizagem de Máquina";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/ia.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = "Inteligência Artificial (IA) é o ramo da tecnologia que trabalha com algoritmos que dão a capacidade a sistemas computacionais de realizar atividades semelhantes às humanas como planejamento, criatividade e aprendizado. Já Aprendizagem de Máquina é um dos setores de IA que compreende algoritmos capazes identificar padrões e efetuar previsões e tomadas de decisão. Neste curso aprenderemos os conceitos fundamentais de Inteligência Artificial e Aprendizagem de Máquina e conheceremos as ferramentas e bibliotecas mais modernas para esse fim, tudo tendo como base o Javascript, a linguagem de programação mais utilizada no mundo. Com essa combinação poderosa, aprenderemos a usar IA em aplicações backend como servidores e programas, e em aplicações web como sites, além de utilizar modelos de IA prontos e treinados para as nossas necessidades";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0CGHJ169Q");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/1/folders/1co5Ye6vIsAVIUMgWw3wdlI4RTpmHLg_j");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.id = "app";
            h1 = document.createElement("h1");
            h1.innerHTML = "Desenvolvimento de Aplicações Web";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/appweb.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = "O Desenvolvimento de Aplicações Web é a terceira etapa no Desenvolvimento Web, onde você é capaz de criar páginas que salvam dados de usuários e informações de maneira persistente utilizando a tecnologia do NodeJS. É aqui que você aprenderá a criar servidores, manipular bases de dados, usar criptografia, estabelecer comunicações e implantar aplicações em diferentes locais, em seu próprio servidor, em nuvem, num aplicativo móvel, num programa desktop entre outros.";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.removeAttribute("href");
            a.classList = "js-button-full";
            a.style.opacity = "0.5";
            a.innerHTML = "Em breve";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/1/folders/1sjTUvdPB5gxgCQBoah9yeXAggevSDOgl");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.id = "js";
            h1 = document.createElement("h1");
            h1.innerHTML = "Curso Completo de Javascript";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/javascriptCapa.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = "O Javascript é uma linguagem de programação, diferente do HTML e do CSS, neste curso você iniciará sua carreira como programador com a linguagem mais utilizada em todo o mundo! Com o Javascript você aprenderá como fazer seu site se comunicar com outras aplicações, incluirá lógica e dinamicidade à sua página e ainda aprenderá do que o Javascript é capaz, de desenvolvimento de jogos a servidores.";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0CWJ16NYM");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/1/folders/14wSufoQj0-dIW7taS6adiV9qBDmh59ea");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.id = "web";
            h1 = document.createElement("h1");
            h1.innerHTML = "Curso de Web Design";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/webdesign.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = "O Web Design é o setor voltado para a criação de páginas Web Estáticas destinadas a exibir conteúdo, como sites, blogs entre outras, é um amplo setor e muito requisitado no mercado. Neste curso você aprenderá como criar sites e páginas web diversas utilizando as tecnologias mais modernas com HTML, CSS e Javascript.";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.classList = "js-button-full";
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0CQ93CD8C");
            a.setAttribute("target", "_blank");
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/1/folders/1eCiMVTwoZE93wsB57dURkXkHCAl_MENE");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.id = "design";
            h1 = document.createElement("h1");
            h1.innerHTML = "Curso Completo de Design Gráfico";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/design.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = "O Design Gráfico é a arte da comunicação visual de ideias utilizada em diversos setores, da publicidade ao cinema. O casamento da tecnologia com a criatividade gera resultados incríveis, permitindo transmitir conceitos e ideias de forma objetiva, elegante e atraente. Liberte sua imaginação e ponha em prática suas ideias com um curso de design gráfico voltado para quem deseja se tornar um profissional, desenhar por hobby, ou desenvolver seus próprios projetos com o auxílio de ferramentas pagas e gratuitas como Office, Corel Draw, Photoshop, Illustrator, GIMP, Inkscape e muito mais. Crie, essa é a hora.";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0CGJS1LMX");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/1/folders/1T14FNxgtS6zDU5he6A74MhUIRTLAlP5i");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.style.marginTop = "50px";
            post.id = "info";
            h1 = document.createElement("h1");
            h1.innerHTML = "Curso de Informática Básica e Avançada";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/info.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = "Aprenda os conceitos iniciais de informática como navegar na internet, editar textos, criar elementos gráficos, configurar o computador e muito mais. Inicie ainda os conhecimentos de informática avançada como download e instalação de programas, antivírus, restauração, backup e formatação, segurança digital entre outros. Um curso voltado para quem está começando e para quem quer se aprofundar e decidir sua carreira profissional no setor de informática.";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.amazon.com.br/dp/B09V99W1FL");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/1/folders/1BdqsqsVZpEdk01gpMA608pbDoqemAUzD");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            // AJUSTES FINAIS
            //
            Renderer.SwitchMenu(document.getElementById("menu-learn"));
            { img = null; h1 = null; p = null; a = null; post = null; btns = null; }
            //
            // NAVEGAR ATÉ O ELEMENTO SELECIONADO
            //
            if (window.location.hash == "") {
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            } else {
                let gfd9g0 = document.createElement("a");
                gfd9g0.href = window.location.hash;
                gfd9g0.click();
                gfd9g0 = null;
            }
        });
    },
    Contacts: () => {
        Renderer.ClearPage().then(() => {
            let icons, post, img, h1, p, a, iconsStyle;

            icons = document.createElement("div");
            icons.classList = "js-post banner";
            icons.id = "icons";
            //
            iconsStyle = document.createElement("style");
            iconsStyle.innerHTML = `
                .js-post.banner#icons {
                    display: flex;
                    flex-direction: row;
                    gap: 15px;
                    text-align: center;
                    justify-content: center;
                }

                .banner img.social {
                    height: 100px;
                    width: 100px;
                    padding: 10px;
                    opacity: 0.5;
                    border: none;
                    transition: all 250ms;
                    cursor: pointer;
                    box-sizing: border-box;
                }

                .banner img.social:hover {
                    opacity: 1;
                    padding: 0;
                }
            `;
            icons.appendChild(iconsStyle);
            //
            let img1 = document.createElement("img");
            img1.src = "files/gmail.png";
            img1.classList = "social";
            img1.onclick = () => window.open("mailto:jorge.sos777@outlook.com");
            icons.appendChild(img1);
            //
            let img2 = document.createElement("img");
            img2.src = "files/whatsapp.png";
            img2.classList = "social";
            img2.onclick = () => window.open("https://wa.me/5577991161892");
            icons.appendChild(img2);
            //
            let img3 = document.createElement("img");
            img3.src = "files/amazon.png";
            img3.classList = "social";
            img3.onclick = () => window.open("https://www.amazon.com.br/stores/author/B0CM13195T");
            icons.appendChild(img3);
            //
            let img4 = document.createElement("img");
            img4.src = "files/Workana.png";
            img4.classList = "social";
            img4.onclick = () => window.open("https://www.workana.com/freelancer/175498bc00eeda4731ad4044f609f5a5");
            icons.appendChild(img4);
            document.getElementById("js-page").appendChild(icons);
            //
            img1 = null; img2 = null; img3 = null; img4 = null;

            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.id = "post";
            post.style.marginTop = "50px";
            h1 = document.createElement("h1");
            h1.innerHTML = "Contato";
            post.appendChild(h1);
            //
            p = document.createElement("p");
            p.innerHTML = "Entre em contato por um meio de sua preferência ou conheça minhas redes digitais.";
            post.appendChild(p);
            //
            document.getElementById("js-page").appendChild(post);
            //
            // AJUSTES FINAIS
            //
            Renderer.SwitchMenu(document.getElementById("menu-contacts"));
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            { icons = null; post = null; iconsStyle = null; img = null; h1 = null; p = null; a = null; }
            window.location.hash = "";
        });
    },
    Game: () => {
        console.log("Game");
        Renderer.Home();
    },
    IA: () => {
        console.log("IA");
        Renderer.Home();
    },
    SwitchMenu: (el) => {
        for (const menu of document.querySelectorAll(".menu-item")) {
            menu.classList.remove("active");
        }
        el.classList.add("active");
    },
    ClearPage: () => {
        return new Promise(resolve => {
            Array.from(document.getElementById("js-page").childNodes).forEach(el => {
                if (el.id != "js-footer") document.getElementById("js-page").removeChild(el);
            });
            resolve();
        });
    }
}

const LOOP = {
    Start: () => {
        MainPage = document.getElementById("js-page").innerHTML;
        return new Promise(resolve => {
            // Navegação pela URL
            if (!urlId) Renderer.Home();
            else if (urlId.toLowerCase() == "aprendizado") Renderer.Learn();
            else if (urlId.toLowerCase() == "blog") Renderer.Blog();
            else if (urlId.toLowerCase() == "contato") Renderer.Contacts();
            else if (urlId.toLowerCase() == "cursos") Renderer.Learn();
            else if (urlId.toLowerCase() == "downloads") Renderer.Learn();
            else if (urlId.toLowerCase() == "game") Renderer.Game();
            else if (urlId.toLowerCase() == "ia") Renderer.IA();

            // Efeitos de rolagem:
            window.onscroll = e => {
                if (window.scrollY > 100) {
                    document.getElementById("menu-container").classList = "landscape-menu-container landscape-menu-transparent";
                    document.getElementById("top-button").style.display = "block";
                } else {
                    document.getElementById("menu-container").classList = "landscape-menu-container landscape-menu-opaque";
                    document.getElementById("top-button").style.display = "none";
                }
                let posts = document.querySelectorAll('.banner');
                if (posts.length > 0) {
                    for (let i = 0; i < posts.length; i++) {
                        let Y = posts[i].getBoundingClientRect().top;
                        let percent = ((posts[i].getBoundingClientRect().bottom - 75) / window.innerHeight);
                        if (posts[i].getBoundingClientRect().top < window.innerHeight - 100) {
                            try { posts[i].querySelectorAll("h1")[0].style.display = "block" } catch { }
                        } else {
                            try { posts[i].querySelectorAll("h1")[0].style.display = "none" } catch { }
                        }
                    }
                }
                posts = null;
            }
            window.oncontextmenu = e => { e.preventDefault() }
            resolve();
        });
    },
    Update: () => {
        portrait = window.innerWidth < window.innerHeight;
        // Update code here
        if (portrait) { document.styleSheets[1].disabled = false }
        else { document.styleSheets[1].disabled = true }
        setTimeout(() => { LOOP.Update() }, 999);
    }
}
