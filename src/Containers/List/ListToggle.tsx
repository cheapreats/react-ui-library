import React from 'react';
import styled from 'styled-components';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { AngleLeft } from '@styled-icons/fa-solid/AngleLeft';
import { Mixins } from '../../Utils';

const LIST_TOGGLE_RIGHT = AngleRight;
const LIST_TOGGLE_LEFT = AngleLeft;

interface ListToggleProps extends ButtonProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isToggleHiddenDesktop?: boolean;
}

export const ListToggle: React.FC<ListToggleProps> = ({
    isOpen,
    setIsOpen,
    isLeftToggle,
    isToggleHiddenDesktop,
}): React.ReactElement => {
    const toggleList = (): void => {
        setIsOpen(!isOpen);
    };
    return (
        <Button
            onClick={toggleList}
            id="togg-button"
            isLeftToggle={isLeftToggle}
            isToggleHiddenDesktop={isToggleHiddenDesktop}
        >
            <Icon
                show={isOpen}
                as={isLeftToggle ? LIST_TOGGLE_LEFT : LIST_TOGGLE_RIGHT}
            />
        </Button>
    );
};

interface IconProps {
    show: boolean;
}

interface ButtonProps {
    isLeftToggle?: boolean;
    isToggleHiddenDesktop?: boolean;
}

const Button = styled.button<ButtonProps>`
    ${Mixins.transition(['background-color'])}
    ${Mixins.clickable('#ffffff', 0.05)}
    ${({ theme, isLeftToggle, isToggleHiddenDesktop }): string => `
        box-shadow: ${theme.depth[1]};
        border-radius: ${
            isLeftToggle ? '0 9999px 9999px 0' : '9999px 0 0 9999px'
        };
    ${isToggleHiddenDesktop && 'display: none;'}
        ${Mixins.position(
            'absolute',
            0,
            '20px',
            isLeftToggle ? '-32px' : 'auto',
            'auto',
            isLeftToggle ? 'auto' : '-32px',
        )}    
    `}
    ${Mixins.media(
        `tablet`,
        `
            display: inline;
        `,
    )}
    z-index:-1;
    background-color: white;
    box-sizing: border-box;
    padding: 12px;
    outline: none;
    border: none;
    height: 60px;
    width: 40px;
`;

const Icon = styled.svg<IconProps>`
    ${Mixins.transition(['transform'])}
    transform: rotate(${({ show }): string => (show ? '0' : '180deg')});
    height: 22px;
`;
