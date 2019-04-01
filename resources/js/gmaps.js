import GoogleMapsLoader from 'google-maps';
import WaterStation from './modules/WaterStation';

const LAGUNA_COORDINATE = {lat: 14.3935, lng: 121.1939};

$(document).ready(function () {
    GoogleMapsLoader.KEY = 'AIzaSyBymq4YRMhZoMwnPUd2SfyzQQLEvUtafkM';
    GoogleMapsLoader.LIBRARIES = ['visualization'];

    let oMap, aStationLists = [];
    GoogleMapsLoader.load(function(oGoogle) {
        const oStationData = mockData();
        oMap = new oGoogle.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: LAGUNA_COORDINATE
        });

        Object.values(oStationData).forEach((oStation) => {
            aStationLists[oStation.sName] = new WaterStation(oGoogle, oMap, oStation);
        });

        aStationLists['Station A'].updateWaterGrade(10);

        oMap.addListener()
    });

    function mockData() {
        return {
            stationA : {
                sName: 'Station A',
                fGrade: 85,
                oCoordinates: [
                    new google.maps.LatLng(14.524672, 121.105763), // start upper middle
                    new google.maps.LatLng(14.502094, 121.081964),
                    new google.maps.LatLng(14.505384, 121.070305),
                    new google.maps.LatLng(14.419320, 121.054306),
                    new google.maps.LatLng(14.383582, 121.057230), // end of left side
                    new google.maps.LatLng(14.425445, 121.129080), // start of right side
                    new google.maps.LatLng(14.480934, 121.124224),
                    new google.maps.LatLng(14.524672, 121.105763)  // back to starting point
                ]
            },
            stationB : {
                sName: 'Station B',
                fGrade: 60,
                oCoordinates: [
                    new google.maps.LatLng(14.425445, 121.129080), // starting point middle
                    new google.maps.LatLng(14.341195, 121.167825),
                    new google.maps.LatLng(14.244062, 121.225463),
                    new google.maps.LatLng(14.250689, 121.272137), // end of right
                    new google.maps.LatLng(14.198789, 121.278976), // going down
                    new google.maps.LatLng(14.196172, 121.189767),
                    new google.maps.LatLng(14.226775, 121.195262),
                    new google.maps.LatLng(14.268026, 121.167817),
                    new google.maps.LatLng(14.298627, 121.132127),
                    new google.maps.LatLng(14.331884, 121.117022),
                    new google.maps.LatLng(14.383582, 121.057230), // end of left side
                    new google.maps.LatLng(14.425445, 121.129080), // back to starting point
                ]
            },
            stationC : {
                sName: 'Station C',
                fGrade: 85,
                oCoordinates: [
                    new google.maps.LatLng(14.292462, 121.323418), // starting point
                    new google.maps.LatLng(14.271096, 121.328306),
                    new google.maps.LatLng(14.250689, 121.272137),
                    new google.maps.LatLng(14.198789, 121.278976), // start of bottom
                    new google.maps.LatLng(14.253693, 121.347344),
                    new google.maps.LatLng(14.303526, 121.406183),
                    new google.maps.LatLng(14.306675, 121.433149),
                    new google.maps.LatLng(14.339930, 121.417652),
                    new google.maps.LatLng(14.324067, 121.465856),
                    new google.maps.LatLng(14.378693, 121.465101),
                    new google.maps.LatLng(14.391389, 121.413612),
                    new google.maps.LatLng(14.347065, 121.398046),
                    new google.maps.LatLng(14.333084, 121.361794),
                    new google.maps.LatLng(14.292462, 121.323418), // starting point


                ]
            },
            stationD : {
                sName: 'Station D',
                fGrade: 70,
                oCoordinates: [
                    new google.maps.LatLng(14.423028, 121.227929), // starting upper middle of station F
                    new google.maps.LatLng(14.464953, 121.223856),
                    new google.maps.LatLng(14.506828, 121.262481),
                    new google.maps.LatLng(14.479968, 121.282687),
                    new google.maps.LatLng(14.443558, 121.325967),
                    new google.maps.LatLng(14.419818, 121.337387),
                    new google.maps.LatLng(14.347052, 121.318549),
                    new google.maps.LatLng(14.322540, 121.300570),
                    new google.maps.LatLng(14.288520, 121.304637),
                    new google.maps.LatLng(14.292462, 121.323418), // station C boundary
                    new google.maps.LatLng(14.271096, 121.328306),
                    new google.maps.LatLng(14.250689, 121.272137), // start of left
                    new google.maps.LatLng(14.415894, 121.276933),
                    new google.maps.LatLng(14.423028, 121.227929)
                ]
            },
            stationE : {
                sName: 'Station E',
                fGrade: 90,
                oCoordinates: [
                    new google.maps.LatLng(14.524672, 121.105763), // starting point upper middle
                    new google.maps.LatLng(14.480934, 121.124224),
                    new google.maps.LatLng(14.425445, 121.129080), // end of left side
                    new google.maps.LatLng(14.432728, 121.151434),
                    new google.maps.LatLng(14.417420, 121.186111),
                    new google.maps.LatLng(14.412087, 121.211179),
                    new google.maps.LatLng(14.462648, 121.181325), // start of right side
                    new google.maps.LatLng(14.462648, 121.181325),
                    new google.maps.LatLng(14.471627, 121.183734),
                    new google.maps.LatLng(14.494406, 121.172626),
                    new google.maps.LatLng(14.493289, 121.165687),
                    new google.maps.LatLng(14.509341, 121.142949),
                    new google.maps.LatLng(14.527629, 121.139484),
                    new google.maps.LatLng(14.527629, 121.139484),
                    new google.maps.LatLng(14.524672, 121.105763)  // back to starting point
                ]
            },
            stationF : {
                sName: 'Station F',
                fGrade: 55,
                oCoordinates: [
                    new google.maps.LatLng(14.425445, 121.129080), // starting point middle
                    new google.maps.LatLng(14.432728, 121.151434),
                    new google.maps.LatLng(14.417420, 121.186111),
                    new google.maps.LatLng(14.412087, 121.211179),
                    new google.maps.LatLng(14.423028, 121.227929),
                    new google.maps.LatLng(14.415894, 121.276933),
                    new google.maps.LatLng(14.250689, 121.272137), // end of mid to right
                    new google.maps.LatLng(14.244062, 121.225463),
                    new google.maps.LatLng(14.341195, 121.167825),
                    new google.maps.LatLng(14.425445, 121.129080), // starting point middle
                ]
            }
        };
    }
});

