import React from 'react';
import styled from 'styled-components';
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { Button, ButtonProps } from '../../Inputs/Button/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface IPageSelectorProps extends IRowSelectorProps, MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToPage: (pageNumber: number) => void;
    pageLength: number;
    buttonProps?: ButtonProps;
};

const indexShift = 1;

export const PageSelector: React.FC<IPageSelectorProps> = ({
    goToPreviousPage,
    goToNextPage,
    goToPage,
    pageLength,
    buttonProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
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
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('row')};
`;