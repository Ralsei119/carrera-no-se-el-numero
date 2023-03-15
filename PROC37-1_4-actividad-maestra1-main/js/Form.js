class Form {
  constructor() {
    this.input=createInput("").attribute("placeholder","Introduce tu nombre");
    this.playButton=createButton("Jugar");
    this.titleImg=createImg("./assets/title.png", "titulo del juego");
    this.greeting= createElement("h2");
  }


setElementsPosition(){
this.titleImg.position(120,100);
this.input.position(width/2-110, height/2-80)
this.playButton.position(width / 2 - 90, height / 2 - 20);
this.greeting.position(width / 2 - 300, height / 2 - 100);


}

display(){
  this.setElementsPosition();
  this.handleMousePressed();
}



/*handleMousePressed(){
this.playButton.mousePressed(() => {
this.input.hide();
this.playButton.hide();
var message =
`hola ${this.input.value()}
</br>Espera a otro jugador`;
this.greeting.html(message);
player.name=this.input.value();
//cambiar el player Count antes de llamarlo

player.index= playerCount;
playerCount+1;
player.addPlayer();
player.updateCount(playerCount);
//agregar getDistance
player.getDistance();
}
)
}
*/
handleMousePressed() {
  this.playButton.mousePressed(() => {
    this.input.hide();
    this.playButton.hide();
    var message = `
    Hola, ${this.input.value()}
    </br>Espera a que se una otro jugador...`;
    this.greeting.html(message);
    playerCount += 1;
    player.name = this.input.value();
    player.index = playerCount;
    player.addPlayer();//aa
    player.updateCount(playerCount); // BP
    player.getDistance(); //aa
    console.log(playerCount);
  });
}

hide() {
  this.greeting.hide();
  this.playButton.hide();
  this.input.hide();
  this.titleImg.hide();
}


}
