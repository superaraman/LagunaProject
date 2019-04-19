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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_Legends__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coordinates__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(263);






var LAGUNA_COORDINATE = { lat: 14.372112, lng: 121.270716 };

$(document).ready(function () {
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.KEY = 'AIzaSyBymq4YRMhZoMwnPUd2SfyzQQLEvUtafkM';
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.LIBRARIES = ['visualization'];

    var oMap = void 0,
        aStationLists = [];
    __WEBPACK_IMPORTED_MODULE_0_google_maps___default.a.load(function (oGoogle) {
        var oStationData = Object(__WEBPACK_IMPORTED_MODULE_3__coordinates__["a" /* default */])();
        oMap = new oGoogle.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: LAGUNA_COORDINATE,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        });

        new __WEBPACK_IMPORTED_MODULE_2__modules_Legends__["a" /* default */](oGoogle, oMap, __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* WATER_QUALITY_LEGEND */], 'Water Quality Index');
        Object.keys(oStationData).forEach(function (sKey) {
            aStationLists[sKey] = new __WEBPACK_IMPORTED_MODULE_1__modules_WaterStation__["a" /* default */](oGoogle, oMap, oStationData[sKey]);
        });
    });
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
                // icon: '/img/station-icon.png'
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
                content: '<div>' + this.oStationInfo.sName + ' <br> Grade: ' + this.fGrade + '</div>'
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
            } else if (this.fGrade >= 80 && this.fGrade <= 94) {
                return '#81ff00';
            } else if (this.fGrade >= 65 && this.fGrade <= 79) {
                return '#FFFF00';
            } else if (this.fGrade >= 45 && this.fGrade <= 64) {
                return '#FF6600';
            }

            return '#FF0000';
        }
    }]);

    return WaterStation;
}();

/* harmony default export */ __webpack_exports__["a"] = (WaterStation);

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Legends = function () {
    function Legends(oGoogle, oMap, oLists, sTitle) {
        _classCallCheck(this, Legends);

        this.oGoogle = oGoogle;
        this.oMap = oMap;
        this.sTitle = sTitle;
        this.oLists = oLists;
        this.oLegend = document.getElementById('legend');

        this.create();
    }

    _createClass(Legends, [{
        key: 'create',
        value: function create() {
            var oDiv = document.createElement('div');
            var sLegends = '';

            this.oLists.forEach(function (oLegends) {
                var color = oLegends.color,
                    name = oLegends.name;

                sLegends += '\n                <li><span style="background-color:' + color + '"></span>' + name + '</li>\n            ';
            });

            oDiv.className = 'd-none';
            oDiv.innerHTML = '\n            <div class=\'legends vertical-legend\'>\n                <div class=\'legend-title\'>' + this.sTitle + '</div>\n                <div class=\'legend-scale\'>\n                    <ul class=\'legend-labels\'>\n                        ' + sLegends + '\n                    </ul>\n                </div>\n            </div>\n        ';

            // <div class='legend-source'>Source: <a href="#link to source">Name of source</a></div>

            this.oLegend.appendChild(oDiv);
            this.oMap.controls[this.oGoogle.maps.ControlPosition.TOP_RIGHT].push(this.oLegend);
            setTimeout(function () {
                return oDiv.classList.toggle('d-none');
            }, 3000);
        }
    }]);

    return Legends;
}();

