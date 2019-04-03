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
/******/ 	return __webpack_require__(__webpack_require__.s = 257);
/******/ })
/************************************************************************/
/******/ ({

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(258);


/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_maps__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_maps___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_google_maps__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_WaterStation__ = __webpack_require__(260);



var LAGUNA_COORDINATE = { lat: 14.372112, lng: 121.270716 };

$(document).ready(function () {
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.KEY = 'AIzaSyBymq4YRMhZoMwnPUd2SfyzQQLEvUtafkM';
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.LIBRARIES = ['visualization'];

    var oMap = void 0,
        aStationLists = [];
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.load(function (oGoogle) {
        var oStationData = getCoordinatesPerStation();
        oMap = new oGoogle.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: LAGUNA_COORDINATE
        });

        Object.keys(oStationData).forEach(function (sKey) {
            aStationLists[sKey] = new __WEBPACK_IMPORTED_MODULE_1__modules_WaterStation__["a" /* default */](oGoogle, oMap, oStationData[sKey]);
        });

        aStationLists['stationA'].updateWaterGrade(10);
    });

    function getCoordinatesPerStation() {
        return {
            stationA: {
                sName: 'Station A',
                oCoordinates: [new google.maps.LatLng(14.524672, 121.105763), // start upper middle
                new google.maps.LatLng(14.502094, 121.081964), new google.maps.LatLng(14.505384, 121.070305), new google.maps.LatLng(14.419320, 121.054306), new google.maps.LatLng(14.383582, 121.057230), // end of left side
                new google.maps.LatLng(14.425445, 121.129080), // start of right side
                new google.maps.LatLng(14.480934, 121.124224), new google.maps.LatLng(14.524672, 121.105763) // back to starting point
                ]
            },
            stationB: {
                sName: 'Station B',
                oCoordinates: [new google.maps.LatLng(14.425445, 121.129080), // starting point middle
                new google.maps.LatLng(14.341195, 121.167825), new google.maps.LatLng(14.244062, 121.225463), new google.maps.LatLng(14.250689, 121.272137), // end of right
                new google.maps.LatLng(14.198789, 121.278976), // going down
                new google.maps.LatLng(14.196172, 121.189767), new google.maps.LatLng(14.226775, 121.195262), new google.maps.LatLng(14.268026, 121.167817), new google.maps.LatLng(14.298627, 121.132127), new google.maps.LatLng(14.331884, 121.117022), new google.maps.LatLng(14.383582, 121.057230), // end of left side
                new google.maps.LatLng(14.425445, 121.129080)]
            },
            stationC: {
                sName: 'Station C',
                oCoordinates: [new google.maps.LatLng(14.292462, 121.323418), // starting point
                new google.maps.LatLng(14.271096, 121.328306), new google.maps.LatLng(14.250689, 121.272137), new google.maps.LatLng(14.198789, 121.278976), // start of bottom
                new google.maps.LatLng(14.253693, 121.347344), new google.maps.LatLng(14.303526, 121.406183), new google.maps.LatLng(14.306675, 121.433149), new google.maps.LatLng(14.339930, 121.417652), new google.maps.LatLng(14.324067, 121.465856), new google.maps.LatLng(14.378693, 121.465101), new google.maps.LatLng(14.391389, 121.413612), new google.maps.LatLng(14.347065, 121.398046), new google.maps.LatLng(14.333084, 121.361794), new google.maps.LatLng(14.292462, 121.323418)]
            },
            stationD: {
                sName: 'Station D',
                oCoordinates: [new google.maps.LatLng(14.423028, 121.227929), // starting upper middle of station F
                new google.maps.LatLng(14.464953, 121.223856), new google.maps.LatLng(14.506828, 121.262481), new google.maps.LatLng(14.479968, 121.282687), new google.maps.LatLng(14.443558, 121.325967), new google.maps.LatLng(14.419818, 121.337387), new google.maps.LatLng(14.347052, 121.318549), new google.maps.LatLng(14.322540, 121.300570), new google.maps.LatLng(14.288520, 121.304637), new google.maps.LatLng(14.292462, 121.323418), // station C boundary
                new google.maps.LatLng(14.271096, 121.328306), new google.maps.LatLng(14.250689, 121.272137), // start of left
                new google.maps.LatLng(14.415894, 121.276933), new google.maps.LatLng(14.423028, 121.227929)]
            },
            stationE: {
                sName: 'Station E',
                oCoordinates: [new google.maps.LatLng(14.524672, 121.105763), // starting point upper middle
                new google.maps.LatLng(14.480934, 121.124224), new google.maps.LatLng(14.425445, 121.129080), // end of left side
                new google.maps.LatLng(14.432728, 121.151434), new google.maps.LatLng(14.417420, 121.186111), new google.maps.LatLng(14.412087, 121.211179), new google.maps.LatLng(14.462648, 121.181325), // start of right side
                new google.maps.LatLng(14.462648, 121.181325), new google.maps.LatLng(14.471627, 121.183734), new google.maps.LatLng(14.494406, 121.172626), new google.maps.LatLng(14.493289, 121.165687), new google.maps.LatLng(14.509341, 121.142949), new google.maps.LatLng(14.527629, 121.139484), new google.maps.LatLng(14.527629, 121.139484), new google.maps.LatLng(14.524672, 121.105763) // back to starting point
                ]
            },
            stationF: {
                sName: 'Station F',
                oCoordinates: [new google.maps.LatLng(14.425445, 121.129080), // starting point middle
                new google.maps.LatLng(14.432728, 121.151434), new google.maps.LatLng(14.417420, 121.186111), new google.maps.LatLng(14.412087, 121.211179), new google.maps.LatLng(14.423028, 121.227929), new google.maps.LatLng(14.415894, 121.276933), new google.maps.LatLng(14.250689, 121.272137), // end of mid to right
                new google.maps.LatLng(14.244062, 121.225463), new google.maps.LatLng(14.341195, 121.167825), new google.maps.LatLng(14.425445, 121.129080)]
            }
        };
    }
});

