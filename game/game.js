// Variáveis globais
let canvas, contexto;
let vidas = 3;
let pontos = 0;
let heroi = {};
let then = Date.now();
heroi['velocidade'] = 150;
let monstro = {};

// Adicionar o ouvinte de eventos das teclas direcionais:
let teclas = {};
addEventListener('keydown', e => {
  delete teclas['ArrowRight'];
  delete teclas['ArrowLeft'];
  delete teclas['ArrowUp'];
  delete teclas['ArrowDown'];
  teclas[e.key] = null;
});

// Funções de movimentação:
function esquerda(mod) { heroi['x'] -= heroi['velocidade'] * mod }
function direta(mod) { heroi['x'] += heroi['velocidade'] * mod }
function cima(mod) { heroi['y'] -= heroi['velocidade'] * mod }
function baixo(mod) { heroi['y'] += heroi['velocidade'] * mod }

// Chamada no início do jogo:
function Start() {
  // Reseta as configurações e inicia o jogo:
  Reiniciar().then(() => Update());
}
// Chamada a cada loop:
function Update() {
  let now = Date.now();
  let delta = now - then;
  //
  // Update:
  if ('ArrowRight' in teclas) {
    direta(delta / 1000);
  }
  if ('ArrowLeft' in teclas) {
    esquerda(delta / 1000);
  }
  if ('ArrowUp' in teclas) {
    cima(delta / 1000);
  }
  if ('ArrowDown' in teclas) {
    baixo(delta / 1000);
  }
  // Se o herói capturar o monstro:
  if (heroi['x'] <= (monstro['x'] + 32)
    && monstro['x'] <= (heroi['x'] + 32)
    && heroi['y'] <= (monstro['y'] + 32)
    && monstro['y'] <= (heroi['y'] + 32)) {
    pontos++;
    Reiniciar();
  }
  // Se o herói sair da tela:
  if (heroi['x'] < 0 ||
    heroi['y'] < 0 ||
    heroi['x'] > 512 ||
    heroi['y'] > 480) {
    vidas--;
    if (vidas == 0) {
      pontos = 0;
      vidas = 3;
      document.getElementById('vidas').innerHTML = 3;
      document.getElementById('pontos').innerHTML = 0;
      heroi['velocidade'] = 150;
      teclas = {};
    } else {
      document.getElementById('vidas').innerHTML = vidas;
    }
    Reiniciar();
  }
  // Render
  //
  then = now;
  // Renderizar:
  // Imagem de fundo:
  let fundo = new Image();
  fundo.src = "gamebackground.jpg";
  fundo.onload = () => {
    contexto.drawImage(fundo, 0, 0);
  };
  // Sprite do herói:
  let spriteHeroi = new Image();
  spriteHeroi.src = "hero.png";
  spriteHeroi.onload = () => {
    contexto.drawImage(spriteHeroi, heroi['x'], heroi['y']);
  };  
  // Sprite do monstro:
  let spriteMonstro = new Image();
  spriteMonstro.src = "monster.png";
  spriteMonstro.onload = () => {
    contexto.drawImage(spriteMonstro, monstro['x'], monstro['y']);
  };
  window.requestAnimationFrame(Update);
}

async function Reiniciar() {
  heroi['x'] = canvas.width / 2;
  heroi['y'] = canvas.height / 2;
  heroi['velocidade'] += 10;
  monstro['x'] = Math.round(32 + (Math.random() * (canvas.width - 64)));
  monstro['y'] = Math.round(32 + (Math.random() * (canvas.height - 64)));
  document.getElementById('pontos').innerHTML = pontos;
  document.getElementById('vidas').innerHTML = vidas;
}


// Obter o canvas e o contexto quando a janela terminar de ser carregada no navegador:
addEventListener('load', () => {
  canvas = document.getElementById("meuCanvas");
  contexto = canvas.getContext("2d");
  Start();
});