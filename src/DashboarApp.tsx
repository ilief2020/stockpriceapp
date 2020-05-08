import React, { useEffect, useState } from 'react';
import StockService, { StockSymbol } from './services/StockService';

import StockSymbolPanel from "./StockSymbolPanel";


const DashboardApp: React.FC = () => {
    const [currentStockSymbol, setCurrentStockSymbol] = useState<string>();

    function handleOnStockSymbolChange(newValue: string) {
        setCurrentStockSymbol(newValue);
    }

    return (
        <div>
            <h2>Dashboard for {currentStockSymbol}</h2>
            <StockSymbolPanel onStockSymbolChange={handleOnStockSymbolChange} />
        </div>
    );
}

export default DashboardApp;
