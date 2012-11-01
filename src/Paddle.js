function paddle(x, y, world) {
	"use strict";
	var that = Object.create(FMGameObject(99));

	that.spatial = FMSpatialComponent(x, y, that);
	that.renderer = FMSpriteRendererComponent(FMAssetManager.getAssetByName("paddle"), 200, 20, that);

	that.physic = FMB2BoxComponent(200, 20, world, that);
	that.physic.init(FMParameters.KINEMATIC, 0.8, 0.8, 0.8);

	/**
	 * Update the paddle.
	 */
	that.update = function (dt) {
		Object.getPrototypeOf(that).update(dt);
	};

	return that;
}