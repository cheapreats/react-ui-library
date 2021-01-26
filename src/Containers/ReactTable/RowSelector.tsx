import React from 'react';
import styled from 'styled-components';
import { Select, SelectProps } from '../../Inputs/Select/Select';
import { SmallText, SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface IRowSelectorProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    setPageSize: (pageSize: number) => void;
    pageSize: string | number;
    pageSelectOptions: number[];
    pageOptionsLength: number;
    smallTextProps?: SmallTextProps;
    selectProps?: SelectProps;
};

const LEFT_ROW_TEXT = 'Rows per page';
const RIGHT_ROW_TEXT = 'out of ';

export const RowSelector: React.FC<IRowSelectorProps> = ({
    pageSize,
    setPageSize,
    pageOptionsLength,
    pageSelectOptions,
    smallTextProps,
    selectProps,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <SmallText {...smallTextProps}>
            {LEFT_ROW_TEXT}
        </SmallText>
        <Select
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setPageSize(Number(e.target.value));
            }}
            value={pageSize}
            placeholder={pageSize.toString()}
            {...selectProps}
        >
            {pageSelectOptions.map((selectOption): React.ReactElement => (
                <option key={selectOption} value={selectOption}>
                    {selectOption}
                </option>
            ))}
        </Select>
        <SmallText {...smallTextProps}>
            {RIGHT_ROW_TEXT} 
            {pageOptionsLength}
        </SmallText>
    </Wrapper>
);

const Wrapper = styled.div`
    ${flex('row', 'center')};
`;