import React from 'react';
import styled from 'styled-components';
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { Button, ButtonProps } from '../../Inputs/Button/Button';
import { Select } from '../../Inputs/Select/Select';
import { SmallText, SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IPaginationProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    setPageSize: (pageSize: number) => void;
    pageSize?: string;
    pageSelectOptions: number[];
    buttonProps?: ButtonProps;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToPage: (pageNumber: number) => void;
    pageLength: number;
    pageOptionsLength: number;
    smallTextProps?: SmallTextProps;
};

const indexShift = 1;
const leftRowText = 'Rows per page';
const rightRowText = 'out of ';

export const Pagination: React.FC<IPaginationProps> = ({
    pageSize,
    setPageSize,
    pageOptionsLength,
    pageSelectOptions,
    buttonProps,
    smallTextProps,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    pageLength,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <PaginationSelector>
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
            </PaginationSelector>
            <PaginationSelector>
                <Button 
                    icon={LeftArrowAlt}
                    onClick={() => goToPreviousPage()}
                    primary
                    {...buttonProps} 
                />
                {[...Array(pageLength)].map((pageNumber, index) => (
                    <Button 
                        key={pageNumber} 
                        onClick={() => goToPage(index)}
                        {...buttonProps}
                    > 
                        {index + indexShift}
                    </Button>
                ))}
                <Button 
                    icon={RightArrowAlt}
                    onClick={() => goToNextPage()}
                    primary
                    {...buttonProps} 
                />
            </PaginationSelector>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 3fr 1fr;
    ${flex('space-between')};
    ${media(
    'phone',
    `
        ${flex('column')};
    `,
    )};
    ${media(
        'tablet',
        `
       grid-template-columns: 2fr 1fr 1fr; 
    `,
    )}
`;
const PaginationSelector = styled.div`
    ${flex('row')};
`;