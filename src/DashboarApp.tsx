import React, { useEffect, useState } from 'react';
import StockService from './services/StockService';
import { StockSymbol } from './model/StockSymbol';

import StockSymbolPanel from './StockSymbolPanel';
import DashboardPanel from './DashboardPanel';



import './DashboarApp.css';


const DashboardApp: React.FC = () => {
    const [currentStockSymbol, setCurrentStockSymbol] = useState<StockSymbol>();

    function handleOnStockSymbolChange(newValue: StockSymbol) {
        setCurrentStockSymbol(newValue);
    }

    return (
        <div className="container">
            <StockSymbolPanel onStockSymbolChange={handleOnStockSymbolChange} />
            <DashboardPanel stockSymbol={currentStockSymbol} />
        </div>
    );
}

export default DashboardApp;
