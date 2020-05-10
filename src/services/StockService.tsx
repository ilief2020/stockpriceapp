
import axios from 'axios';

import { StockServiceParams } from '../model/StockServiceParams';

const StockService = {
    getStockSymbols,
    getStockTimeSeries
};

const API = "https://www.alphavantage.co/query";


function getStockSymbols(searchKey: string) {
    return axios.get(API, {
        params: {
            'function': 'SYMBOL_SEARCH',
            'keywords': searchKey,
            'apikey': '351OA9LA71A34T9J',
        }
    })
        .then(function (response) {
            if (!response.data.bestMatches) {
                return [];
            }
            let stockSymbols = [];
            for (var i = 0; i < response.data.bestMatches.length; i++) {
                stockSymbols.push({
                    name: response.data.bestMatches[i]['2. name'],
                    symbol: response.data.bestMatches[i]['1. symbol']
                });
            }
            return stockSymbols;
        })
};

function getStockTimeSeries(params: StockServiceParams) {
    return axios.get(API, {
        params: {
            'function': params.function.key,
            'symbol': params.symbol,
            'apikey': '351OA9LA71A34T9J',
        }
    })
        .then(function (response) {
            const responseTimeSeries = response.data[params.function.displayName];


            if (!responseTimeSeries) {
                return [];
            }
            let stockTimeSeries = [];
            const timeSeriesKeys = Object.keys(responseTimeSeries)
            for (var i = 0; i < timeSeriesKeys.length; i++) {
                stockTimeSeries.push({
                    open: parseFloat(responseTimeSeries[timeSeriesKeys[i]]['1. open']),
                    high: parseFloat(responseTimeSeries[timeSeriesKeys[i]]['2. high']),
                    low: parseFloat(responseTimeSeries[timeSeriesKeys[i]]['3. low']),
                    close: parseFloat(responseTimeSeries[timeSeriesKeys[i]]['4. close']),
                    volume: parseFloat(responseTimeSeries[timeSeriesKeys[i]]['5. volume']),
                    date: new Date(timeSeriesKeys[i])
                });
            }
            return stockTimeSeries;
        })
};

export default StockService;