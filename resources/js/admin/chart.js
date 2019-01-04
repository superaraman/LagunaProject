import Chart from 'chart.js';

$(document).ready(function () {
    let oChart = {
        init: function() {
            this.cacheDom();
            this.mainDoughnut();
        },
        cacheDom: function() {
            this.oChartDoughnut = document.getElementById('adminChart').getContext('2d');
        },
        /**
         * Main Function for Doughnut
         */
        mainDoughnut: function() {
            let aPercentageData = this.getFakeData();
            let oData = this.buildData(aPercentageData);
            this.drawChart(this.oChartDoughnut, 'doughnut', oData);
        },
        /**
         * Builds Data for Chart
         * @param aData
         * @returns {{labels: string[], datasets: {label: string, data: *}[]}}
         */
        buildData: function(aData) {
            return {
                labels: ['Verified', 'Unverified'],
                datasets: [{
                    label: 'Verified Users',
                    data: aData,
                    backgroundColor: [
                        '#ff2b85', '#ff2b0e'
                    ]
                }]
            };
        },
        /**
         * Draw the actual chart
         * @param oTargetChart
         * @param sChartType
         * @param oData
         * @param oOption
         */
        drawChart: function(oTargetChart, sChartType, oData, oOption = {}) {
            return new Chart(oTargetChart, {
                type: sChartType,
                data: oData,
                options: oOption
            })
        },
        /**
         * Fake Data
         * @returns {number[]}
         */
        getFakeData: function() {
            return [86.10, 13.90];
        }

    };

    oChart.init();
});