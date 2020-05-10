import React, { useEffect, useState } from 'react';

import CanvasJSReact from '../lib/canvasjs.react';

import { StockSymbol } from '../model/StockSymbol';
import { StockTimeSeries } from '../model/StockTimeSeries';
import { TimeSeriesType } from '../model/TimeSeriesType';
import { TimeFrame } from '../model/TimeFrame';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

type DataPointsType = {
    x: Date,
    y: number
}

type Props = {
    stockTimeSeries: StockTimeSeries[] | undefined;
    stockSymbol: StockSymbol | undefined;
    timeSeriesType: TimeSeriesType;
    timeFrame: TimeFrame | undefined;
}

const opts = {
    animationEnabled: true,
    theme: "light2",
    title: {
        text: ""
    },
    axisX: {
        valueFormatString: "DD MMM YY",
        crosshair: {
            enabled: true,
            snapToDataPoint: true
        }
    },
    axisY: {
        title: "Open Price (in EUR)",
        includeZero: false,
        valueFormatString: "€##0.00",
        crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e: any) {
                return "€" + CanvasJS.formatNumber(e.value, "##0.00");
            }
        }
    },
    data: [{
        type: "column",
        xValueFormatString: "DD MMM",
        yValueFormatString: "€##0.00",
        dataPoints: [

        ]
    },
    {
        type: "spline",
        markerSize: 0,
        name: "SMA",
        yValueFormatString: "#,##0.00",
        dataPoints: []
    }
    ]
}


const StockSymbolChart: React.FC<Props> = ({ stockTimeSeries, stockSymbol, timeSeriesType, timeFrame }) => {
    const [chart, setChart] = useState<any>();

    let options: any = opts;

    let chartRef: any;


    function calculateMovingAverage(chart: any) {
        var numOfDays = 5;
        // return if there are insufficient dataPoints
        if (chart.options.data[0].dataPoints.length <= numOfDays) {
            chart.options.data[1].dataPoints = [];
        }
        else {
            var total;
            for (var i = 0; i < chart.options.data[0].dataPoints.length - numOfDays; i++) {
                total = 0;
                for (var j = i; j < i + numOfDays; j++) {
                    total += chart.options.data[0].dataPoints[j].y;
                }
                chart.options.data[1].dataPoints.push({
                    x: chart.options.data[0].dataPoints[i].x,
                    y: total / numOfDays
                });
            }
        }
    }

    useEffect(() => {
        if (!stockSymbol) return;

        if (timeSeriesType === TimeSeriesType.TIME_SERIES_MONTHLY) {
            options.axisX.valueFormatString = "DD MMM yyyy";
        }
        options.title.text = 'Stock Price of ' + stockSymbol.symbol + '-' + timeSeriesType.displayName;
        if (chartRef) {
            setChart(chartRef);
            chartRef.render();
        }
        if (chart) {
            chart.render();
        }
    }, [stockSymbol, timeSeriesType])

    useEffect(() => {
        if (!timeFrame || !stockTimeSeries) return;
        var startDate = timeFrame.startDate;
        var endDate = timeFrame.endDate;
        let dataPoints: DataPointsType[] = [];
        for (var i = 0; i < stockTimeSeries.length; i++) {
            var timeSeriesInInterval =
                (startDate === undefined && endDate === undefined)
                || (endDate === undefined && startDate !== undefined && stockTimeSeries[i].date >= startDate)
                || (startDate === undefined && endDate !== undefined && stockTimeSeries[i].date <= endDate)
                || (startDate !== undefined && endDate !== undefined && stockTimeSeries[i].date >= startDate && stockTimeSeries[i].date <= endDate)
            if (timeSeriesInInterval) {
                dataPoints.push({
                    x: stockTimeSeries[i].date,
                    y: stockTimeSeries[i].open
                });
            }
        }
        options.data[0].dataPoints = dataPoints;
        options.data[1].dataPoints = [];

        if (chartRef) {
            setChart(chartRef);
            chartRef.render();
        }
        let chartLocal = chart ? chart : chartRef;

        if (chartLocal) {
            calculateMovingAverage(chartLocal);
            chartLocal.render();
        }
    }, [stockTimeSeries, timeFrame])



    function refreshChart(e: any) {
        chart.options = options;
        chart.render();
    }

    return (
        <div>

            {stockSymbol && <CanvasJSChart options={options}
                onRef={(ref: any) => {
                    chartRef = ref
                }}
            />
            }
        </div>
    );
}

export default StockSymbolChart;