//carrega a janela do navegador antes
window.onload = function () {
  var myScore;
  let frames = 0;
  var som = new Audio(); // cria som
  som.src = './sons/Virgo_70k.mp3'
  var img = new Image(); //cria imagem do icone
  img.src = './icone.png';
  var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39; // codigos das teclas
  var moveleft = false, moveright = false, movedown = false, moveup = false; // nao ira mover o objeto
  var canvas = document.getElementById("canvas");
  var contexto = canvas.getContext("2d"); // transforma o canvas
  //atribuindo valores ao objeto


  var objeto = {
    spriteX: 0, // sprite: o pedaço que vai aparecer na tela
    spriteY: 0,
    largura: 100,
    altura: 50,
    x: 30,
    y: 250,


    desenha() {
      //score
      contexto.font = "20px Comic Sans MS";
      contexto.fillStyle = "white";
      contexto.textAlign = "center";
      myScore = contexto.fillText("Score: 00.00.00 ", 700, 50);
      //desenha a imagem com suas cordenadas
      contexto.drawImage(
        img,
        objeto.spriteX, objeto.spriteY,
        objeto.largura, objeto.altura,
        objeto.x, objeto.y,
        objeto.largura, objeto.altura,
      );
    }
  };


  //obstaculos
  var obstaculo = {
    largura: 50,
    altura: 400,
    desenha() { // desenha obstaculos
      contexto.clearRect(0, 0, 800, 500); //limpa oq foi desenhado
      obstaculo.pares.forEach(function (par) { //para cada par de obstaculos ira desenha-lo esses valores
        var yRandom = par.y; // ira agrupar os obstaculos e faze-los aparecerem dinamicamente juntos
        var espaçamento = 90; //entre os obstaculos
        //obstaculo ceu
        var posiçãoceuX = par.x;
        var posiçãoceuY = yRandom;
        contexto.fillStyle = "#191970"
        contexto.fillRect(
          posiçãoceuX, posiçãoceuY,
          obstaculo.largura, obstaculo.altura,
        );
        // obstaculo chao
        var posiçãochaoX = par.x;
        var posiçãochaoY = obstaculo.altura + espaçamento + yRandom;
        contexto.fillStyle = "#1e0f24"
        contexto.fillRect(
          posiçãochaoX, posiçãochaoY,
          obstaculo.largura, obstaculo.altura,
        );
      });
    },



    //obs: distancia entre obstaculos = (300)  
    pares: [], //lista que a cada 100 frames adicionara um item

    atualiza() {
      var passou150frames = frames % 150 === 0; //resultado da divisao do frame atual por 80 o resto sera 0
      if (passou150frames) {
        console.log("passou80frames");
        obstaculo.pares.push({ //retorna um novo array sem modificar nenhum existente 
          x: 800, //pra começar do final da tela
          y: -130 * (Math.random() * 2), //funcao que gera valores aleatorios
        });
      }
      //faze-los movimentarem
      obstaculo.pares.forEach(function (par) {
        par.x = par.x - 2; //deslocar 3 pixels cada vez que for atualizado
        //remover canos quando sairem da tela
        if (par.x + obstaculo.largura <= 0) {
          obstaculo.pares.shift(); //remove o primeiro elemento do array e retora 
        }
      });
    }
  }

  
  //atualizar as funcoes empregadas
  function atualizar() {
    som.play(); // tocar som e atualiza-lo
    obstaculo.atualiza();
    frames = frames + 1; //para cada atualização o frame ira receber mais 1
    obstaculo.desenha();
    objeto.desenha();
    requestAnimationFrame(atualizar, canvas); //atualizar animação na tela
    move();
    //mover();
  }
  atualizar(); //chamada da função


  //ação ao clicar em uma tecla
  window.addEventListener("keydown", keydownHandler);
  function keydownHandler(e) {
    //e.keyCode: numeros das teclas
    var key = e.keyCode;
    if (key === LEFT && key !== RIGHT) { //ira mover se for para esquerda e nao para direita
      moveleft = true;
    }
    if (key === RIGHT && key !== LEFT) {
      moveright = true;
    }
    if (key === DOWN && key !== UP) {
      movedown = true;
    }
    if (key === UP && key !== DOWN) {
      moveup = true;
    }
  }
  
  //parar de mover 
  window.addEventListener("keyup", keyupHandler);
  function keyupHandler(e) {
    var key = e.keyCode;
    if (key === LEFT && key !== RIGHT) {
      moveleft = false;
    }
    if (key === RIGHT && key !== LEFT) {
      moveright = false;
    }
    if (key === DOWN && key !== UP) {
      movedown = false;
    }
    if (key === UP && key !== DOWN) {
      moveup = false;
    }
  }
  //mover
  function move() {
    if (moveleft) {
      objeto.x--;
    }
    if (moveright) {
      objeto.x++;
    }
    if (movedown) {
      objeto.y++;
    }
    if (moveup) {
      objeto.y--;
    }
  }
  // TENTATIVA DE USAR OUTRAS TECLAS
  /**var W = 87, S = 83, A = 65, D = 68; // codigos das teclas
  var move_esquerda = false, move_direita = false, move_baixo = false, move_cima = false;
  window.addEventListener("keydown", keydownHandler);
  function keydownHandler(e) {
    //e.keyCode: numeros das teclas
    var key = e.keyCode;
    if (key === A && key !== D) { //ira mover se for para esquerda e nao para direita
      move_esquerda = true;
    }
    if (key === D && key !== A) {
      move_direita = true;
    }
    if (key === S && key !== W) {
      move_baixo = true;
    }
    if (key === W && key !== S) {
      move_cima = true;
    }
  }
  //parar de mover 
  window.addEventListener("keyup", keyupHandler);
  function keyupHandler(e) {
    var key = e.keyCode;
    if (key === A && key !== D) {
      move_esquerda = false;
    }
    if (key === D && key !== A) {
      move_direita = false;
    }
    if (key === S && key !== W) {
      move_baixo = false;
    }
    if (key === W && key !== S) {
      move_cima = false; 
    }
  }
  //mover
  function mover() {
    if (move_esquerda) {
      objeto.x--;
    }
    if (move_direita) {
      objeto.x++;
    }
    if (move_baixo) {
      objeto.y++;
    }
    if (move_cima) {
      objeto.y--;
    }
  }**/

  //function renderizar() {
  //contexto.clearRect(0, 0, canvas.widht, canvas.height);//limpar do retangulo na tela/ onde comeca
  //contexto.fillRect(objeto.x, objeto.y, 50, 50) //desenha o retangulo
  //contexto.fillStyle = '#fff';
  //contexto.font = "30px Arial";
  //contexto.fillText("Score: 00.00.00 ", 750, 50);
  //}

  //OBSTACULO DO CHAO!!!
  /**var obstaculochao = {
  largura: 50,
  altura: 300, 
  desenha (){ 
    var espaçamento = 100;
    // obstaculo chao
    var posiçãochaoX = 500;
    var posiçãochaoY = obstaculochao.altura + espaçamento + yRandom;
    contexto.fillStyle ="#1e0f24"
    contexto.fillRect ( 
      posiçãochaoX, posiçãochaoY,
      obstaculochao.largura, obstaculochao.altura,
    );
    //atualiza();
  }
}**/

  //canvas.height = window.innerHeight  //altura em px da janela de visualização do navegador
  //canvas.widht = window.innerWidth
}