/***/ }),

/***/ 259:
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


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WaterStation = function () {
    function WaterStation(oGoogle, oMap, oStationInfo) {
        var fGrade = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.random() * (100 - 1) + 1;

        _classCallCheck(this, WaterStation);

        this.oGoogle = oGoogle;
        this.oMap = oMap;
        this.oStationInfo = oStationInfo;
        this.fGrade = fGrade;

        this.createStation();
    }

    /**
     * Creates Station
     */


    _createClass(WaterStation, [{
        key: 'createStation',
        value: function createStation() {
            this.createNewMarker(this.getCoordinatesCenter());
            this.createNewPolyline();
            this.oPolygon = this.createNewPolygon();
        }

        /**
         * Creates Boundary by Coordinates given
         */

    }, {
        key: 'createNewPolyline',
        value: function createNewPolyline() {
            //[{lat: 22.291, lng: 153.027}, {lat: 18.291, lng: 153.027}]
            new this.oGoogle.maps.Polyline({
                path: this.oStationInfo.oCoordinates,
                strokeColor: '#ffffff',
                strokeOpacity: 0,
                icons: [{
                    icon: {
                        path: 'M 0,-1 0,1',
                        strokeOpacity: 1,
                        scale: 2
                    },
                    offset: '0',
                    repeat: '10px'
                }],
                map: this.oMap
            });
        }

        /**
         * Fills the Station with color for the Grade Determiner
         */

    }, {
        key: 'createNewPolygon',
        value: function createNewPolygon() {
            return new this.oGoogle.maps.Polygon({
                paths: this.oStationInfo.oCoordinates,
                strokeOpacity: 0,
                strokeWeight: 0,
                fillColor: this.getColorByQualityIndex(),
                fillOpacity: 0.4,
                map: this.oMap
            });
        }

        /**
         * Creates Marker for Information
         * @param oPosition
         */

    }, {
        key: 'createNewMarker',
        value: function createNewMarker(oPosition) {
            var _this = this;

            this.oInfoWindow = this.createInfoWindow();
            this.oMarker = new this.oGoogle.maps.Marker({
                position: oPosition,
                title: this.oStationInfo.sName,
                map: this.oMap
            });

            // On Hover shows Summary
            this.oMarker.addListener('mouseover', function () {
                return _this.oInfoWindow.open(_this.oMap, _this.oMarker);
            });
            this.oMarker.addListener('mouseout', function () {
                return _this.oInfoWindow.close();
            });

            // On Click zoom's the map
            this.oMarker.addListener('click', function () {
                _this.oMap.setZoom(12);
                _this.oMap.setCenter(_this.oMarker.getPosition());
                _this.oMap.panTo(_this.oMarker.getPosition());
            });
        }

        /**
         * Popup Window of Markers
         * @return {*}
         */

    }, {
        key: 'createInfoWindow',
        value: function createInfoWindow() {
            return new this.oGoogle.maps.InfoWindow({
                content: '<div>Station: ' + this.oStationInfo.sName + ' <br> Grade: ' + this.fGrade + '</div>'
            });
        }

        /**
         * Gets the Center of the Polygon for the position of the Marker
         * @return {*}
         */

    }, {
        key: 'getCoordinatesCenter',
        value: function getCoordinatesCenter() {
            var oBounds = new this.oGoogle.maps.LatLngBounds();
            for (var iIndex = 0; iIndex < this.oStationInfo.oCoordinates.length; iIndex++) {
                oBounds.extend(this.oStationInfo.oCoordinates[iIndex]);
            }

            return oBounds.getCenter();
        }

        /**
         * Updates the grade of the Station
         * @param fGrade
         */

    }, {
        key: 'updateWaterGrade',
        value: function updateWaterGrade(fGrade) {
            this.fGrade = fGrade;
            this.oInfoWindow = this.createInfoWindow();
            this.oPolygon.setOptions({
                fillColor: this.getColorByQualityIndex()
            });
        }

        /**
         * Return color of the station to it's equivalent grade
         * @return {string}
         */

    }, {
        key: 'getColorByQualityIndex',
        value: function getColorByQualityIndex() {
            if (this.fGrade >= 95) {
                return '#0bff4d';
            } else if (this.fGrade >= 80 && this.fGrade < 94) {
                return '#81ff00';
            } else if (this.fGrade >= 65 && this.fGrade < 79) {
                return '#FFFF00';
            } else if (this.fGrade >= 45 && this.fGrade < 64) {
                return '#FF6600';
            }

            return '#FF0000';
        }
    }]);

    return WaterStation;
}();

/* harmony default export */ __webpack_exports__["a"] = (WaterStation);

/***/ })

/******/ });