import React, { useEffect, useState } from 'react';
import StockService from './services/StockService';
import { StockSymbol } from './model/StockSymbol';

type Props = {
    filterText: string
    onStockSymbolChange: (newValue: StockSymbol) => void;
}

const StockSymbolList: React.FC<Props> = ({ filterText, onStockSymbolChange }) => {
    const [stockSymbols, setStockSymbols] = useState<StockSymbol[]>([]);

    useEffect(() => {
        StockService.getStockSymbols(filterText).then((data: StockSymbol[]) => {
            setStockSymbols(data)
        });
    }, [filterText])

    function handleOnSelectStockSymbol(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        onStockSymbolChange({ name: (e.target as any).innerHTML, symbol: (e.target as any).dataset.id });
    }

    return (
        <div>
            <ul onClick={handleOnSelectStockSymbol}>
                {stockSymbols && stockSymbols.map((ss: StockSymbol, index: number) => <li key={index} data-id={ss.symbol}>{ss.name}</li>)}
            </ul>
        </div>
    );
}

export default StockSymbolList;