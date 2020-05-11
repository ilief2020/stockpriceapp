import React from 'react';

import './NoteComp.css';

type Props = {
    children: any;
}

const NoteComp: React.FC<Props> = ({ children }) => {
    return (
        <div className="note">{children}
        </div>
    );
}

export default NoteComp;