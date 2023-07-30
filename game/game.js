// Variáveis globais
let canvas, contexto;
let vidas = 3;
let pontos = 0;
let heroi = {};
heroi['velocidade'] = 150;
let monstro = {};
// Imagens:
let fundo = new Image();
fundo.src = "gamebackground.jpg";
let spriteHeroi = new Image();
spriteHeroi.src = "hero.png";
let spriteMonstro = new Image();
spriteMonstro.src = "monster.png";

let inicio = Date.now();

// Adicionar o ouvinte de eventos das teclas direcionais:
let teclas = {};
addEventListener('keydown', e => {
  delete teclas['ArrowRight'];
  delete teclas['ArrowLeft'];
  delete teclas['ArrowUp'];
  delete teclas['ArrowDown'];
  teclas[e.key] = 0;
});

// Obter o canvas e o contexto quando a janela terminar de ser carregada no navegador:
addEventListener('load', () => {
  canvas = document.getElementById("meuCanvas");
  contexto = canvas.getContext("2d");
  Start();
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
async function Reiniciar() {
  heroi['x'] = canvas.width / 2;
  heroi['y'] = canvas.height / 2;
  heroi['velocidade'] += 10;
  monstro['x'] = Math.round(32 + (Math.random() * (canvas.width - 64)));
  monstro['y'] = Math.round(32 + (Math.random() * (canvas.height - 64)));
  document.getElementById('pontos').innerHTML = pontos;
  document.getElementById('vidas').innerHTML = vidas;
}

// Chamada a cada loop:
function Update() {
  // Obter a diferença de tempo entre o loop e o início do jogo:
  let agora = Date.now();
  let delta = agora - inicio;
  // Direcionar o herói:
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
  // Reiniciar se o herói capturar o monstro:
  if (heroi['x'] <= (monstro['x'] + 32)
    && monstro['x'] <= (heroi['x'] + 32)
    && heroi['y'] <= (monstro['y'] + 32)
    && monstro['y'] <= (heroi['y'] + 32)) {
    pontos++;
    Reiniciar();
  }
  // Reiniciar se o herói sair da tela:
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

  // Renderizar o jogo:
  inicio = agora;
  contexto.drawImage(fundo, 0, 0);
  contexto.drawImage(spriteHeroi, heroi['x'], heroi['y']);
  contexto.drawImage(spriteMonstro, monstro['x'], monstro['y']);
  // Adicionar a atualização à renderização do navegador:
  window.requestAnimationFrame(Update);
}
