import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { Tab, TabList } from 'react-tabs';
import { StyledIcon } from '@styled-icons/styled-icon';

const MOVING_DIV_ANIMATION_TIME = 250;

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
    const [currButton, setCurrButton] = useState(0);

    const switchRef = useRef<HTMLDivElement>(null);
    const lastRect = useRef<DOMRect>();
    const buttonsRef = useRef<Tab[]>([]);

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
                    key={`button_${index}`}
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

interface IThemeSwitchContainer {
    backgroundColor: string;
}

const ThemeSwitchContainer = styled.div<IThemeSwitchContainer>`
    padding: 10px;
    overflow: auto;
    &::-webkit-scrollbar {
        background-color: transparent;
    }

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

    ${({ backgroundColor }): string => `background-color: ${backgroundColor};`}
`;

interface IHeader {
    color: string;
}

const Header = styled.div<IHeader>`
    margin: 1em;
    ${({ color }): string => `color: ${color};`}
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

    ${({ backgroundColor }): string => `background-color: ${backgroundColor};`}
`;
