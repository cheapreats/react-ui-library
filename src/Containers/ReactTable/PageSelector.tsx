import React from 'react';
import styled from 'styled-components';
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { Button, ButtonProps } from '../../Inputs/Button/Button';
import { SmallText, SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface IPageSelectorProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToPage: (pageNumber: number) => void;
    pageLength: number;
    buttonProps?: ButtonProps;
    pageIndex: number;
    smallTextProps?: SmallTextProps;
};

const indexShift = 1;
const leftText = 'Page '
const middleText = ' out of '

export const PageSelector: React.FC<IPageSelectorProps> = ({
    goToPreviousPage,
    goToNextPage,
    goToPage,
    pageLength,
    pageIndex,
    buttonProps,
    smallTextProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <Section>
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
            </Section>
            <Section>
                <SmallText {...smallTextProps}>
                    {leftText}
                    {pageIndex + indexShift} 
                    {middleText} 
                    {pageLength}
                </SmallText>
            </Section>
        </Wrapper>
    );
};

const Section = styled.div`
    ${flex('row')};
`;
const Wrapper = styled.div`
    ${flex('column', 'center')};
`;