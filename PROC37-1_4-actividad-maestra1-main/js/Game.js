class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    

  }

  start(){
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
form.display();

car1 = createSprite(width / 2 - 50, height - 100);
car1.addImage("car1", car1_img);
car1.scale = 0.07;

car2 = createSprite(width / 2 + 100, height - 100);
car2.addImage("car2", car2_img);
car2.scale = 0.07;

cars = [car1,car2]

fuels= new Group();
powerCoins= new Group()

this.addSprites(fuels,4,fuelImage,0.02)
this.addSprites(powerCoins,20,powerCoinImage,0.09);
  }

addSprites(spriteGroup,numberOfSprites,spriteImage,scale){
for (var i=0; i<numberOfSprites;i++){
var x,y;

x=random(width/2+150,width/2-150);
y=random(-height*4.5,height-400);

var sprite=createSprite(x,y);
sprite.addImage("sprite",spriteImage);
sprite.scale=scale;
spriteGroup.add(sprite);
}
}

getState(){

  var gameStateRef=database.ref("gameState");
gameStateRef.on("value", function(data){
gameState=data.val();
console.log("Este es el gamestate"+gameState);
} )

}

update(state){
  database.ref("/").update({
    gameState:state
  })

}
//¿Funcion handleElements?
handleElements() {
  form.hide();
  form.titleImg.position(40, 50);
  form.titleImg.class("gameTitleAfterEffect");

  this.resetTitle.html("Reiniciar juego");
  this.resetTitle.class("resetText");
  this.resetTitle.position(width / 2 + 200, 100);

  this.leadeboardTitle.html("Tabla de puntuación");
  this.leadeboardTitle.class("resetText");
  this.leadeboardTitle.position(width / 3 - 60, 40);
  
  this.leader1.class("leadersText");
  this.leader1.position(width / 3 - 50, 80);

  this.leader2.class("leadersText");
  this.leader2.position(width / 3 - 50, 130);


  this.resetButton.class("resetButton");
  this.resetButton.position(width / 2 + 230, 190);
}


play(){
  
  this.handleElements();
  this.handleResetButton();
  Player.getPlayersInfo();
  Player.getCarsAtEnd();

  if(allPlayers !== undefined){
   
   
   this.showLeaderboard();
   this.showLife();
   this.showFuel();
    //image con minusculas, MUCHA ATENCION
    image(track,0,-height*5,width,height*6);
    var index=0 
    for(var plr in allPlayers){
      
      var x=allPlayers[plr].positionX;
      var y=height-allPlayers[plr].positionY;
      //solo index
      cars[index].position.x = x;
      cars[index].position.y = y;
      index=index+1
    }
    //key con minusculas, MUCHA ATENCION




if(index===player.index){
  stroke(10);
  fill ("red");
  ellipse (x,y,60,60)


  this.handleFuel(index);
  this.handlePowerCoins(index);


  camera.position.x=width/2
  camera.position.y=cars[index-1].position.y;

}

 if(this.playermoving){
  player.positionY+=5;
  player.update();
 }
 
this.handlePlayerControls();
const finishLine=height*6-100;

if (player.positionY>finishLine){
gameState=2;
player.rank+=1;
Player.updateCarsAtEnd(player.rank)
player.update();
this.showRank();
}


  drawSprites();
}
}

handleFuel(index){
  cars[index-1].overlap(fuels,function(collector,collected){
    player.fuel=185;
  collected.remove();

  
  });
  if(player.fuel>0 && this.playermoving){
player.fuel -= 0.9
  }
  if(player.fuel<=0){
gameState=2
  }
}

handlePowerCoins(index){ 
cars[index-1].overlap(powerCoins,function(collector,collected){
  player.score+=21;
  //player.update();
  collected.remove();
})

}

handleResetButton(){
  this.resetButton.mousePressed(() => {
database.ref("/").set({
  gameState:0,
  playerCount:0,
  players:{}
});
window.location.reload();
});
}


handlePlayerControls(){

  if(keyIsDown(UP_ARROW)){
    this.playermoving=true
    player.positionY+=10;
    player.update();
  }

  if(keyIsDown(DOWN_ARROW)){
    this.playermoving=true
    player.positionY-=10;
    player.update();
  }

    if(keyIsDown(LEFT_ARROW)){
      this.playermoving=true
      player.positionX-=10;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW)){
      this.playermoving=true
      player.positionX+=10;
      player.update();
    }
}

  
  

showLeaderboard(){
  var leader1, leader2;
  var players=Object.values(allPlayers);
  if((players[0].rank === 0 && players[1].rank ===0) || players[0].rank === 1) {
    
    leader1=
    players[0].rank +
    "&emsp" +
    players[0].name +
    "&emsp" + 
    players[0].score;

    leader2=
    players[1].rank +
    "&emsp" +
    players[1].name +
    "&emsp" + 
    players[1].score;
  }


if(players[1].rank === 1) {
    
  leader1=
  players[1].rank +
  "&emsp" +
  players[1].name +
  "&emsp" + 
  players[1].score;

  leader2=
  players[0].rank +
  "&emsp" +
  players[0].name +
  "&emsp" + 
  players[0].score;
}



}

showRank(){
swal({
  title:`Ganaste!${"\n"}Posicion${"\n"}${player.rank}`,
  text:"ACABO LA CARRERA",
  imageUrl:"https://st.depositphotos.com/1765462/1932/v/600/depositphotos_19322403-stock-illustration-emblem-racing.jpg",
  imageSize:"100x100",
  confirmButtonText:"Ok"
})






}

showLife(){
  push();
  image(lifeImage,width/2-130,height-player.positionY-200,20,20)
fill("whitte");
rect(width/2-100,height-player.positionY-200.185,20);
fill("0, 255, 255");
rect(width/2-100,height-player.positionY-200,player.life,20);
noStroke();
pop();

}



showFuel(){
  push();
  image(fuelImage,width/2-130,height-player.positionY-300,20,20)
fill("whitte");
rect(width/2-100,height-player.positionY-300.185,20);
fill("30, 15, 155");
rect(width/2-100,height-player.positionY-300,player.fuel,20);
noStroke();
pop();

}


gameOver(){

swal({
title: "Game Over!",
text: "Better Be fast the next time!",
imageUrl: "https://laverdadnoticias.com/__export/1574872350540/sites/laverdad/img/2019/11/27/pulgar_abajo.png_1902800913.png",
imageSize: "100x100",
confirmButtonText: "Try again? :c",
})

}




}

