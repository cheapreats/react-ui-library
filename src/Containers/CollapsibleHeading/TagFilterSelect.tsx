import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { useMounted } from '@Utils/Hooks';
import { TagContainer } from '@Containers/VendorsList/TagContainer';
import {
    FilterSelect,
    IFilterSelectProps,
} from '@Containers/CollapsibleHeading/FilterSelect';
import { TagProps } from '../Tag/Tag';

const DELETE_ONE_OPTION = 1;

const checkIfOptionIsSelected = (
    currentOptions: string[],
    selectOptionToAdd: string,
) => {
    if (!currentOptions.includes(selectOptionToAdd)) {
        return [...currentOptions, selectOptionToAdd];
    }
    return currentOptions;
};

export interface ITagFilterSelectProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    placeholder: string;
    selectOptions: string[];
    selectProps?: Partial<IFilterSelectProps>;
    tagProps?: Omit<TagProps, 'children'>;
    filterValue?: string[];
    onOptionsSelected?: (selectedOptions: string[]) => void;
}

export const TagFilterSelect: React.FC<ITagFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    tagProps,
    filterValue,
    onOptionsSelected = () => console.log('selected'),
}): React.ReactElement => {
    const isMounted = useMounted();
    const [optionsSelected, setOptionsSelected] = useState<string[]>(
        filterValue || [],
    );

    useEffect(() => {
        if (isMounted.current) {
            onOptionsSelected(optionsSelected);
        }
    }, [optionsSelected.length]);

    const addSelectOption = (selectOptionToAdd: string) => {
        setOptionsSelected((current) =>
            checkIfOptionIsSelected(current, selectOptionToAdd),
        );
    };

    const removeSelectedOption = (index: number) => {
        const optionsSelectedCopy = [...optionsSelected];
        optionsSelectedCopy.splice(index, DELETE_ONE_OPTION);
        setOptionsSelected(optionsSelectedCopy);
    };

    return (
        <FilterSelect
            onSelectFilter={addSelectOption}
            placeholder={placeholder}
            selectOptions={selectOptions}
            {...selectProps}
        >
            <TagContainer
                tags={optionsSelected}
                onRemoveTag={removeSelectedOption}
                {...tagProps}
            />
        </FilterSelect>
    );
};
