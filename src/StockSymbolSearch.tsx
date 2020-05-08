import React, { useEffect, useState } from 'react';
import StockService, { StockSymbol } from './services/StockService';

type Props = {
    filterText: string;
    onFilterTextChange: (newValue: string) => void;
}

const StockSymbolSearch: React.FC<Props> = ({ filterText, onFilterTextChange }) => {
    function onChange(e: any) {
        e.preventDefault();
        e.stopPropagation();
        onFilterTextChange(e.target.value);
    }

    return (
        <div>
            <h2>Stock Symbol</h2>
            <input value={filterText} onChange={onChange}></input>
        </div>
    );
}

export default StockSymbolSearch;