var peach = peach || {};

/**
 * This is the Icons object.  Write documentation about Icons
 * @return {object} This object exposes the public properties and methods of this object
 */
peach.drills.icons = (function (stage) {
	// Set to strict
	"use strict";

	// Declare variables here
	var publicObj = {},
		icons = {};

	icons = new Kinetic.Layer();

	function Icon(params) {
		var iconImage = new Image(),
			publicObj = {};

		var options = publicObj.options = params;

	    iconImage.onload = function () {
	        var element;

	        element = new Kinetic.Image({
	            x: options.x,
	            y: options.y,
	            width: options.width,
	            height: options.height,
	            image: iconImage,
	            draggable: true
			});

	        element.on("dragstart", function () {
				if (publicObj.options.type === "original") {
					publicObj.options.type = "clone";

					var newOptions = {};

					for (var key in publicObj.options) {
	        			console.log(key);
	        			newOptions[key] = publicObj.options[key];
	        		}
	        		newOptions.type = "original";
	        		var node = new Icon(newOptions);
	        	}
	        });

	        // Add pitch layer
	        icons.add(element);

	        // add the layer to the stage
	        stage.add(icons);
		};

	    // Set image source
	    iconImage.src = options.src;

	    return publicObj;
	}

	/**
	 * Initialisation function which should be called from your controlling object
	 */
	publicObj.init = function () {
		var newicon1 = new Icon({src:"img/goal_64x64.png",x:540,y:20,width:34,height:34,type: "original"});
		var newicon2 = new Icon({src:"img/Soccer_player-boy-01.png",x:540,y:100,type: "original"});
		var newicon3 = new Icon({src:"img/1865034683.png",x:540,y:60,type: "original"});

		var currentLine;

		stage.on("click touchstart", function(e){
			var layer = new Kinetic.Layer(),
				touchPosition = this.getTouchPosition(),
				x = e.x,
				y = e.y;

			if(touchPosition){
				x = touchPosition.x;
				y = touchPosition.y;
			}
			
			if(!currentLine) {
		        currentLine = new Kinetic.Line({
		          points: [x, y,(x + 1),(y + 1)],
		          stroke: "#fff",
		          strokeWidth: 3,
		          lineCap: "round",
		          lineJoin: "round",
		          dashArray: [5,10],
		          draggable:true
		        });
	    	}
	    	else {
	    		var points = currentLine.getPoints();
	    		points.push({x:x,y:y});
	    		currentLine.setPoints(points);
	    	}

			layer.add(currentLine);
			stage.add(layer);
		});

		stage.on("dblclick dbltap", function(){ 
			currentLine = null;
						
			stage.toDataURL({
				callback: function(dataUrl){
					var img = new Image();
					img.src = dataUrl;
					document.body.appendChild(img);
				},
				mimeType: 'image/png',
				quality: 1
			});
			
		})
	};

	// Expose the public object
	return publicObj;

}(peach.drills));