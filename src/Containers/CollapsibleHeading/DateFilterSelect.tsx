import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import {useMounted} from '@Utils/Hooks'
import styled from 'styled-components';
import { flex } from '@Utils/Mixins/flex';
import { Datepicker } from '@Inputs/Datepicker';
import { FilterSelect } from '@Containers/CollapsibleHeading/FilterSelect';
import { TagProps } from '../Tag/Tag';
import { Select, SelectProps } from '../../Inputs/Select/Select';

const FIRST_SELECT_OPTION = 0;

export interface IDateFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    placeholder: string;
    selectOptions: string[];
    selectProps?: SelectProps;
    tagProps?: Omit<TagProps, 'children'>;
    onOptionsSelected?: (filterValue: {date: Date, selectedOption: string}) => void;
    filterValue: {date: Date, selectedOption: string};
}

export const DateFilterSelect: React.FC<IDateFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    tagProps,
    onOptionsSelected = ()=> console.log('selected'),
    filterValue,
    ...props
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
    
    return (
        <Wrapper {...props}>
            <FilterSelect
                onSelectFilter={setSelected}
                placeholder={placeholder}
                selectOptions={selectOptions}
                value={selected}
            />
            <Datepicker value={date} onChange={onDateChange} onClear={() => setDate(new Date)} />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    ${flex('column')}
    height: 450px;
    width: 100%;
`