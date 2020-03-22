
var buttonColors= [ "red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern=[];

var started = false;

var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level- "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChossenColor = $(this).attr("id");
  userClickedPattern.push(userChossenColor);

  playSound(userChossenColor);
  animatePress(userChossenColor);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level- "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(250).fadeIn(250);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
