import React from 'react';
import styled from 'styled-components';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { AngleLeft } from '@styled-icons/fa-solid/AngleLeft';
import { Mixins } from '../../Utils';

const LIST_TOGGLE_RIGHT = AngleRight;
const LIST_TOGGLE_LEFT = AngleLeft;

interface ListToggleProps extends ButtonProps {
    isToggled: boolean;
    setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListToggle: React.FC<ListToggleProps> = ({
    isToggled,
    setIsToggled,
    isLeftToggle,
}): React.ReactElement => {
    const toggleList = (): void => {
        setIsToggled(!isToggled);
    };
    return (
        <Button
            onClick={toggleList}
            id="togg-button"
            isLeftToggle={isLeftToggle}
        >
            <Icon
                show={isToggled}
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
}

const Button = styled.button<ButtonProps>`
    ${Mixins.transition(['background-color'])}
    ${Mixins.clickable('#ffffff', 0.04)}
    ${({ theme, isLeftToggle }): string => `
        box-shadow: ${theme.depth[1]};
        border-radius: ${
            isLeftToggle ? '0 9999px 9999px 0' : '9999px 0 0 9999px'
        };
        ${Mixins.position(
            'absolute',
            0,
            '20px',
            isLeftToggle ? '-32px' : 'auto',
            'auto',
            isLeftToggle ? 'auto' : '-32px',
        )}
    `}
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
    transform: rotate(${({ show }): string => (show ? '180deg' : '0')});
    height: 22px;
`;
