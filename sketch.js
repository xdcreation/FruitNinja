//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var alien1,alien2,alien,alienImg;
var fruit1,fruit2,fruit3,fruit4,fruit;
var gameover,gameoverImg,gameoverSound,knifeSwooshSound;
var fruitGroup, enemyGroup

function preload(){
  
  knifeImage = loadImage("knife.png");
  alienImg = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameoverImg = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  gameover = createSprite(300,300);
  gameover.addImage(gameoverImg);
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
fruitGroup = createGroup();
enemyGroup = createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    gameover.visible = false;
    //calling fruit and monster function
     fruits();
    enemy();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     score = score+1;
     knifeSwooshSound.play()
   }
    // Go to end state if knife touching enemy
   if(enemyGroup.isTouching(knife)){
    gameState = END; 
   gameoverSound.play();
   }
    
    
    
  }
 if(gameState === END){
   gameover.visible = true;
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     fruitGroup.setLifetimeEach(-1);
     enemyGroup.setLifetimeEach(-1);
 } 
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    r = Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1);
    }
    else if(r===2){
      fruit.addImage(fruit2)
    }
    else if(r===3){
      fruit.addImage(fruit3)
    }else{
      
    
      fruit.addImage(fruit4)
    }
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -7;
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
    
  }
  
}
function enemy(){
  if(frameCount%100 === 0){
    Monster = createSprite(400,200,10,10);
    Monster.addAnimation("running",alienImg);
    Monster.velocityX = -8;
    Monster.y = Math.round(random(50,500));
    Monster.lifetime = 300;
    enemyGroup.add(Monster);
    
  }
}