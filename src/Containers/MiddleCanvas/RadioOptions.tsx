import React, { useState } from 'react';
import styled from 'styled-components'
import { Radio } from '../../Inputs/Radio';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface RadioOptionProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    title?: string,
    labels: string[],
    leftSelectOption: string,
    setLeftSelectOption: React.Dispatch<React.SetStateAction<string>>,
    rightSelectOption: string,
    setRightSelectOption: React.Dispatch<React.SetStateAction<string>>,
};

interface TextProps {
    isRightOption?: boolean;
}

export const RadioOptions: React.FC<RadioOptionProps> = ({
    title,
    labels,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <Text>
                { title }
            </Text> 
            <Options>
                {labels.map((label: string): React.ReactElement => (
                    <StyledRadio name="hello" label={label} />
                ))}
            </Options>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    padding: 5px 20px;
`;
const Text = styled.div<TextProps>`
    padding: 10px;
    font-size: 16px;
    ${({ isRightOption }): string => `
        color: ${isRightOption ? '#696969' : ''};
    `};
`;
const Options = styled.div`
    padding-left: 10px;
`;
const StyledRadio = styled(Radio)`
    margin: 5px;
`;