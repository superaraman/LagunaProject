import GoogleMapsLoader from 'google-maps';
import WaterStation from './modules/WaterStation';
import Legends from './modules/Legends';
import getCoordinatesPerStation from './coordinates';
import { WATER_QUALITY_LEGEND } from './constants';

const LAGUNA_COORDINATE = {lat: 14.372112, lng: 121.270716};

$(document).ready(function () {
    GoogleMapsLoader.KEY = 'AIzaSyBymq4YRMhZoMwnPUd2SfyzQQLEvUtafkM';
    GoogleMapsLoader.LIBRARIES = ['visualization'];

    let oMap, aStationLists = [];
    GoogleMapsLoader.load(function(oGoogle) {
        const oStationData = getCoordinatesPerStation();
        oMap = new oGoogle.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: LAGUNA_COORDINATE,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        });

        new Legends(oGoogle, oMap, WATER_QUALITY_LEGEND, 'Water Quality Index');
        Object.keys(oStationData).forEach((sKey) => {
            aStationLists[sKey] = new WaterStation(oGoogle, oMap, oStationData[sKey]);
        });

    });
});
