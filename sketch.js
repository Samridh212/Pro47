var STORY1=0;
var STORY2=1;
var STORY3=2;
var PLAY=3;
var END=4;
var WIN=5;
var gameState=STORY1;
var Player,player_img;
var enemy;
var bgImg;
var bg;
var crinimal,crinimalImg;
var speed = 1;
var food,foodGroup;
var invground;
var foodImg
var stone,Stone_img;
var stoneGroup;
var arrow,arrow_img,arrowGroup,Invarrow,InvarrowImg;
var energy,energy_img,EnergyGroup;
var distance = 0;
function preload(){
  player_img = loadAnimation("Images/Runner1.png","Images/Runner2.png","Images/Runner3.png","Images/Runner4.png","Images/Runner5.png","Images/Runner6.png","Images/Runner7.png","Images/Runner8.png","Images/Runner9.png","Images/Runner10.png");
  crinimalImg = loadAnimation("Images/Crinimal1.png","Images/Crinimal2.png","Images/Crinimal3.png","Images/Crinimal4.png","Images/Crinimal5.png","Images/Crinimal6.png","Images/Crinimal7.png","Images/Crinimal7.png","Images/Crinimal9.png")
  bgImg = loadImage("Images/bg.jpg")
  foodImg = loadImage("Images/Apple..png")
  Stone_img = loadImage("Images/Obstacle.png")
  arrow_img=loadImage("Images/arrow2.png")
  InvarrowImg=loadImage("Images/arrow.png")
  energy_img = loadImage("Images/Energy.png")
}
function setup() {
  createCanvas(1300,750);

  EnergyGroup = createGroup();

  bg = createSprite(650,375)
  bg.addImage(bgImg)
  bg.x=bg.width/2;

  Player = createSprite(1000,588)
  Player.addAnimation("Hello",player_img)
  Player.visible = false;
  Player.scale = 1.5;

  crinimal = createSprite(83,638)
  crinimal.addAnimation("hello",crinimalImg);
  crinimal.scale = 3.8;
  crinimal.visible = false;

  invground = createSprite(650,718,width,20)
  invground.visible = false;
  foodGroup = createGroup()
  stoneGroup = createGroup();
  arrowGroup = createGroup();

}

function draw() {
  background(225,225,225);  
  crinimal.debug = true;
  if (gameState===3){
    Player.visible = true;
    bg.velocityX = -10;
    crinimal.visible=true;
    

    if (bg.x < (width/8)){
      bg.x = bg.width/2;
    } 
  
    speed = speed + Math.round(getFrameRate()/60);
    if(Player.x>190)
    Player.x = (Player.x-speed/100);
    
    if (keyDown("space")&&Player.y >= 600){
      Player.velocityY = -22;
    }
    
    Player.velocityY = Player.velocityY+1.5
    Player.collide(invground)

    console.log(Player.x)
    foodGroup.debug = true;

  //  bg.velocityX = (bg.velocityX+speed);
    if(Player.isTouching(foodGroup)){
      foodGroup.destroyEach();
      Player.x = Player.x +80;
    }
    if(Player.isTouching(EnergyGroup)){
      EnergyGroup.destroyEach();
      Player.x = Player.x +115;
    }
    if(Player.isTouching(stoneGroup)&&Player.x>190){
      Player.x = Player.x-30;
      stoneGroup.destroyEach();
    }
    if(Player.isTouching(arrowGroup)&&Player.x>190){
      Player.x = Player.x-40;
      arrowGroup.destroyEach();
    }
    //if()

    if(Player.x<190){
      gameState=4;
    }
    if(foodGroup.x===200){
      foodGroup.destroyEach();
      crinimal.x = crinimal.x +50; 
    }
    if(crinimal.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      Player.x = Player.x +70;
    }
    console.log(foodGroup.x)

    
  textSize(25)
  Food();
  Stone();
  Arrow()
  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY)
  text("Distance Covered:- "+distance,900,100)

 if(frameCount%2===0){
   distance = distance+1;
 }
 console.log(distance)
 if(distance===400){
  gameState = WIN;
}


  }
  if(gameState===4){
      Player.destroy();
      crinimal.destroy();
      bg.destroy();
      foodGroup.lifetime = 0;
      stoneGroup.lifetime = 0;
      foodGroup.destroyEach();
      stoneGroup.destroyEach();
      textSize(100);
      text("You lost",550,400)
  }
  if(gameState===5){
    Player.destroy();
    crinimal.destroy();
    bg.destroy();
    foodGroup.lifetime = 0;
    stoneGroup.lifetime = 0;
    foodGroup.destroyEach();
    stoneGroup.destroyEach();
    textSize(100);
    text("You Won",550,400)

  }
  

    if(gameState===1){
      fill("red")
      textSize(50)
      text("Now u need to save yourself from him",305,240)
      text("Your speed will decrease by the time",301,310)
      text("You need to collect food in order to increase your speed",30,380)
      text("If you touch the stone your speed will decrese",160,460)
      text("Also the crinimal will throw arrows at you",250,550)
      text("To decrese your speed",490,630)
      textSize(20)
      text("Press 3 To Continue " ,994,695)

      if(keyCode === 51){
      
        gameState=2;
      }

    }
    if(gameState===2){
      fill("red")
      textSize(50)
      text("Press Space for jump",485,340)
      
      textSize(20)
      text("Press P to start" ,994,655)

      if(keyCode === 112||keyCode === 80){
      
        gameState=3;
      }
textSize(25)
    } 
    if(gameState===0){
      fill("red")
      textSize(50)
      text("Now i am making the game little easier for you",175,240)
      text("If u dodge the stones then it will hit the crinimal",170,310)
      text("And decrese his speed",460,380)
      text("Also Enrgy drink will also come to increse your speed",90,450)
      text("If u cover a distance of 400m you will won",200,540)

      textSize(20)
      text("Press P to start" ,994,655)
      if(keyCode === 112||keyCode === 80){
        
        gameState=3;
      }
    }
  
     
     
 
      

    }
  
    function Food(){
      if(frameCount%120===0){
     food = createSprite(1300,452)
     food.addImage("Hello",foodImg)
     food.velocityX = -10;
     food.scale = 2;
     foodGroup.add(food)
     food.lifetime = 400;

      }
      if(frameCount%175===0){
        energy = createSprite(1300,452)
        energy.addImage("Hello",energy_img)
        energy.velocityX = -10;
        energy.scale = 0.3;
        EnergyGroup.add(energy)
        energy.lifetime = 400;
   
         }
    }
    function Stone(){
      if (frameCount%190===0){
        stone = createSprite(1300,680)
        stone.addImage(Stone_img)
        stone.velocityX = -10;
        stone.lifetime = 150;
        stoneGroup.add(stone)
        stone.scale = 0.3;
      }
    }
    function Arrow(){
      if (frameCount%280===0){
      arrow = createSprite(crinimal.x,crinimal.y)
      arrow.addImage(arrow_img)
      arrow.velocityX = 16;
      arrow.lifetime = 300;
      arrowGroup.add(arrow)
      arrow.scale = 1.3;
      console.log(arrow.log)
      }
    }
    

     
    