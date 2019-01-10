import 'core-js/fn/promise';
import Chart from 'chart.js';

const DOUGHNUT_CHART = 'doughnut';
const LABEL_APPROVAL = ['Verified', 'Pending'];
const LABEL_ADMINS   = ['Super Admin', 'Admin'];
const LABEL_USERS   = ['Users'];
const OPTION = {
    responsive: true,
    cutoutPercentage: 75,
};

$(document).ready(function () {
    let oChart = {
        init: function() {
            this.cacheDom();
            this.data();
            this.setGraphsData();
        },
        data: function() {
            this.oGraphsData = null;
        },
        cacheDom: function() {
            this.oGraphs = $('#graphs');
            this.oApprovalChart = document.getElementById('approvalChart').getContext('2d');
            this.oAdminChart = document.getElementById('adminChart').getContext('2d');
            this.oUserChart = document.getElementById('userChart').getContext('2d');
        },
        /**
         * Builds Data for Chart
         * @param aLabels
         * @param aData
         * @returns {{labels: *, datasets: {data: *, backgroundColor: string[]}[]}}
         */
        buildData: function(aLabels, aData) {
            return {
                labels: aLabels,
                datasets: [{
                    data: aData,
                    backgroundColor: [
                        '#0288d1',  '#17d1a6'
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
         * Sets the Data of Graphs
         */
        setGraphsData: function() {
            this.requestGetGraphsData().then(function(response) {
                oChart.oGraphsData =  response.data;
                oChart.setApprovalChart();
                oChart.setAdminsChart();
                oChart.setUsersChart();
            })
        },
        /**
         * Request for getting graphs data
         * @returns {*}
         */
        requestGetGraphsData: function() {
            return axios({
                method: 'GET',
                url: '/admin/graphs/getData',
            }).catch(function (error) {
                console.log(error);
            });
        },
        /**
         * Sets Approval Chart
         */
        setApprovalChart: function() {
            let oData = oChart.buildData(
                LABEL_APPROVAL,
                [this.oGraphsData['iVerifiedUsers'], this.oGraphsData['iPendingUsers']]
            );

            oChart.drawChart(oChart.oApprovalChart, DOUGHNUT_CHART, oData, OPTION);
        },
        /**
         * Sets Admins Chart
         */
        setAdminsChart: function() {
            let oData = oChart.buildData(
                LABEL_ADMINS,
                [this.oGraphsData['iSuperAdminUsers'], this.oGraphsData['iAdminUsers']]
            );

            oChart.drawChart(oChart.oAdminChart, DOUGHNUT_CHART, oData, OPTION);
        },
        /**
         * Sets Users Chart
         */
        setUsersChart: function() {
            let oData = oChart.buildData(
                LABEL_USERS,
                [this.oGraphsData['iAllUsers']]
            );

            oChart.drawChart(oChart.oUserChart, DOUGHNUT_CHART, oData, OPTION);
        },
    };

    oChart.init();
});