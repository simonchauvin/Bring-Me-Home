function ball(x, y, world) {
	var that = Object.create(FMGameObject(99));

	var spatialComponent = FMSpatialComponent(x, y, that);
	var rendererComponent = FMSpriteRendererComponent(FMAssetManager.getAssetByName("ball"), 40, 40, that);

	var physic = new FMB2CircleComponent(20, world, that);
	physic.init(FMParameters.DYNAMIC, 0, 1, 1);

	physic.setLinearVelocity(FMVector(80, -60));
        physic.setAngularVelocity(1);

	/**
	 * Update the ball
	 */
	that.update = function (game, dt) {
		Object.getPrototypeOf(that).update(game, dt);
	};

	return that;
}