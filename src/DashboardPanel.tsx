import React, { useEffect, useState } from 'react';
import StockService, { StockTimeSeries, StockParams, TimeSeriesType, StockSymbol, stringToTimeSeries } from './services/StockService';
import StockSymbolChart from './StockSymbolChart'


type Props = {
    stockSymbol: StockSymbol | undefined;
    // onFilterTextChange: (newValue: string) => void;
}

const DashBoardPanel: React.FC<Props> = ({ stockSymbol }) => {
    const [stockTimeSeries, setStockTimeSeries] = useState<StockTimeSeries[]>([]);

    const [currTimeSeriesType, setCurrTimeSeriesType] = useState<TimeSeriesType>(TimeSeriesType.TIME_SERIES_DAILY);

    useEffect(() => {
        stockSymbol &&
            StockService.getStockTimeSeries({ function: currTimeSeriesType, symbol: stockSymbol.symbol }).then((data: StockTimeSeries[]) => {
                setStockTimeSeries(data)
            });
    }, [stockSymbol])

    function onTimeFrameChange(e: any) {
        //setTimeFrame(stringToTimeSeries(e.target.data-id))
    }
    return (
        <div className="item">
            {/* <ul onClick={onTimeFrameChange}>
                
                  {Object.entries(TimeSeriesType).map(( value : [string, TimeSeriesType]) => <li key={value.} data-id={key}>{ss.name}</li>)} </ul> */}

            <StockSymbolChart stockSymbol={stockSymbol} stockTimeSeries={stockTimeSeries} timeSeriesType={currTimeSeriesType} />
        </div >
    );
}

export default DashBoardPanel;