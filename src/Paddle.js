function paddle(x, y, world) {
	"use strict";
	var that = Object.create(FMGameObject(99));

	var spatialComponent = FMSpatialComponent(x, y, that);
	var rendererComponent = FMSpriteRendererComponent(FMAssetManager.getAssetByName("paddle"), 300, 30, that);

	var physic = FMB2BoxComponent(300, 30, world, that);
	physic.init(FMParameters.DYNAMIC, 0, 1, 0);

	/**
	 * Update the paddle.
	 */
	that.update = function (game, dt) {
		Object.getPrototypeOf(that).update(game, dt);
		if (game.isKeyPressed(FMKeyboard.left)) {
			physic.applyImpulse(FMVector(-50, 0), FMVector(x, y));
		}
		if (game.isKeyPressed(FMKeyboard.right)) {
			physic.applyImpulse(FMVector(50, 0), FMVector(x, y));
		}
		if (!game.isKeyPressed(FMKeyboard.left) && !game.isKeyPressed(FMKeyboard.right)) {
			physic.applyImpulse(FMVector(0, 0), FMVector(x, y));
		}
	};

	return that;
}