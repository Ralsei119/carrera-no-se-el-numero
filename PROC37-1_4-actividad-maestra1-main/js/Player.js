class Player {
  constructor() {
    //agregar valores de constructor
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.score=0;
    this.rank=0;
    this.fuel=185;
    this.life=185;

  }
 
 addPlayer(){
  var playerIndex="players/player"+this.index

  if(this.index===1){
    this.positionX=width/2-100
    }else{
this.positionX=width/2+100
    }

database.ref(playerIndex).set({
  name:this.name,
  positionX:this.positionX,
  positionY:this.positionY,
});
console.log("addplayer de player");


 }
 
 

 getDistance(){
  var playerDistanceRef=database.ref("players/player"+this.index)
  playerDistanceRef.on("value",data =>{
    var data=data.val()
    this.positionX=data.positionX,
this.positionY=data.positionY
  });
  console.log("getDistance de player");
 }
 
 
 
 
 
 
 
 
 
 
 
  getCount(){
var playerCountRef=database.ref("playerCount");
playerCountRef.on("value",function(data){
  playerCount=data.val();
})

console.log("getCount de player");
 }
 updateCount(count){
  database.ref("/").update({
    playerCount:count
  });
  console.log("updateCount de player");
 } 

static getPlayersInfo(){
  var playerInfoRef=database.ref("players")
  playerInfoRef.on("value",data =>{
    allPlayers=data.val();
  });
  console.log("getInfo de player");
}


update(){

var playerIndex = "players/player" + this.index;
database.ref(playerIndex).update({ 
name: this.name,
positionX: this.positionX,
positionY: this.positionY,
score:this.score,
rank:this.rank,

 });
console.log("update de player");
}

getCarsAtEnd(){
  database.ref('CarsAtEnd').on("value",(data)=>{
    this.rank=data.val();
  });
}



static updateCarsAtEnd(rank){
  database.ref("/".update)({
    CarsAtEnd:rank
  })
}








}
