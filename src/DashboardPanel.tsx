import React, { useEffect, useState } from 'react';
import StockService from './services/StockService';
import StockSymbolChart from './components/StockSymbolChart'

import { StockSymbol } from './model/StockSymbol';
import { StockTimeSeries } from './model/StockTimeSeries';
import { TimeSeriesType } from './model/TimeSeriesType';
import { TimeFrame } from './model/TimeFrame';

import CalendarPicker from './components/CalendarPickerComp';


type Props = {
    stockSymbol: StockSymbol | undefined;
    // onFilterTextChange: (newValue: string) => void;
}

const DashBoardPanel: React.FC<Props> = ({ stockSymbol }) => {
    const [stockTimeSeries, setStockTimeSeries] = useState<StockTimeSeries[]>([]);

    const [currTimeSeriesType, setCurrTimeSeriesType] = useState<TimeSeriesType>(TimeSeriesType.TIME_SERIES_DAILY);

    const [timeFrame, setTimeFrame] = useState<TimeFrame>(new TimeFrame(undefined, undefined))

    function onStartDateChange(date: Date) {
        let localtimeFrame = new TimeFrame(timeFrame.getStartDate(), timeFrame.getEndDate());
        localtimeFrame.setStartDate(date);
        setTimeFrame(localtimeFrame);

    }

    function onEndDateChange(date: Date) {
        let localtimeFrame = new TimeFrame(timeFrame.getStartDate(), timeFrame.getEndDate());
        localtimeFrame.setEndDate(date);
        setTimeFrame(localtimeFrame);
    }


    useEffect(() => {
        stockSymbol &&
            StockService.getStockTimeSeries({ function: currTimeSeriesType, symbol: stockSymbol.symbol })
                .then((data: StockTimeSeries[]) => {
                    if (data && data.length > 2) {
                        let localtimeFrame = new TimeFrame(data[data.length - 1].date, data[0].date);
                        setTimeFrame(localtimeFrame);
                    }
                    setStockTimeSeries(data)
                });
    }, [stockSymbol])


    return (
        <div >
            <div><b>Stock Symbol:   {stockSymbol?.name} </b></div><br />
            <CalendarPicker label='Start Date' date={timeFrame.startDate} onDateChange={onStartDateChange} />
            <CalendarPicker label='End Date' date={timeFrame.endDate} onDateChange={onEndDateChange} />
            <StockSymbolChart stockSymbol={stockSymbol} stockTimeSeries={stockTimeSeries} timeSeriesType={currTimeSeriesType} timeFrame={timeFrame} />
        </div >
    );
}

export default DashBoardPanel;