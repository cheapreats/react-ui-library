import React, { useState, useEffect } from 'react';
import styled, { DefaultTheme, InterpolationFunction } from 'styled-components';
import { Mixins } from '../../Utils';
import { Responsive, Main } from '../../Utils/BaseStyles';
import { Loading } from '../Loading';
import { ListStateContext, ListDispatchContext } from './ListContext';
import { ListToggle } from './ListToggle';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    loading: boolean;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    stickyTopContent?: React.ReactElement;
    id: string;
    columnWidth?: string;
}

export const List: React.FC<ListProps> = ({
    loading,
    children,
    header,
    footer,
    columnWidth = '280px',
    id,
    ...props
}): React.ReactElement => {
    const [show, setShow] = useState(false);

    useEffect((): void | (() => void | undefined) => {
        const handler = ({ type }: { type: string }): void => {
            switch (type) {
                case 'swipeRight':
                    setShow(true);
                    break;
                case 'swipeLeft':
                    setShow(false);
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
        <ListStateContext.Provider value={show}>
            <ListDispatchContext.Provider value={setShow}>
                <Wrapper show={show}>
                    <Container {...props} columnWidth={columnWidth} id={id}>
                        {header}
                        <Items>{loading ? <Loading /> : children}</Items>
                        {footer}
                    </Container>
                    <ListToggle />
                </Wrapper>
            </ListDispatchContext.Provider>
        </ListStateContext.Provider>
    );
};

interface WrapperProps {
    show: boolean;
}

interface ColumnProps {
    columnWidth: string;
}

const Wrapper = styled.div<WrapperProps>`
    ${Mixins.flex()}
    position: relative;
    z-index: 1;
    height: 100%;
    ${({ show }): string | InterpolationFunction<{ theme: DefaultTheme }> =>
        Mixins.media(
            'tablet',
            `
        ${Mixins.transition(['transform'])}
        ${Mixins.position('absolute', 'auto', 0, 'auto', 0, '70px')}
        transform: translateX(${show ? '0' : '-100%'});
    `,
        )}
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
