import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { scroll, media, flex } from '../../Utils/Mixins';

export interface DualSelectBarProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string;
    rightSelectOption: string;
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export const DualSelectBar: React.FC<DualSelectBarProps> = ({
    leftSelectOption,
    rightSelectOption,
    selectedOption,
    setSelectedOption,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Option
            isSelected={selectedOption === leftSelectOption}
            onClick={() => setSelectedOption(leftSelectOption)}
        >
            {leftSelectOption}
        </Option>
        <Divider />
        <Option
            isSelected={selectedOption === rightSelectOption}
            onClick={() => setSelectedOption(rightSelectOption)}
        >
            {rightSelectOption}
        </Option>
    </Wrapper>
);

const Wrapper = styled.div`
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `};
    ${flex('center')};
    ${scroll};
    width: 30%;
    ${media(
        'tablet',
        `
        width: 100%
    `,
    )};
    font-weight: bold;
    line-height: 1.25;
    margin: 5px;
    padding-bottom: 10px;
`;

interface OptionProps {
    isSelected?: boolean;
}
const Option = styled.div<OptionProps>`
    margin: 5px;
    padding: 5px;
    ${({ theme, isSelected }): string => `
        color: ${isSelected ? theme.colors.primary : theme.colors.text};
        border-bottom: ${isSelected ? `solid 1px ${theme.colors.primary}` : ''};
    `}
`;

const Divider = styled.div`
    ${({ theme }): string => `
        border: 1px solid ${theme.colors.text};
    `};
    height: 10px;
`;
