var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;
var c1,c2,c3,c4;
var o1,o2,o3,o4,o5,o6;
var finish;


//localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  f = loadImage("finish.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(20,height-50,20,50);
  trex.velocityX = 5;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = 7;
  
  gameOver = createSprite(width/2,height/2 + 50);
  gameOver.addImage(gameOverImg);

 // text("start",20,height-40);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  finish = createSprite(1300,height-40);
  finish.addImage(f);
  finish.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,height-10,4000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  c1 = createSprite(200,200)
  c1.addImage(cloudImage);
  c1.scale = 1;

  c2 = createSprite(450,250)
  c2.addImage(cloudImage);
  c2.scale = 1;

  c3 = createSprite(760,300)
  c3.addImage(cloudImage);
  c3.scale = 1;

  c4 = createSprite(1200,210)
  c4.addImage(cloudImage);
  c4.scale = 1;

  o1 = createSprite(250,height-30);
  o1.addImage(obstacle1);
  o1.scale =0.5;

  o2 = createSprite(550,height-30);
  o2.addImage(obstacle2);
  o2.scale = 0.5;

  o3 = createSprite(850,height-30);
  o3.addImage(obstacle3);
  o3.scale = 0.5;
  
  /*o4 = createSprite(1010,height-30);
  o4.addImage(obstacle4);
  o4.scale = 0.5;*/
  
  o5 = createSprite(1200,height-30);
  o5.addImage(obstacle5);
  o5.scale = 0.5;
  
  
  

  score = 0;
}

function draw() {
 // trex.debug = true;
  background(185);
  textSize(20)
  strokeWeight(5)
  text("Score: "+ score, width-200,400);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
  
    if((keyDown("space")||touches.length>0) && trex.y >= height-40) {
      trex.velocityY = -12;
      touches=[];
    }
      trex.velocityX = 5;
      trex.velocityY = trex.velocityY + 0.8

    
      camera.position.x =windowWidth/2;
      camera.position.y = windowHeight/2+100;

     if(trex.x>1300){
       gameState = END;
       trex.velocityX = 0;
     }
     
    
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
   /* spawnClouds();
    spawnObstacles();*/
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
    if(o1.isTouching(trex)||
      o2.isTouching(trex)||
      o3.isTouching(trex)||
      o5.isTouching(trex)){
      gameState = END
    }

  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    trex.velocityX = 0;
    trex.velocityY = 0;
    //obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if((mousePressedOver(restart)) || touches.length>0){
       reset();
       touches = [];
    }
  }
  
  
  drawSprites();
}

/*function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-80,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
   //cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = width;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width+20,height-30,10,40);
    //obstacle.debug = true;
    //obstacle.velocityX = ground.velocityX;
   // console.log(obstacle.velocityX);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = width;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}*/

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  trex.x = 20;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  /*if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  //console.log(localStorage["HighestScore"]);*/
  
  score = 0;
  
}