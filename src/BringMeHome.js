var start = function () {
    "use strict";
    //Sprites
    FMAssetManager.addAsset("ball", FMParameters.IMAGE, "assets/ball.png");
    FMAssetManager.addAsset("paddle", FMParameters.IMAGE, "assets/paddle.png");
    FMAssetManager.addAsset("theWall", FMParameters.IMAGE, "assets/the_wall.png");

    //Sounds
    FMAssetManager.addAsset("sndBall", FMParameters.AUDIO, "assets/ball.wav");

    //Tiled Map Editor Levels
    FMAssetManager.addAsset("wldTest", FMParameters.FILE, "world/test.tmx");
    //Tile set
    FMAssetManager.addAsset("ground", FMParameters.IMAGE, "assets/ground.png");

    FMParameters.libraryDirectory = "lib";

    var game = FMGame("canvas1", "Bring Me Home", 800, 600, menuState);
    game.run();
};

window.addEventListener("load", start, false);