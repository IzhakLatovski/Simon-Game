var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted=0;
var level=0;
var clicks;

$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(clicks++);
});

$(document).keypress(function() {
  if(gameStarted===0) {
    gameStarted++;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
})

$("#level-title").click(function() {
  if(gameStarted===0) {
    gameStarted++;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
})

function nextSequence () {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  clicks=0;

  $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);
}

function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress (currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer (currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    if(currentLevel===level-1) {
      setTimeout(nextSequence, 800);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout( function () {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver () {
  level=0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = 0;
}
