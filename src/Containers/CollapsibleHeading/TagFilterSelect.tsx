import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import {useMounted} from '@Utils/Hooks'
import styled from 'styled-components';
import { flex } from '@Utils/Mixins/flex';
import { TagContainer } from '@Containers/VendorsList/TagContainer';
import { FilterSelect } from '@Containers/CollapsibleHeading/FilterSelect';
import { TagProps } from '../Tag/Tag';
import { Select, SelectProps } from '../../Inputs/Select/Select';

const DELETE_ONE_OPTION = 1;

export interface ITagFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    placeholder: string;
    selectOptions: string[];
    selectProps?: SelectProps;
    tagProps?: Omit<TagProps, 'children'>;
    onOptionsSelected?: (selectedOptions: string[]) => void;
}

export const TagFilterSelect: React.FC<ITagFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    tagProps,
    onOptionsSelected = ()=> console.log('selected'),
    ...props
}): React.ReactElement => {
    const isMounted = useMounted()
    const [optionsSelected, setOptionsSelected] = useState<string[]>([]);

    useEffect(() => {
        if (isMounted.current) {
            onOptionsSelected(optionsSelected)
        }
    }, [optionsSelected.length]);

    const addSelectOption = (selectOptionToAdd: string) => {
        setOptionsSelected((currentOptions) => [...currentOptions, selectOptionToAdd]);
    }

    const removeSelectedOption = (index: number) => {
        const optionsSelectedCopy = [...optionsSelected];
        optionsSelectedCopy.splice(index, DELETE_ONE_OPTION);
        setOptionsSelected(optionsSelectedCopy)
    }

    return (
        <Wrapper {...props}>
            <FilterSelect
                onSelectFilter={addSelectOption}
                placeholder={placeholder}
                selectOptions={selectOptions}
            >
                <TagContainer tags={optionsSelected} onRemoveTag={removeSelectedOption} style={{marginTop: '10px'}} {...tagProps} />
            </FilterSelect>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    ${flex('column')}
    height: auto;
`