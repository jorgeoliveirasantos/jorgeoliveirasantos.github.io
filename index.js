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
            window.location.hash = "";
        });
        //
    },
    Portfolio: () => {
        Renderer.ClearPage().then(() => {
            let post, a;
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.style.position = "relative";
            post.id = "port-video";
            post.style.display = "flex";
            post.style.overflow = "hidden";
            post.style.maxHeight = "95vh";

            const video = document.createElement("video");
            video.id = "js-video-present1";
            video.src = "https://cdn-kaatan.azurewebsites.net/jorge/jorge-portfolio.mp4";
            video.style.width = "100%";
            video.style.height = "auto";
            const controls = document.createElement("div");
            controls.classList.add("js-video-present-controls");

            function retrocederVideoH() {
                document.getElementById("js-video-present1").currentTime -= 5;
            }
            function pausarOuRetomarVideoH(el) {
                if (document.getElementById("js-video-present1").paused) {
                    document.getElementById("js-video-present1").play();
                    el.style.backgroundImage = "url('./files/JSPresent/pause.svg')";
                    document.getElementById("port-video").requestFullscreen();
                } else {
                    document.getElementById("js-video-present1").pause();
                    el.style.backgroundImage = "url('./files/JSPresent/play.svg')";
                }
            }
            function avancarVideoH() {
                document.getElementById("js-video-present1").currentTime += 5;
            }
            const btn1 = document.createElement("button");
            btn1.onclick = retrocederVideoH;
            btn1.classList.add("js-video-present-button");
            btn1.classList.add("retroceder");
            controls.appendChild(btn1);

            const btn2 = document.createElement("button");
            btn2.onclick = () => pausarOuRetomarVideoH(btn2);
            btn2.id = "play-pause";
            btn2.classList.add("js-video-present-button");
            btn2.classList.add("play-pause");
            controls.appendChild(btn2);

            const btn3 = document.createElement("button");
            btn3.onclick = avancarVideoH;
            btn3.classList.add("js-video-present-button");
            btn3.classList.add("avancar");
            controls.appendChild(btn3);

            post.appendChild(video);
            post.appendChild(controls);

            document.getElementById("js-page").appendChild(post);

            //

            post = document.createElement("div");
            post.classList = "js-post banner";
            post.style.marginTop = "50px";
            a = document.createElement("a");
            a.setAttribute("href", "./files/PORTCAD 2024_2.pdf");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Versão em PDF";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);

            //
            Renderer.SwitchMenu(document.getElementById("menu-port"));
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
    Blog: () => {
        Renderer.ClearPage().then(async () => {
            let index = 0;
            //
            const posts = await fetch("blog/blog.json").then(x => x.json());

            posts.forEach(async post => {
                let title, content, obs, link;
                title = post.title;
                content = await fetch(`blog/${post.content}`).then(x => x.text());
                obs = post.obs;
                link = post.link;

                let postElement = document.createElement("div");
                postElement.classList = "js-post banner";
                if (post.content == "1.txt") {
                    postElement.style.marginTop = "50px";
                } else {
                    ++index;
                }

                const h2 = document.createElement("h1");
                h2.innerHTML = title;
                postElement.appendChild(h2);

                content.split("\n").forEach(par => {
                    const p = document.createElement("p");
                    p.innerHTML = par;
                    p.style.width = "100%";
                    postElement.appendChild(p);
                });

                if (obs && obs != "") {
                    const p = document.createElement("p");
                    p.innerHTML = obs;
                    p.style.fontStyle = "italic";
                    postElement.appendChild(p);
                }

                if (link && link != "") {
                    const a = document.createElement("a");
                    a.classList.add("js-button-full");
                    a.innerHTML = link[0];
                    a.href = link[1];
                    a.target = "_blank";
                    postElement.appendChild(a);
                }

                document.getElementById("js-page").appendChild(postElement);
            });


            Renderer.SwitchMenu(document.getElementById("menu-home"));
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
            //
        });
    },
    Learn: () => {
        Renderer.ClearPage().then(() => {
            let post, btns, img, h1, p, a;
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
            p.innerHTML = "O Desenvolvimento de Aplicações Web em Javascript é uma jornada empolgante e desafiadora. É a última etapa para desenvolvedores Javascript que já concluíram o curso de Web Design, onde aprenderam a estruturar sites elegantemente visuais com as tecnologias mais modernas de HTML e CSS, concluíram ainda um curso completo de Programação e Javascript, mergulhando no mundo da programação com todos os seus conceitos, e agora estão prontos para o backend, onde a mágica acontece! Neste curso aprenderemos o que há de mais recente dentre as tecnologias Javascript dominantes no mercado para criar aplicações com suporte a recursos avançados. Dentre esses recursos, neste curso você aprenderá a gerenciar bases de dados, criptografia, comunicação de rede e muito mais.\nEssa vastidão de possibilidades é o que permite desenvolver praticamente de tudo com Javascript, de servidores de alto desempenho, a aplicativos móveis, desktop e jogos!\nDescobriremos neste curso, todo o poder do Javascript, estudando como implantar nossas aplicações, criando um programa desktop que rode em Windows, Linux e Mac, e ainda implantando nossos servidores localmente e na nuvem. Ainda mergulharemos no misterioso mundo da segurança cibernética conhecendo os principais tipos de ataques e como mitigá-los devidamente.";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0D96Y4LHP");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/0/folders/1aG1CAZRhyNwUEjWaJN3XSPYXAZqkrJDS");
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
            a.setAttribute("href", "https://drive.google.com/drive/u/0/folders/1QxV5Md_ahTQwR-hMgRuq93P-_85mncFJ");
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
            p.innerHTML = "O Web Design é um amplo setor e muito requisitado no mercado, ele a arte de escrever páginas web, é o primeiro passo para se criar, desde um site simples, um blog, até uma aplicação web robusta que gerencie usuários, aplicativos e jogos. A base do Web Design é o HTML e o CSS. São duas linguagens utilizadas para descrever tudo aquilo que aparece num navegador ou em qualquer local com suporte a essas linguagens. HTML (HiperText Markup Language), como o nome sugere é uma linguagem de marcação, é ela que diz o quê tem que aparecer na tela. Já o CSS (Cascading StyleSheet), é uma linguagem de estilização, é ela que diz como cada coisa deve aparecer. Juntoas elas criam designs incríveis que se ajustam às telas de diferentes dispositivos, que exibem transições e animações belíssimas, necessitando apenas um designer web habilidoso em utilizá-las, assim como você!";
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.classList = "js-button-full";
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0D8HG4YHW");
            a.setAttribute("target", "_blank");
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/u/0/folders/17R1SftWIKVbORAynQxFZvV4--3jKz_G2");
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
            a.setAttribute("href", "https://drive.google.com/drive/u/0/folders/1v_BaD0tgr_JHg0us3j3v4s2yXaG_Yr_z");
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
            a.setAttribute("href", "https://drive.google.com/drive/u/0/folders/18PSosYC4CztmDCYTEqJSfsMiLwyFccaP");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Downloads do Curso";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.style.marginTop = "50px";
            post.id = "3d";
            h1 = document.createElement("h1");
            h1.innerHTML = "Curso Prático de Modelagem 3D";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/3d.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = `
                Descubra o universo envolvente da Modelagem 3D explorando os recursos do 3D Studio Max, o software líder do setor utilizado por grandes estúdios. Com este curso prático você poderá se preparar para sua carreira em diversos setores, da arquitetura e engenharia ao desenvolvimento de jogos e realidade virtual! Pensando na amplitude do setor de Design e Multimídia que o 3D abrange, criamos um curso onde além de pôr a mão na massa com projetos reais, você ainda aprenderá os conceitos básicos com os quais lidará independente de qual ramo seguir futuramente estando apto a desenvolver desde objetos complexos a mundos virtuais inteiros. Crie sua própria realidade agora mesmo com 3D!
                <br><br><i>Este curso é feito em parceria com instituições de ensino e seu material só pode ser adquirido junto com um curso presencial</i>.
            `;
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.jorgesouza.com.br/contato");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Contato";
            post.appendChild(a);
            document.getElementById("js-page").appendChild(post);
            //
            post = document.createElement("div");
            post.classList = "js-post banner";
            post.style.marginTop = "50px";
            post.id = "cad";
            h1 = document.createElement("h1");
            h1.innerHTML = "Curso Prático de Desenho Técnico em AutoCAD";
            post.appendChild(h1);
            //
            img = document.createElement("img");
            img.src = "./files/autocad.jpg";
            img.style.maxWidth = "300px";
            post.appendChild(img);
            //
            p = document.createElement("p");
            p.innerHTML = `
                Explore o mundo do design técnico com o nosso curso prático de Desenho Técnico em AutoCAD. Seja você um aspirante a arquiteto, engenheiro, designer de interiores ou profissional de detalhamento técnico em setores diversos, este curso foi meticulosamente projetado para levar suas habilidades de desenho 2D para o próximo nível. Aprenda desde os conceitos básicos até técnicas avançadas do software líder da indústria para desenhos técnicos em 2D e 3D. Ganhe insights valiosos sobre os padrões e práticas profissionais nos setores de arquitetura, engenharia e design de interiores, essenciais para o sucesso em suas futuras empreitadas profissionais. Domine as técnicas de desenho 2D essenciais para expressar ideias complexas de forma clara e precisa, com foco em detalhamento técnico e precisão geométrica. Aprenda fazendo! Este curso é repleto de exercícios práticos e projetos desafiadores que o colocarão no comando, aprimorando suas habilidades de desenho e sua proficiência no AutoCAD.
            `;
            post.appendChild(p);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://www.amazon.com.br/dp/B0D8ZTWT9M");
            a.setAttribute("target", "_blank");
            a.classList = "js-button-full";
            a.innerHTML = "Obtenha a apostila";
            post.appendChild(a);
            //
            a = document.createElement("a");
            a.setAttribute("href", "https://drive.google.com/drive/folders/1UyYEQGea367Bni5pCCDliywBX_QsCh-C");
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
            //else if (urlId.toLowerCase() == "game") Renderer.Game();
            //else if (urlId.toLowerCase() == "ia") Renderer.IA();

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
            //setInterval(LOOP.Update, 999);
            resolve(setInterval(LOOP.Update, 999));
        });
    },
    Update: () => {
        if (window.innerWidth > window.innerHeight) {
            document.styleSheets[1].disabled = true;
            portrait = false;
        }
        else {
            document.styleSheets[1].disabled = false;
            portrait = true;
        }
    }
}

