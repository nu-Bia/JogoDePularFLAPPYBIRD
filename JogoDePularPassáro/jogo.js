let frames = 0;


const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planodefundo = {
  spritex: 390,
  spritey: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height  -204,

  desenha() {

    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height);
  
    contexto.drawImage(
      sprites, 
      planodefundo.spritex,   planodefundo.spritey, // sprite x e y
      planodefundo.largura,  planodefundo.altura, // tamanho do recorte da sprite
      planodefundo.x,  planodefundo.y, // posição
      planodefundo.largura,   planodefundo.altura, //
      );

      contexto.drawImage(
        sprites, 
        planodefundo.spritex,   planodefundo.spritey, // sprite x e y
        planodefundo.largura,  planodefundo.altura, // tamanho do recorte da sprite
        (planodefundo.x + planodefundo.largura),  planodefundo.y, // posição
        planodefundo.largura,   planodefundo.altura, //
    );

},
};

// chao
function criaChao() {
const chao = {
spritex: 0,
spritey: 610,
largura: 224,
altura: 112,
x: 0,
y: canvas.height  -112,
atualiza(){
  const movimentoDoChao = 1;
  const repeteEm = chao.largura / 2;
  const movimentacao = chao.x - movimentoDoChao;
      // console.log('[chao.x]', chao.x);
      // console.log('[repeteEm]',repeteEm);
      // console.log('[movimentacao]', movimentacao % repeteEm);
      
      chao.x = movimentacao % repeteEm;
},

desenha() {
  
  contexto.drawImage(
    sprites, 
    chao.spritex,  chao.spritey, // sprite x e y
    chao.largura,  chao.altura, // tamanho do recorte da sprite
    chao.x, chao.y, // posição
    chao.largura,  chao.altura, //
  );

  contexto.drawImage(
    sprites, 
    chao.spritex,  chao.spritey, // sprite x e y
    chao.largura,  chao.altura, // tamanho do recorte da sprite
    (chao.x + chao.largura) , chao.y, // posição
    chao.largura,  chao.altura, //
  );
},
};
return chao;
}

function fazColisao (flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBird >= chaoY) {
    return true;
  }

  return false;

}

function criaFlappyBird(){
const flappyBird  = {
spritex: 0,
spritey: 0,
largura: 33,
altura: 24,
x: 10,
y: 50,
pulo: 4.6,
pula() {
  console.log('devo pular');
  console.log('[antes]', flappyBird.velocidade);
  flappyBird.velocidade =  - flappyBird.pulo;
  console.log('[depois]', flappyBird.velocidade);
},

gravidade:0.25,
veloidade:0,

atualiza(){
  if(fazColisao(flappyBird, globais.chao)) {
    console.log('Fez colisao');
 

    mudaParaTela(Telas.GAME_OVER);
return;


  }

  flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
  flappyBird.y = flappyBird.y + flappyBird.velocidade;
},

movimentos: [
  { spriteX: 0, spriteY: 0, }, //  cima
  { spriteX: 0, spriteY: 26, }, // meio 
  { spriteX: 0, spriteY: 52, }, //  baixo
  { spriteX: 0, spriteY: 26, }, // meio de novo
],

frameAtual:0,
atualizarOFrameAtual() {

  const intervaloDeFrames = 10;
  const passouOIntervalo = frames % intervaloDeFrames === 0;
  

  if (passouOIntervalo) {
const baseDoIncremento = 1;
const incremento = baseDoIncremento + flappyBird.frameAtual;
const baseRepeticao = flappyBird.movimentos.length;
flappyBird.frameAtual = incremento % baseRepeticao
  }
//console.log (incremento);
//console.log (baseRepeticao);

},

desenha(){
  flappyBird.atualizarOFrameAtual();
  const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
  
    contexto.drawImage(
      sprites, 
      flappyBird.spritex,  flappyBird.spritey, // sprite x e y
      flappyBird.largura,  flappyBird.altura, // tamanho do recorte da sprite
      flappyBird.x,  flappyBird.y, // posição
      flappyBird.largura,  flappyBird.altura, //
    );
}
}
return flappyBird;
}

const mensagemGetReady = {
  spritex: 134,
  spritey: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174/2,
  y:50,
  desenha() {
    
    contexto.drawImage(
      sprites, 
      mensagemGetReady .spritex,  mensagemGetReady.spritey, // sprite x e y
      mensagemGetReady .largura,  mensagemGetReady .altura, // tamanho do recorte da sprite
      mensagemGetReady .x, mensagemGetReady .y, // posição
      mensagemGetReady .largura,  mensagemGetReady .altura, //
    );
  }
  }
