import React, { useEffect, useState } from 'react';
import StockService from '../services/StockService';
import { StockSymbol } from '../model/StockSymbol';

import './StockSymbolList.css'

type Props = {
    filterText: string
    onStockSymbolChange: (newValue: StockSymbol) => void;
}

const StockSymbolList: React.FC<Props> = ({ filterText, onStockSymbolChange }) => {
    const [stockSymbols, setStockSymbols] = useState<StockSymbol[]>([]);

    useEffect(() => {
        if (!filterText) return;
        StockService.getStockSymbols(filterText).then((data: StockSymbol[]) => {
            setStockSymbols(data)
        });
    }, [filterText])

    function handleOnSelectStockSymbol(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        onStockSymbolChange({ name: (e.target as any).id, symbol: (e.target as any).dataset.id });
    }

    return (
        <div className='stocklist' >
            <ul className='symbollist' onClick={handleOnSelectStockSymbol}>
                {stockSymbols && stockSymbols.map((ss: StockSymbol, index: number) => <li key={index}><a data-id={ss.symbol} id={ss.name}>{ss.name}</a></li>)}
            </ul>
        </div >
    );
}

export default StockSymbolList;