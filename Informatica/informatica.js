let postAtual = 0;
function navigation(post) {
  localStorage.setItem("atual", post);
  postAtual = post;

  for (let i = 0; i <= 55; i++) {
    document.getElementById(i).style.display = 'none';
  }
  let elemento = document.getElementById(postAtual);
  elemento.style.display = 'block';
  document.getElementById('mainView').Child = elemento;
  if (postAtual > 0) {
    document.getElementById('btnAnterior').style.display = 'block';
  }
  else{
    document.getElementById('btnAnterior').style.display = 'none';
  }
  if (postAtual >= 55) {
    document.getElementById('btnProxima').style.display = 'none';
  }
  else{
    document.getElementById('btnProxima').style.display = 'block';
  }
}

function reloadPage(){
  const item = localStorage.getItem("atual");
  navigation(item);
}