import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SelectOptionsEnum } from './MiddleCanvasTypes';
import { Radio } from '../../Inputs/Radio';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface RadioOptionProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    title?: string,
    labels: string[],
    setLeftSelectOption: React.Dispatch<React.SetStateAction<SelectOptionsEnum>>,
    setRightSelectOption: React.Dispatch<React.SetStateAction<SelectOptionsEnum>>,
    firstSelectOption: string
};

const DEFAULT_SELECTED = 0;

export const RadioOptions: React.FC<RadioOptionProps> = ({
    title,
    labels,
    setLeftSelectOption,
    setRightSelectOption,
    firstSelectOption,
    ...props
}): React.ReactElement => {
    const [checkedOption, setCheckedOption] = useState(labels[DEFAULT_SELECTED]);

    useEffect((): void => {
        if(title === firstSelectOption) {
            setLeftSelectOption(SelectOptionsEnum.leftSelectOption);
        } else {
            setRightSelectOption(SelectOptionsEnum.rightSelectOption);
        }
    }, [checkedOption]);

    return (
        <Wrapper {...props}>
            <Text>
                { title }
            </Text> 
            <Options>
                {labels.map((label: string): React.ReactElement => (
                    <StyledRadio 
                        name={title} 
                        label={label}
                        value={checkedOption === label}
                        onChange={() => setCheckedOption(label)}
                    />
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
const Text = styled.div`
    padding: 10px;
    font-size: 16px;
`;
const Options = styled.div`
    padding-left: 10px;
`;
const StyledRadio = styled(Radio)`
    margin: 5px;
    ${({ theme }): string => `
        color: ${theme.colors.text};
    `};
`;