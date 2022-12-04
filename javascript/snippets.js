function snippets(tam) {
  for (let index = 1; index <= tam; index++) {
    let x = document.getElementById(`snippet${index}`);
    let y = "";

    let tagAbertura = "<span style='color: grey;'>&lt;</span><span style='color: var(--AMARELO);'>";
    let tagFechamento = "</span><span style='color: grey;'>&gt;</span>";

    for (const i of x.innerHTML) {
      if (i == '<') { y += tagAbertura; }
      else if (i == '>') { y += tagFechamento; }
      else { y += i; }
    }
    y = y.replace("&lt;!DOCTYPE html&gt;", "&lt;<span style='color: var(--AMARELO);'>!DOCTYPE html</span>&gt;")
    .replace("&lt;html&gt", "&lt;<span style='color: var(--AMARELO);'>html</span>&gt")
    .replace("&lt;body&gt", "&lt;<span style='color: var(--AMARELO);'>body</span>&gt")
    .replace("&lt;style&gt", "&lt;<span style='color: var(--AMARELO);'>style</span>&gt")
    .replace("&lt;script&gt", "&lt;<span style='color: var(--AMARELO);'>script</span>&gt")
    .replace("&lt;/html&gt", "&lt;<span style='color: var(--AMARELO);'>/html</span>&gt")
    .replace("&lt;/body&gt", "&lt;<span style='color: var(--AMARELO);'>/body</span>&gt")
    .replace("&lt;/style&gt", "&lt;<span style='color: var(--AMARELO);'>/style</span>&gt")
    .replace("&lt;/script&gt", "&lt;<span style='color: var(--AMARELO);'>/script</span>&gt");

    x.style.backgroundColor = "black";
    x.style.fontSize = "large";
    x.style.border = "var(--cinzaMedio) 1px solid";
    x.style.color = "lightskyblue";
    x.style.padding = "10px";
    x.style.margin = "10px";
    x.style.overflowX = "auto";
    document.getElementById(`snippet${index}`).innerHTML = y;
  }
}
