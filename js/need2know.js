(function ($) {
  $.fn.need2know = function(options) {

    var settings = $.extend({
      spacer: 10,
      theme: "dark",
      glossary: []
    }, options);


    var self = this;

    if (settings.theme === "light") {
      this.addClass("whiteTheme");
    }

    //////////////////////////////////////////////////////
	//// IMAGE PRELOADER /////////////////////////////////
	//////////////////////////////////////////////////////

    $.preloadImages = function() {
    	$("<img />").attr("src", arguments[0]);
    };

    for (i=0; i<settings.glossary.length; i++) {
  		$.preloadImages(settings.glossary[i].image);
  	}


    //////////////////////////////////////////////////////
	//// DISPLAYING THE GLOSSARY /////////////////////////
	//////////////////////////////////////////////////////

    // variable to hold the value returned from the setTimeout that hides glossary entries
    var hideTimeout;

    function showGlossary(thisObj) {

        // clearing the timeout of a previous viewed glossary entry
        clearTimeout(hideTimeout);

  		// grabbing x and y coordinates for placement of the glossary popup
  		var y = thisObj.offset().top;
  		var x = thisObj.parent().offset().left;
  		var glossWidth = thisObj.width();
  		var lineheight = parseInt(thisObj.parent().css("line-height"));

  		// getting the width of the parent element to set our glossary popup width
  		var width = thisObj.parent().width();

  		// getting the entry in the glossary from the gloss span
  		var lookup = thisObj.attr("data-entry");

  		// an index variable that will be used to find the entry in the glossary
  		var entry;

  		// run through the glossary entries array, and if the entry variable matches the object's name in the array, set the index to that position within the array
  		$(settings.glossary).each(function(k,v) {
  			if (v.name === lookup) {
  				entry = v;
  			}
  		});

        // if an entry has an image, populate the image tag with the appropriate parameters from the entry. if there's no image in the entry, hide the image
  		if (entry.image) {
            self.find("img").css("display", "block");

  			self.find("img").attr({
  				"display": "block",
  				"src": entry.image,
  				"alt": entry.imageAlt
  			});
  		} else {
  			self.find("img").css("display", "none");
  		}

  		// position the glossary popup and populate the content with the entry definition
  		self.css({
  			"display": "block",
  			"top": y + lineheight + settings.spacer,
  			"left": x,
  			"width": width
  		});
  		self.find("h6").html(entry.name);
  		self.find("p").html(entry.definition);

        setTimeout(function() {
            self.addClass("glossDisplay");
        }, 0);
  	}

  	// hiding the glossary
  	function hideGlossary() {
      self.removeClass("glossDisplay");
      hideTimeout = setTimeout(function() {
        self.css("display", "none");
      }, 250);
  	}

  	// display and build the glossary popup on mouseover
  	$(".gloss").on("mouseover", function() {
  		showGlossary($(this));
  	});

  	// hide on mouseout
  	$(".gloss").on("mouseout", function() {
  		hideGlossary();
  	});

  	// display and build the glossary popup on click, and unbind the mouseout function
  	$(".gloss").click(function() {
  		$(".gloss").off("mouseout");
  		showGlossary($(this));
  	});

  	// clicking the close button
  	self.find(".closeButton").on("click", function() {
  		hideGlossary();
  		$(".gloss").on("mouseout", function() {
  			hideGlossary();
  		});
  	});


  };

}(jQuery));
