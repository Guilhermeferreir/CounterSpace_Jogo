canvas.height = window.innerHeight; //altura em px da janela de visualização do navegador
canvas.widht = window.innerWidth;

//carrega a janela do navegador antes
window.onload = function () {
  var img = new Image (); //cria imagem
  img.src = './icone.png';
  var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39; // codigos das teclas
  var moveleft = false, moveright = false, movedown = false, moveup = false; // nao ira mover
  var canvas = document.getElementById("canvas");
  var contexto = canvas.getContext("2d");
  //atribuindo valores  
  var objeto = { 
    spriteX: 0, // sprite: o pedaço que vai aparecer na tela
    spriteY: 0,
    largura: 100,
    altura: 50,
    x: 50,
    y: 400,
    desenha () {
      contexto.clearRect(0, 0, canvas.widht, canvas.height); //limpar oq foi desenhado
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
  //atualizar as funcoes empregadas
  function atualizar() {
    objeto.desenha();
    requestAnimationFrame(atualizar, canvas);
    move();
  }
  atualizar();

  window.addEventListener("keydown", keydownHandler); //ação ao clicar em uma tecla
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

  //function renderizar() {
    //contexto.clearRect(0, 0, canvas.widht, canvas.height);//limpar do retangulo na tela/ onde comeca
    //contexto.fillRect(objeto.x, objeto.y, 50, 50) //desenha o retangulo
    //contexto.fillStyle = '#fff';
    //contexto.font = "30px Arial";
    //contexto.fillText("Score: 00.00.00 ", 750, 50);
  //}

  //redesenhar quando for atualizado
  //function atualizar() {
    //requestAnimationFrame(atualizar, canvas); //animação/ atualizar canvas
    //move();
    //renderizar();
  //}
}
