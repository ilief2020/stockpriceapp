import React, { useState } from 'react';

import Calendar from 'react-calendar';
import dateFormat from 'dateformat';

import './CalendarPicker.css';

type Props = {
    label: string;
    date: Date | undefined;
    onDateChange: (date: Date) => void;
}

const CalendarPicker: React.FC<Props> = ({ label, date, onDateChange }) => {

    const [editStartDate, setEditStartDate] = useState<boolean>(false);

    function onStartDateClick(e: any) {
        //setTimeFrame(stringToTimeSeries(e.target.data-id))
        setEditStartDate(true);
    }

    function onStartDateChange(date: Date | Date[]) {
        onDateChange(date as Date);
        setEditStartDate(false);
    }
    function formatAsString(date: Date | undefined) {
        if (!date) return '...';

        return dateFormat(date, "dd mmm yy");
    }


    return (
        <div>
            <div className="datelabel" onClick={onStartDateClick}><b>{label}</b> {formatAsString(date)}</div>
            {editStartDate &&
                <div className="calendar">
                    <Calendar
                        onChange={onStartDateChange}
                        value={date}
                    />
                </div>
            }
        </div>
    );
}

export default CalendarPicker;


