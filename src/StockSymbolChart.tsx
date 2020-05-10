import React, { useEffect, useState } from 'react';

import CanvasJSReact from './lib/canvasjs.react';

import { StockSymbol } from './model/StockSymbol';
import { StockTimeSeries } from './model/StockTimeSeries';
import { TimeSeriesType } from './model/TimeSeriesType';
import { TimeFrame } from './model/TimeFrame';
import { start } from 'repl';

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
    // onFilterTextChange: (newValue: string) => void;
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
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: "€##0.00",
        dataPoints: [

        ]
    }]
}


const StockSymbolChart: React.FC<Props> = ({ stockTimeSeries, stockSymbol, timeSeriesType, timeFrame }) => {
    const [chart, setChart] = useState<any>();

    //const [options, setOptions] = useState<any>(opts);
    let options: any = opts;

    let chartRef: any;


    // useEffect(() => {
    //     if (!stockTimeSeries) return;
    //     let dataPoints: DataPointsType[] = [];
    //     for (var i = 0; i < stockTimeSeries.length; i++) {
    //         dataPoints.push({
    //             x: stockTimeSeries[i].date,
    //             y: stockTimeSeries[i].open
    //         });
    //     }
    //     options.data[0].dataPoints = dataPoints;

    //     if (chartRef) {
    //         setChart(chartRef);
    //         chartRef.render();
    //     }
    //     let chartLocal = chart ? chart : chartRef;
    //     if (chartLocal) {
    //         chartLocal.render();
    //     }
    // }, [stockTimeSeries])

    useEffect(() => {
        if (!stockSymbol) return;

        if (timeSeriesType == TimeSeriesType.TIME_SERIES_MONTHLY) {
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
        console.log('timeframe effect ', timeFrame);
        if (!timeFrame || !stockTimeSeries) return;
        var startDate = timeFrame.startDate;
        var endDate = timeFrame.endDate;
        let dataPoints: DataPointsType[] = [];
        for (var i = 0; i < stockTimeSeries.length; i++) {
            var timeSeriesInInterval =
                (startDate == undefined && endDate == undefined)
                || (endDate == undefined && startDate != undefined && stockTimeSeries[i].date >= startDate)
                || (startDate == undefined && endDate != undefined && stockTimeSeries[i].date <= endDate)
                || (startDate != undefined && endDate != undefined && stockTimeSeries[i].date >= startDate && stockTimeSeries[i].date <= endDate)
            console.log(stockTimeSeries[i].date, timeSeriesInInterval)
            if (timeSeriesInInterval) {
                dataPoints.push({
                    x: stockTimeSeries[i].date,
                    y: stockTimeSeries[i].open
                });
            }
        }
        options.data[0].dataPoints = dataPoints;

        if (chartRef) {
            setChart(chartRef);
            chartRef.render();
        }
        let chartLocal = chart ? chart : chartRef;
        if (chartLocal) {
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