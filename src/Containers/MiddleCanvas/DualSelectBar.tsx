import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';


export interface DualSelectBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string,
    rightSelectOption: string,
    selectedOption: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
};

interface OptionProps {
    isSelected?: boolean
};

const IS_SELECTED_COLOR = '#e70028';
const UNSELECTED_COLOR = '#b7b7b7';

export const DualSelectBar: React.FC<DualSelectBarProps> = ({
    leftSelectOption,
    rightSelectOption,
    selectedOption,
    setSelectedOption,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <Option 
                isSelected={selectedOption === leftSelectOption}
                onClick={() => setSelectedOption(leftSelectOption)}
            >
                { leftSelectOption }
            </Option>
            <Option> | </Option>
            <Option 
                isSelected={selectedOption === rightSelectOption}
                onClick={() => setSelectedOption(rightSelectOption)}
            >
                { rightSelectOption }
            </Option>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    display: flex;
    justify-content: center;
    width: 364px;
    margin: 5px;
    padding-bottom: 10px;
`;
const Option = styled.div<OptionProps>`
    margin: 5px;
    padding: 5px;
    ${({ isSelected }): string => `
        color: ${isSelected ? IS_SELECTED_COLOR : UNSELECTED_COLOR};
        border-bottom: ${isSelected ? `solid 1px ${IS_SELECTED_COLOR}` : ''};
    `}
`;