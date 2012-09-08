/**
 * Under Creative Commons Licence
 * @author Simon Chauvin
 * @param owner
 * @returns {___that0}
 */
function fmSpatialComponent(owner, x, y) {
    "use strict";
    var that_ = fmComponent(fmComponentTypes.spatial, owner);

    /**
     * Add the spatial component to the owner
     */
    owner.addComponent(that_);

    //Set the x and y position on the screen
    that_.x = x;
    that_.y = y;

    /**
     * Post initialization to ensure that all components are initialized
     */
    that_.postInit = function () {
        
    };

    return that_;
};