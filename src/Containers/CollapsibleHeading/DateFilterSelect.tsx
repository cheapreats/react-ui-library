import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import {useMounted} from '@Utils/Hooks'
import { Datepicker } from '@Inputs/Datepicker';
import { FilterSelect, IFilterSelectProps } from '@Containers/CollapsibleHeading/FilterSelect';

const FIRST_SELECT_OPTION = 0;

export interface IDateFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    placeholder: string;
    selectOptions: string[];
    selectProps?: Partial<IFilterSelectProps>;
    onOptionsSelected?: (filterValue: {date: Date, selectedOption: string}) => void;
    filterValue: {date: Date, selectedOption: string};
}

export const DateFilterSelect: React.FC<IDateFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    onOptionsSelected = ()=> console.log('selected'),
    filterValue,
}): React.ReactElement => {
    const isMounted = useMounted()
    const [selected, setSelected] = useState(filterValue?.selectedOption || selectOptions[FIRST_SELECT_OPTION]);
    const [date, setDate] = useState(filterValue?.date || new Date());

    useEffect(() => {
        const newFilterValue = {date, selectedOption: selected};
        if (isMounted.current) {
            onOptionsSelected(newFilterValue)
        }
    }, [selected, date]);

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueToDate = new Date(event.target.value);
        setDate(valueToDate);
        
    }

    const onClearDate = () => {
        setDate(new Date)
        setSelected(selectOptions[FIRST_SELECT_OPTION]);
    }

    return (
        <FilterSelect
            onSelectFilter={setSelected}
            placeholder={placeholder}
            selectOptions={selectOptions}
            value={selected}
            {...selectProps}
        >
            <Datepicker value={date} onChange={onDateChange} onClear={onClearDate} />
        </FilterSelect>
            
    )
};

