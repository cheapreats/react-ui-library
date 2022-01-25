import React, { useLayoutEffect, useRef, useState } from 'react';
import { flex } from '@Utils/Mixins';
import { Tab, TabList } from 'react-tabs';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';

const MOVING_DIV_ANIMATION_TIME = 250;
const COLORS_TRANSITION_DURATION = 0.5;

interface IDataObject {
    buttonName: string;
    icon: StyledIcon;
    themeSwitchBackgroundColor: string;
    headerColor: string;
    buttonsRowColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    movingDivColor: string;
}

export interface IThemeSwitch {
    heading: string;
    DataItems: IDataObject[];
    onButtonClick: (index: number) => void;
}

export const ThemeSwitch: React.FC<IThemeSwitch> = ({
    heading = 'Theme',
    DataItems,
    onButtonClick,
}): React.ReactElement => {
    const switchRef = useRef<HTMLDivElement>(null);
    const lastRect = useRef<DOMRect>();
    const buttonsRef = useRef<Tab[]>([]);

    const [currButton, setCurrButton] = useState(0);

    /**
     * This function returns an array of button elements. The array fills by mapping DataItems array.
     * Each button element displays the text and icon, provided by DataItems.
     */
    const getButtons = (): React.ReactElement[] => {
        const onClick = (buttonIndex: number) => {
            if (buttonIndex !== currButton) {
                setCurrButton(buttonIndex);
            }
            onButtonClick(buttonIndex);
        };

        return DataItems.map(
            (buttonData, index): React.ReactElement => (
                <Button
                    ref={(button) => {
                        if (button) buttonsRef.current.push(button);
                    }}
                    key={`${buttonData.buttonName}_button`}
                    textColor={DataItems[currButton].buttonTextColor}
                    backgroundColor={
                        DataItems[currButton].buttonBackgroundColor
                    }
                    onClick={() => onClick(index)}
                >
                    {currButton === index && (
                        <MovingDiv
                            ref={switchRef}
                            backgroundColor={
                                DataItems[currButton].movingDivColor
                            }
                        />
                    )}
                    <Icon as={DataItems[index].icon} />
                    <ButtonText>{buttonData.buttonName}</ButtonText>
                </Button>
            ),
        );
    };

    /**
     * Sets the width and height for <MovingDiv/> element based on size of selected button.
     */
    const setMovingDivSize = () => {
        // @ts-ignore
        const width = buttonsRef.current[currButton].node.clientWidth;
        // @ts-ignore
        const height = buttonsRef.current[currButton].node.clientHeight;

        if (switchRef.current) {
            switchRef.current.style.width = `${width}px`;
            switchRef.current.style.height = `${height}px`;
        }
    };

    useLayoutEffect(() => {
        setMovingDivSize();

        if (switchRef.current)
            lastRect.current = switchRef.current.getBoundingClientRect();
    }, []);

    useLayoutEffect(() => {
        setMovingDivSize();

        const nextRect = switchRef.current?.getBoundingClientRect();
        if (nextRect && lastRect.current) {
            const translateX = nextRect.x - lastRect.current.x;

            lastRect.current = nextRect;

            switchRef.current?.animate(
                [
                    {
                        transform: `translateX(${-translateX}px) scale(1)`,
                    },
                    {
                        transform: `translateX(0px) scale(1)`,
                    },
                ],
                MOVING_DIV_ANIMATION_TIME,
            );
        }
    }, [switchRef.current]);

    return (
        <ThemeSwitchContainer
            backgroundColor={DataItems[currButton].themeSwitchBackgroundColor}
        >
            <Header color={DataItems[currButton].headerColor}>
                {heading}
            </Header>
            <ButtonsRow backgroundColor={DataItems[currButton].buttonsRowColor}>
                {getButtons()}
            </ButtonsRow>
        </ThemeSwitchContainer>
    );
};

const transitionStyles = {
    transitionDuration: COLORS_TRANSITION_DURATION + "s;",
    transitionProperty: "background-color, color;"
}

interface IThemeSwitchContainer {
    backgroundColor: string;
}

const ThemeSwitchContainer = styled.div<IThemeSwitchContainer>`
    padding: 10px;
    overflow: auto;
    &::-webkit-scrollbar {
        background-color: transparent;
    }

    ${transitionStyles};
    ${({ backgroundColor }): string => `background-color: ${backgroundColor};`}
`;

const Icon = styled.svg`
    height: 1.2em;
    width: 1.2em;
    margin-right: 5px;
`;

const ButtonText = styled.span``;

interface IButtonsRow {
    backgroundColor: string;
}

const ButtonsRow = styled(TabList)<IButtonsRow>`
    position: relative;
    ${flex()};
    width: fit-content;
    padding: 5px;
    border-radius: 10px;

    ${ transitionStyles };
    ${({ backgroundColor }): string => `background-color: ${backgroundColor};`}
`;

interface IHeader {
    color: string;
}

const Header = styled.div<IHeader>`
    margin: 1em;
    ${({ color }): string => `color: ${color};`}
    ${ transitionStyles };
`;

interface IButton {
    textColor: string;
    backgroundColor: string;
}

const Button = styled(Tab)<IButton>`
    outline: none;
    position: relative;
    ${flex('row', 'center')};
    text-align: center;
    padding: 0.2rem 1rem;
    font-weight: bold;
    cursor: pointer;
    margin: 0;
    border-radius: 10px;

    ${ transitionStyles };
    ${({ backgroundColor, textColor }): string => `background-color: ${backgroundColor};
            color: ${textColor};`}
`;

interface IMovingDiv {
    backgroundColor: string;
}

const MovingDiv = styled.div<IMovingDiv>`
    ${flex('row', 'center')};
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    mix-blend-mode: difference;
  
    ${ transitionStyles };
    ${({ backgroundColor }): string => `background-color: ${backgroundColor};`};
`;
