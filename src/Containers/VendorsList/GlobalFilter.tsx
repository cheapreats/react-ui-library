import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Input, InputProps } from '../../Inputs/Input/Input';

export interface IFilterProps extends InputProps {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
}

export const GlobalFilter: React.FC<IFilterProps> = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    ...props
}): React.ReactElement => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((newValue) => {
        setGlobalFilter(newValue || undefined);
    }, 200);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
        onChange(target.value);
    };
    return (
        <Input
            value={value || ''}
            placeholder={`Search ${count} results`}
            onChange={onInputChange}
            {...props}
        />
    );
};
