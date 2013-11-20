  //==========================//
 // Initialize
//===========================//
//assign pixel size so stellar.js works
resizeBuildings();

$(document).ready(function(){
	// for scrollbar to work horizontally instead
	$(function(){
		$("html, body").mousewheel(function(event, delta) {
			this.scrollLeft -= (delta * 20);
			event.preventDefault();
		});   
	});

	//opening title text
	$(window).load(function() {
		$(".titleContainer h1").slabText();
	});

	
});

//assign pixel size so stellar.js works
$(window).resize(function() {
  	resizeBuildings();
  	refreshStellar();
});

  //==========================//
 // Landing
//===========================//
//stellar.js parallax effect
$.stellar.positionProperty.limited = {
	setLeft: function($element, newLeft, originalLeft) {
	  	//stops the element from going off the page
	    if (!$element.hasClass("stuck")) {
			$element.css('left', newLeft);
		}
	}
}
$(window).load(function() {
	//stellar.js setup
	$.stellar({
		horizontalScrolling: true,
		verticalScrolling: false,
		responsive: true,
		positionProperty: 'limited',
		horizontalOffset: 0,
		parallaxBackgrounds: false,
		hideDistantElements: false
	});

	//waypoint to align the buildings at edge of the page
	$('.buildingwrapper').waypoint(function(direction) {
		if (direction === "right") {
			$(this).children("img").addClass("stuck");
			$(this).children("img").css("left","0px");
		} else if (direction === "left") {
			$(this).children("img").removeClass("stuck");
		}
	}, { horizontal:true });
});

//sliding speed of buildings

  //==========================//
 // Misc functions
//===========================//
function resizeBuildings(){
	var wrapper = $(".buildingwrapper");
	var height = $(window).height();
	var width = height * 0.5333333333;
	wrapper.css( "width", width );
	wrapper.children("img").css( "width", width );
}

function refreshStellar(){
	// Find out all my elements that are being manipulated with stellar
    var particles = $(".buildingwrapper img");

    // Temporarily stop stellar
    $(window).data('plugin_stellar').destroy();

    $.each(particles, function(i, el){
        // reset position
        $(this).css('left', '');

        // Once the loop is finished, re-initialize stellar
        if(particles.length - 1 == i){
            $(window).data('plugin_stellar').init();
        }
    });
}