import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins/flex';
import { Select, SelectProps } from '../../Inputs/Select/Select';


export interface IFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    placeholder: string;
    selectOptions: string[];
    selectProps?: SelectProps;
    onSelectFilter?: (selectedFilter: string) => void;
    value?: string;
}

export const FilterSelect: React.FC<IFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    onSelectFilter = ()=> console.log('selected'),
    value,
    children,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Select
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                onSelectFilter(e.target.value);
            }}
            value={value}
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
`