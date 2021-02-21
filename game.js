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
    playButtonSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
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

$("body").bind('keypress tap', first_press_touch);

function first_press_touch()
{
    if(keyPressed == false)
    {
        level = 1;
        keyPressed = true;
        nextSequence();
    }
}

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
    playButtonSound(colorID);
    $('#'+colorID).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
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
    var last_level = level;

    setTimeout(function() {
        bodyElement.removeClass("game-over");
        setTimeout(function() {
            alert("Level reached: " + last_level);
        }, 1000);
    }, 200);

    level = 0;
    playerClicks = 0;
    gamePattern = [];
    userClickedPattern = [];
    keyPressed = false;
    $("h1").text("Game Over, Press Any Key to Restart");
}

function timeout(ms) 
{ //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
}