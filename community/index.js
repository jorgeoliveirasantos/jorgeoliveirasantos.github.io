const Community = {
    Posts: [],
    User: {},
    Main: async () => {
        TOPBAR.innerHTML = "";

        // Add icons to the TOPBAR:

        const span = document.createElement("span");
        span.classList = "icon";
        span.style.height = "30px";
        span.style.padding = "3px 5px";
        span.style.cursor = "pointer";
        span.style.display = "block";
        span.style.borderRight = "var(--MediumBlue) 1px solid";
        span.onclick = e => {
            document.querySelectorAll(".icon").forEach(x => x.classList.remove('active'));
            span.classList.add('active');
            window.location = '/';
        };
        span.onmouseover = () => Tooltip.Tooltip("Sair da sala", span);

        const img = document.createElement("img");
        img.src = "https://kaatan.azurewebsites.net/files/exit.svg";
        img.style.height = "24px";
        span.appendChild(img);
        TOPBAR.appendChild(span);

        const span2 = document.createElement("span");
        span2.textContent = "Comunidade | Jorge Souza";
        span2.style.display = "flex";
        span2.style.height = "100%";
        span2.style.alignItems = "center";
        span2.style.paddingInline = "10px";
        span2.style.color = "var(--LightGreen)";
        span2.style.pointerEvents = "none";
        span2.style.userSelect = "none";
        TOPBAR.appendChild(span2);
        console.log("App Started");

        // Load user data:

        SideMenuContent.ShowProfileSection = true;
        const u = localStorage.getItem("myprofile");
        if (u) {
            const _ = JSON.parse(u);
        } else {
            const server = "https://kaatan-server.azurewebsites.net/u/getnewuser";
            const u = new Model.User();
            u.Id = "1";
            u.Username = "DF8-EF95";
            u.Name = "Anonimous";
            u.Description = "New Kaatan User";
            u.Thumbnail = "https://kaatan.azurewebsites.net/files/default.svg";
            u.Token = "f90sd8f908sd09f0sd0f980s9d8f09";
            

            u.Id = "1";
            u.Username = "DF8-EF95";
            u.Name = "Anonimous";
            u.Description = "New Kaatan User";
            u.Email = "meu@mail.com";
            u.Genre = "male";
            u.Thumbnail = "https://kaatan.azurewebsites.net/files/default.svg";
            u.Token = "f90sd8f908sd09f0sd0f980s9d8f09";
            u.State = {};
            SideMenuContent.ProfileSection = {
                ProfilePic: u.Thumbnail,
                ProfileName: u.Name,
                ProfileUsername: u.Username,
                Action: () => Renderer.Components.MyProfilePage(
                    u.Id,
                    u.Username,
                    u.Name,
                    u.Description,
                    u.Thumbnail,
                    u.Genre,
                    u.Email,
                    u.State,
                    (userData => {
                        console.log(userData);
                    })),
            };
        };

        // Load posts:
        await Community.PostBox();
    },
    MyProfile: async () => { },
    // Render posts
    PostBox: async () => {
        // Carrega os posts:
        await Community.LoadPosts();
        APPVIEW.innerHTML = "";
        Renderer.Load("posts-view", APPVIEW).then(async x => {
            const postView = document.getElementById("posts-view");
            // Renderiza os posts:
            Community.Posts.forEach(post => {
                Renderer.Components.PostBox(post, postView, Community.UserProfile, bodyClickCB, likeClickCB, Community.CommentBox, saveClickCB);
            });

            // Renderiza a caixa de texto:
            postView.appendChild(document.createElement("horizontal-divider"));
            postView.appendChild(Community.EditBox(true, post));
            postView.scrollTo({ left: 0, top: (Number.MAX_SAFE_INTEGER * -1), behavior: "smooth" });
            function post() {
                console.log("Posted!");
            }
        });
    },
    // Render comments in a post:
    CommentBox: async (id) => {
        //
        const comments = Community.Posts.find(x => x.PostId == id).Comments;
        console.log(Community.Posts.find(x => x.PostId == id).Username);

        //APPVIEW.innerHTML = "";
        Renderer.Load("comment-view", APPVIEW).then(x => {
            const cmmView = document.getElementById("comment-view");

            comments.forEach(cmm => {
                Renderer.Components.CommentBox(cmm, cmmView, bodyClickCB, Community.UserProfile, replyClickCB, likeClickCB);
                document.getElementById("comment-container-close").onclick = async () => {
                    APPVIEW.removeChild(document.getElementById('comment-container'));
                    await Community.PostBox();
                };
            });

            // Renderiza a caixa de texto:
            cmmView.insertBefore(document.createElement("horizontal-divider"), cmmView.firstChild);
            cmmView.insertBefore(Community.EditBox(false, comment), cmmView.firstChild);
            cmmView.scrollTo({ left: 0, top: Number.MAX_SAFE_INTEGER, behavior: "smooth" });
            function comment() {
                console.log("Commented!");
            }
        });
    },
    // Load posts:
    LoadPosts: async () => {
        // Temporary local retrive:
        Community.Posts = JSON.parse(sessionStorage.getItem("posts"));
    },
    // Render the textbox to edit posts and comments:
    EditBox: (post = true, callback = () => { }) => {
        const card = document.createElement("card-big");
        card.classList.add("no-elastic");
        card.classList.add("no-hover");

        // Cabeçalho:
        if (post) {
            const header = document.createElement("div");
            header.classList.add("post-header");
            const headerContent = `
                <div class="post-header">
                    <span class="post-profilepic">
                    <img src="https://kaatan.azurewebsites.net/avatars/f/14.jpg"></span>
                    <span class="sender">Usuário 14</span>
                </div>`;
            header.innerHTML = headerContent;
            card.appendChild(header);
            card.appendChild(document.createElement("horizontal-divider"));
        }

        // Caixa de texto:
        const edit = document.createElement("textarea");
        edit.classList.add("acacia-input");
        edit.style.minHeight = "100px";
        edit.style.resize = "none";
        edit.style.width = "100%";
        edit.placeholder = "Digite seu comentário...";
        edit.maxLength = "1000";

        edit.oninput = e => {
            edit.style.height = 'auto'; // Reseta a altura
            edit.style.height = `${edit.scrollHeight}px`;
        };

        const postBtn = document.createElement("button-squared");
        postBtn.textContent = post ? "Postar" : "Comentar";
        postBtn.onclick = callback;
        card.appendChild(edit);
        card.appendChild(document.createElement("horizontal-divider"));
        card.append(postBtn);
        return card;
    },
    MyProfile: async () => {
        document.getElementById("leftbar-my-profile-btn").onclick = () => Renderer.Components.MyProfilePage(
            "AAA-0000",
            "anonimo@aaa0000",
            "Jorge Souza Oliveira dos Santos",
            "Novo usuário Kaatan. Sempre experimentando novas experiências!",
            "https://kaatan.azurewebsites.net/avatars/f/1.jpg",
            "female",
            "meu@mail.com",
            {
                "Insignia": "https://kaatan.azurewebsites.net/insignias/insignia.jpg",
                "DaysStreak": 0,
                "RegisterTime": null,
                "LastAccessTime": 1718308735837,
                "MailVerified": false,
                "UserVerified": false,
                "Points": 1000,
                "Stars": 0,
                "RankName": "Visitante",
                "RankLevel": 0,
            },
            (userData => {
                console.log(userData)
            })
        );
    },
    UserProfile: async (id) => {
        // Get user profile:
        console.log(id);
        //
        return;
        //
        document.getElementById("leftbar-user-profile-btn").onclick = () => Renderer.Components.UserProfilePage(
            "AAA-0000",
            "anonimo@aaa0000",
            "Jorge Souza Oliveira dos Santos",
            "Novo usuário Kaatan. Sempre experimentando novas experiências!",
            "https://kaatan.azurewebsites.net/avatars/f/1.jpg",
            0,
            {
                "Dias consecutivos: ": "0",
                "Registrado em: ": "Não registrado",
                "Último acesso: ": new Date(1718308735837).toLocaleString(),
                "Pontos: ": "1000",
                "Nota: ": "★★★★☆",
                "Visitas no perfil: ": "1",
                "Nível": "Visitante"
            }
        );
    },
    _: async () => {
        //
    },
};

