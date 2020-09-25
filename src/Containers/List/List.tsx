import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';
import { Responsive, Main } from '../../Utils/BaseStyles';
import { Loading } from '../Loading';
import { ListToggle } from './ListToggle';
import { PositionArgs, WrapperPos, SideBarCollapseType } from './constants';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    loading: boolean;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    id: string;
    columnWidth?: string;
    isToggleable?: boolean;
    toggleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    direction: SideBarCollapseType;
}

export const List: React.FC<ListProps> = ({
    loading,
    children,
    header,
    footer,
    columnWidth = '280px',
    isToggleable,
    toggleState,
    direction,
    id,
    ...props
}): React.ReactElement => {
    const [isToggled, setIsToggled] = toggleState;
    useEffect((): void | (() => void | undefined) => {
        const handler = ({ type }: { type: string }): void => {
            switch (type) {
                case 'swipeRight':
                    setIsToggled(true);
                    break;
                case 'swipeLeft':
                    setIsToggled(false);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('swipeRight', handler);
        window.addEventListener('swipeLeft', handler);
        return (): void => {
            window.removeEventListener('swipeRight', handler);
            window.removeEventListener('swipeLeft', handler);
        };
    }, []);

    return (
        <Wrapper
            isToggled={isToggled}
            positionArgs={WrapperPos[direction].wrapper}
            translation={WrapperPos[direction].translation}
            isToggleable={isToggleable}
        >
            <Container columnWidth={columnWidth} id={id} {...props}>
                {header}
                <Items>{loading ? <Loading /> : children}</Items>
                {footer}
            </Container>
            {isToggleable && (
                <ListToggle
                    toggleState={[isToggled, setIsToggled]}
                    positionArgs={WrapperPos[direction].toggle}
                    isLeft={WrapperPos[direction].isLeft}
                />
            )}
        </Wrapper>
    );
};

interface WrapperProps {
    isToggled: boolean;
    positionArgs: PositionArgs;
    isToggleable?: boolean;
    translation: string;
}

interface ColumnProps {
    columnWidth: string;
}

const Wrapper = styled.div<WrapperProps>`
    ${Mixins.flex()}
    ${Mixins.transition(['transform'])} 
    position: relative;
    z-index: 99;
    height: 100%;
    ${({ isToggled, positionArgs, isToggleable, translation }): string => `
        ${Mixins.position(
            positionArgs.value,
            positionArgs.margin,
            positionArgs.top,
            positionArgs.right,
            positionArgs.bottom,
            positionArgs.left,
        )}
        ${
            isToggleable &&
            `
            transform: translateX(${isToggled ? '0' : translation});
        `
        }
    `}
`;

const Container = styled.div<ColumnProps>`
    ${Mixins.flex('column')}
    background-color: white;
    flex-shrink: 0;
    flex-grow: 1;
    z-index: 1;
    ${({ theme, columnWidth }): string => `
        box-shadow: ${theme.depth[1]};
        width: ${columnWidth};
        ${Responsive}
        ${Main}
    `}
`;

const Items = styled.ul`
    ${Mixins.scroll}
    ${({ theme }): string => `
        border-top: 2px solid ${theme.colors.text}20;
        border-bottom: 2px solid ${theme.colors.text}20;
    `}
    list-style-type: none;
    overflow: auto;
    padding: 0;
    margin: 0;
`;
