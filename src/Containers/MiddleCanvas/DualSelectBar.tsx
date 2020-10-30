import React, { useState } from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DualSelectBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string,
    rightSelectOption: string
};

interface OptionProps {
    isSelected?: boolean
};

export const DualSelectBar: React.FC<DualSelectBarProps> = ({
    leftSelectOption,
    rightSelectOption,
    ...props
}): React.ReactElement => {
    const [selectedOption, setSelectedOption] = useState(leftSelectOption);
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
    padding: 10px;
`;
const Option = styled.div<OptionProps>`
    margin: 5px;
    padding: 5px;
    ${({ isSelected }): string => `
        color: ${isSelected ? '#e70028' : '#b7b7b7'};
        border-bottom: ${isSelected ? 'solid 1px #e70028' : ''};
    `}
`;