var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var buttonSound = ["sounds/red.mp3","sounds/blue.mp3","sounds/green.mp3","sounds/yellow.mp3"];
var level;
var keyPressed = false;
var playerClicks = 0;
var printIndex = 0;

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playButtonSound(userChosenColour);
    playerClicks++;
    if(playerClicks == level)
    {
        if(!checkAnswer())
            gameOver();
        else
        {
            console.log("sucess!");
            level++;
            setTimeout(nextSequence, 2000);
        }
    }
});

$("body").keypress(function()
{
    if(keyPressed == false)
    {
        level = 1;
        keyPressed = true;
        nextSequence();
    }
});

function nextSequence()
{
    playerClicks = 0;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = randomNumber;
    gamePattern.push(buttonColors[randomChosenColour]);
    playTemplate();
}

function playTemplate()
{
    if(printIndex == gamePattern.length)
    {
        printIndex = 0;
        return;
    }

    colorID = gamePattern[printIndex];
    $('#'+colorID).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playButtonSound(colorID);
    printIndex++;
    setTimeout(playTemplate, 500);
}

function playButtonSound(colorID)
{
    var colorIndex = buttonColors.indexOf(colorID);
    var audio = new Audio(buttonSound[colorIndex]);
        audio.play();
}

function animatePress(colorID)
{
    var colorBox = $('#'+colorID);
    colorBox.addClass("pressed");
    setTimeout(function() {
        colorBox.removeClass("pressed");
    }, 100);
}

function checkAnswer()
{
    for (var index = 0; index < gamePattern.length; index++) {
        if(userClickedPattern[index] != gamePattern[index])
            return false;
    }
    return true;
}

function gameOver()
{
    var bodyElement = $("body");
    bodyElement.addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {
        bodyElement.removeClass("game-over");
    }, 200);

    playerClicks = 0;
    gamePattern = [];
    userClickedPattern = [];
    keyPressed = false;
    $("h1").text("Game Over, Press Any Key to Restart");

    alert("Level reached: " + level);
    level = 0;
}

function timeout(ms) 
{ //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
}