import React from 'react';
import styled from 'styled-components';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { Mixins } from '../../Utils';
import { useListContext } from './ListContext';

const LIST_TOGGLE_ICON = AngleRight;

export const ListToggle: React.FC = (): React.ReactElement => {
    const [show, setShow]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>,
    ] = useListContext();

    const toggleList = (): void => {
        setShow((_show): boolean => !_show);
    };

    return (
        <Button onClick={toggleList} id="togg-button">
            <Icon show={show} />
        </Button>
    );
};

interface IconProps {
    show: boolean;
}

const Button = styled.button`
    ${Mixins.position('absolute', 0, '20px', '-28px', 'auto', 'auto')}
    ${Mixins.transition(['background-color'])}
    ${Mixins.clickable('#ffffff', 0.04)}
    ${({ theme }): string => `
        box-shadow: ${theme.depth[1]};
    `}
    border-radius: 0 999px 999px 0;
    background-color: white;
    box-sizing: border-box;
    padding-left: 12px;
    display: none;
    outline: none;
    border: none;
    height: 60px;
    width: 40px;
    z-index: -1;

    ${Mixins.media(
        'tablet',
        `
        ${Mixins.flex('center')}
    `,
    )}
`;

const Icon = styled(LIST_TOGGLE_ICON)<IconProps>`
    ${Mixins.transition(['transform'])}
    transform: rotate(${({ show }): string => (show ? '180deg' : '0')});
    height: 22px;
`;
