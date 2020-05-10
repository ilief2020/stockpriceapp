import React from 'react';
import {
    Link
} from "react-router-dom";

import './MenuApp.css';


const MenuApp: React.FC<any> = () => {
    return (
        <div>
            <ul className='menu'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </div>
    );
}

export default MenuApp;


