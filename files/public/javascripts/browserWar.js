/* BrowserWar, version 0.3.1
 * version: 0.3.1 by Peter Boling and Matt Long <http://www.sagebit.com/> 20081029
 * license: MIT
 *
 * BrowserWar is a Javascript library for detecting a specific browser and displaying custom html in the response to requests from that browser.
 * BrowserWar is developed here:
 *   http://github.com/sagebit/browserwar/tree/master
 * This library can be imported into a project to detect browsers and/or versions of browsers (hello IE!) and display a message 
 * stating that the site is optimized for more modern browsers.
 * "BrowserDetect" tool used here is from http://www.quirksmode.org/js/detect.html
 */

/* arrayFind: returns 'false' if searchStr is not in arr, returns index of object's location if the object is found
 * arr, Array: the array to search
 * searchStr, Object: the element to search for within the specified array
 * 
 * function adapted from Array.find(searchStr) prototype
 * http://snippets.dzone.com/posts/show/3631 for more details
 */
var arrayFind = function(arr, searchStr) {
  var returnArray = [];
  for (i=0; i<arr.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(arr[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (arr[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
	if (arr.length == 0)
		return 'false';
  return returnArray;
}

/* searchBrowsers: Finds which of the browsers in the BroswerWarBrowsers array made the current request.
 * data, Array: the BroswerWarBrowsers array to search
 */
function searchBrowsers(data) {
	for (var i = 0; i < data.length; i++) {
    if (data[i].identity == BrowserDetect.browser) {
      return data[i].display;
    }
  }
}

/* browserwar: the primary object within the BrowserWar library.
 * browserwar will handle the display properties, onload event assignments, and browser detection
 */
var browserwar = function() {
  
	// local vars for browserwar
  var BrowserWarConfig = {
    "domClass": 'broser_awareness',
    "domId": 'browser-awareness',
    "message": null,
    "zIndex": '1000',
		"position": 'absolute',
    "leftPosition": '0',
    "topPosition": '115',
    "width": '200px',
    "padding": '20px',
    "border": '20px',
    "background": '#fff',
    "color": '#000',
		"alinkColor": 'FF0000',
		"vlinkColor": '880088',
		"linkColor": '0000FF',
    "browsers": [],
		"versions": []
  };

  // This is an array for converting from the detected browser to a humanized display name for that browser
  // All the browsers that we can detect are detected by the awesome browserDetect.js
  var BroswerWarBrowsers = [
		{
      identity: "Chrome",
      display: "Google Chrome"
		},
		{
      identity: "OmniWeb",
      display: "OmniWeb"
		},
		{
      identity: "Safari",
      display: "Apple Safari"
		},
		{
      identity: "Opera",
      display: "Opera"
		},
		{
      identity: "iCab",
      display: "iCab"
		},
		{
      identity: "Konqueror",
      display: "KDE Konqueror"
		},
		{
      identity: "Firefox",
      display: "Mozilla Firefox"
		},
		{
      identity: "Camino",
      display: "Camino"
		},
		{
      identity: "Netscape",
      display: "Netscape"
		},
		{
      identity: "Explorer",
      display: "Microsoft Internet Explorer"
		},
		{
      identity: "Mozilla",
      display: "Mozilla"
		},
    {
      identity: "An unknown browser",
      display: "an unknown browser"
    }
  ]

	/* fightbrowser: This function displays the pop-in div
	 * This event is added to the page's onload event via addLoadEvent
	 */
  var fightbrowser = function() {
    config = BrowserWarConfig;
    lastword=document.createElement('div');
    lastword.className = config.domClass;
    lastword.id = config.domId;
    lastword.style.position=config.position;
    lastword.style.width=config.width;
    lastword.style.zIndex=config.zIndex;
		lastword.style.left=config.leftPosition;
    lastword.style.top=config.topPosition;
    lastword.style.padding=config.padding;
    lastword.style.border=config.border;
    lastword.style.background=config.background;
    lastword.style.color=config.color;
		lastword.alinkColor=config.alinkColor;
		lastword.vlinkColor=config.vlinkColor;
		lastword.linkColor=config.linkColor;
    lastword.innerHTML=config.message;
    document.body.appendChild(lastword);
  };

  //makes the pop-in appear on load
	var addLoadEvent = function(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			};
		}
	};

	/* setBrowserWarConfig: define all configurations for browserwar
	 * This method is not recommended, executing separate methods is preferred and more readable
	 */
  function setBrowserWarConfig(browsers, domClass, domId, message, topPosition, leftPosition, zIndex, width, padding, border, background, color) {
    setBrowserWarConfigFight(browsers);
    setBrowserWarConfigMessage(message);
		setBrowserWarConfigClass(domClass, domId);
    setBrowserWarConfigPosition(topPosition, leftPosition, zIndex);
    setBrowserWarConfigStyle(width, padding, border, background, color);
  }

	/* setBrowserWarConfigFight: specifies which browser and version for which to display the pop-in div.
	 * The specified browser will be added to the browserwar's specs, displaying the warning div for any
	 * version of this browser less than or equal to the version parameter.  If the version is not specified,
	 * browserwar will display the warning div for all versions of the specified parameter.  This function
	 * can be executed multiple times to specify multiple browsers.
	 * browser, String: the browser for which to display the warning div
	 * version, Float (optional): the latest version warned for the specified browser 
	 */
  function setBrowserWarConfigFight(browser, version){
    if (typeof(browser) != 'undefined' && null !== browser) {
      BrowserWarConfig.browsers.push(browser);
			if (typeof(version) != 'undefined' && null !== version) {
	      BrowserWarConfig.versions.push(version);
	    } else {
				BrowserWarConfig.versions.push('all')
			}
    }
  }

	/* setBrowserWarConfigClass: specifies the DOM id and class for the pop-in warning div.
	 * The id and class can be specified for CSS styling.
	 */
	function setBrowserWarConfigClass(domClass, domId, closeable){
		if (typeof(domClass) != 'undefined' && null !== domClass) {
      BrowserWarConfig.domClass = domClass;
    }
    if (typeof(domId) != 'undefined' && null !== domId) {
      BrowserWarConfig.domId = domId;
    }
    if (typeof(closeable) == 'boolean' && closeable) {
      closelink = "<div id=\"browser_war_close_div\"><a id=\"browser_war_close_link\" href=\"#\" onclick=\"document.getElementById('" + domId + "').style.visibility = 'hidden';\">[x] close</a></div>"
      if (typeof(BrowserWarConfig.message) == 'string') {
        BrowserWarConfig.message = BrowserWarConfig.message + closelink;
      }
      else {
        BrowserWarConfig.message = closelink;
      }
    }
	}
	
	/* setBrowserWarConfigMessage: specifies the message to be displayed within the pop-in warning div.
	 * This message can be a String of HTML code or plain text.
	 */
  function setBrowserWarConfigMessage(message){
    if (typeof(message) != 'undefined' && null !== message) {
      if (typeof(BrowserWarConfig.message) == 'string') {
        BrowserWarConfig.message = BrowserWarConfig.message + message;
      }
      else {
        BrowserWarConfig.message = message;
      }
    }
  }
  
	/* setBrowserWarConfigPosition: specifies the location and zIndex for the pop-in warning div.
	 * The position of the warning div is absolute, so the exact location needs to be specified.
	 * Set the z-index large enough to appear in front of nearby/overlapping elements. 
	 */
  function setBrowserWarConfigPosition(topPosition, leftPosition, zIndex){
    if (typeof(topPosition) != 'undefined' && null !== topPosition) {
      BrowserWarConfig.topPosition = topPosition;
    }
    if (typeof(leftPosition) != 'undefined' && null !== leftPosition) {
      BrowserWarConfig.leftPosition = leftPosition;
    }
    if (typeof(zIndex) != 'undefined' && null !== zIndex) {
      BrowserWarConfig.zIndex = zIndex;
    }
  }
  
	/* setBrowserWarConfigStyle: specifies the styling of the pop-in warning div.
	 * Specifies the width, padding size, border size and color, background color, and text color.
	 */
  function setBrowserWarConfigStyle(width, padding, border, background, color){
    if (typeof(width) != 'undefined' && null !== width) {
      BrowserWarConfig.width = width;
    }
    if (typeof(padding) != 'undefined' && null !== padding) {
      BrowserWarConfig.padding = padding;
    }
    if (typeof(border) != 'undefined' && null !== border) {
      BrowserWarConfig.border = border;
    }
    if (typeof(background) != 'undefined' && null !== background) {
      BrowserWarConfig.background = background;
    }
    if (typeof(color) != 'undefined' && null !== color) {
      BrowserWarConfig.color = color;
    }
  }
	
	/* setBrowserWarConfigLinkColors: specifies the colors for links within the pop-in warning div.
	 * The link colors are not considered part of the element's style attribute, so these are defined
	 * separately and are overwritten by CSS stylesheets.
	 */
	function setBrowserWarConfigLinkColors(linkColor, alinkColor, vlinkColor){
		if (typeof(linkColor) != 'undefined' && null !== linkColor) {
      BrowserWarConfig.linkColor = linkColor;
    }
		if (typeof(alinkColor) != 'undefined' && null !== alinkColor) {
      BrowserWarConfig.alinkColor = alinkColor;
    }
		if (typeof(vlinkColor) != 'undefined' && null !== vlinkColor) {
      BrowserWarConfig.vlinkColor = vlinkColor;
    }
	}
  
  // Searches for the browser making the current request so it is available to display to the end user.
  function setBrowserWarConfigDisplayBrowser(){
    return searchBrowsers(BroswerWarBrowsers) || "an unknown browser";
  }
	
	/* startBrowserWar: detects the user's browser and adds the pop-in warning div display to the onload
	 * event if the user's browser meets the browserwar specifications.
	 */
	function startBrowserWar(){
		browserIndex = arrayFind(BrowserWarConfig.browsers, BrowserDetect.browser);
		if (browserIndex != 'false') {
			browserVersion = BrowserWarConfig.versions[browserIndex];
			if (browserVersion == 'all' || browserVersion >= BrowserDetect.version)
				addLoadEvent(fightbrowser);
  	}
	}
  
	// browserwar object
	return {
    setup: function() {
      this.browser_display_name = setBrowserWarConfigDisplayBrowser();
    },
		init: function(browsers, domClass, domId, message, topPosition, leftPosition, zIndex, width, padding, border, background, color) {
      setBrowserWarConfig(browsers, domClass, domId, message, zIndex, leftPosition, topPosition, width, padding, border, background, color);
			startBrowserWar();
		},
		klass: function(domClass, domId, closeable) {
			setBrowserWarConfigClass(domClass, domId, closeable);
		},
    message: function(message) {
      setBrowserWarConfigMessage(message);
    },
		position: function(topPosition, leftPosition, zIndex) {
      setBrowserWarConfigPosition(topPosition, leftPosition, zIndex);
		},
    style: function(width, padding, border, background, color) {
      setBrowserWarConfigStyle(width, padding, border, background, color);
    },
		linkcolors: function(linkColor, alinkColor, vlinkColor) {
			setBrowserWarConfigLinkColors(linkColor, alinkColor, vlinkColor);
		},
    fight: function(browser, version) {
      setBrowserWarConfigFight(browser, version);
    },
		run: function() {
			startBrowserWar();
		}
	};

}();

// Setup the browserwar.browser_display_name variable
browserwar.setup();
