/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 252);
/******/ })
/************************************************************************/
/******/ ({

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(253);


/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_maps__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_maps___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_google_maps__);


$(document).ready(function () {
    //AIzaSyBymq4YRMhZoMwnPUd2SfyzQQLEvUtafkM
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.KEY = 'AIzaSyBymq4YRMhZoMwnPUd2SfyzQQLEvUtafkM';
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.LIBRARIES = ['visualization'];

    var oMap = void 0,
        oHeatmap = void 0;
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.load(function (oGoogle) {
        oMap = new oGoogle.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: 37.775, lng: -122.434 },
            mapTypeId: 'satellite'
        });

        oHeatmap = new google.maps.visualization.HeatmapLayer({
            data: getPoints(),
            map: oMap
        });

        console.log(oMap);
    });

    function getPoints() {
        return [new google.maps.LatLng(37.795656, -122.400395), new google.maps.LatLng(37.795203, -122.400304), new google.maps.LatLng(37.778738, -122.415584), new google.maps.LatLng(37.778812, -122.415189), new google.maps.LatLng(37.778824, -122.415092), new google.maps.LatLng(37.778833, -122.414932), new google.maps.LatLng(37.761344, -122.406215), new google.maps.LatLng(37.760556, -122.406495), new google.maps.LatLng(37.759732, -122.406484), new google.maps.LatLng(37.758910, -122.406228), new google.maps.LatLng(37.758182, -122.405695), new google.maps.LatLng(37.757676, -122.405118), new google.maps.LatLng(37.757039, -122.404346), new google.maps.LatLng(37.756335, -122.403719), new google.maps.LatLng(37.755503, -122.403406), new google.maps.LatLng(37.754665, -122.403242), new google.maps.LatLng(37.753837, -122.403172), new google.maps.LatLng(37.752986, -122.403112), new google.maps.LatLng(37.751266, -122.403355)];
    }
});

// function toggleHeatmap() {
//     heatmap.setMap(heatmap.getMap() ? null : map);
// }
//
// function changeGradient() {
//     var gradient = [
//         'rgba(0, 255, 255, 0)',
//         'rgba(0, 255, 255, 1)',
//         'rgba(0, 191, 255, 1)',
//         'rgba(0, 127, 255, 1)',
//         'rgba(0, 63, 255, 1)',
//         'rgba(0, 0, 255, 1)',
//         'rgba(0, 0, 223, 1)',
//         'rgba(0, 0, 191, 1)',
//         'rgba(0, 0, 159, 1)',
//         'rgba(0, 0, 127, 1)',
//         'rgba(63, 0, 91, 1)',
//         'rgba(127, 0, 63, 1)',
//         'rgba(191, 0, 31, 1)',
//         'rgba(255, 0, 0, 1)'
//     ]
//     heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }
//
// function changeRadius() {
//     heatmap.set('radius', heatmap.get('radius') ? null : 20);
// }
//
// function changeOpacity() {
//     heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
// }

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var googleVersion = '3.31';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var GoogleMapsLoader = {};


	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


	GoogleMapsLoader._googleMockApiObject = {};


	GoogleMapsLoader.load = function(fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};


	GoogleMapsLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};


	GoogleMapsLoader.isLoaded = function() {
		return google !== null;
	};


	GoogleMapsLoader.createUrl = function() {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		if (GoogleMapsLoader.VERSION) {
			url += '&v=' + GoogleMapsLoader.VERSION;
		}

		return url;
	};


	GoogleMapsLoader.release = function(fn) {
		var release = function() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	GoogleMapsLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	GoogleMapsLoader.makeMock = function() {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function() {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};


	return GoogleMapsLoader;

});


/***/ })

/******/ });