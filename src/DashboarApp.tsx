import React, { useEffect, useState } from 'react';
import StockService, { StockSymbol } from './services/StockService';

import StockSymbolPanel from './StockSymbolPanel';
import DashboardPanel from './DashboardPanel';


const DashboardApp: React.FC = () => {
    const [currentStockSymbol, setCurrentStockSymbol] = useState<StockSymbol>();

    function handleOnStockSymbolChange(newValue: StockSymbol) {
        setCurrentStockSymbol(newValue);
    }

    return (
        <div>
            <h2>Dashboard for {currentStockSymbol?.name}</h2>
            <StockSymbolPanel onStockSymbolChange={handleOnStockSymbolChange} />
            <DashboardPanel stockSymbol={currentStockSymbol} />
        </div>
    );
}

export default DashboardApp;
