import React from 'react';
import styled from 'styled-components';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { AngleLeft } from '@styled-icons/fa-solid/AngleLeft';
import { PositionArgs } from './constants';
import { Mixins } from '../../Utils';

const LIST_TOGGLE_RIGHT = AngleRight;
const LIST_TOGGLE_LEFT = AngleLeft;

interface ListToggleProps extends ButtonProps {
    toggleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const ListToggle: React.FC<ListToggleProps> = ({
    toggleState,
    positionArgs,
    isLeft,
}): React.ReactElement => {
    const [show, setShow]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>,
    ] = toggleState;

    const toggleList = (): void => {
        setShow((_show): boolean => !_show);
    };

    return (
        <Button
            onClick={toggleList}
            id="togg-button"
            positionArgs={positionArgs}
            isLeft={isLeft}
        >
            <Icon
                show={show}
                as={isLeft ? LIST_TOGGLE_RIGHT : LIST_TOGGLE_LEFT}
            />
        </Button>
    );
};

interface IconProps {
    show: boolean;
}

interface ButtonProps {
    positionArgs: PositionArgs;
    isLeft: boolean;
}

const Button = styled.button<ButtonProps>`
    ${Mixins.transition(['background-color'])}
    ${Mixins.clickable('#ffffff', 0.04)}
    ${({ theme, positionArgs, isLeft }): string => `
        box-shadow: ${theme.depth[1]};
        border-radius: ${isLeft ? '0 9999px 9999px 0' : '9999px 0 0 9999px'};
        ${Mixins.position(
            positionArgs.value,
            positionArgs.margin,
            positionArgs.top,
            positionArgs.right,
            positionArgs.bottom,
            positionArgs.left,
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
