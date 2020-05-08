import React, { useEffect, useState } from 'react';
import StockService, { StockSymbol } from './services/StockService';
import StockSymbolSearch from './StockSymbolSearch';
import StockSymbolList from './StockSymbolList';

type Props = {
    onStockSymbolChange: (newValue: string) => void;
}

const StockSymbolPanel: React.FC<Props> = ({ onStockSymbolChange }: Props) => {
    const [stockSymbols, setStockSymbols] = useState<StockSymbol[]>([]);
    const [filterText, setFilterText] = useState<string>('');

    useEffect(() => {
        StockService.getStockSymbols(filterText).then((data: StockSymbol[]) => {
            setStockSymbols(data)
        });
    }, [filterText])

    function handleOnFilterTextChange(newValue: string) {
        setFilterText(newValue);
    }

    function handleOnStockSymbolChange(newValue: string) {
        onStockSymbolChange(newValue);
    }

    return (
        <div>
            <StockSymbolSearch filterText={filterText} onFilterTextChange={handleOnFilterTextChange} />
            <StockSymbolList filterText={filterText} onStockSymbolChange={handleOnStockSymbolChange} />
        </div>
    );
}

export default StockSymbolPanel;