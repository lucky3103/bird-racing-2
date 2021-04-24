class Game{
  constructor(){

  }

  getState(){
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function(data){
      gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState : state
    })
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }

    bird1 = createSprite(100,200);
    bird1.addImage("bird1", bird1_img);
    bird2 = createSprite(300,200);
    bird2.addImage("bird2", bird2_img);
    bird3 = createSprite(500,200);
    bird3.addImage("bird3", bird3_img);
    bird4 = createSprite(700,200);
    bird4.addImage("bird4", bird4_img);
    birds = [bird1, bird2, bird3, bird4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getBirdsAtEnd();

    if(allPlayers !== undefined){
      backgroundImage("brown");
      image(sky, 0, -displayHeight*4, displayWidth, displayHeight*5);

      var index = 0;

      var x = 175;
      var y;

      for(var plr in allPlayers){
        index = index + 1;

        x = x + 200;

        y = displayHeight - allPlayers[plr].distance;
        birds[index-1].x = x;
        birds[index-1].y = y;

        if(index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,50,50);
          birds[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = birds[index-1].y;

        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 10;
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateBirdsAtEnd(player.rank);
    }

    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}