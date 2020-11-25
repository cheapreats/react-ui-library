import React, { useState, useCallback } from 'react';
import styled from 'styled-components'
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { IPrinterOptions } from './MiddleCanvasTypes';
import { RadioOptions } from './RadioOptions';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { scroll, media, transition, flex } from '../../Utils/Mixins';

export interface DualSelectRadioProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    caption?: string,
    leftPlaceholder?: string,
    rightPlaceholder?: string,
    headerSpacingStyle?: string,
    dualSelectOptions: IPrinterOptions
};

const FIRST_SELECT_OPTION = 0;
const SECOND_SELECT_OPTION = 1;
const FIRST_LABEL = 0;

export const DualSelectRadio: React.FC<DualSelectRadioProps> = ({
    caption = 'Dual Select',
    leftPlaceholder = 'Light/Sound',
    headerSpacingStyle = 'space-between',
    dualSelectOptions,
    ...props
}): React.ReactElement => {
    const selectOptionsObj = useCallback(() => Object.values(dualSelectOptions).map((selectOption): string => {
        return selectOption.labels[FIRST_LABEL];
    }), [dualSelectOptions]);
    const [selectOption, setSelectOption] = useState(selectOptionsObj);
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                        <Text isRightOption={true}>
                            {`${selectOption[FIRST_SELECT_OPTION]}/${selectOption[SECOND_SELECT_OPTION]}`}
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
                    {!!isCollapsed && Object.values(dualSelectOptions).map((printOption, index): React.ReactElement => (
                        <RadioOptions
                            title={printOption.title}
                            labels={printOption.labels} 
                            index={index}
                            selectOption={selectOption}
                            setSelectOption={setSelectOption}
                        /> 
                    ))}
                </SelectContainer>
            </SelectArea>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `};
    ${transition(['transform', 'background-color'])};
    ${media(
        'tablet',
        `
        width: 95%,
    `)};
    font-weight: bold;
    line-height: 1.25;
    margin-top: 3vh 0;
`;

const Header = styled.div`
    margin-bottom: 5px;
`;

const SelectArea = styled.div`
    ${scroll};
    width: 30%;
    ${media(
        'tablet',
        `
        width: 95%;
        padding-bottom: 5px;
    `)};
    border-radius: 8px;
    ${({ theme }): string => `
        background-color: ${theme.colors.border};
    `};
`;

interface RowProps {
    display?: string;
};
const Row = styled.div<RowProps>`
    ${({ display }): string | undefined =>
        display && flex(display)};
`;

interface TextProps {
    isRightOption?: boolean;
};
const Text = styled.div<TextProps>`
    padding: 12px 0 0 12px;
    ${({ theme, isRightOption }): string => `
        color: ${isRightOption ? theme.colors.text : ''};
    `};
`;
const Container = styled.div`
    ${flex('row')};
`;

interface IconProps {
    isCollapsed?: boolean;
};
const Icon = styled.svg<IconProps>`
    padding-top: 3px;
    ${transition(['transform'])}
    transform: rotate(${({ isCollapsed }): string => (isCollapsed ? '180deg' : '0')});
    height: 25px;
    margin: 5px 12px;
`;

interface SelectContainerProps {
    isVisible?: boolean;
};
const SelectContainer = styled.div<SelectContainerProps>`
    ${({ theme, isVisible }): string => `
        border: ${isVisible ? `solid 1px ${theme.colors.input.default}` : ''};
        background-color: ${isVisible ? theme.colors.background : ''};
    `}
    ${scroll};
    width: 30%;
    height: 180px;
    ${media(
        'tablet',
        `
        width: 90%;
        height: 250px;
    `)};
    border-radius: 8px;
    position: absolute;
`;