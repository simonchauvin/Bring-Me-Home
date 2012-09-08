function paddle(x, y) {
	"use strict";
	var that = fmGameObject(10);

	var spatialComponent = fmSpatialComponent(that, x, y)
	var rendererComponent = fmSpriteRendererComponent(that);
	rendererComponent.init(fmAssetManager.getAssetByName("paddle"));

	var colliderComponent = fmAabbComponent(that, x, y, 300, 30);
	colliderComponent.init()

	var physicComponent = fmPhysicComponent(that);
	physicComponent.acceleration = 10;
	physicComponent.maxXVelocity = 20;
	physicComponent.maxYVelocity = 20;

	fmScriptComponent(that);

	/**
	 * Update the paddle
	 */
	that.update = function (game) {
		
	};

	return that;
}