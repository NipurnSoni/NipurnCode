var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var bananaGroup, bananaImage;
var obstacle,obstaclesGroup,obstacleN;

var score=0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  groundImage = loadImage("ground.jpg");
  
  bananaImage = loadImage("banana.png");
  
  obstacleN = loadImage("obstacle.png");
  
  gameOverImg = loadImage("game_over.png")

}

function setup() {
  createCanvas(650, 420);


  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale=2.2;
  
  monkey = createSprite(70,60,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.18;
  
  gameOver= createSprite(300,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = new Group();
  bananaGroup = new Group();

  
  // To set the shape, size, angle,and x,y offset of the colloider.
  monkey.setCollider("rectangle",0,0,230,500);
  monkey.debug=true;

  score = 0;
  
}

function draw() {
  
  background("white");  
  
  if(gameState === PLAY){
    
    ground.velocityX = -(5 + 2* score/200)
    //scoring
    score = score + Math.round(getFrameRate()/60);
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 200 || mousePressedOver(ground)) {
        monkey.velocityY = -15;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = -12;
        gameState = END;
    }
    if (monkey.isTouching(bananaGroup))
         bananaGroup.destroyEach();
       
  }
  
   else if (gameState === END){
    
    bananaGroup.destroyEach();
    gameOver.visible=true;
    ground.velocityX = 0;
    monkey.velocityY = 0
      
      if(mousePressedOver(gameOver)) {
      reset();
    }
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  

  drawSprites();
  
  // to text score.
  stroke("black");
  textSize(20);
  text("Survival Time: "+ score, 400,50);

}
// function to reset the game.
function reset(){
  gameState=PLAY;  
  gameOver.visible=false;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0;
}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,348,10,40);
   obstacle.velocityX = -(6 + score/100); 
   obstacle.addImage(obstacleN);
   obstacle.scale = 0.2 ;
   obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
 
  }
}

