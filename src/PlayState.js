/**
 * Start play state
 * @returns {___that0}
 */
function playState() {
    "use strict";
    var that = Object.create(FMState()),

    bal = null,
    player1 = null,
    player2 = null,
    theWall = null,
    metersCovered = 0,
    metersCoveredLabel = null;

    /**
    * Initialize the play state
    */
    that.init = function (game) {
        Object.getPrototypeOf(that).init(game);

        //Debug mode
        FMParameters.debug = true;

        //Background color
        FMParameters.backgroundColor = 'rgb(0,0,0)';

        //Setting the bounds of the world
        that.world.width = 2048
        that.world.height = 600;

	that.world.initBox2DWorld(FMPoint(0, 0), true);

	var tileMap = that.importTileMapFromTmx(FMAssetManager.getAssetByName("wldTest"), "decor", "ground");

	that.world.createBox2DTiles(tileMap);

        player1 = paddle(200, 560, that.world);
        that.add(player1);

	player2 = paddle(200, 20, that.world);
        that.add(player2);

        bal = ball(250, 300, that.world);
        that.add(bal);

        theWall = TheWall(that.world);
        that.add(theWall);

	//GUI
	metersCoveredLabel = FMGameObject(99);
	metersCoveredLabel.scrollFactor = FMPoint(0, 0);
	FMSpatialComponent(750, 20, metersCoveredLabel);
	var text = FMTextRendererComponent(metersCovered + "m", metersCoveredLabel);
	text.setFormat('#fff', '18px sans-serif', 'middle');
	that.add(metersCoveredLabel);

	//Make the camera follow the ball
	that.follow(bal, 160, 160, false);
    };

    /**
    * Update the play state
    */
    that.update = function(game, dt) {
        Object.getPrototypeOf(that).update(game, dt);

        if (game.isMouseClicked()) {
	    bal = ball(game.getMouseWorldX(), game.getMouseWorldY(), that.world);
	    that.add(bal);
        }

	//Update the wall position according to the camera position
	theWall.spatial.x = that.camera.x;

	//Prevent camera from going left
	if (bal.physic.getLinearVelocity().x < 0) {
	    that.unFollow();
	} else if (!that.getScroller()) {
	    that.follow(bal, 160, 160);
	}

	//Player 1 controls
	if (game.isKeyPressed(FMKeyboard.LEFT)) {
		//player1.physic.applyImpulse(FMVector(-50, 0), FMVector(player1.spatial.x, player1.spatial.y));
		player1.physic.setLinearVelocity(FMPoint(-1000, 0));
	}
	if (game.isKeyPressed(FMKeyboard.RIGHT)) {
		//player1.physic.applyImpulse(FMVector(50, 0), FMVector(player1.spatial.x, player1.spatial.y));
		player1.physic.setLinearVelocity(FMPoint(1000, 0));
	}
	if (!game.isKeyPressed(FMKeyboard.LEFT) && !game.isKeyPressed(FMKeyboard.RIGHT)) {
		//player1.physic.applyImpulse(FMVector(0, 0), FMVector(player1.spatial.x, player1.spatial.y));
		player1.physic.setLinearVelocity(FMPoint(0, 0));
	}

	//Player 2 controls
	if (game.isKeyPressed(FMKeyboard.Q)) {
		//player2.physic.applyImpulse(FMVector(-50, 0), FMVector(player2.spatial.x, player2.spatial.y));
		player2.physic.setLinearVelocity(FMPoint(-1000, 0));
	}
	if (game.isKeyPressed(FMKeyboard.D)) {
		//player2.physic.applyImpulse(FMVector(50, 0), FMVector(player2.spatial.x, player2.spatial.y));
		player2.physic.setLinearVelocity(FMPoint(1000, 0));
	}
	if (!game.isKeyPressed(FMKeyboard.Q) && !game.isKeyPressed(FMKeyboard.D)) {
		//player2.physic.applyImpulse(FMVector(0, 0), FMVector(player2.spatial.x, player2.spatial.y));
		player2.physic.setLinearVelocity(FMPoint(0, 0));
	}

	//Increase meters covered
	metersCovered = that.camera.x / FMParameters.PIXELS_TO_METERS;
	metersCoveredLabel.components[FMComponentTypes.RENDERER].text = Math.floor(metersCovered) + "m";

	if (bal.spatial.x > that.camera.width
	    || bal.spatial.x + bal.renderer.getWidth() < that.camera.x
	    || bal.spatial.y + bal.renderer.getHeight() < that.camera.y
	    || bal.spatial.y > that.camera.height) {
	    //TODO show game over and stop everything
	    if (game.isKeyPressed(FMKeyboard.SPACE)) {
		game.switchState(playState());
	    }
	}
    };

    /**
     * Import a tile map from a TMX file.
     */
    that.importTileMapFromTmx = function (file, layerLabel, tileSetLabel) {
	//Retrieve the content of the file
        var data = file.getContent(),
        //Retrieve the root element
        map = parseXml(data).getElementsByTagName("map")[0],
        //Retrieve the specified layer
        layers = map.getElementsByTagName("layer"), i, j, layer, tiles, columnsNumber, linesNumber,
	//Retrieve the width and height of the tiles
	tileWidth = map.getAttribute("tilewidth"),
	tileHeight = map.getAttribute("tileheight");
        for (i = 0; i < layers.length; i = i + 1) {
            if (layers[i].getAttribute("name") == layerLabel) {
                layer = layers[i];
                tiles = layer.getElementsByTagName("data")[i].getElementsByTagName("tile");
		//Retrieve the width and height of the map
                columnsNumber = layer.getAttribute("width");
                linesNumber = layer.getAttribute("height");
		var idxI = 0, idxJ = 0, tileId = 0;
		data = [];
		data.push([]);
		i = 0;
		while (i < tiles.length) {
		    tileId = tiles[i].getAttribute("gid");
		    data[idxI][idxJ] = tileId;
		    if ((i + 1) / columnsNumber == idxI + 1 && idxI < linesNumber && i != 0 && (i + 1) != columnsNumber * linesNumber) {
			idxI++;
			idxJ = 0;
			data.push([]);
		    } else {
			idxJ++;
		    }
		    i++;
		}
            }
        }

	//Retrieve the specified tileset
        var tileSets = map.getElementsByTagName("tileset"), tileSet, image, width, height, tileWidth, tileHeight;
        for (i = 0; i < tileSets.length; i = i + 1) {
            if (tileSets[i].getAttribute("name") == tileSetLabel) {
                tileSet = FMAssetManager.getAssetByName(tileSets[i].getAttribute("name"));
		//Retrieve the width and height of the tiles
		tileWidth = tileSets[i].getAttribute("tilewidth");
		tileHeight = tileSets[i].getAttribute("tileheight");
		//Retrieve the width and height of the tile set
		image = tileSets[i].getElementsByTagName("image")[0];
		width = image.getAttribute("width");
		height = image.getAttribute("height");
                break;
            }
        }

	var tileMap = FMTileMap(tileSet, parseInt(tileWidth), parseInt(tileHeight), 1);
	tileMap.load(data);
	return tileMap;
    };

    return that;
}