var peach = peach || {};

/**
 * This is the Drills object.  Write documentation about Drills
 * @return {object} This object exposes the stage object that other objects can then use to add to the canvas
 */
 peach.drills = (function () {
    // Set to strict
    "use strict";
    var stage = {},
        base = {},
        pitchImage;


    stage = new Kinetic.Stage({
        container: "container",
        width: 578,
        height: 330
    });

    base = new Kinetic.Layer();

    pitchImage = new Image();

    pitchImage.onload = function () {
        var pitch, rect;

        pitch = new Kinetic.Image({
            x: 0,
            y: 0,
            image: pitchImage
        });

        // Add pitch layer
        base.add(pitch);

        // add the layer to the stage
        stage.add(base);

        peach.drills.icons.init();
    };

    // Set image source
    pitchImage.src = "img/football_pitch-t2.jpg";

    // add the layer to the stage
    stage.add(base);

    return stage;
}());