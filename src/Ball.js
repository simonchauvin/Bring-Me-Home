function ball(x, y, world) {
	var that = Object.create(FMGameObject(99));

	var spatialComponent = FMSpatialComponent(x, y, that)
	var rendererComponent = FMSpriteRendererComponent(FMAssetManager.getAssetByName("ball"), 100, 100, that);

	var physic = new FMB2CircleComponent(50, world, that);
	physic.init(FMParameters.DYNAMIC, 0.2, 0.3, 1);

	/**
	 * Update the ball
	 */
	that.update = function (game, dt) {
		Object.getPrototypeOf(that).update(game, dt);
	};

	return that;
}