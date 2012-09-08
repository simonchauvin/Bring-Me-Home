function ball(x, y) {
	var that = fmGameObject(99);

	var spatialComponent = fmSpatialComponent(that, x, y)
	var rendererComponent = fmSpriteRendererComponent(that);
	rendererComponent.init(fmAssetManager.getAssetByName("ball"));

	var colliderComponent = fmAabbComponent(that, x, y, 100, 100);
	colliderComponent.init()

	var physicComponent = fmPhysicComponent(that);
	physicComponent.xVelocity = 14;
	physicComponent.yVelocity = 8;
	physicComponent.bouncing = true;

	return that;
}