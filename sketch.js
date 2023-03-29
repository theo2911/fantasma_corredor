//Variáveis globais do jogo
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

//Pré-carregamento de imagens
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  //Tela
  createCanvas(600,600);
  //Som de terror
  spookySound.loop();

  //Torre
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  //Grupo de sprites
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  //Fantasma
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {

  //Plano de fundo
  background(255);
   
  if (gameState === "play") {
      
    //DESAFIO2
    //mover p/ a esquerda quando a seta esquerda for pressionada
    if(keyDown("left")){
        ghost.x = ghost.x - 3;
    }
    //DESAFIO2
    //mover p/ direita quando a seta direita for pressionada
    if(keyDown("right")){
      ghost.x = ghost.x + 3;
    }

    //DESAFIO2
    //mover para cima quando a tecla espaço for pressionada
    if(keyDown("space")){
      ghost.velocityY = -10;      
    }

    //Gravidade do fantasma
    ghost.velocityY = ghost.velocityY + 0.8;
  
    //DESAFIO1
    //Condição para a torre de rolagem infinita
    if(tower.y > 500 ){
      tower.y = 300
    } 
  
    spawnDoors();

    //DESAFIO 4
    //Fantasma deve ficar parado quando estiver no climber
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0 ;
    }

    //DESAFIO 4
    //Quando invisibleBlockGroup colidir com o fantasma,
    //destruir o fantasma e mudar o estado do jogo para end.
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    drawSprites();
  }

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors()
 {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;

    //Posições aleatórias de portas
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //DESAFIO 4
    //Aumente a profundidade do fantasma em 1
    ghost.depth = door.depth;
    ghost.depth  += 1;
    
    //DESAFIO 3
    //atribuir tempo de vida para a porta, escalador e bloco invisível
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

   
    //DESAFIO 3
    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); 
    //aqui os obstáculos são as portas, o escalador e o bloco invisível
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

