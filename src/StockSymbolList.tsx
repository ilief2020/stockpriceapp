import React, { useEffect, useState } from 'react';
import StockService, { StockSymbol } from './services/StockService';

type Props = {
    filterText: string
    onStockSymbolChange: (newValue: string) => void;
}

const StockSymbolList: React.FC<Props> = ({ filterText, onStockSymbolChange }) => {
    const [stockSymbols, setStockSymbols] = useState<StockSymbol[]>([]);

    useEffect(() => {
        StockService.getStockSymbols(filterText).then((data: StockSymbol[]) => {
            setStockSymbols(data)
        });
    }, [filterText])

    function handleOnSelectStockSymbol(e: any) {
        e.preventDefault();
        e.stopPropagation();
        onStockSymbolChange(e.target.innerHTML);
    }

    return (
        <div>
            <ul onClick={handleOnSelectStockSymbol}>
                {stockSymbols && stockSymbols.map((d: StockSymbol, index: number) => <li key={index}>{d["2. name"]}</li>)}
            </ul>
        </div>
    );
}

export default StockSymbolList;