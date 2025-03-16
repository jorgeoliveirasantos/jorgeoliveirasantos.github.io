const App = {
    Main: async () => {
        TOPBAR.innerHTML = "";
        //
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
        span.onmouseover = () => Tooltip.Tooltip("Sair", span);

        const img = document.createElement("img");
        img.src = "https://kaatan.azurewebsites.net/files/exit.svg";
        img.style.height = "24px";
        span.appendChild(img);
        TOPBAR.appendChild(span);
        //TOPBAR.style.justifyContent = "center";

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
    },
    //
    _: async () => { },
};

window.App = App;