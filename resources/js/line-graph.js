import 'core-js/fn/promise';
import Chart from 'chart.js';

let oLineGraph = {
    init: function() {
        this.cacheDom();
        this.setGraphsData();
    },
    cacheDom: function() {
        this.oGraph = document.getElementById('line-graph').getContext('2d');
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