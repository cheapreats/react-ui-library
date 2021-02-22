import React from 'react';
import styled from 'styled-components';
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { Button, ButtonProps } from '../../Inputs/Button/Button';
import { SmallText, SmallTextProps } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IPageSelectorProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToPage: (pageNumber: number) => void;
    pageCount: number;
    buttonProps?: ButtonProps;
    pageIndex: number;
    smallTextProps?: SmallTextProps;
}
const ONLY_ONE_PAGE = 1;
const INDEX_SHIFT = 1;
const LEFT_TEXT = 'Page ';
const MIDDLE_TEXT = ' out of ';

export const PageSelector: React.FC<IPageSelectorProps> = ({
    goToPreviousPage,
    goToNextPage,
    goToPage,
    pageCount,
    pageIndex,
    buttonProps,
    smallTextProps,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        {pageCount > ONLY_ONE_PAGE && (
            <Section>
                <PageChangeButton
                    icon={LeftArrowAlt}
                    onClick={() => goToPreviousPage()}
                    primary
                    {...buttonProps}
                />
                <ResponsiveButtonsContainer
                    repeatAmount={Math.floor(pageCount / 2)}
                >
                    {Array(pageCount)
                        .fill(0)
                        .map((fill, index) => (
                            <SButton
                                key={`Page${fill}`}
                                isActive={pageIndex === index}
                                onClick={() => goToPage(index)}
                                primary
                                {...buttonProps}
                            >
                                {index + INDEX_SHIFT}
                            </SButton>
                        ))}
                </ResponsiveButtonsContainer>
                <PageChangeButton
                    icon={RightArrowAlt}
                    onClick={() => goToNextPage()}
                    primary
                    {...buttonProps}
                />
            </Section>
        )}
        <SmallText {...smallTextProps}>
            {LEFT_TEXT}
            {pageIndex + INDEX_SHIFT}
            {MIDDLE_TEXT}
            {pageCount}
        </SmallText>
    </Wrapper>
);

interface IResponsiveButtonsProps {
    repeatAmount?: number;
}

const ResponsiveButtonsContainer = styled.div<IResponsiveButtonsProps>`
    ${flex('row')}
    ${media(
        'phone',
        `
        display: grid;
    `,
    )}
    ${({ repeatAmount }) => `
        grid-template-columns: repeat(${repeatAmount}, 1fr);
        grid-template-rows: repeat(${repeatAmount}, 1fr);
    `}
`;

const Section = styled.div`
    ${flex('row', 'center')};
`;
const Wrapper = styled.div`
    ${flex('column', 'center')};
`;

const PageChangeButton = styled(Button)`
    ${media(
        'phone',
        `
        padding: 20px 10px;
    `,
    )}
`;

interface ISButtonProps {
    isActive?: boolean;
}
const SButton = styled(Button)<ISButtonProps>`
    ${({ theme, isActive }) =>
        !isActive &&
        ` 
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
    `};
`;
