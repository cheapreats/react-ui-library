import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { IPrinterOptions } from './MiddleCanvasTypes';
import { RadioOptions } from './RadioOptions';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { scroll, media, transition, flex } from '../../Utils/Mixins';

export interface DualSelectRadioProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    caption?: string;
    leftPlaceholder?: string;
    rightPlaceholder?: string;
    headerSpacingStyle?: string;
    dualSelectOptions: IPrinterOptions;
}

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
    const selectOptionsObj = useCallback(
        () =>
            Object.values(dualSelectOptions).map(
                (selectOption): string => selectOption.labels[FIRST_LABEL],
            ),
        [dualSelectOptions],
    );
    const [selectOption, setSelectOption] = useState(selectOptionsObj);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Wrapper {...props}>
            <Header>{caption}</Header>
            <SelectArea>
                <Row display={headerSpacingStyle}>
                    <Text>{leftPlaceholder}</Text>
                    <Container>
                        <Text isRightOption>
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
            </SelectArea>
            <SelectContainer isVisible={isCollapsed}>
                {!!isCollapsed &&
                    Object.values(dualSelectOptions).map(
                        (printOption, index): React.ReactElement => (
                            <RadioOptions
                                key={printOption.title}
                                title={printOption.title}
                                labels={printOption.labels}
                                index={index}
                                selectOption={selectOption}
                                setSelectOption={setSelectOption}
                            />
                        ),
                    )}
            </SelectContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `};
    ${transition(['height'], '3s')};
    ${media(
        'tablet',
        `
        width: 95%,
    `,
    )};
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
    `,
    )};
    ${media(
        'phone',
        `
        width: 100%;
    `,
    )};
    ${({ theme }): string => `
        background-color: ${theme.colors.border};
    `};
    border-radius: 8px;
    padding-bottom: 10px;
`;

interface RowProps {
    display?: string;
}
const Row = styled.div<RowProps>`
    ${({ display }): string | undefined => display && flex(display)};
`;

interface TextProps {
    isRightOption?: boolean;
}
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
}
const Icon = styled.svg<IconProps>`
    padding-top: 3px;
    ${transition(['transform'])}
    transform: rotate(${({ isCollapsed }): string =>
        isCollapsed ? '180deg' : '0'});
    height: 25px;
    margin: 5px 12px;
`;

interface SelectContainerProps {
    isVisible?: boolean;
}
const SelectContainer = styled.div<SelectContainerProps>`
    ${scroll};
    width: 29%;
    ${media(
        'tablet',
        `
            width: 95%
        `,
    )};
    ${({ theme, isVisible }): string | false | undefined =>
        isVisible &&
        `
        border: 1px solid ${theme.colors.input.default};
        background-color: ${theme.colors.background};
    `}
    border-radius: 8px;
    position: absolute;
`;
