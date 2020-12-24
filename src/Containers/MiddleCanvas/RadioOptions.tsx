import React, { useState } from 'react';
import styled from 'styled-components';
import { Radio } from '../../Inputs/Radio/Radio';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface RadioOptionProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    labels: string[];
    index: number;
    selectOption: string[];
    setSelectOption: React.Dispatch<React.SetStateAction<string[]>>;
}

const DEFAULT_SELECTED = 0;

export const RadioOptions: React.FC<RadioOptionProps> = ({
    title,
    labels,
    index,
    selectOption,
    setSelectOption,
    ...props
}): React.ReactElement => {
    const [checkedOption, setCheckedOption] = useState(
        labels[DEFAULT_SELECTED],
    );

    const setNewSelectOrder = (label: string) => {
        const newSelectOrder = [...selectOption];
        newSelectOrder[index] = label;
        setSelectOption(newSelectOrder);
    };

    return (
        <Wrapper {...props}>
            <Text>{title}</Text>
            <Options>
                {labels.map(
                    (label: string): React.ReactElement => (
                        <StyledRadio
                            key={title}
                            name={title}
                            label={label}
                            value={checkedOption === label}
                            onChange={() => {
                                setCheckedOption(label);
                                setNewSelectOrder(label);
                            }}
                        />
                    ),
                )}
            </Options>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    font-weight: bold;
    padding: 5px 20px;
`;
const Text = styled.div`
    padding: 10px;
    ${({ theme }): string => `
        font-size: ${theme.font.size.default};
    `};
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
