const lista = `
<p>Postagens</p>
<a href="3.html">Criar um site do zero com HTML CSS e Javascript</a>
<a href="2.html">Enviar e-mail com NodeJS</a>
<a href="1.html">Alterar resolução de imagens com Javascript Puro</a>
`;
window.onload = () => {
  let side = document.createElement("div");
  side.setAttribute("class", "js-side-left");
  side.innerHTML = lista;
  document.body.appendChild(side);
};

//https://www.youtube.com/watch?v=Wwr1qTfJHbQ