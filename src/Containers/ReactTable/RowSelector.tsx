import React from 'react';
import styled from 'styled-components';
import { Select } from '../../Inputs/Select/Select';
import { SmallText, SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface IRowSelectorProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    setPageSize: (pageSize: number) => void;
    pageSize: string;
    pageSelectOptions: number[];
    pageOptionsLength: number;
    smallTextProps?: SmallTextProps;
};

const leftRowText = 'Rows per page';
const rightRowText = 'out of ';

export const RowSelector: React.FC<IRowSelectorProps> = ({
    pageSize,
    setPageSize,
    pageOptionsLength,
    pageSelectOptions,
    smallTextProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <SmallText {...smallTextProps}>
                {leftRowText}
            </SmallText>
            <Select
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setPageSize(Number(e.target.value));
                }}
                value={pageSize}
                placeholder={pageSize}
            >
                {pageSelectOptions.map((selectOption): React.ReactElement => (
                    <option key={selectOption} value={selectOption}>
                        {selectOption}
                    </option>
                ))}
            </Select>
            <SmallText {...smallTextProps}>
                {rightRowText} 
                {pageOptionsLength}
            </SmallText>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('row')};
`;