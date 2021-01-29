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
    onOptionsSelected?: (selectedDate: string, selectedOption: string) => void;
    filterValue: Date;
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
    const [optionSelected, setOptionSelected] = useState(selectOptions[FIRST_SELECT_OPTION]);
    const onSelectChange = (value: string) => {
        setOptionSelected(value)
    }
    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isMounted.current) {
            onOptionsSelected(event.target.value, optionSelected)
        }
    }
    return (
        <Wrapper {...props}>
            <FilterSelect
                onSelectFilter={onSelectChange}
                placeholder={placeholder}
                selectOptions={selectOptions}
            >
                <Datepicker value={filterValue} onChange={onDateChange} margin='10px auto' />
            </FilterSelect>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    ${flex('column')}
    height: 450px;
`