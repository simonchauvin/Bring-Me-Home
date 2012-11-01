function TheWall(world) {
	"use strict";
	var that = Object.create(FMGameObject(99));

	that.spatial = FMSpatialComponent(0, 0, that);
	that.renderer = FMSpriteRendererComponent(FMAssetManager.getAssetByName("theWall"), 40, 800, that);

	that.physic = new FMB2BoxComponent(40, 800, world, that);
	that.physic.init(FMParameters.STATIC, 1, 1, 1);

	/**
	 * Update the paddle.
	 */
	that.update = function (dt) {
		Object.getPrototypeOf(that).update(dt);
	};

	return that;
}