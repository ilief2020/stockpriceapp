import React, { useEffect, useState } from 'react';
import StockService from './services/StockService';
import { StockSymbol } from './model/StockSymbol';

type Props = {
    filterText: string;
    onFilterTextChange: (newValue: string) => void;
}

const StockSymbolSearch: React.FC<Props> = ({ filterText, onFilterTextChange }) => {
    function onChange(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        onFilterTextChange((e.target as any).value);
    }

    return (
        <div>
            <input value={filterText} onChange={onChange}></input>
        </div>
    );
}

export default StockSymbolSearch;