/* harmony default export */ __webpack_exports__["a"] = (Legends);

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getCoordinatesPerStation() {
    return {
        station1: {
            sName: '[Station 1] Central West Bay',
            oCoordinates: [new google.maps.LatLng(14.425445, 121.129080), // starting point middle
            new google.maps.LatLng(14.432728, 121.151434), new google.maps.LatLng(14.417420, 121.186111), new google.maps.LatLng(14.412087, 121.211179), new google.maps.LatLng(14.423028, 121.227929), new google.maps.LatLng(14.415894, 121.276933), new google.maps.LatLng(14.282499, 121.271812), new google.maps.LatLng(14.250689, 121.272137), new google.maps.LatLng(14.244062, 121.225463), new google.maps.LatLng(14.247894, 121.221686),

            // new google.maps.LatLng(14.250689, 121.272137),

            new google.maps.LatLng(14.341195, 121.167825), new google.maps.LatLng(14.425445, 121.129080)]
        },
        station2: {
            sName: '[Station 2] East Bay',
            oCoordinates: [
            // Left
            new google.maps.LatLng(14.288520, 121.304637), new google.maps.LatLng(14.278173, 121.325370), new google.maps.LatLng(14.245164, 121.342321),

            // Down
            new google.maps.LatLng(14.257642, 121.346956), new google.maps.LatLng(14.265696, 121.357814), new google.maps.LatLng(14.270354, 121.367427), new google.maps.LatLng(14.273682, 121.371547), new google.maps.LatLng(14.273682, 121.378413), new google.maps.LatLng(14.279671, 121.381847), new google.maps.LatLng(14.279671, 121.390086), new google.maps.LatLng(14.290317, 121.398326),

            // Right
            new google.maps.LatLng(14.306286, 121.393520), new google.maps.LatLng(14.316932, 121.383220), new google.maps.LatLng(14.328242, 121.379100), new google.maps.LatLng(14.340882, 121.381847),

            // Up
            new google.maps.LatLng(14.340217, 121.374293), new google.maps.LatLng(14.336724, 121.367770), new google.maps.LatLng(14.336736, 121.362243), new google.maps.LatLng(14.332412, 121.356749), new google.maps.LatLng(14.329418, 121.355376), new google.maps.LatLng(14.327755, 121.350913), new google.maps.LatLng(14.325759, 121.351600), new google.maps.LatLng(14.324096, 121.351600), new google.maps.LatLng(14.323430, 121.348853), new google.maps.LatLng(14.320437, 121.348166), new google.maps.LatLng(14.319771, 121.344733), new google.maps.LatLng(14.316112, 121.344047), new google.maps.LatLng(14.313783, 121.334434), new google.maps.LatLng(14.305799, 121.330314), new google.maps.LatLng(14.304136, 121.331000), new google.maps.LatLng(14.303138, 121.328254), new google.maps.LatLng(14.296484, 121.324134), new google.maps.LatLng(14.292825, 121.318297), new google.maps.LatLng(14.289830, 121.315894), new google.maps.LatLng(14.288520, 121.304637)]
        },
        station4: {
            sName: '[Station 4] Central Bay',
            oCoordinates: [new google.maps.LatLng(14.423028, 121.227929), // starting upper middle of station F
            new google.maps.LatLng(14.464953, 121.223856), new google.maps.LatLng(14.506828, 121.262481), new google.maps.LatLng(14.479968, 121.282687), new google.maps.LatLng(14.443558, 121.325967), new google.maps.LatLng(14.419818, 121.337387), new google.maps.LatLng(14.347052, 121.318549), new google.maps.LatLng(14.322540, 121.300570), new google.maps.LatLng(14.288520, 121.304637), new google.maps.LatLng(14.282499, 121.271812), // start of left
            new google.maps.LatLng(14.415894, 121.276933), new google.maps.LatLng(14.423028, 121.227929)]
        },
        station5: {
            sName: '[Station 5] Northern West',
            oCoordinates: [new google.maps.LatLng(14.524672, 121.105763), // starting point upper middle
            new google.maps.LatLng(14.480934, 121.124224), new google.maps.LatLng(14.425445, 121.129080), // end of left side
            new google.maps.LatLng(14.432728, 121.151434), new google.maps.LatLng(14.417420, 121.186111), new google.maps.LatLng(14.412087, 121.211179), new google.maps.LatLng(14.462648, 121.181325), // start of right side
            new google.maps.LatLng(14.462648, 121.181325), new google.maps.LatLng(14.471627, 121.183734), new google.maps.LatLng(14.494406, 121.172626), new google.maps.LatLng(14.493289, 121.165687), new google.maps.LatLng(14.509341, 121.142949), new google.maps.LatLng(14.527629, 121.139484), new google.maps.LatLng(14.527629, 121.139484), new google.maps.LatLng(14.524672, 121.105763) // back to starting point
            ]
        },
        station8: {
            sName: '[Station 8] South Bay',
            oCoordinates: [new google.maps.LatLng(14.243586, 121.172946), new google.maps.LatLng(14.247894, 121.221686), new google.maps.LatLng(14.244062, 121.225463), new google.maps.LatLng(14.250689, 121.272137), new google.maps.LatLng(14.193912, 121.276918), new google.maps.LatLng(14.194911, 121.268335), new google.maps.LatLng(14.189419, 121.263013), new google.maps.LatLng(14.191249, 121.259408), new google.maps.LatLng(14.191582, 121.249452), new google.maps.LatLng(14.197407, 121.240526), new google.maps.LatLng(14.199071, 121.235204), new google.maps.LatLng(14.189752, 121.231599), new google.maps.LatLng(14.188087, 121.228509), new google.maps.LatLng(14.183927, 121.227479), new google.maps.LatLng(14.180432, 121.216665), new google.maps.LatLng(14.179267, 121.213231), new google.maps.LatLng(14.186423, 121.208253), new google.maps.LatLng(14.187255, 121.206022), new google.maps.LatLng(14.181930, 121.196924), new google.maps.LatLng(14.186257, 121.189542), new google.maps.LatLng(14.187754, 121.186796), new google.maps.LatLng(14.186756, 121.182504), new google.maps.LatLng(14.193080, 121.180101), new google.maps.LatLng(14.196908, 121.184907), new google.maps.LatLng(14.207558, 121.183706), new google.maps.LatLng(14.212550, 121.185766), new google.maps.LatLng(14.211718, 121.187654), new google.maps.LatLng(14.213263, 121.187697), new google.maps.LatLng(14.215418, 121.189697), new google.maps.LatLng(14.221170, 121.188410), new google.maps.LatLng(14.226661, 121.190298), new google.maps.LatLng(14.230821, 121.188925), new google.maps.LatLng(14.233483, 121.187723), new google.maps.LatLng(14.235979, 121.178282), new google.maps.LatLng(14.243586, 121.172946)]
        },
        station15: {
            sName: '[Station 15] West Bay',
            oCoordinates: [
            // Left Side
            new google.maps.LatLng(14.379131, 121.058103), new google.maps.LatLng(14.380820, 121.056901), new google.maps.LatLng(14.382649, 121.055743), new google.maps.LatLng(14.385351, 121.055399), new google.maps.LatLng(14.386224, 121.054841), new google.maps.LatLng(14.386681, 121.054841), new google.maps.LatLng(14.387263, 121.053554), new google.maps.LatLng(14.388136, 121.053726), new google.maps.LatLng(14.389134, 121.053425), new google.maps.LatLng(14.389508, 121.053168), new google.maps.LatLng(14.391794, 121.053425), new google.maps.LatLng(14.392335, 121.053983), new google.maps.LatLng(14.392917, 121.053769), new google.maps.LatLng(14.393789, 121.052781), new google.maps.LatLng(14.394122, 121.052524), new google.maps.LatLng(14.395452, 121.052524), new google.maps.LatLng(14.396450, 121.053039), new google.maps.LatLng(14.396699, 121.052953), new google.maps.LatLng(14.396741, 121.051065), new google.maps.LatLng(14.397156, 121.052610), new google.maps.LatLng(14.397156, 121.051537), new google.maps.LatLng(14.397905, 121.051451), new google.maps.LatLng(14.398154, 121.051065), new google.maps.LatLng(14.400149, 121.050979), new google.maps.LatLng(14.400898, 121.051108), new google.maps.LatLng(14.402061, 121.052181), new google.maps.LatLng(14.403101, 121.051880), new google.maps.LatLng(14.403516, 121.051494), new google.maps.LatLng(14.404181, 121.051451), new google.maps.LatLng(14.404888, 121.051794), new google.maps.LatLng(14.405465, 121.051708), new google.maps.LatLng(14.405776, 121.051236), new google.maps.LatLng(14.406961, 121.051150), new google.maps.LatLng(14.408083, 121.051236), new google.maps.LatLng(14.409226, 121.051279), new google.maps.LatLng(14.409850, 121.051751), new google.maps.LatLng(14.409954, 121.052481), new google.maps.LatLng(14.411575, 121.052502), new google.maps.LatLng(14.412136, 121.052888), new google.maps.LatLng(14.413882, 121.053017), new google.maps.LatLng(14.414671, 121.052373), new google.maps.LatLng(14.415731, 121.052094), new google.maps.LatLng(14.416833, 121.052159), new google.maps.LatLng(14.417332, 121.052717), new google.maps.LatLng(14.417955, 121.052931), new google.maps.LatLng(14.418371, 121.052738), new google.maps.LatLng(14.418433, 121.052438), new google.maps.LatLng(14.419306, 121.052180), new google.maps.LatLng(14.419638, 121.052566), new google.maps.LatLng(14.420594, 121.052545), new google.maps.LatLng(14.420802, 121.052180), new google.maps.LatLng(14.423878, 121.052609), new google.maps.LatLng(14.424293, 121.052502), new google.maps.LatLng(14.425125, 121.053403), new google.maps.LatLng(14.425457, 121.053468), new google.maps.LatLng(14.426205, 121.053253), new google.maps.LatLng(14.429036, 121.051751), new google.maps.LatLng(14.441837, 121.052438), new google.maps.LatLng(14.442834, 121.053983), new google.maps.LatLng(14.451645, 121.053983), new google.maps.LatLng(14.452642, 121.053296), new google.maps.LatLng(14.455800, 121.053639), new google.maps.LatLng(14.456632, 121.055528), new google.maps.LatLng(14.457463, 121.053811), new google.maps.LatLng(14.473087, 121.060677),
            // new google.maps.LatLng(
            new google.maps.LatLng(14.486966, 121.062394), new google.maps.LatLng(14.512227, 121.072694), new google.maps.LatLng(14.509651, 121.076470), new google.maps.LatLng(14.506992, 121.082307), new google.maps.LatLng(14.509818, 121.089173), new google.maps.LatLng(14.518958, 121.091920), new google.maps.LatLng(14.521118, 121.090890), new google.maps.LatLng(14.520287, 121.098786), new google.maps.LatLng(14.521284, 121.098786), new google.maps.LatLng(14.525439, 121.092435), new google.maps.LatLng(14.527765, 121.094151), new google.maps.LatLng(14.526602, 121.096898), new google.maps.LatLng(14.530756, 121.099473), new google.maps.LatLng(14.530424, 121.100674), new google.maps.LatLng(14.528928, 121.100331), new google.maps.LatLng(14.524275, 121.105309),

            // Right Side
            new google.maps.LatLng(14.524672, 121.105763), new google.maps.LatLng(14.480934, 121.124224), new google.maps.LatLng(14.425445, 121.129080), new google.maps.LatLng(14.379131, 121.058103)]
        },
        station16: {
            sName: '[Station 16] West Bay',
            oCoordinates: [
            // Up
            new google.maps.LatLng(14.379131, 121.058103), // upper left start
            new google.maps.LatLng(14.425445, 121.129080),

            // Right
            new google.maps.LatLng(14.341195, 121.167825), new google.maps.LatLng(14.247894, 121.221686),

            //Down
            new google.maps.LatLng(14.243586, 121.172946),

            // Left
            new google.maps.LatLng(14.263446, 121.167580), new google.maps.LatLng(14.269768, 121.162087), new google.maps.LatLng(14.279749, 121.149384), new google.maps.LatLng(14.285073, 121.148697), new google.maps.LatLng(14.284407, 121.146294), new google.maps.LatLng(14.295054, 121.133935), new google.maps.LatLng(14.300044, 121.130158), new google.maps.LatLng(14.304036, 121.126725), new google.maps.LatLng(14.309946, 121.125910), new google.maps.LatLng(14.314105, 121.124536), new google.maps.LatLng(14.317098, 121.125910), new google.maps.LatLng(14.319094, 121.123678), new google.maps.LatLng(14.319261, 121.122476), new google.maps.LatLng(14.327743, 121.115438), new google.maps.LatLng(14.331236, 121.113550), new google.maps.LatLng(14.336059, 121.106169), new google.maps.LatLng(14.335893, 121.101190), new google.maps.LatLng(14.340550, 121.095697), new google.maps.LatLng(14.342379, 121.094839), new google.maps.LatLng(14.342213, 121.093122), new google.maps.LatLng(14.344708, 121.091406), new google.maps.LatLng(14.351692, 121.091577), new google.maps.LatLng(14.354686, 121.093294), new google.maps.LatLng(14.355351, 121.095182), new google.maps.LatLng(14.357513, 121.093294), new google.maps.LatLng(14.357679, 121.088316), new google.maps.LatLng(14.355517, 121.087114), new google.maps.LatLng(14.357014, 121.084711), new google.maps.LatLng(14.357513, 121.080076), new google.maps.LatLng(14.355018, 121.079561), new google.maps.LatLng(14.356183, 121.075441), new google.maps.LatLng(14.355351, 121.074240), new google.maps.LatLng(14.357846, 121.068231), new google.maps.LatLng(14.359176, 121.065313), new google.maps.LatLng(14.362336, 121.064798), new google.maps.LatLng(14.363500, 121.065485), new google.maps.LatLng(14.368322, 121.065485), new google.maps.LatLng(14.368655, 121.068231), new google.maps.LatLng(14.369320, 121.071150), new google.maps.LatLng(14.371482, 121.070806), new google.maps.LatLng(14.373311, 121.067716), new google.maps.LatLng(14.371149, 121.065485), new google.maps.LatLng(14.372479, 121.062052), new google.maps.LatLng(14.379131, 121.058103)]
        },
        station17: {
            sName: '[Station 17] West Bay',
            oCoordinates: [new google.maps.LatLng(14.282499, 121.271812), // starting point 
            new google.maps.LatLng(14.250689, 121.272137), new google.maps.LatLng(14.193912, 121.276918), // start of bottom 
            new google.maps.LatLng(14.195909, 121.281209), new google.maps.LatLng(14.194411, 121.288763), new google.maps.LatLng(14.197241, 121.290479), new google.maps.LatLng(14.198073, 121.293569), new google.maps.LatLng(14.201235, 121.296316), new google.maps.LatLng(14.200402, 121.299749), new google.maps.LatLng(14.201734, 121.302152), new google.maps.LatLng(14.223533, 121.312280), new google.maps.LatLng(14.222202, 121.313997), new google.maps.LatLng(14.224698, 121.317430), new google.maps.LatLng(14.230688, 121.320177), new google.maps.LatLng(14.236845, 121.329275), new google.maps.LatLng(14.241337, 121.341463), new google.maps.LatLng(14.245164, 121.342321), new google.maps.LatLng(14.278173, 121.325370), new google.maps.LatLng(14.288520, 121.304637), new google.maps.LatLng(14.282499, 121.271812)]
        },
        station18: {
            sName: '[Station 18] East Bay',
            oCoordinates: [
            // LEFT
            new google.maps.LatLng(14.290317, 121.398326), new google.maps.LatLng(14.306286, 121.393520), new google.maps.LatLng(14.316932, 121.383220), new google.maps.LatLng(14.328242, 121.379100), new google.maps.LatLng(14.340882, 121.381847),

            // UP 
            new google.maps.LatLng(14.345052, 121.391082), new google.maps.LatLng(14.348216, 121.391081), new google.maps.LatLng(14.350545, 121.395201), new google.maps.LatLng(14.350545, 121.397948), new google.maps.LatLng(14.354536, 121.398978), new google.maps.LatLng(14.361521, 121.399664), new google.maps.LatLng(14.363184, 121.402411), new google.maps.LatLng(14.368838, 121.405158), new google.maps.LatLng(14.372496, 121.405844), new google.maps.LatLng(14.379480, 121.410307), new google.maps.LatLng(14.385799, 121.406531), new google.maps.LatLng(14.388459, 121.409277), new google.maps.LatLng(14.390454, 121.407217), new google.maps.LatLng(14.395443, 121.408934), new google.maps.LatLng(14.400763, 121.416487), new google.maps.LatLng(14.396773, 121.421294), new google.maps.LatLng(14.396773, 121.423697), new google.maps.LatLng(14.392450, 121.424040), new google.maps.LatLng(14.386796, 121.430563), new google.maps.LatLng(14.388792, 121.432280), new google.maps.LatLng(14.392450, 121.428503), new google.maps.LatLng(14.397105, 121.427130), new google.maps.LatLng(14.402093, 121.431937), new google.maps.LatLng(14.403756, 121.431593), new google.maps.LatLng(14.404421, 121.430220), new google.maps.LatLng(14.407081, 121.431593), new google.maps.LatLng(14.406749, 121.433310), new google.maps.LatLng(14.395443, 121.438460), new google.maps.LatLng(14.398436, 121.441206), new google.maps.LatLng(14.399433, 121.442236), new google.maps.LatLng(14.397105, 121.444983), new google.maps.LatLng(14.398768, 121.449103), new google.maps.LatLng(14.395443, 121.453223), new google.maps.LatLng(14.389789, 121.448416), new google.maps.LatLng(14.389789, 121.455969), new google.maps.LatLng(14.378482, 121.468329), new google.maps.LatLng(14.375822, 121.468329), new google.maps.LatLng(14.375822, 121.471076), new google.maps.LatLng(14.365844, 121.474852), new google.maps.LatLng(14.361521, 121.471762), new google.maps.LatLng(14.361188, 121.472792), new google.maps.LatLng(14.361521, 121.475882), new google.maps.LatLng(14.353538, 121.478972), new google.maps.LatLng(14.344225, 121.477942), new google.maps.LatLng(14.338570, 121.474165), new google.maps.LatLng(14.332583, 121.474509), new google.maps.LatLng(14.329257, 121.473135), new google.maps.LatLng(14.327926, 121.469359), new google.maps.LatLng(14.318612, 121.471762), new google.maps.LatLng(14.318778, 121.465754), new google.maps.LatLng(14.316117, 121.462492), new google.maps.LatLng(14.319111, 121.461806), new google.maps.LatLng(14.321107, 121.461119), new google.maps.LatLng(14.322105, 121.461119), new google.maps.LatLng(14.322770, 121.464896), new google.maps.LatLng(14.324889, 121.459806), new google.maps.LatLng(14.329047, 121.452424), new google.maps.LatLng(14.333371, 121.454312), new google.maps.LatLng(14.336199, 121.450879), new google.maps.LatLng(14.335533, 121.449849), new google.maps.LatLng(14.339192, 121.443498), new google.maps.LatLng(14.342020, 121.441609), new google.maps.LatLng(14.343849, 121.442296), new google.maps.LatLng(14.345679, 121.439721), new google.maps.LatLng(14.338693, 121.436975), new google.maps.LatLng(14.342519, 121.432340), new google.maps.LatLng(14.342685, 121.429250), new google.maps.LatLng(14.338693, 121.427877), new google.maps.LatLng(14.336698, 121.425473), new google.maps.LatLng(14.338028, 121.418264), new google.maps.LatLng(14.335367, 121.417749), new google.maps.LatLng(14.334536, 121.418778), new google.maps.LatLng(14.334369, 121.421010), new google.maps.LatLng(14.332706, 121.422727), new google.maps.LatLng(14.333371, 121.427362), new google.maps.LatLng(14.332540, 121.429593), new google.maps.LatLng(14.329380, 121.431996), new google.maps.LatLng(14.319899, 121.441609), new google.maps.LatLng(14.316905, 121.437661), new google.maps.LatLng(14.308589, 121.438691), new google.maps.LatLng(14.305262, 121.436803), new google.maps.LatLng(14.301602, 121.433198), new google.maps.LatLng(14.295448, 121.434400), new google.maps.LatLng(14.292453, 121.441094), new google.maps.LatLng(14.290291, 121.440408), new google.maps.LatLng(14.292810, 121.432896), new google.maps.LatLng(14.292477, 121.426373), new google.maps.LatLng(14.292643, 121.413670), new google.maps.LatLng(14.294140, 121.411782), new google.maps.LatLng(14.297966, 121.414528), new google.maps.LatLng(14.301127, 121.415043), new google.maps.LatLng(14.302790, 121.411953), new google.maps.LatLng(14.304287, 121.410580), new google.maps.LatLng(14.301792, 121.409207), new google.maps.LatLng(14.301293, 121.406632), new google.maps.LatLng(14.301792, 121.400967), new google.maps.LatLng(14.298632, 121.400624), new google.maps.LatLng(14.293974, 121.398907), new google.maps.LatLng(14.290317, 121.398326)]
        }
    };
}

/* harmony default export */ __webpack_exports__["a"] = (getCoordinatesPerStation);

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WATER_QUALITY_LEGEND; });
var WATER_QUALITY_LEGEND = [{ color: '#FF0000', name: '0 - 44%  ' }, { color: '#FF6600', name: '45% - 64%' }, { color: '#FFFF00', name: '65% - 79%' }, { color: '#81ff00', name: '80% - 94%' }, { color: '#0bff4d', name: '95% - 100%' }];



/***/ })

/******/ });