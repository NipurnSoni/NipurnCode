var fixedrect,movingrect;


function setup() {
  createCanvas(800,400);
   fixedrect=createSprite(400, 200, 50, 50);
   fixedrect.shapeColor="blue";
   movingrect=createSprite(600,200,50,90);
   movingrect.shapeColor="blue";
}

function draw() {
  background(255,255,255);  
  
  movingrect.x=World.mouseX;
  movingrect.y=World.mouseY;
  
  if (fixedrect.x-movingrect.x<fixedrect.width/2+movingrect.width/2 && movingrect.x-fixedrect.x<fixedrect.width/2+movingrect.width/2 && fixedrect.y-movingrect.y<fixedrect.height/2+movingrect.height/2 && movingrect.y-fixedrect.y<fixedrect.height/2+movingrect.height/2){
    fixedrect.shapeColor="orange";
    movingrect.shapeColor="orange";
  }
  else{fixedrect.shapeColor="blue";
  movingrect.shapeColor="blue";}

  drawSprites();
}