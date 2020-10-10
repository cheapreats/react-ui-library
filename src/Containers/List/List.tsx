import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';
import { Responsive, Main } from '../../Utils/BaseStyles';
import { Loading } from '../Loading';
import { ListToggle } from './ListToggle';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    loading: boolean;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    id: string;
    columnWidth?: string;
    backgroundColor?: string;
    margin?: string;
    right?: string;
    left?: string;
    onToggleTranslateXAxis?: string;
    cssPosition?: string;
    isToggleable?: boolean;
    isLeftToggle?: boolean;
    isToggled: boolean;
    setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const List: React.FC<ListProps> = ({
    loading,
    children,
    header,
    footer,
    columnWidth = '280px',
    backgroundColor = 'white',
    isToggleable,
    isToggled,
    setIsToggled,
    isLeftToggle,
    id,
    ...props
}): React.ReactElement => {
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
        <Wrapper isToggled={isToggled} {...props}>
            <Container 
                columnWidth={columnWidth} 
                backgroundColor={backgroundColor} 
                id={id}
            >
                {header}
                <Items>{loading ? <Loading /> : children}</Items>
                {footer}
            </Container>
            {isToggleable && (
                <ListToggle
                    isToggled={isToggled}
                    setIsToggled={setIsToggled}
                    isLeftToggle={isLeftToggle}
                />
            )}
        </Wrapper>
    );
};

interface WrapperProps {
    isToggled: boolean;
    columnWidth?: string;
    margin?: string;
    right?: string;
    left?: string;
    cssPosition?: string;
    onToggleTranslateXAxis?: string;
}

interface ColumnProps {
    columnWidth: string;
    backgroundColor: string;
}

const Wrapper = styled.div<WrapperProps>`
    ${Mixins.flex()}
    ${Mixins.transition(['transform'])} 
    z-index: 99;
    height: 100%;
    ${({
        isToggled,
        onToggleTranslateXAxis,
        columnWidth,
        margin,
        right,
        left,
        cssPosition,
    }): string => `
        transform: translateX(${isToggled ? onToggleTranslateXAxis : '0'});
        width: ${columnWidth};
        ${Mixins.position(cssPosition, margin, 0, right, 0, left)}        
    `}
`;

const Container = styled.div<ColumnProps>`
    ${Mixins.flex('column')}
    ${({ backgroundColor }): string => `
        background-color: ${backgroundColor};
    `}
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
    list-style-type: none;
    overflow: auto;
    padding: 0;
    margin: 0;
`;
