import React, { useCallback } from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DualSelectBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string,
    rightSelectOption: string,
    selectedOption: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
};

export const DualSelectBar: React.FC<DualSelectBarProps> = ({
    leftSelectOption,
    rightSelectOption,
    selectedOption,
    setSelectedOption,
    ...props
}): React.ReactElement => {
    const getOptionFields = useCallback((field: string) => {
        return ({
            isSelected: selectedOption === field,
            onClick: () => setSelectedOption(field)
        });
    }, [selectedOption]);
    
    return (
        <Wrapper {...props}>
            <Option 
                isSelected={getOptionFields(leftSelectOption).isSelected}
                onClick={getOptionFields(leftSelectOption).onClick}
            >
                { leftSelectOption }
            </Option>
            <Divider />
            <Option 
                isSelected={getOptionFields(rightSelectOption).isSelected}
                onClick={getOptionFields(rightSelectOption).onClick}
            >
                { rightSelectOption }
            </Option>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    ${({ theme }): string | undefined => `
        font-size: ${theme.font.size.small};
    `};
    font-weight: bold;
    line-height: 1.25;
    width: 364px;
    margin: 5px;
    padding-bottom: 10px;
    ${Mixins.flex('center')};
`;

interface OptionProps {
    isSelected?: boolean
};
const Option = styled.div<OptionProps>`
    margin: 5px;
    padding: 5px;
    ${({ theme, isSelected }): string | undefined => `
        color: ${isSelected ? theme.colors.primary : theme.colors.border};
        border-bottom: ${isSelected ? `solid 1px ${theme.colors.primary}` : ''};
    `}
`;

const Divider = styled.div`
    ${({ theme }): string | undefined => `
        border: 1px solid ${theme.colors.text};
    `};
    height: 10px;
`;