class WaterStation {
    constructor(oGoogle, oMap, oStationInfo) {
        this.oGoogle = oGoogle;
        this.oMap = oMap;
        this.oStationInfo = oStationInfo;

        this.createStation();
    }

    /**
     * Creates Station
     */
    createStation() {
        this.createNewMarker(this.getCoordinatesCenter());
        this.createNewPolyline();
        this.oPolygon = this.createNewPolygon();
    }

    /**
     * Creates Boundary by Coordinates given
     */
    createNewPolyline() {
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
    createNewPolygon() {
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
    createNewMarker(oPosition) {
        let oInfoWindow = this.createInfoWindow();
        let oMarker = new this.oGoogle.maps.Marker({
            position: oPosition,
            title: this.oStationInfo.sName,
            map: this.oMap
        });

        // On Hover shows Summary
        oMarker.addListener('mouseover', () => oInfoWindow.open(this.oMap, oMarker));
        oMarker.addListener('mouseout', () => oInfoWindow.close());

        // On Click zoom's the map
        oMarker.addListener('click', () => {
            this.oMap.setZoom(12);
            this.oMap.setCenter(oMarker.getPosition());
            this.oMap.panTo(oMarker.getPosition());
        });
    }

    /**
     * Popup Window of Markers
     * @return {*}
     */
    createInfoWindow() {
        return new this.oGoogle.maps.InfoWindow({
            content: `<div>Station: ${this.oStationInfo.sName} <br> Grade: ${this.oStationInfo.fGrade}</div>`
        });
    }

    /**
     * Gets the Center of the Polygon for the position of the Marker
     * @return {*}
     */
    getCoordinatesCenter() {
        let oBounds = new this.oGoogle.maps.LatLngBounds();
        for (let iIndex = 0; iIndex < this.oStationInfo.oCoordinates.length; iIndex++) {
            oBounds.extend(this.oStationInfo.oCoordinates[iIndex]);
        }

        return oBounds.getCenter();
    }

    /**
     * Updates the grade of the Station
     * @param fGrade
     */
    updateWaterGrade(fGrade) {
        this.oStationInfo.fGrade = fGrade;
        this.oPolygon.setOptions({
            fillColor: this.getColorByQualityIndex(),
        });
    }

    /**
     * Return color of the station to it's equivalent grade
     * @return {string}
     */
    getColorByQualityIndex() {
        if (this.oStationInfo.fGrade >= 95) {
            return '#1c7617';
        } else if (this.oStationInfo.fGrade>= 80 && this.oStationInfo.fGrade < 94) {
            return '#66ff00';
        } else if (this.oStationInfo.fGrade >= 65 && this.oStationInfo.fGrade < 79) {
            return '#FFFF00';
        } else if (this.oStationInfo.fGrade >= 45 && this.oStationInfo.fGrade < 64) {
            return '#FF6600';
        }

        return '#FF0000';
    }
}

export default WaterStation;
