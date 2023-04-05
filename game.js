var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var game = "loading"


$(document).keypress(function () {

    if (game === "loading") {

        nextSequence();

        game = "loaded";
    }
});




$(".btn").on("click", function () {

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animate(userChosenColor);



    checkAnswer(userClickedPattern.length - 1);



})


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];


    gamePattern.push(randomColor);
    playsound(randomColor);
    $("#" + randomColor).fadeOut(100).fadeIn(100);



}

function playsound(name) {


    var audio = new Audio( name + ".mp3");
    audio.play();



}

function animate(clickedColor) {

    $("#" + clickedColor).addClass("pressed");

    setTimeout(() => {
        $("#" + clickedColor).removeClass("pressed");
    }, "100");

}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");



        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);

        }

    }




    else {

        playsound("wrong");
        $("#level-title").html("Game Over, Press a Key <br> <br>To Restart!");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 400);

        startOver();


    }


}


function startOver() {

    gamePattern = [];
    level = 0;
    game = "loading";
}