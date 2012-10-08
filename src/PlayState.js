/**
 * Start play state
 * @returns {___that0}
 */
function playState() {
    "use strict";
    var that = Object.create(FMState());

    var bal = null;
    var pad = null;
    var ball6 = null;
    var world;

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
        that.world.setWidth(2024);
        that.world.setHeight(768);

	that.world.initBox2DWorld(FMVector(0, 100), true);

	var tileMap = that.createTileMapFromTmx(FMAssetManager.getAssetByName("wldTest"), "decor", "ground");
	that.world.addTileMap(tileMap);

        pad = paddle(200, 630, that.world);
        that.add(pad);

        bal = ball(250, 300, that.world);
        that.add(bal);

        bal = ball(350, 200, that.world);
        that.add(bal);

        bal = ball(100, 600, that.world);
        that.add(bal);

        bal = ball(500, 200, that.world);
        that.add(bal);

        bal = ball(630, 150, that.world);
        that.add(bal);

        that.follow(bal, 512, 512);
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
    };

    /**
     * Create a tile map from a TMX file.
     */
    that.createTileMapFromTmx = function (file, layerLabel, tileSetLabel) {
	//Retrieve the content of the file
        var data = file.getContent(),
        //Retrieve the root element
        root = parseXml(data).getElementsByTagName("map")[0],
        //Retrieve the specified layer
        layers = root.getElementsByTagName("layer"), i, j, layer, tiles;
        for (i = 0; i < layers.length; i = i + 1) {
            if (layers[i].getAttribute("name") == layerLabel) {
                layer = layers[i];
                tiles = layer.getElementsByTagName("data")[0].getElementsByTagName("tile");
		//Retrieve the width and height of the map
                var columnsNumber = layer.getAttribute("width"),
                linesNumber = layer.getAttribute("height"), idxI = 0, idxJ = 0, tileId;
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
        var tileSets = root.getElementsByTagName("tileset"), tileSet, tileWidth, tileHeight;
        for (i = 0; i < tileSets.length; i = i + 1) {
            if (tileSets[i].getAttribute("name") == tileSetLabel) {
                tileSet = FMAssetManager.getAssetByName(tileSets[i].getAttribute("name"));
                //Retrieve the width and height of the tiles
                tileWidth = tileSets[i].getAttribute("tilewidth");
                tileHeight = tileSets[i].getAttribute("tileheight");
                break;
            }
        }

	var tileMap = FMTileMap(data, tileSet, tileWidth, tileHeight, 1);
	tileMap.load();
	return tileMap;
    };

    return that;
}