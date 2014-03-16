'use strict';

angular.module('publicApp')
  .factory('PieChartOptions', function () {
    var simple_pie_chart = {

        chart: {
            style: {"fontFamily": "OpenSansCondLight"},
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            animation: {
                duration: 1800
            }
        },
        exporting: {
            enabled: false
        },
        title: {
            text: '',
            style: {
                "fontFamily": "OpenSansCondLight",
                fontSize: 16,
                color: "#777"
            },
            align: 'center',
            verticalAlign: 'top'
        },
        tooltip: {
            formatter: function(){
                return '<b>'+ this.key + ': </b>' + this.y;
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '{point.percentage:.1f} %',
                    style: { fontFamily: "OpenSansCondLight,Georgia,Times,serif"}
                }
            }
        },
        series: [{
            type: 'pie',
            data: [],
            size: '50%'
        }]
        
    }


    var BCC = {

        simplePie: simple_pie_chart

    }
    return BCC;
  });
