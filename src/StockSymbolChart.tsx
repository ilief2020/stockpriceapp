import React, { useEffect, useState } from 'react';

import CanvasJSReact from './lib/canvasjs.react';
import { StockTimeSeries, StockSymbol, TimeSeriesType, toTimeSeriesLabel } from './services/StockService';

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
    // onFilterTextChange: (newValue: string) => void;
}

const opts = {
    animationEnabled: true,
    theme: "light2",
    title: {
        text: ""
    },
    axisX: {
        valueFormatString: "DD MMM",
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


const StockSymbolChart: React.FC<Props> = ({ stockTimeSeries, stockSymbol, timeSeriesType }) => {
    const [chart, setChart] = useState<any>();

    //const [options, setOptions] = useState<any>(opts);
    let options: any = opts;

    let chartRef: any;


    useEffect(() => {
        if (!stockTimeSeries) return;
        let dataPoints: DataPointsType[] = [];
        for (var i = 0; i < stockTimeSeries.length; i++) {
            dataPoints.push({
                x: stockTimeSeries[i].date,
                y: stockTimeSeries[i].open
            });
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
    }, [stockTimeSeries])

    useEffect(() => {
        if (!stockSymbol) return;
        switch (timeSeriesType) {
            case TimeSeriesType.TIME_SERIES_MONTHLY:
                options.axisX.valueFormatString = "DD MMM yyyy";
        }
        options.title.text = 'Stock Price of ' + stockSymbol.symbol + '-' + toTimeSeriesLabel(timeSeriesType);
        if (chartRef) {
            setChart(chartRef);
            chartRef.render();
        }
        if (chart) {
            chart.render();
        }
    }, [stockSymbol, timeSeriesType])


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