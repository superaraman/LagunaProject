import 'core-js/fn/promise';
import Chart from 'chart.js';
import 'bootstrap-daterangepicker/daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
const $ = require('jquery');

let oLineGraph = {
    init: function() {
        this.data();
        this.cacheDom();
        this.selectListener();
        this.initDatePicker();
        this.setGraphsData();
    },
    data() {
        this.oSearch = {
            start_date: null,
            end_date: null,
            parameter: null
        }
    },
    cacheDom: function() {
        this.oGraph = document.getElementById('line-graph').getContext('2d');
        this.oDateRangePicker = $('#water-quality-graph').find('.date-picker');
        this.oSelectLineGraph = $('#line-graph-select');
    },
    selectListener() {
        this.oSearch.parameter = this.oSelectLineGraph.val();
        console.log(this.oSearch);
        this.oSelectLineGraph.on('change', function (e) {
            oLineGraph.oSearch.parameter = e.target.value;
        });
    },
    initDatePicker() {
        let oStartDate = moment().subtract(29, 'days');
        let oEndDate = moment();

        const fnCallBack = (oStartDate, oEndDate) => {
            this.oDateRangePicker.find('span').html(oStartDate.format('MMM D, YYYY') + ' - ' + oEndDate.format('MMM D, YYYY'));
            this.oSearch.start_date = oStartDate.format('DD/MM/YYYY');
            this.oSearch.end_date = oEndDate.format('DD/MM/YYYY');
            console.log(oStartDate.format('DD/MM/YYYY') + ' - ' + oEndDate.format('DD/MM/YYYY'))
        };

        this.oDateRangePicker.daterangepicker({
            startDate: oStartDate,
            endDate: oEndDate,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, fnCallBack);

        fnCallBack(oStartDate, oEndDate);
    },
    setGraphsData() {
        let data = {
            labels: ["match1", "match2", "match3", "match4", "match5"],
            datasets: [
                {
                    label: "TeamA Score",
                    data: [10, 50, 25, 70, 40],
                    backgroundColor: "blue",
                    borderColor: "lightblue",
                    fill: false,
                    lineTension: 0,
                    radius: 5
                },
                {
                    label: "TeamB Score",
                    data: [20, 35, 40, 60, 50],
                    backgroundColor: "green",
                    borderColor: "lightgreen",
                    fill: false,
                    lineTension: 0,
                    radius: 5
                }
            ]
        };

        //options
        let options = {
            responsive: true,
            title: {
                display: true,
                position: "top",
                text: "Line Graph",
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            }
        };

        let myLineChart = new Chart(this.oGraph, {
            type: 'line',
            data: data,
            options: options
        });
    }
};

export default oLineGraph;