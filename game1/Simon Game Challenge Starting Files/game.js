var gamePattern=[];
var buttonColours =["red", "blue", "green", "yellow"];
var started= false;
var userClickedPattern=[];
var level=0;

$(document).keypress(function(){
 if(!started)
    $("#level-title").text("current level "+level );
    nextSequence();
    started=true;
})


$(".btn").click(function(){
    var  userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
   
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

//to check user input answer



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("current level "+level );
    var randomNumber = Math.floor(Math.random()*4);
    var  randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
function playSound(colourname){
    var newaudio = new Audio("sounds/"+colourname+ ".mp3");
    newaudio.play();
}

function animatePress(currentcolour){
$("#"+currentcolour).addClass("pressed");
setTimeout(function(){
    $("#"+currentcolour).removeClass("pressed");
},105);

}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
         if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () { nextSequence();}, 1000);  
    console.log("success");}}
    else{
        console.log("wrong");  
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over press any key to restart");
        setTimeout( function(){
             $("body").removeClass("game-over");
        },200);
         startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
