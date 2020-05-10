import React, { useState } from 'react';
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
            <div className='item'>
                <StockSymbolPanel onStockSymbolChange={handleOnStockSymbolChange} />
            </div>
            <div className='item2'>
                <DashboardPanel stockSymbol={currentStockSymbol} />
            </div>
        </div>
    );
}

export default DashboardApp;
