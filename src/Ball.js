function ball(x, y, world) {
	var that = Object.create(FMGameObject(99));

        that.velocity = FMPoint(100, 80);

	that.spatial = FMSpatialComponent(x, y, that);
	that.renderer = FMSpriteRendererComponent(FMAssetManager.getAssetByName("ball"), 40, 40, that);

	that.physic = new FMB2CircleComponent(20, world, that);
	that.physic.init(FMParameters.DYNAMIC, 0.8, 0.8, 0.8);

	that.physic.setLinearVelocity(that.velocity);
        that.physic.setAngularVelocity(Math.PI);

	/**
	 * Update the ball
	 */
	that.update = function (dt) {
		Object.getPrototypeOf(that).update(dt);

                //Increase the ball velocity
                that.velocity = that.physic.getLinearVelocity();
                that.velocity.x += 0.00001;
                that.velocity.y += 0.00001;
                that.physic.setLinearVelocity(that.velocity);
	};

	return that;
}