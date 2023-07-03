
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var nave1, tiro1, fundo, grupoVida, grupoIni1, grupoIni2, grupoIni3, grupoTiro1;
var nave1Image, tiro1Image, inimigo2Image, vidaImage, inimigo1Image, inimigo3Image, fundoImage;
var vidas = 1
var score = 0
function preload() {

  fundoImage = loadImage("fundo10.png");

  tiro1Image = loadImage("tirorr0.png");
  nave1Image = loadImage("nave40.png");
  vidaImage = loadImage("vida110.png");
  inimigo2Image = loadImage("navePerdida20.png");
  inimigo1Image = loadImage("na330.png");
  inimigo3Image = loadImage("nn050.png");

}



function setup() {
  createCanvas(400, 400);


  fundo = createSprite(0, 0, 400, 400);
  fundo.addImage(fundoImage);
  fundo.scale = 2.5



  nave1 = createSprite(350, 220, 20, 50);
  nave1.addImage(nave1Image);
  nave1.scale = 0.2;

  score = 0
  grupoVida = new Group();
  grupoIni2 = new Group();
  grupoIni3 = new Group();
  grupoIni1 = new Group();

  grupoTiro1 = new Group();


}

function draw() {
  background(0);



  drawSprites();




  if (gameState === PLAY) {


    fundo.velocityX = -3

    if (fundo.x < 0) {
      fundo.x = fundo.width / 2;
    }


    nave1.y = World.mouseY


    if (keyDown("space")) {
      gerarTiro1();

    }


    var select_naves = Math.round(random(1, 4));

    if (World.frameCount % 100 == 0) {
      switch (select_naves) {
        case 1: gerarVida();
          break;
        case 2: naveIni3();
          break;
        case 3: naveIni1();
          break;
        case 4: naveIni2();
          break;
        default: break;
      }
    }

    if (nave1.isTouching(grupoVida)) {
      grupoVida.destroyEach();
      grupoTiro1.destroyEach();
      vidas += 1


    }

    if (nave1.isTouching(grupoIni1) || nave1.isTouching(grupoIni2) || nave1.isTouching(grupoIni3)) {


      vidas -= 1
      grupoIni1.destroyEach()
      grupoIni2.destroyEach()
      grupoIni3.destroyEach()


    }

    if (vidas <= 0) {

      gameState = END;



    }


    if (grupoTiro1.isTouching(grupoVida)) {

      grupoVida.destroyEach();

    }



    if (grupoTiro1.isTouching(grupoIni2)) {
      grupoIni2.destroyEach();
      grupoTiro1.destroyEach();
      score += 6
    }

    if (grupoTiro1.isTouching(grupoIni3)) {
      grupoIni3.destroyEach();
      grupoTiro1.destroyEach();
      score += 4
    }

    if (grupoTiro1.isTouching(grupoIni1)) {
      grupoIni1.destroyEach();
      grupoTiro1.destroyEach();
      score += 2
    }




    nave1.visible = true



  }else if (gameState === END) {


    fill("yellow")
    textAlign("center")

    text("GAME OVER", 200, 200)

    text("aperte seta para cima para reiniciar", 200, 300)


    nave1.visible = false



    fundo.velocityX = 0;

    grupoIni1.destroyEach()
    grupoIni2.destroyEach()
    grupoIni3.destroyEach()

    

      


  }







  fill("yellow")
  text("Pontuação: " + score, 300, 50);
  text("Vidas:" + vidas, 240, 50)

}


function gerarVida() {
  var vida = createSprite(0, Math.round(random(20, 370)), 10, 10);
  vida.addImage(vidaImage);
  vida.velocityX = 3;
  vida.lifetime = 150;
  vida.scale = 0.08;
  grupoVida.add(vida);
}

function naveIni3() {
  var inimigo3 = createSprite(0, Math.round(random(20, 370)), 10, 10);
  inimigo3.addImage(inimigo3Image);
  inimigo3.velocityX = 7;
  inimigo3.lifetime = 150;
  inimigo3.scale = 0.2;
  grupoIni3.add(inimigo3);
}

function naveIni2() {
  var inimigo2 = createSprite(0, Math.round(random(20, 370)), 10, 10);
  inimigo2.addImage(inimigo2Image);
  inimigo2.velocityX = 7;
  inimigo2.lifetime = 150;
  inimigo2.scale = 0.2;
  grupoIni2.add(inimigo2);
}

function naveIni1() {
  var inimigo1 = createSprite(0, Math.round(random(20, 370)), 10, 10);
  inimigo1.addImage(inimigo1Image);
  inimigo1.velocityX = 7;
  inimigo1.lifetime = 150;
  inimigo1.scale = 0.2;
  grupoIni1.add(inimigo1);
}



function gerarTiro1() {
  var tiro1 = createSprite(100, 100, 60, 10);
  tiro1.addImage(tiro1Image);
  tiro1.x = 360;
  tiro1.y = nave1.y;
  tiro1.velocityX = -4;
  tiro1.lifetime = 100;
  tiro1.scale = 0.1;
  grupoTiro1.add(tiro1);

}

function reset() {

  gameState = PLAY;

  score = 0
  vida = 2



}

function keyPressed() {


  if (keyCode === 38) {

    if (gameState === END) {

      reset()


    }





  }





}