// game over
  const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
      contexto.drawImage(
        sprites,
        mensagemGameOver.sX, mensagemGameOver.sY,
        mensagemGameOver.w, mensagemGameOver.h,
        mensagemGameOver.x, mensagemGameOver.y,
        mensagemGameOver.w, mensagemGameOver.h
      );
    }
  }

// canos

function criarCanos(){
  const canos = {
    largura:52,
    altura: 400,

    chao:{
      spriteX: 0,
      spriteY: 169,
    },
   ceu : {
    spriteX: 52,
    spriteY: 169,
   },
   espaco:80,
   
   desenha() {
      canos.pares.forEach(function(par){
      const yRandom = par.y;
      const espacamentoEntreCanos = 90;

      const canoCeuX = par.x;
      const canoCeuY = yRandom; 

    // cano de cima
    contexto.drawImage(
      sprites,
      canos.ceu.spriteX, canos.ceu.spriteY,
      canos.largura, canos.altura,
      canos.largura, canos.altura,
      canoCeuX, canoCeuY,
      canos.largura, canos.altura,
    )
    //cano de baixo

    const canoChaoX = par.x;
    const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 

    contexto.drawImage(
      sprites, 
      canos.chao.spriteX, canos.chao.spriteY,
      canos.largura, canos.altura,
      canoChaoX, canoChaoY,
      canos.largura, canos.altura,
    )

    par.canoCeu = {
      x:canoCeuX,
      y:canos.altura + canoCeuY,
    }

    par.canoChao = {
      x:canoChaoX,
      Y:canoChaoY,
    }
  })
},
  
temColisaoComFlappyBird(par){

  const cabecaDoflappy= globais.flappyBird.y;
  const peDoflappy = globais.flappyBird.y+ globais.flappyBird.altura;

if(globais.flappyBird.x >= par.x){
  console.log('flappy bird invadiu a área dos canos')
//para saber se bateu a cabeça 

if (cabecaDoflappy <= par.canoCeu.y){
return true;
}
//para saber se o pé bateu
if (peDoflappy <= par.canoCeu.y){
  return true;
}
}
  return false;
},

pares: [],

atualiza() {
const passou100Frames = frames % 100 === 0;
if (passou100Frames)  {
  console.log('passou 100 frames');
  canos.pares.push({
    x:canvas.width,
    y:-150 * (Math.random ()+ 1),
  });
}

  canos.pares.forEach(function(par){
par.x = par.x - 2;

if(canos.temColisaoComFlappyBird(par)){
console.log ('voce perdeu')
mudaParaTela(telas.GAME_OVER);
}

if(par.x + canos.largura <= 0){
  canos.pares.shift();

}
  });
}
}

return canos;

}

  function criaPlacar(){
    const placar = {
    pontuacao:0 ,

      desenha(){
        contexto.font = '40px "VT323" ';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`hello world ${placar.pontuacao}`, canvas.width - 10 , 40);
        placar.pontuacao
      },

      atualiza(){
        
  const intervaloDeFrames = 10;
  const passouOIntervalo = frames % intervaloDeFrames === 0;

  if(passouOIntervalo){
    placar.pontuacao = placar.pontuacao +1 ;

  }
      }
    }
return placar;
  }

// telas 

  const globais = {};
  let telaAtiva = {};
  function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
  
    if(telaAtiva.inicializa) {
      telaAtiva.inicializa();
    }
  }
  
 
  const Telas = {
   INICIO: {
    inicializa(){
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criarCanos();
    },

    desenha(){
      globais.chao.desenha();
      planodefundo.desenha();
      globais.flappyBird.desenha();  
      globais.canos.desenha();
      mensagemGetReady.desenha();
    },

    click(){
      mudaParaTela(Telas.JOGO);
    },
    atualiza(){
      globais.chao.atualiza();
  

    }
   } 
  };


  Telas.JOGO = {
    inicializa(){
globais.placar = criaPlacar();
    },

desenha() {
  planodefundo.desenha();
  globais.canos.desenha();
  globais.chao.desenha();
  globais.flappyBird.desenha();
  globais.placar.desenha();
},

click(){
  globais.flappyBird.pula();

},


  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
   
  }
};
Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();
  },
  atualiza() {
    
  },
  click() {
    mudaParaTela(Telas.INICIO);
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

    function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
  

requestAnimationFrame(loop); 

}

window.addEventListener('click', function() {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});
mudaParaTela(Telas.INICIO);
loop();