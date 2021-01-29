import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import {useMounted} from '@Utils/Hooks'
import styled from 'styled-components';
import { flex } from '@Utils/Mixins/flex';
import { TagContainer } from '@Containers/VendorsList/TagContainer';
import { TagProps } from '../Tag/Tag';
import { Select, SelectProps } from '../../Inputs/Select/Select';


export interface IFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    placeholder: string;
    selectOptions: string[];
    selectProps?: SelectProps;
    onSelectFilter?: (selectedFilter: string) => void;
}

export const FilterSelect: React.FC<IFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    onSelectFilter = ()=> console.log('selected'),
    children,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Select
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                onSelectFilter(e.target.value);
            }}
            placeholder={placeholder}
            limit={selectOptions.length}
            {...selectProps}
        >
            {selectOptions.map((selectOption): React.ReactElement => (
                <option key={selectOption} value={selectOption}>
                    {selectOption}
                </option>
            ))}
        </Select>
        {children}
    </Wrapper>
);

const Wrapper = styled.div`
    ${flex('column')}
    height: auto;
`