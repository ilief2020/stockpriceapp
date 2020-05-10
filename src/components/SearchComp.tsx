import React from 'react';

import './SearchComp.css';

type Props = {
    filterText: string;
    onFilterTextChange: (newValue: string) => void;
}

const SearchComp: React.FC<Props> = ({ filterText, onFilterTextChange }) => {
    function onChange(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        onFilterTextChange((e.target as any).value);
    }

    return (
        <div className='search-div'>
            <input className='search-input' placeholder='Search ...' value={filterText} onChange={onChange}></input>
        </div>
    );
}

export default SearchComp;