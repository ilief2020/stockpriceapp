import React from 'react';

import './SearchComp.css';
import NoteComp from './NoteComp';

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
            <NoteComp>Every change in input makes a request. <br />
                Max 5 requests per minute are allowed. <br />
                Keep one for the data request. :)
                </NoteComp>
            <input className='search-input' placeholder='Search ...' value={filterText} onChange={onChange}></input>
        </div>
    );
}

export default SearchComp;