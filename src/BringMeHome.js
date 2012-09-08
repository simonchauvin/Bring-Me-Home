var start = function () {
    "use strict";
    //Sprites
    fmAssetManager.addAsset("ball", fmParameters.IMAGE, "assets/ball.png");
    fmAssetManager.addAsset("paddle", fmParameters.IMAGE, "assets/paddle.png");

    //Sounds
    fmAssetManager.addAsset("sndBall", fmParameters.AUDIO, "assets/ball.wav");

    fmParameters.libraryDirectory = "libs";

    var game = fmGame("Bring Me Home", 1024, 768, menuState);
    game.run();
};

window.addEventListener("load", start, false);