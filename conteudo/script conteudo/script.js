

canvas.height = window.innerHeight;
canvas.widht = window.innerWidth;


window.onload=function(){
    
    var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
    var moveleft = false, moveright = false, movedown = false, moveup = false; // nao ira mover
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    var objeto = {
      x: 30,
      y: 300
    }; 

    atualizar();

    window.addEventListener("keydown",keydownHandler);
    window.addEventListener("keyup",keyupHandler);
    //e.keyCode: numeros das teclas
    // alert(e.keyCode);
    //clicar nas teclas
    function keydownHandler (e){
      var key = e.keyCode;
      if(key === LEFT && key !== RIGHT ){ //ira mover se for para esquerda e nao para direita
        moveleft = true;
      }
      if(key === RIGHT && key !== LEFT){
        moveright = true;
      }
      if(key === DOWN && key !== UP){
        movedown = true ;
      }
      if(key === UP && key !== DOWN){
        moveup = true;
      }
    }
    
    //parar de mover
    function keyupHandler (e){
      var key = e.keyCode;
      if(key === LEFT && key !== RIGHT ){ 
        moveleft = false;
      }
      if(key === RIGHT && key !== LEFT){
        moveright = false;
      }
      if(key === DOWN && key !== UP){
        movedown = false ;
      }
      if(key === UP && key !== DOWN){
        moveup = false;
      }
    }

    //mover
    function move(){
      if(moveleft){
        objeto.x --;
      }
      if(moveright){
        objeto.x ++;
      }
      if(movedown){
        objeto.y ++;
      }
      if(moveup){
        objeto.y --;
      }
    }

    function renderizar () {
      contexto.clearRect (0,0,canvas.widht,canvas.height);//limpar do retangulo na tela/ onde comeca
      contexto.fillRect (objeto.x,objeto.y,50,50) //desenha o retangulo
    }

    //redesenhar quando for atualizado
    function atualizar (){
      requestAnimationFrame(atualizar, canvas); //animação/ atualizar canvas
      move();
      renderizar();
    }

    /**window.addEventListener('keydown', function (e) {
        canvas.key = e.true;
      })
      window.addEventListener('keyup', function (e) {
        canvas.key = false;
      })

      canvas.speedX = 0;
        canvas.speedY = 0;
        if (canvas.key && canvas.key == 37) {contexto.speedX = -1; }
        if (canvas.key && canvas.key == 39) {contexto.speedX = 1; }
        if (canvas.key && canvas.key == 38) {contexto.speedY = -1; }
        if (canvas.key && canvas.key == 40) {contexto.speedY = 1; }
      **/
      console.log ("dghsvfs")

    //TENTATIVA DE ATUALIZAR A TELA E REDESENHAR
    
    //contexto.moveTo = (100, 20)

    //var objeto;

    //var comecarjogo;

    /**function comecarjogo() {
    arena.start();
    objeto = new component(30, 30, "red", 10, 120);
    }
    **/
}
