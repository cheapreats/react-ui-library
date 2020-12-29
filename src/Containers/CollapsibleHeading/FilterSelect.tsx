import React, { useState } from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { flex } from '@Utils/Mixins';
import { Tag, TagProps } from '../Tag/Tag';
import { Input, InputProps } from '../../Inputs/Input/Input';
import { Select, SelectProps } from '../../Inputs/Select/Select';

export interface IFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    selectedValue: string;
    placeholder: string;
    selectOptions: string[];
    selectProps?: SelectProps;
    inputProps?: InputProps;
    tagProps?: Omit<TagProps, 'children'>;
    filterApplied: boolean;
    setFilterApplied: React.Dispatch<React.SetStateAction<boolean>>
}

const FIRST_OPTION = 0;
const SEPARATOR_TEXT = ': '

export const FilterSelect: React.FC<IFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    inputProps,
    tagProps,
    filterApplied,
    setFilterApplied,
    ...props
}): React.ReactElement => {
    const [selectValue, setSelectValue] = useState(selectOptions[FIRST_OPTION]);
    const [inputValue, setInputValue] = useState('');
    return (
        <div {...props}>
            {filterApplied ? (
                <Tag 
                    onClick={() => setFilterApplied(false)}
                    {...tagProps}
                >
                    {selectValue}
                    {SEPARATOR_TEXT}
                    {inputValue}
                </Tag>
            ) : (
                <>
                    <Select
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSelectValue(e.target.value);
                        }}
                        value={selectValue}
                        placeholder={selectValue}
                        {...selectProps}
                    >
                        {selectOptions.map((selectOption): React.ReactElement => (
                            <option key={selectOption} value={selectOption}>
                                {selectOption}
                            </option>
                        ))}
                    </Select>
                    <Input 
                        placeholder={placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setInputValue(e.target.value);
                        }}
                        {...inputProps}
                    />
                </>
            )}
        </div>
    )
};