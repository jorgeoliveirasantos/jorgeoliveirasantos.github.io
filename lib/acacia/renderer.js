//import { Content } from "./content";

export const Renderer = {
    Load: (viewName, target) => {
        return new Promise((resolve, reject) => {
            fetch(`views/${viewName}`).then(res => res.text()).then(html => {
                const div = document.createElement("div");
                div.innerHTML = html;
                target.innerHTML = "";
                Array.from(div.children).forEach(element => {
                    target.appendChild(element);
                });
                resolve(true);
            }).catch(err => {
                reject(err);
            });
        });
    },
    Home: async (hideBottomBar, callback = null) => {
        if (Renderer.SideMenu.IsVisible) await Renderer.SideMenu.Show();
        window.oncontextmenu = e => {
            e.preventDefault();
            return false;
        }

        window.removeEventListener('touchstart', Renderer.SideMenu.StartTouch);
        window.addEventListener('touchstart', Renderer.SideMenu.StartTouch);

        if (hideBottomBar) {
            Renderer.Layout.TopLayout();
        } else {
            Renderer.Layout.BottomTopLayout();
        }
        APPVIEW.innerHTML = "";
        Renderer.Load("home", APPVIEW).then(x => {
            if (callback) callback();
            setInterval(Renderer.Layout.Verify, 999);
        });
    },
    Desktop: async (callback = null) => {
        window.oncontextmenu = e => {
            e.preventDefault();
            return false;
        }
        APPVIEW.innerHTML = "";
        Renderer.Load("home", APPVIEW).then(x => {
            if (callback) callback();
            //setInterval(Renderer.Layout.Verify, 999);
        });
    },
    DropFiles: () => {
        return new Promise((resolve, reject) => {
            window.removeEventListener('dragenter', Renderer.DropFiles);
            try {
                document.body.removeChild(document.querySelector("acacia-container"));
            } catch { }

            const container = document.createElement("acacia-container");
            container.id = 'drop-container';
            const dropArea = document.createElement('div');
            dropArea.id = 'drop-area';
            dropArea.style.width = "90%";
            dropArea.style.height = "50%";
            dropArea.style.maxWidth = "500px";
            dropArea.style.maxHeight = "300px";
            dropArea.style.border = "2px dashed var(--DarkGreen)";
            dropArea.style.borderRadius = "10px"
            dropArea.style.display = "flex";
            dropArea.style.justifyContent = "center";
            dropArea.style.alignItems = "center";
            dropArea.style.fontSize = "1.3rem";
            dropArea.onmouseover = e => dropArea.style.opacity = "0.5";
            dropArea.onmouseout = e => dropArea.style.opacity = "1";
            dropArea.innerHTML = "Solte seus arquivos aqui";
            container.appendChild(dropArea);
            document.body.appendChild(container);

            // Adiciona as classes de hover quando o usuário passa o arquivo sobre a área de soltar
            dropArea.addEventListener('dragenter', (e) => {
                e.preventDefault();
                dropArea.classList.add('hover');
            });

            // Remove as classes de hover quando o usuário sai da área de soltar
            dropArea.addEventListener('dragleave', () => {
                dropArea.classList.remove('hover');
            });

            // Impede o comportamento padrão do navegador ao soltar o arquivo sobre a área de soltar
            dropArea.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            // Quando o usuário solta o arquivo sobre a área de soltar
            dropArea.addEventListener('drop', (e) => {
                e.preventDefault();
                dropArea.classList.remove('hover');

                // Obtém os arquivos soltos pelo usuário
                const files = e.dataTransfer.files;

                // Matrizes para armazenar diferentes tipos de arquivos
                const fileStore = {
                    images: [],
                    audios: [],
                    videos: [],
                    documents: []
                }

                // Itera sobre os arquivos e os classifica em suas respectivas matrizes
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (file.type.startsWith('image/')) {
                        fileStore.images.push(file);
                        console.log('Imagens:', images);
                    } else if (file.type.startsWith('audio/')) {
                        fileStore.audios.push(file);
                        console.log('Áudios:', audios);
                    } else if (file.type.startsWith('video/')) {
                        fileStore.videos.push(file);
                        console.log('Vídeos:', videos);
                    } else {
                        fileStore.documents.push(file);
                        console.log('Documentos:', documents);
                    }
                }
                document.body.removeChild(document.getElementById("drop-container"));
                resolve(fileStore);
            });
        });
    },
    Layout: {
        IsPortraitLayout: true,
        ColorMyLayout: false,
        Verify: () => {
            if (window.innerWidth > window.innerHeight) {
                Renderer.Layout.Landscape();
            } else {
                Renderer.Layout.Portrait();
            }
            if (Renderer.Layout.ColorMyLayout) {
                BOTTOMBAR.style.backgroundColor = "green";
                TOPBAR.style.backgroundColor = "red";
                LEFTBAR.style.backgroundColor = "blue";
                RIGHTBAR.style.backgroundColor = "yellow";
                APPVIEW.style.backgroundColor = "black";
            } else {
                BOTTOMBAR.style.backgroundColor = "transparent";
                TOPBAR.style.backgroundColor = "transparent";
                LEFTBAR.style.backgroundColor = "transparent";
                RIGHTBAR.style.backgroundColor = "transparent";
                APPVIEW.style.backgroundColor = "transparent";
            }
        },
        Landscape: () => {
            APP.style.gridTemplateColumns = "25% 1fr 20%";
            APPVIEW.style.gridColumn = "2";
            LEFTBAR.style.display = "flex";
            RIGHTBAR.style.display = "flex";
            Renderer.Layout.IsPortraitLayout = false;
        },
        Portrait: () => {
            APP.style.gridTemplateColumns = "100%";
            APPVIEW.style.gridColumn = "1";
            LEFTBAR.style.display = "none";
            RIGHTBAR.style.display = "none";
            Renderer.Layout.IsPortraitLayout = true;
        },
        /**@description Shows Bottom and Top Bars */
        BottomTopLayout: () => {
            ACACIA.style.gridTemplateRows = "30px 1fr 40px";
            document.querySelector("#top-bar").style.display = "grid";
            BOTTOMBAR.style.display = "flex";
            APPVIEW.style.height = "100%";
        },
        /**@description Shows only Top Bar */
        TopLayout: () => {
            ACACIA.style.gridTemplateRows = "30px 1fr";
            document.querySelector("#top-bar").style.display = "grid";
            BOTTOMBAR.style.display = "none";
            APPVIEW.style.height = "100%";
        },
        /**@description Hides Bottom and Top Bars */
        CleanLayout: () => {
            ACACIA.style.gridTemplateRows = "1fr";
            document.querySelector("#top-bar").style.display = "none";
            BOTTOMBAR.style.display = "none";
            APPVIEW.style.height = "100%";
        },
        /* Functions bellow are on Learn App */
        MainTopBar: () => {
            window.TOPBAR.innerHTML = "";
            const ids = ["menu-kt-logo", "", "menu-profile-pic", "menu-mini"];
            const imgsSrc = [
                "https://kaatan.azurewebsites.net/files/conjunto_branco.svg",
                "",
                "https://kaatan.azurewebsites.net/files/default.svg",
                "https://kaatan.azurewebsites.net/files/menumini.svg"
            ];
            const actions = ["", "", "MyProfile", "MyLearning", ""];
            for (let i = 0; i < 5; i++) {
                const span = document.createElement("span");
                if (ids[i] != "") span.id = ids[i];
                if (i > 1) span.classList.add("menu-button");
                if (actions[i] != "") span.onclick = Renderer[actions[i]];

                const img = document.createElement("img");
                if (imgsSrc[i] != "") {
                    img.src = imgsSrc[i];
                    span.appendChild(img);
                }

                window.TOPBAR.appendChild(span);
            }

            document.getElementById("menu-kt-logo").onclick = e => window.location.reload();
            document.getElementById("menu-mini").onclick = Renderer.Layout.ShowSideMenu;
            document.getElementById("menu-profile-pic").onmouseover = () => Tooltip.Tooltip("Meu perfil", document.getElementById("menu-profile-pic"));
            document.getElementById("menu-learn-pic").onmouseover = () => Tooltip.Tooltip("Meu aprendizado", document.getElementById("menu-learn-pic"));

        },
        BackTopBar: (pageTitle, backbuttonCallback = () => { }, endCallback = () => { }) => {
            TOPBAR.innerHTML = "";
            // Back-button
            const span1 = document.createElement("span");
            span1.id = "menu-back-btn";
            span1.classList.add("menu-button");
            span1.onclick = backbuttonCallback;
            span1.style.cursor = "pointer";
            span1.style = "height: 30px; padding: 3px 10px; cursor: pointer; background-color: var(--Crimson);";
            const img1 = document.createElement("img");
            img1.src = "https://kaatan.azurewebsites.net/files/arrow.svg";
            img1.style = "height: 24px;";
            span1.appendChild(img1);
            TOPBAR.appendChild(span1);
            // Title
            const span2 = document.createElement("span");
            span2.classList.add("page-title");
            span2.style = "height: 30px; padding: 3px 10px; opacity: 0.8; pointer-events: none; user-select: none; cursor: default;";
            span2.textContent = pageTitle;
            TOPBAR.appendChild(span2);

            if (endCallback) endCallback();
        },
        ClearTopBar: (callback = () => { }) => {
            window.TOPBAR.innerHTML = "";
            //
            const topBarLogo = document.createElement("img");
            topBarLogo.src = "https://kaatan.azurewebsites.net/files/conjunto_branco.svg"
            topBarLogo.id = "topbar-logo";
            topBarLogo.onclick = () => window.location.reload();
            TOPBAR.appendChild(topBarLogo);
        }
    },
    SideMenu: {
        IsVisible: false,
        StartDragX: false,
        StartDragY: false,
        Show: async () => {
            if (Renderer.SideMenu.IsVisible) {
                try {
                    document.body.removeChild(document.querySelector("side-menu"));
                } catch { }
                Renderer.SideMenu.IsVisible = !Renderer.SideMenu.IsVisible;
            } else {
                // Getting properties
                const Links = window.SideMenuContent.Links;
                const ShowProfileSection = window.SideMenuContent.ShowProfileSection;
                const ProfileSection = window.SideMenuContent.ProfileSection;

                Renderer.SideMenu.IsVisible = !Renderer.SideMenu.IsVisible;
                const sideMenu = document.createElement("side-menu");
                sideMenu.id = "side-menu";
                const smOutside = document.createElement("side-menu-outside");
                smOutside.onclick = Renderer.SideMenu.Show;
                sideMenu.appendChild(smOutside);
                //
                const smContainer = document.createElement("side-menu-container");
                sideMenu.appendChild(smContainer);
                const smTitleBar = document.createElement("title-bar");
                const closeBtn = document.createElement("close-button");
                closeBtn.onclick = Renderer.SideMenu.Show;
                const closeBtnImg = document.createElement("img");
                closeBtnImg.src = "https://kaatan.azurewebsites.net/files/close.svg";
                closeBtn.appendChild(closeBtnImg);
                smTitleBar.appendChild(closeBtn);
                smContainer.appendChild(smTitleBar);
                //
                if (ShowProfileSection) {
                    const smProfile = document.createElement("side-menu-profile");
                    smProfile.onclick = () => {
                        ProfileSection.Action();
                        Renderer.SideMenu.Show();
                    }
                    const profilePic = document.createElement("side-menu-profile-pic");
                    const profilePicImg = document.createElement("img");
                    profilePicImg.src = ProfileSection.ProfilePic;
                    profilePic.appendChild(profilePicImg);
                    smProfile.appendChild(profilePic);
                    const profileData = document.createElement("profile-data");
                    const sideName = document.createElement("side-name");
                    sideName.innerText = ProfileSection.ProfileName;
                    const sideUsername = document.createElement("side-username");
                    sideUsername.innerText = ProfileSection.ProfileUsername;
                    profileData.appendChild(sideName);
                    profileData.appendChild(sideUsername);
                    smProfile.appendChild(profileData);
                    smContainer.appendChild(smProfile);
                }
                //
                const smItemsContainer = document.createElement("compact-list");
                Links.forEach(link => {
                    const item = document.createElement("list-item");
                    //item.classList.add("elastic");
                    item.onclick = () => {
                        link.LinkAction();
                        Renderer.SideMenu.Show();
                    }
                    const itemIcon = document.createElement("img");
                    itemIcon.src = link.LinkIcon;
                    const itemTitle = document.createElement("text-label");
                    itemTitle.innerText = link.LinkTile;
                    item.appendChild(itemIcon);
                    item.appendChild(itemTitle);
                    smItemsContainer.appendChild(item);
                });
                smContainer.appendChild(smItemsContainer);
                //
                document.body.appendChild(sideMenu);
            }
        },
        StartDrag: (event) => {
            if (event.clientX >= window.innerWidth / 2) {
                Renderer.SideMenu.StartDragX = event.clientX;
                Renderer.SideMenu.StartDragY = event.clientY;
                window.addEventListener('mouseup', Renderer.SideMenu.EndDrag);
                window.addEventListener('pointerup', Renderer.SideMenu.EndDrag);
                window.addEventListener('touchend', Renderer.SideMenu.EndDrag);
            }
        },
        EndDrag: (event) => {
            window.removeEventListener('mouseup', Renderer.SideMenu.EndDrag);
            window.removeEventListener('pointerup', Renderer.SideMenu.EndDrag);
            window.removeEventListener('touchend', Renderer.SideMenu.EndDrag);
            if (Renderer.SideMenu.IsVisible) return;
            const distanceX = Math.abs(event.clientX - Renderer.SideMenu.StartDragX);
            const distanceY = Math.abs(event.clientY - Renderer.SideMenu.StartDragY);
            if (distanceX >= 75 && distanceY <= 50) Renderer.SideMenu.Show();
        },
        StartTouch: (event) => {
            const x = event.touches[0].clientX;
            const y = event.touches[0].clientY;
            if (x >= window.innerWidth / 2) {
                Renderer.SideMenu.StartDragX = x;
                Renderer.SideMenu.StartDragY = y;
                window.addEventListener('mouseup', Renderer.SideMenu.EndDrag);
                window.addEventListener('pointerup', Renderer.SideMenu.EndDrag);
                window.addEventListener('touchend', Renderer.SideMenu.EndTouch);
            }
        },
        EndTouch: (event) => {
            const x = event.changedTouches[0].clientX;
            const y = event.changedTouches[0].clientY;
            //
            //window.removeEventListener('mouseup', Renderer.SideMenu.EndDrag);
            //window.removeEventListener('pointerup', Renderer.SideMenu.EndDrag);
            window.removeEventListener('touchend', Renderer.SideMenu.EndTouch);
            if (Renderer.SideMenu.IsVisible) return;
            const distanceX = Math.abs(x - Renderer.SideMenu.StartDragX);
            const distanceY = Math.abs(y - Renderer.SideMenu.StartDragY);
            if (distanceX >= 75 && distanceY <= 50) Renderer.SideMenu.Show();
        },
    },
    VCard: {
        VCardContent: {
            HTML: "",
            Userid: "",
            Username: "",
            Name: "",
            Profilelink: "",
            Thumb: "",
        },
        Import: async () => {
            return new Promise((resolve, reject) => {
                let input = document.createElement('input');
                input.type = "file";
                input.addEventListener('input', function (event) {
                    let file = event.target.files[0];
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        let fake = document.createElement("div");
                        Renderer.VCard.VCardContent.HTML = atob(e.target.result);
                        fake.innerHTML = Renderer.VCard.VCardContent.HTML;
                        Renderer.VCard.VCardContent.Userid = fake.querySelector("#userid").innerText;
                        Renderer.VCard.VCardContent.Username = fake.querySelector("#k-prf-username").innerText;
                        Renderer.VCard.VCardContent.Name = fake.querySelector("#k-prf-name").innerText;
                        Renderer.VCard.VCardContent.Profilelink = fake.querySelector("#profile-link").innerText;
                        Renderer.VCard.VCardContent.Thumb = fake.querySelector("#k-prf-pic-img").src;
                        fake = null;
                        Renderer.VCard.Show(Renderer.VCard.VCardContent);
                        resolve(Renderer.VCard.VCardContent);
                    };
                    reader.readAsText(file);
                });
                input.click();
            });
        },
        Show: async (vcardData) => {
            console.log(vcardData)
            let cardContainer = document.createElement("acacia-container");
            await Renderer.Load("vcard", cardContainer);
            cardContainer.querySelector("#userid").innerText = vcardData.Userid;
            cardContainer.querySelector("#k-prf-username").innerText = vcardData.Username;
            cardContainer.querySelector("#k-prf-name").innerText = vcardData.Name;
            cardContainer.querySelector("#profile-link").innerText = vcardData.Profilelink;
            cardContainer.querySelector("#k-prf-pic-img").src = vcardData.Thumb;
            cardContainer.querySelector("#k-vcard-btns").style.display = "block";
            cardContainer.querySelector("#vcard-btn-profile").href = vcardData.Profilelink;
            cardContainer.querySelector("#vcard-btn-share").href = "javascript:void(0)";
            cardContainer.querySelector("#vcard-btn-share").onclick = e => Renderer.VCard.Save(vcardData);
            cardContainer.querySelector("#vcard-btn-copy").onclick = e => {
                Tooltip.Toast("Nome de usuário copiado para a área de trasferência", 5);
                navigator.clipboard.writeText(vcardData.Username);
            };
            let x = document.createElement("span");
            x.style = "display: grid; place-items: center; position: fixed; right: 0; top: 0; font-size: 40px; z-index: 1000; background-color: #DD2080; color: white; padding: 0 10px 0 10px; cursor: pointer;";
            x.innerHTML = "&#10006;";
            cardContainer.appendChild(x);
            cardContainer.querySelector("#vcard-btn-copy").href = "javascript:void(0)";
            x.onclick = e => document.body.removeChild(cardContainer);
            document.body.appendChild(cardContainer);
        },
        Save: async (vcardData) => {
            let fake = document.createElement("div");
            let x = await Renderer.Load("vcard", fake);
            fake.querySelector("#userid").innerText = vcardData.Userid;
            fake.querySelector("#k-prf-username").innerText = vcardData.Username;
            fake.querySelector("#k-prf-name").innerText = vcardData.Name;
            fake.querySelector("#profile-link").innerText = vcardData.Profilelink;
            fake.querySelector("#k-prf-pic-img").src = vcardData.Thumb;
            const cardContent = btoa(fake.innerHTML);
            fake = null;
            const a = document.createElement("a");
            a.download = vcardData.Username + ".kaatanvcard";
            a.href = URL.createObjectURL(new Blob([cardContent], { type: "text/plain" }));
            a.click();
        },
        Share: () => { },
    },
    Emojis: {
        Insert: (textBox, emoji) => {
            var posicaoCursor = textBox.selectionStart;
            var textoAntes = textBox.value.substring(0, posicaoCursor);
            var textoDepois = textBox.value.substring(posicaoCursor);
            textBox.value = textoAntes + emoji + textoDepois;
            textBox.selectionStart = textBox.selectionEnd = posicaoCursor + emoji.length;
        },
        heart: [
            '❤', '🧡', '💓', '💔', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '💞', '💟', '🖤', '🤍', '🤎', '💌', '💒', '💋', '👄', '💏', '💑'
        ],
        smiles: [
            '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑', '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣', '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬', '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷'
        ],
        "smiles-extra": [
            '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀', '🙈', '🙉', '🙊', '🙁', '🙂', '🙃', '🙄', '🤐', '🤑', '🤒', '🤓', '🤔', '🤕', '🤗', '🤠', '🤢', '🤣', '🤤', '🤥', '🤧', '🤨', '🤩', '🤪', '🤫', '🤭', '🤮', '🤯', '🥰', '🥱', '🥳', '🥴', '🥵', '🥶', '🥺', '🧐'
        ],
        hands: [
            '✋', '👋', '🖐', '🖖', '🤚', '☝', '👆', '👇', '👈', '👉', '🖕', '✊', '👊', '👍', '👎', '🤛', '🤜', '✌', '👌', '🤏', '🤘', '🤙', '🤞', '🤟', '✍', '👏', '👐', '💅', '🤝', '🤝', '🤲', '🤳'
        ],
        people: [
            '👮', '👯', '👰', '👲', '👳', '👷', '👸', '🕴', '🕵', '💁', '💂', '💃', '🤴', '🤵', '👪', '👫', '👬', '👭', '💏', '💑', '🤰', '🤱', '👤', '👥', '👦', '👧', '👨', '👩', '👱', '👴', '👵', '👶', '🕺', '🧍', '🧎', '🧑', '🧒', '🧓', '🧔', '🧕', '🧖', '🧗', '🧘', '🦰', '🦱', '🦲', '🦳', '💆', '💇', '🙅', '🙆', '🙇', '🙋', '🙌', '🙍', '🙎', '🙏', '🤦', '🤱', '🤷', '🧏', '🙈', '🙉', '🙊', '🎅', '👹', '👺', '👻', '👼', '👽', '👾', '👿', '💀', '🤖', '🤡', '🤶', '🦸', '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '👀', '👁', '👂', '👃', '👄', '👅', '👣', '💪', '🦴', '🦵', '🦶', '🦷', '🦻', '🦼', '🦽', '🦾', '🦿', '🧠'
        ],
        celebration: ['🎀',
            '🎁', '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎', '🎏', '🎐', '🎑', '🎒', '🎓', '🎔', '🎕', '🎖', '🎗', '🧧', '🧨', '🎟', '🎠', '🎡', '🎢', '🎨', '🎪', '🎫', '🎭', '💯'
        ]
    },
    Components: {
        /** @description
         * Render the own profile page,
         * the Save button updates the Content.Social.MyUserData object and
         * calls the callback function passing the userData as argument to that function
         * */
        MyProfilePage: (id, username, name, description, thumbnail, genre, email, state, callback) => {
            Renderer.Load("my-profile", APPVIEW).then(x => {
                // Generate Data:
                Content.Social.MyUserData.Id = id;
                Content.Social.MyUserData.Username = username;
                Content.Social.MyUserData.Name = name;
                Content.Social.MyUserData.Description = description;
                Content.Social.MyUserData.Thumbnail = thumbnail;
                Content.Social.MyUserData.Genre = genre;
                Content.Social.MyUserData.Email = email;
                Content.Social.MyUserData.State = state;
                //
                const profilePicImg = document.querySelector("#profile-pic-img img");
                profilePicImg.style.pointerEvents = "none";
                profilePicImg.src = Content.Social.MyUserData.Thumbnail;
                const profilePicEdit = document.getElementById("profile-pic-edit");
                profilePicEdit.onclick = e => {
                    let img = document.createElement("input");
                    img.type = "file";
                    img.setAttribute("accept", ".png, .jpeg, .jpg, .webp");
                    img.oninput = () => {
                        let reader = new FileReader();
                        reader.readAsDataURL(img.files[0]);
                        reader.onload = () => {
                            let foto = new Image();
                            foto.onload = () => {
                                let canvas = document.createElement("canvas");
                                canvas.width = 256;
                                canvas.height = 256;
                                let ctx = canvas.getContext("2d");
                                ctx.drawImage(foto, 0, 0, 256, 256);
                                profilePicImg.src = canvas.toDataURL("image/jpeg");
                                Content.Social.MyUserData.Thumbnail = canvas.toDataURL("image/jpeg");
                                Tooltip.Toast("Alterações não salvas", 5);
                            }
                            foto.src = reader.result.replace("data:text/html", "data:image/jpeg");
                        };
                    };
                    img.click();
                };
                //
                const profileBadgeImg = document.querySelector("#status-data-img img");
                profileBadgeImg.src = Content.Social.MyUserData.State.Insignia;
                profileBadgeImg.style.userSelect = "none";
                profileBadgeImg.onmouseover = () => Tooltip.Tooltip(Content.Social.MyUserData.State.RankName + "\nClique para saber mais.", profileBadgeImg)
                profileBadgeImg.onclick = e => Tooltip.Toast("Perfil de visitante", 10);

                const profileName = document.getElementById("profile-name");
                profileName.innerText = Content.Social.MyUserData.Name;
                let profileUsernameValue = Content.Social.MyUserData.Username.split("@")[0];
                const profileUsername = document.getElementById("profile-username");
                profileUsername.innerText = Content.Social.MyUserData.Username;
                const txtDescription = document.getElementById("profile-description");
                txtDescription.innerText = Content.Social.MyUserData.Description;
                const txtEmail = document.getElementById("mail-txt");
                txtEmail.innerText = Content.Social.MyUserData.Email;
                profileName.addEventListener("click", e => {
                    profileName.setAttribute("contenteditable", true);
                    profileName.style.backgroundColor = "black";
                    profileName.style.padding = "10px";
                    profileName.style.cursor = "text";
                    profileName.focus();
                    profileName.onblur = e => {
                        profileName.style.backgroundColor = "transparent";
                        profileName.style.padding = "0";
                        profileName.style.cursor = "pointer";
                        Tooltip.Toast("Alterações não salvas", 5);
                    }
                });
                profileUsername.onfocus = e => {
                    profileUsername.innerText = profileUsernameValue;
                };
                profileUsername.addEventListener("click", e => {
                    profileUsername.setAttribute("contenteditable", true);
                    profileUsername.style.backgroundColor = "black";
                    profileUsername.style.padding = "10px";
                    profileUsername.style.cursor = "text";

                    profileUsername.focus();
                    profileUsername.onblur = e => {
                        profileUsernameValue = profileUsername.innerText
                        profileUsername.innerText = profileUsernameValue + "@" + Content.Social.MyUserData.Id;
                        profileUsername.style.backgroundColor = "transparent";
                        profileUsername.style.padding = "0";
                        profileUsername.style.cursor = "pointer";
                        Tooltip.Toast("Alterações não salvas", 5);
                    };
                });

                //
                const shareBtn = document.getElementById("share-profile-btn");
                shareBtn.onclick = e => {
                    Renderer.VCard.VCardContent.Name = Content.Social.MyUserData.Name;
                    Renderer.VCard.VCardContent.Profilelink = "https://www.kaatan.com.br/" + userId.Username;
                    Renderer.VCard.VCardContent.Userid = Content.Social.MyUserData.Id;
                    Renderer.VCard.VCardContent.Username = Content.Social.MyUserData.Username;
                    Renderer.VCard.VCardContent.Thumb = Content.Social.MyUserData.Thumbnail;
                    Renderer.VCard.Show(Renderer.VCard.VCardContent);
                }
                //

                txtDescription.addEventListener("click", e => {
                    txtDescription.setAttribute("contenteditable", true);
                    txtDescription.style.backgroundColor = "black";
                    txtDescription.style.padding = "10px";
                    txtDescription.style.cursor = "text";
                    txtDescription.focus();
                    txtDescription.onblur = e => {
                        txtDescription.style.backgroundColor = "transparent";
                        txtDescription.style.padding = "0";
                        txtDescription.style.cursor = "pointer";
                        Tooltip.Toast("Alterações não salvas", 5);
                    }
                });
                txtEmail.addEventListener("click", e => {
                    txtEmail.setAttribute("contenteditable", true);
                    txtEmail.style.backgroundColor = "black";
                    txtEmail.style.padding = "10px";
                    txtEmail.style.cursor = "text";
                    txtEmail.focus();
                    txtEmail.onblur = e => {
                        txtEmail.style.backgroundColor = "transparent";
                        txtEmail.style.padding = "0";
                        txtEmail.style.cursor = "pointer";
                        Tooltip.Toast("Alterações não salvas", 5);
                    }
                });
                //
                const txtGenre = document.getElementById("gnr-sel");
                txtGenre.value = Content.Social.MyUserData.Genre;
                txtGenre.oninput = e => {
                    Content.Social.MyUserData.Genre = txtGenre.value;
                    Tooltip.Toast("Alterações não salvas", 5);
                };
                const daysStreak = Number(Content.Social.MyUserData.State.DaysStreak);
                const txtDaysStreak = document.getElementById("day-strk");
                txtDaysStreak.innerText = "" + daysStreak + (daysStreak < 2 ? " dia" : " dias");

                const registerTime = Content.Social.MyUserData.State.RegisterTime ? new Date(Number(Content.Social.MyUserData.State.RegisterTime)).toLocaleDateString() : "Usuário não registrado";
                const txtRegisterTime = document.getElementById("rgst-time");
                txtRegisterTime.innerText = registerTime;
                const txtLastAccessTime = document.getElementById("lst-acss-time");
                txtLastAccessTime.innerText = new Date(Number(Content.Social.MyUserData.State.LastAccessTime)).toLocaleDateString();
                const txtMailVerified = document.getElementById("mail-verified");
                const txtUserVerified = document.getElementById("usr-verified");
                //
                const passWd = document.getElementById("passwd");
                const newPassWd = document.getElementById("npasswd");
                const newPassWd2 = document.getElementById("npasswd2");
                const changePassWd = document.getElementById("alt-passwd");
                changePassWd.onclick = e => {
                    if (newPassWd.style.display == "none") {
                        newPassWd.style.display = "block";
                        newPassWd2.style.display = "block";
                        changePassWd.innerText = "- Alterar senha";
                    } else {
                        newPassWd.style.display = "none";
                        newPassWd2.style.display = "none";
                        newPassWd.value = "";
                        newPassWd2.value = "";
                        changePassWd.innerText = "+ Alterar senha";
                    }
                };
                const showPassWd = document.getElementById("sh-passwd");
                showPassWd.onclick = e => {
                    if (newPassWd.getAttribute("type") == "password") {
                        passWd.setAttribute("type", "text");
                        newPassWd.setAttribute("type", "text");
                        newPassWd2.setAttribute("type", "text");
                        showPassWd.innerText = "Ocultar senha"
                    } else {
                        passWd.setAttribute("type", "password");
                        newPassWd.setAttribute("type", "password");
                        newPassWd2.setAttribute("type", "password");
                        showPassWd.innerText = "Exibir senha"
                    }
                };
                //
                const saveButton = document.getElementById("save-btn");
                saveButton.onclick = e => {
                    Content.Social.MyUserData.Name = document.getElementById("profile-name").innerText;
                    Content.Social.MyUserData.Username = profileUsernameValue;
                    Content.Social.MyUserData.Description = document.getElementById("profile-description").innerText;
                    Content.Social.MyUserData.Email = document.getElementById("mail-txt").innerText;
                    Content.Social.MyUserData.Genre = document.getElementById("gnr-sel").value;
                    Content.Social.MyUserData.Passwd = document.getElementById("passwd").value;
                    Content.Social.MyUserData.NPasswd = document.getElementById("npasswd").value;
                    Content.Social.MyUserData.NPasswd2 = document.getElementById("npasswd2").value;
                    callback(Content.Social.MyUserData);
                };
                setTimeout(() => {
                    Tooltip.Toast("Clique nos itens que quiser editar", 10);
                }, 3000);
            });
        },
        UserProfilePage: (id, username, name, description, thumbnail, rank, state) => {
            Renderer.Load("profile", APPVIEW).then(x => {
                const ranks = [
                    { RankName: "Visitante", RankLevel: 0, Insignia: "https://kaatan.azurewebsites.net/insignias/insignia.jpg" },
                    { RankName: "Cidadão", RankLevel: 1, Insignia: "https://kaatan.azurewebsites.net/insignias/01 cidadao.jpg" },
                    { RankName: "Comerciante", RankLevel: 2, Insignia: "https://kaatan.azurewebsites.net/insignias/02 comerciante.jpg" },
                    { RankName: "Vereador", RankLevel: 3, Insignia: "https://kaatan.azurewebsites.net/insignias/03 vereador.jpg" },
                    { RankName: "Polícia", RankLevel: 4, Insignia: "https://kaatan.azurewebsites.net/insignias/04 policia.jpg" },
                    { RankName: "Juiz", RankLevel: 5, Insignia: "https://kaatan.azurewebsites.net/insignias/05 juiz.jpg" },
                    { RankName: "Deputado", RankLevel: 6, Insignia: "https://kaatan.azurewebsites.net/insignias/06 deputado.jpg" },
                    { RankName: "Procurador", RankLevel: 7, Insignia: "https://kaatan.azurewebsites.net/insignias/07 procurador.jpg" },
                    { RankName: "Ministro", RankLevel: 8, Insignia: "https://kaatan.azurewebsites.net/insignias/08 ministro.jpg" },
                    { RankName: "Proibido", RankLevel: 9, Insignia: "https://kaatan.azurewebsites.net/insignias/09 proibido.jpg" }
                ];
                // Generate Data:
                const userData = new Content.Social.UserData();
                userData.Id = id;
                userData.Name = name;
                userData.Username = username;
                userData.Description = description;
                userData.Thumbnail = thumbnail;
                userData.Rank = ranks[rank];
                userData.State = state;
                //
                document.querySelector("#profile-pic-img img").src = userData.Thumbnail;
                //
                const profileBadgeImg = document.querySelector("#status-data-img img");
                profileBadgeImg.src = userData.Rank.Insignia;
                profileBadgeImg.style.userSelect = "none";
                profileBadgeImg.onmouseover = () => Tooltip.Tooltip(userData.Rank.RankName + "\nClique para saber mais.", profileBadgeImg)
                profileBadgeImg.onclick = e => Tooltip.Toast("Perfil de visitante", 5);
                //
                const profileName = document.getElementById("profile-name");
                profileName.innerText = userData.Name;
                profileName.onmouseover = e => Tooltip.Tooltip(userData.Name, profileName);
                const profileUsername = document.getElementById("profile-username");
                profileUsername.innerText = userData.Username;
                profileUsername.onmouseover = e => Tooltip.Tooltip(userData.Username, profileUsername);
                const txtDescription = document.getElementById("profile-description");
                txtDescription.innerText = userData.Description;
                //
                const shareBtn = document.getElementById("share-profile-btn");
                shareBtn.onclick = e => {
                    Renderer.VCard.VCardContent.Name = userData.Name;
                    Renderer.VCard.VCardContent.Profilelink = "https://www.kaatan.com.br/" + userData.Username;
                    Renderer.VCard.VCardContent.Userid = userData.Id;
                    Renderer.VCard.VCardContent.Username = userData.Username;
                    Renderer.VCard.VCardContent.Thumb = userData.Thumbnail;
                    Renderer.VCard.Show(Renderer.VCard.VCardContent);
                }
                //
                const profileData = document.getElementById("profile-data");
                profileData.innerHTML = "";
                Object.keys(state).forEach(key => {
                    const gridRow = document.createElement("grid-row");
                    const textLabel = document.createElement("text-label");
                    textLabel.innerHTML = key;
                    const textParagraph = document.createElement("text-paragraph");
                    textParagraph.innerHTML = state[key];
                    gridRow.appendChild(textLabel);
                    gridRow.appendChild(textParagraph);
                    profileData.appendChild(gridRow);
                });
            });
        },
        RoomProfilePage: (id, username, name, description, thumbnail, state) => {
            Renderer.Load("room-profile", APPVIEW).then(x => {
                // Generate Data:
                const userData = new Content.Social.UserData();
                userData.Id = id;
                userData.Name = name;
                userData.Username = username;
                userData.Description = description;
                userData.Thumbnail = thumbnail;
                userData.State = state;
                //
                document.querySelector("#profile-pic-img img").src = userData.Thumbnail;
                //
                const profileName = document.getElementById("profile-name");
                profileName.innerText = userData.Name;
                profileName.onmouseover = e => Tooltip.Tooltip(userData.Name, profileName);
                const profileUsername = document.getElementById("profile-username");
                profileUsername.innerText = userData.Username;
                profileUsername.onmouseover = e => Tooltip.Tooltip(userData.Username, profileUsername);
                const txtDescription = document.getElementById("profile-description");
                txtDescription.innerText = userData.Description;
                //
                //
                const profileData = document.getElementById("profile-data");
                profileData.innerHTML = "";
                for (const key of Object.keys(state)) {
                    const gridRow = document.createElement("grid-row");
                    const textLabel = document.createElement("text-label");
                    textLabel.innerHTML = key;
                    const textParagraph = document.createElement("text-paragraph");
                    textParagraph.innerHTML = state[key];
                    gridRow.appendChild(textLabel);
                    gridRow.appendChild(textParagraph);
                    profileData.appendChild(gridRow);
                }
            });
        },
        DocsPage: (markdown) => {
            Renderer.Load("docs", APPVIEW).then(x => {
                const html = Content.TextHandler.MarkdownParser(markdown);
                document.querySelector("markdown-viewer").innerHTML = html;
            });
        },
        AccessPage: async () => {
            await Renderer.Load("access", APPVIEW);
        },
        /**
         * @description Generates a new post element and appends it to the postView element, the post element receive the `post.PostId` as its `id` attribute.
         * @param {Post} post 'An instance of the `Model.Post` class.'
         * @param {HTMLElement} postView 'The HTMLElement target where the post element will be appended'
         * @param {function} headerClickCB Callback function called when the header is clicked
         * @param {function} bodyClickCB Callback function called when the content is clicked
         * @param {function} likeClickCB Callback function called when the like button is clicked
         * @param {function} commentClickCB Callback function called when the comment button is clicked
         * @param {function} saveClickCB Callback function called when the save button is clicked
         * @example Renderer.Components.PostBox(post, postView, headerClickCB, bodyClickCB, likeClickCB, commentClickCB, saveClickCB);
         */
        PostBox: (post, postView, headerClickCB, bodyClickCB, likeClickCB, commentClickCB, saveClickCB) => {
            let postElement = document.createElement("card-big");
            postElement.setAttribute("username", post.Username);
            postElement.id = post.PostId;

            const headerElement = document.createElement("div");
            headerElement.classList.add("post-header");
            let span = document.createElement("span");
            span.classList.add("post-profilepic");
            let profilePic = document.createElement("img");
            profilePic.src = post.Thumbnail;
            span.appendChild(profilePic);
            headerElement.appendChild(span);
            span = document.createElement("span");
            span.textContent = post.Name;
            span.classList.add("sender");
            headerElement.appendChild(span);
            headerElement.onmouseenter = e => {
                postElement.classList.remove("elastic")
            };
            headerElement.onmouseleave = e => {
                postElement.classList.add("elastic")
            };
            headerElement.onclick = e => headerClickCB(post.PostId);
            postElement.appendChild(headerElement);

            const contentElement = document.createElement("div");
            contentElement.classList.add("post-content");
            const textParagraph = document.createElement("text-paragraph");
            textParagraph.innerHTML = post.Content;
            contentElement.appendChild(textParagraph);
            contentElement.onclick = e => bodyClickCB(post.PostId);
            postElement.appendChild(contentElement);

            const footerElement = document.createElement("div");
            footerElement.classList.add("post-footer");
            const actions = document.createElement("div");
            actions.classList.add("footer-actions");
            const span1 = document.createElement("span");
            span1.classList.add("footer-icon");
            const heartIcon = document.createElement("img");
            heartIcon.src = "https://kaatan.azurewebsites.net/files/heart-wire.svg";
            heartIcon.height = "32px";
            span1.appendChild(heartIcon);
            span1.onclick = e => likeClickCB(post.PostId);
            actions.appendChild(span1);

            const small1 = document.createElement("small");
            if (post.Upvotes > 999999) {
                small1.textContent = "+" + (Number(post.Upvotes) / 1000000).toFixed(1) + "M";
            } else if (post.Upvotes > 999) {
                small1.textContent = "+" + (Number(post.Upvotes) / 1000).toFixed(1) + "k";
            } else {
                small1.textContent = post.Upvotes;
            }
            actions.appendChild(small1);

            const span2 = document.createElement("span");
            span2.classList.add("footer-icon");
            const commentsIcon = document.createElement("img");
            commentsIcon.src = "https://kaatan.azurewebsites.net/files/message_all.svg";
            commentsIcon.height = "32px";
            span2.appendChild(commentsIcon);
            span2.onclick = e => commentClickCB(post.PostId);
            actions.appendChild(span2);

            const small2 = document.createElement("small");
            if (post.Comments.length > 999999) {
                small2.textContent = "+" + (Number(post.Comments.length) / 1000000).toFixed(1) + "M";
            } else if (post.Comments.length > 999) {
                small2.textContent = "+" + (Number(post.Comments.length) / 1000).toFixed(1) + "k";
            } else {
                small2.textContent = post.Comments.length;
            }

            actions.appendChild(small2);

            const span4 = document.createElement("span");
            span4.classList.add("footer-icon");
            const saveIcon = document.createElement("img");
            saveIcon.src = "https://kaatan.azurewebsites.net/files/save.svg";
            saveIcon.height = "32px";
            span4.appendChild(saveIcon);
            span4.onclick = e => saveClickCB(post.PostId);
            actions.appendChild(span4);
            actions.onmouseenter = e => {
                postElement.classList.remove("elastic")
            };
            actions.onmouseleave = e => {
                postElement.classList.add("elastic")
            };

            footerElement.appendChild(actions);

            //
            const date = new Date();
            date.setTime(post.Time);
            const time = date.getDate() + "/" +
                ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"][date.getMonth()] +
                " " +
                date.getHours().toString().padStart("2", "0") +
                ":" +
                date.getMinutes().toString().padStart("2", "0") +
                "";
            const span3 = document.createElement("span");
            span3.textContent = time;
            span3.style.textAlign = "right";
            footerElement.appendChild(span3);
            //
            postElement.appendChild(footerElement);
            post.Type;
            post.Comments.forEach(comment => {
                comment.Username;
                comment.Content;
            });
            postView.appendChild(postElement);
            postView.scrollTo(0, (Number.MAX_SAFE_INTEGER * -1));
        },
        /**
         * @description Generates a new message element and appends it to the messageView element, the message element receive the `msg.MessageId` as its `id` attribute.
         * @param {Message} message 'An instance of the `Model.Message` class.'
         * @param {HTMLElement} messageView 'The HTMLElement target where the messagem element will be appended'
         * @param {function} bodyClickCB 'Callback function called when the body is clicked'
         * @param {function} headerClickCB 'Callback function called when the header is clicked'
         * @param {function} replyClickCB 'Callback function called when the header is clicked'
         * @param {function} likeClickCB 'Callback function called when the header is clicked'
         * @param {function} saveClickCB 'Callback function called when the header is clicked'
         * @example Renderer.Components.MessageBox(msg, msgView, bodyClickCB, headerClickCB, replyClickCB, likeClickCB, saveClickCB);
         */
        MessageBox: (message, messageView, bodyClickCB, headerClickCB, replyClickCB, likeClickCB, saveClickCB) => {
            let msgElement = document.createElement("card-big");
            msgElement.setAttribute("username", message.Username);
            msgElement.id = message.MessageId;
            if (message.Self) {
                msgElement.classList.add("card-right");
            } else {
                msgElement.classList.add("card-left");
            }

            const headerElement = document.createElement("div");
            headerElement.classList.add("msg-header");
            let span = document.createElement("span");
            span.classList.add("sender");
            span.textContent = message.Name;
            headerElement.appendChild(span);

            span = document.createElement("span");
            span.textContent = "fala para";
            headerElement.appendChild(span);
            span = document.createElement("span");
            span.textContent = message.Receiver;
            span.classList.add("receiver");
            headerElement.appendChild(span);
            headerElement.onclick = e => headerClickCB(message.MessageId);
            headerElement.onmouseenter = e => {
                msgElement.classList.remove("elastic")
            };
            headerElement.onmouseleave = e => {
                msgElement.classList.add("elastic")
            };
            msgElement.appendChild(headerElement);

            const contentElement = document.createElement("div");
            contentElement.classList.add("msg-content");
            const textParagraph = document.createElement("text-paragraph");
            textParagraph.innerHTML = message.Content;
            contentElement.appendChild(textParagraph);
            contentElement.onclick = e => bodyClickCB(message.MessageId);
            msgElement.appendChild(contentElement);

            const footerElement = document.createElement("div");
            footerElement.classList.add("msg-footer");
            const actions = document.createElement("div");
            actions.classList.add("footer-actions");
            const span1 = document.createElement("span");
            span1.classList.add("footer-icon");
            const replayIcon = document.createElement("img");
            replayIcon.src = "https://kaatan.azurewebsites.net/files/reply.svg";
            replayIcon.height = "32px";
            span1.appendChild(replayIcon);
            span1.onclick = e => replyClickCB(message.MessageId);
            actions.appendChild(span1);

            const span2 = document.createElement("span");
            span2.classList.add("footer-icon");
            const heartIcon = document.createElement("img");
            heartIcon.src = "https://kaatan.azurewebsites.net/files/heart-wire.svg";
            heartIcon.height = "32px";
            span2.appendChild(heartIcon);
            span2.onclick = e => likeClickCB(message.MessageId);
            actions.appendChild(span2);

            const small2 = document.createElement("small");
            if (message.Upvotes > 999999) {
                small2.textContent = "+" + (Number(message.Upvotes) / 1000000).toFixed(1) + "M";
            } else if (message.Upvotes > 999) {
                small2.textContent = "+" + (Number(message.Upvotes) / 1000).toFixed(1) + "k";
            } else {
                small2.textContent = message.Upvotes;
            }

            actions.appendChild(small2);

            const span4 = document.createElement("span");
            span4.classList.add("footer-icon");
            const saveIcon = document.createElement("img");
            saveIcon.src = "https://kaatan.azurewebsites.net/files/save.svg";
            saveIcon.height = "32px";
            span4.appendChild(saveIcon);
            span4.onclick = e => saveClickCB(message.MessageId);
            actions.appendChild(span4);

            actions.onmouseenter = e => {
                msgElement.classList.remove("elastic")
            };
            actions.onmouseleave = e => {
                msgElement.classList.add("elastic")
            };

            footerElement.appendChild(actions);

            //
            const date = new Date();
            date.setTime(message.Time);
            const time = date.getDate() + "/" +
                ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"][date.getMonth()] +
                " " +
                date.getHours().toString().padStart("2", "0") +
                ":" +
                date.getMinutes().toString().padStart("2", "0") +
                "";
            const span3 = document.createElement("span");
            span3.textContent = time;
            span3.style.textAlign = "right";
            footerElement.appendChild(span3);
            //
            msgElement.appendChild(footerElement);
            message.Type;
            messageView.insertBefore(msgElement, messageView.firstChild);
            //messageView.appendChild(msgElement);
        },
        /**
         * @description Generates a new comment element and appends it to the commentView element, the comment element receive the `comment.CommentId` as its `id` attribute.
         * @param {Comment} comment 'An instance of the `Model.Comment` class.'
         * @param {HTMLElement} commentView 'The HTMLElement target where the comment element will be appended'
         * @param {function} bodyClickCB 'Callback function called when the body is clicked'
         * @param {function} headerClickCB 'Callback function called when the header is clicked'
         * @param {function} replyClickCB 'Callback function called when the reply button is clicked'
         * @param {function} likeClickCB 'Callback function called when the like button is clicked'
         * @example Renderer.Components.CommentBox(cmm, cmmView, bodyClickCB, headerClickCB, replyClickCB, likeClickCB);
         */
        CommentBox: (comment, commentView, bodyClickCB, headerClickCB, replyClickCB, likeClickCB) => {
            let cardBig = document.createElement("card-big");
            cardBig.setAttribute("username", comment.Username);
            cardBig.id = comment.CommentId;

            const headerElement = document.createElement("div");
            headerElement.classList.add("comment-header");
            let span = document.createElement("span");
            span.classList.add("sender");
            span.textContent = comment.Name;
            headerElement.appendChild(span);
            headerElement.onclick = e => headerClickCB(comment.CommentId);
            headerElement.onmouseenter = e => {
                cardBig.classList.remove("elastic")
            };
            headerElement.onmouseleave = e => {
                cardBig.classList.add("elastic")
            };
            cardBig.appendChild(headerElement);

            const contentElement = document.createElement("div");
            contentElement.classList.add("comment-content");
            const textParagraph = document.createElement("text-paragraph");
            textParagraph.innerHTML = comment.Content;
            contentElement.appendChild(textParagraph);
            contentElement.onclick = e => bodyClickCB(comment.CommentId);
            cardBig.appendChild(contentElement);

            const footerElement = document.createElement("div");
            footerElement.classList.add("comment-footer");
            const actions = document.createElement("div");
            actions.classList.add("footer-actions");
            const span1 = document.createElement("span");
            span1.classList.add("footer-icon");
            const replayIcon = document.createElement("img");
            replayIcon.src = "https://kaatan.azurewebsites.net/files/reply.svg";
            replayIcon.height = "32px";
            span1.appendChild(replayIcon);
            span1.onclick = e => replyClickCB(comment.CommentId);
            actions.appendChild(span1);

            const span2 = document.createElement("span");
            span2.classList.add("footer-icon");
            const heartIcon = document.createElement("img");
            heartIcon.src = "https://kaatan.azurewebsites.net/files/heart-wire.svg";
            heartIcon.height = "32px";
            span2.appendChild(heartIcon);
            span2.onclick = e => likeClickCB(comment.CommentId);
            actions.appendChild(span2);

            const small2 = document.createElement("small");
            if (comment.Upvotes > 999999) {
                small2.textContent = "+" + (Number(comment.Upvotes) / 1000000).toFixed(1) + "M";
            } else if (comment.Upvotes > 999) {
                small2.textContent = "+" + (Number(comment.Upvotes) / 1000).toFixed(1) + "k";
            } else {
                small2.textContent = comment.Upvotes;
            }

            actions.appendChild(small2);

            actions.onmouseenter = e => {
                cardBig.classList.remove("elastic")
            };
            actions.onmouseleave = e => {
                cardBig.classList.add("elastic")
            };

            footerElement.appendChild(actions);

            //
            const date = new Date()
            date.setTime(comment.Time);
            const time = date.getDate() + "/" +
                ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"][date.getMonth()] +
                " " +
                date.getHours().toString().padStart("2", "0") +
                ":" +
                date.getMinutes().toString().padStart("2", "0") +
                "";
            const span3 = document.createElement("span");
            span3.textContent = time;
            span3.style.textAlign = "right";
            footerElement.appendChild(span3);
            //
            cardBig.appendChild(footerElement);
            comment.Type;
            commentView.insertBefore(cardBig, commentView.firstChild);
            //commentView.appendChild(cardBig);
        },
        /**
         * @description Generates a new room element and appends it to the roomView element, the room element receive the `room.Id` as its `id` attribute.
         * @param {Room} room 
         * @param {HTMLElement} roomView 
         * @param {function} bodyClickCB 
         * @param {function} headerClickCB 
         * @param {function} replyClickCB 
         * @param {function} likeClickCB 
         * @example Renderer.Components.RoomsList(room, roomView, bodyClickCB, headerClickCB, enterClickCB, usersClickCB);
         */
        RoomsList: (room, roomView, bodyClickCB, headerClickCB, enterClickCB, usersClickCB) => {
            let cardBig = document.createElement("card-big");
            cardBig.setAttribute("username", room.Username);
            cardBig.id = room.Id;

            const headerElement = document.createElement("div");
            headerElement.classList.add("roomlist-header");
            let span = document.createElement("span");
            span.classList.add("room-profilepic");
            let profilePic = document.createElement("img");
            profilePic.src = room.Thumbnail;
            span.appendChild(profilePic);
            headerElement.appendChild(span);
            span = document.createElement("span");
            span.textContent = room.Name;
            span.classList.add("sender");
            headerElement.appendChild(span);
            headerElement.onclick = e => headerClickCB(room.Id);
            headerElement.onmouseenter = e => {
                cardBig.classList.remove("elastic")
            };
            headerElement.onmouseleave = e => {
                cardBig.classList.add("elastic")
            };
            cardBig.appendChild(headerElement);

            const descriptionElement = document.createElement("div");
            descriptionElement.classList.add("roomlist-description");
            const textParagraph = document.createElement("text-paragraph");
            textParagraph.innerHTML = room.Description;
            descriptionElement.appendChild(textParagraph);
            descriptionElement.onclick = e => bodyClickCB(room.Id);
            cardBig.appendChild(descriptionElement);

            const footerElement = document.createElement("div");
            footerElement.classList.add("roomlist-footer");
            const actions = document.createElement("div");
            actions.classList.add("footer-actions");
            const span1 = document.createElement("span");
            span1.classList.add("footer-icon");
            const replayIcon = document.createElement("img");
            replayIcon.src = "https://kaatan.azurewebsites.net/files/enter.svg";
            replayIcon.height = "32px";
            span1.appendChild(replayIcon);
            span1.onclick = e => enterClickCB(room.Id);
            actions.appendChild(span1);

            const span2 = document.createElement("span");
            span2.classList.add("footer-icon");
            const heartIcon = document.createElement("img");
            heartIcon.src = "https://kaatan.azurewebsites.net/files/community.svg";
            heartIcon.height = "32px";
            span2.appendChild(heartIcon);
            span2.onclick = e => usersClickCB(room.Id);
            actions.appendChild(span2);

            const small2 = document.createElement("small");
            if (room.Users.length > 999999) {
                small2.textContent = "+" + (Number(room.Users.length) / 1000000).toFixed(1) + "M";
            } else if (room.Users.length > 999) {
                small2.textContent = "+" + (Number(room.Users.length) / 1000).toFixed(1) + "k";
            } else {
                small2.textContent = room.Users;
            }

            actions.appendChild(small2);

            actions.onmouseenter = e => {
                cardBig.classList.remove("elastic")
            };
            actions.onmouseleave = e => {
                cardBig.classList.add("elastic")
            };

            footerElement.appendChild(actions);
            cardBig.append(footerElement);

            roomView.appendChild(cardBig);
            //roomView.insertBefore(cardBig, roomView.firstChild);
        },
        /**
         * @description Generates a new room element and appends it to the roomView element, the room element receive the `room.Id` as its `id` attribute.
         * @param {User} user 
         * @param {HTMLElement} userView 
         * @param {function} bodyClickCB 
         * @param {function} headerClickCB 
         * @param {function} replyClickCB 
         * @param {function} likeClickCB 
         * @example Renderer.Components.UsersList(user, userView, bodyClickCB, headerClickCB);
         */
        UsersList: (user, userView, bodyClickCB, headerClickCB) => {
            let cardBig = document.createElement("card-big");
            cardBig.setAttribute("username", user.Username);
            cardBig.id = user.Id;

            const headerElement = document.createElement("div");
            headerElement.classList.add("userlist-header");
            let span = document.createElement("span");
            span.classList.add("user-profilepic");
            let profilePic = document.createElement("img");
            profilePic.src = user.Thumbnail;
            span.appendChild(profilePic);
            headerElement.appendChild(span);
            span = document.createElement("span");
            span.textContent = user.Name;
            span.classList.add("sender");
            headerElement.appendChild(span);
            headerElement.onclick = e => headerClickCB(user.Id);
            headerElement.onmouseenter = e => {
                cardBig.classList.remove("elastic")
            };
            headerElement.onmouseleave = e => {
                cardBig.classList.add("elastic")
            };
            cardBig.appendChild(headerElement);

            const descriptionElement = document.createElement("div");
            descriptionElement.classList.add("userlist-description");
            const textParagraph = document.createElement("text-paragraph");
            textParagraph.innerHTML = user.Description;
            descriptionElement.appendChild(textParagraph);
            descriptionElement.onclick = e => bodyClickCB(user.Id);
            cardBig.appendChild(descriptionElement);

            userView.appendChild(cardBig);
            //userView.insertBefore(cardBig, userView.firstChild);
        },
        AudioPlayer: () => { },
        ImageGallery: () => { },
        SavedItems: () => { },
        AboutPage: () => { },
        HelpPage: () => { },
        Commands: () => { },
    }
}
