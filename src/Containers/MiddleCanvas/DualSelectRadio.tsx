import React, { useState } from 'react';
import styled from 'styled-components'
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { RadioOptions } from './RadioOptions';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DualSelectRadioProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    caption?: string,
    leftPlaceholder?: string,
    rightPlaceholder?: string,
    headerSpacingStyle?: string,
    dualSelectOptions: dualSelectOption
};

interface IconProps {
    isCollapsed?: boolean;
};

interface RowProps {
    display?: string;
};

interface TextProps {
    isRightOption?: boolean;
};

interface SelectContainerProps {
    isVisible?: boolean;
};

export interface dualSelectOption {
    [key: string]: {
        title: string,
        labels: string[]
    }
};

const FIRST_SELECT_OPTION = 0;

export const DualSelectRadio: React.FC<DualSelectRadioProps> = ({
    caption = 'Dual Select',
    leftPlaceholder = 'Light/Sound',
    headerSpacingStyle = 'space-between',
    dualSelectOptions,
    ...props
}): React.ReactElement => {
    const firstSelectOption = Object.values(dualSelectOptions)[FIRST_SELECT_OPTION].title;
    const [leftSelectOption, setLeftSelectOption] = useState('Flash Once');
    const [rightSelectOption, setRightSelectOption] = useState('Beep Once');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const dualSelectTitles = Object.values(dualSelectOptions).map(dualSelectOption => {
        return dualSelectOption.title;
    });

    const dualSelectLabels = Object.values(dualSelectOptions).map(dualSelectOption => {
        return dualSelectOption.labels;
    });

    return (
        <Wrapper {...props}>
            <Header>
                {caption}
            </Header>
            <SelectArea>
                <Row display={headerSpacingStyle}>
                    <Text>
                        {leftPlaceholder}
                    </Text>
                    <Container>
                        <Text isRightOption>
                            {`${leftSelectOption}/${rightSelectOption}`}
                        </Text>
                        <Icon
                            as={AngleDown}
                            isCollapsed={isCollapsed}
                            onClick={(): void => {
                                setIsCollapsed(!isCollapsed);
                            }}
                        />
                    </Container>
                </Row>
                <SelectContainer isVisible={isCollapsed}>
                    {!!isCollapsed && Object.values(dualSelectOptions).map((PrintOption, index): React.ReactElement => (
                        <RadioOptions
                            title={dualSelectTitles[index]}
                            labels={dualSelectLabels[index]} 
                            firstSelectOption={firstSelectOption}
                            setLeftSelectOption={setLeftSelectOption}
                            setRightSelectOption={setRightSelectOption}
                        /> 
                    ))}
                </SelectContainer>
            </SelectArea>
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
`;
const Header = styled.div`
    margin-bottom: 5px;
`;
const SelectArea = styled.div`
    width: 384px;
    height: 40px;
    border-radius: 8px;
    background-color: #f2f2f2;
`;
const Row = styled.div<RowProps>`
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
`;
const Text = styled.div<TextProps>`
    padding: 14px 0 0 12px;
    ${({ isRightOption }): string => `
        color: ${isRightOption ? '#696969' : ''};
    `};
`;
const Container = styled.div`
    ${Mixins.flex('row')};
`;
const Icon = styled.svg<IconProps>`
    padding-top: 3px;
    ${Mixins.transition(['transform'])}
    transform: rotate(${({ isCollapsed }): string => (isCollapsed ? '180deg' : '0')});
    height: 25px;
    margin: 5px 12px;
`;
const SelectContainer = styled.div<SelectContainerProps>`
    ${({ isVisible }): string => `
        border: ${isVisible ? 'solid 1px #f2f2f2' : ''};
        background-color: ${isVisible ? '#ffffff' : ''};
    `}
    width: 208px;
    height: 248px;
    border-radius: 8px;
    float: right;
`;