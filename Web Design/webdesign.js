let atual = 0;
function navigation(num){
  atual = num;
  sessionStorage.setItem("atual", atual);

  for (let i = 0; i <= 55; i++) {
    document.getElementById(i).style.display = 'none';
  }
  let elemento = document.getElementById(num);
  elemento.style.display = 'block';
  document.getElementById('mainView').Child = elemento;
  if (atual > 0) {
    document.getElementById('btnAnterior').style.display = 'block';
  }
  else{
    document.getElementById('btnAnterior').style.display = 'none';
  }
  if (atual >= 55) {
    document.getElementById('btnProxima').style.display = 'none';
  }
  else{
    document.getElementById('btnProxima').style.display = 'block';
  }
}

function reloadPage(){
  let item = sessionStorage.getItem("atual");
  if (item != null){
    atual = Number(item);
  }else{
    atual = 0;
  }
  navigation(atual);
}