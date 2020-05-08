
import axios from 'axios';


export type StockSymbol = {
    "1. symbol": string
    "2. name": string;
}

const StockService = {
    getStockSymbols
};

const API = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo";

function getStockSymbols(searchKey: string) {
    return axios.get('https://www.alphavantage.co/query', {
        params: {
            'function': 'SYMBOL_SEARCH',
            'keywords': searchKey,
            'apikey': '351OA9LA71A34T9J',
        }
    })
        .then(function (response) {
            return response.data.bestMatches;
        })
};

export default StockService;