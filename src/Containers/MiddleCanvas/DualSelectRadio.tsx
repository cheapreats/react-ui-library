import React, { useState } from 'react';
import styled from 'styled-components'
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { IPrinterOptions } from './MiddleCanvasTypes';
import { RadioOptions } from './RadioOptions';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

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
    const firstSelectOption = Object.values(dualSelectOptions)[FIRST_SELECT_OPTION].title;
    const [leftSelectOption, setLeftSelectOption] = useState(Object.values(dualSelectOptions)[FIRST_SELECT_OPTION].labels[FIRST_LABEL]);
    const [rightSelectOption, setRightSelectOption] = useState(Object.values(dualSelectOptions)[SECOND_SELECT_OPTION].labels[FIRST_LABEL]);
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
                    {!!isCollapsed && Object.values(dualSelectOptions).map((printOption): React.ReactElement => (
                        <RadioOptions
                            title={printOption.title}
                            labels={printOption.labels} 
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
    ${({ theme }): string | undefined => `
        font-size: ${theme.font.size.small};
    `};
    ${Mixins.transition(['transform', 'background-color', 'opacity'])}
    font-weight: bold;
    line-height: 1.25;
    margin-top: 3vh 0;
`;

const Header = styled.div`
    margin-bottom: 5px;
`;

const SelectArea = styled.div`
    width: 384px;
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
        display && Mixins.flex(display)};
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
    ${Mixins.flex('row')};
`;

interface IconProps {
    isCollapsed?: boolean;
};
const Icon = styled.svg<IconProps>`
    padding-top: 3px;
    ${Mixins.transition(['transform'])}
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
    width: 384px;
    height: 190px;
    border-radius: 8px;
    position: absolute;
`;