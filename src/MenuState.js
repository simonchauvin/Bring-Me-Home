/**
 * Start menu state
 * @returns {___that0}
 */
function menuState() {
	"use strict";
	var that = Object.create(fmState());

	/**
	 * Initialize the menu
	 */
	that.init = function () {
		Object.getPrototypeOf(that).init();

                //Debug mode
                fmParameters.debug = true;

		//Setting the bounds of the world
		fmParameters.worldWidth = 1024;
		fmParameters.worldHeight = 768;

		var title = fmGameObject(99);
		var sp = fmSpatialComponent(title, fmParameters.screenWidth / 2 - 100, fmParameters.screenHeight / 2 - 150);
		var text = fmTextRendererComponent(title, "Bring Me Home");
		text.setFormat('#fff', '30px sans-serif', 'middle');
		that.add(title);

		var startButton = fmGameObject(99);
		var sp = fmSpatialComponent(startButton, fmParameters.screenWidth / 2 - 130, fmParameters.screenHeight / 2 + 150);
		var text = fmTextRendererComponent(startButton, "Press SPACE to play");
		text.setFormat('#fff', '30px sans-serif', 'middle');
		that.add(startButton);
	};

	/**
	 * Update of the menu state
	 */
	that.update = function (game) {
		Object.getPrototypeOf(that).update(game);

		if (game.isKeyPressed(fmKeyboard.space)) {
			game.switchState(new playState());
		}

	};

	return that;
}