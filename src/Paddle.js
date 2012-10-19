function paddle(x, y, world) {
	"use strict";
	var that = Object.create(FMGameObject(99));

	that.spatial = FMSpatialComponent(x, y, that);
	that.renderer = FMSpriteRendererComponent(FMAssetManager.getAssetByName("paddle"), 200, 20, that);

	that.physic = FMB2BoxComponent(200, 20, world, that);
	that.physic.init(FMParameters.KINEMATIC, 1, 0, 0);

	/**
	 * Update the paddle.
	 */
	that.update = function (game, dt) {
		Object.getPrototypeOf(that).update(game, dt);
	};

	return that;
}