import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { Input } from '../../Inputs/Input/Input';

export interface IFilterProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
            column: any;
};

export const DefaultFilter: React.FC<IFilterProps> = ({
    column: { filterValue, setFilter, preFilteredRows: { length } },
    ...props
}): React.ReactElement => (
    <Input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder={`Search ${length} results`}
        {...props}
    />
);