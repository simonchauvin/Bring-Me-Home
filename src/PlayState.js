/**
 * Start play state
 * @returns {___that0}
 */
function playState() {
    "use strict";
    var that = Object.create(fmState());

    var bal = null;
    var pad = null;
    var ball6 = null;

    /**
    * Initialize the play state
    */
    that.init = function () {
        Object.getPrototypeOf(that).init();

        //Debug mode
        fmParameters.debug = true;

        fmParameters.backgroundColor = 'rgb(100,200,10)';

        //Setting the bounds of the world
        fmParameters.worldWidth = 2048;
        fmParameters.worldHeight = 768;

        bal = ball(250, 300);
        that.add(bal);

        pad = paddle(280, 150);
        that.add(pad);

        that.follow(bal, 512, 512);
    };

    /**
    * Update the play state
    */
    that.update = function(game) {
        Object.getPrototypeOf(that).update(game);

    };

    return that;
}