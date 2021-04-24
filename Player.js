class Player{
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;

  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value", (data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount : count
    })
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name : this.name,
      distance : this.distance
    })
  }

  static getPlayerInfo(){
    var playerInfoRed = database.ref('players');
    playerInfoRed.on("value", (data)=>{
      this.rank = data.val();
    })
  }

  getBirdsAtEnd(){
    database.ref('BirdsAtEnd').on("value", (data)=>{
      this.rank = data.val();
    })
  }



  static updateBirdsAtEnd(rank){
    database.ref('/').update({
      birdsAtEnd : rank
    })
  }
}