window.Community = Community;

const Model = {
    UserData: class {
        Id;
        Username;
        Name;
        Description;
        Thumbnail;
        Genre;
        Email;
        Token;
        State = new Object();
    },
    User: class {
        Id;
        Username;
        Name;
        Description;
        Thumbnail;
        Token;
    },
    RoomData: class { },
    Room: class {
        Id;
        Username;
        Name;
        Description;
        Thumbnail;
        Users = {};
    },
    Message: class {
        MessageId;
        Time;
        Username;
        Name;
        Receiver;
        Thumbnail;
        Type;
        Content;
        Upvotes;
        Self;
    },
    Post: class {
        PostId;
        Time;
        Username;
        Name;
        Thumbnail;
        Type;
        Content;
        Upvotes;
        Comments;
    },
    Comment: class {
        CommentId;
        Time;
        Username;
        Name;
        Content;
        Upvotes;
        Thumbnail;
    },
};

// Initializes posts and userdata
function resetPosts() {
    // Posts:
    const posts = [];
    const comments = [];

    for (let i = 1; i < 15; i++) {
        const c1 = new Model.Comment();
        c1.CommentId = `${i}`;
        c1.Content = "Êpa, isso é um comentário!"
        c1.Name = `Usuário ${i}`;
        c1.Thumbnail = `https://kaatan.azurewebsites.net/avatars/f/${i}.jpg`;
        c1.Time = Date.now();
        c1.Upvotes = 10 + i;
        c1.Username = `XV${i}-PL55`;
        comments.push(c1); comments.push(c1);

        const p1 = new Model.Post();
        p1.PostId = `${i}`;
        p1.Content = "Êpa, isso é uma postagem!"
        p1.Name = `Usuário ${i}`;
        p1.Thumbnail = `https://kaatan.azurewebsites.net/avatars/f/${i}.jpg`;
        p1.Time = Date.now();
        p1.Type = "Text";
        p1.Upvotes = 10 + (i * 2);
        p1.Username = `XV${i}-PL55`;
        p1.Comments = comments;
        posts.push(p1);
    }
    sessionStorage.setItem("posts", JSON.stringify(posts));

    // User:
    {
        "AAA-0000",
            "anonimoaaa0000",
            "Anônimo",
            "Novo usuário Kaatan",
            "https://kaatan.azurewebsites.net/avatars/f/1.jpg",
            "female",
            "meu@mail.com",
        {
            "Insignia": "https://kaatan.azurewebsites.net/files/insignia.jpg",
            "DaysStreak": 0,
            "RegisterTime": null,
            "LastAccessTime": 1718308735837,
            "MailVerified": false,
            "UserVerified": false,
            "Points": 1000,
            "Stars": 0,
            "RankName": "Visitante",
            "RankLevel": 0
        }
    }
}

// Temporary callbacks
const bodyClickCB = (id) => console.log("bodyClickCB: ", id);
const replyClickCB = (id) => console.log("replyClickCB: ", id);
const likeClickCB = (id) => console.log("likeClickCB: ", id);
const saveClickCB = (id) => console.log("saveClickCB: ", id);

resetPosts();