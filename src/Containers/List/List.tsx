import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';
import { Main, Responsive } from '../../Utils/BaseStyles';
import { Loading } from '../Loading/Loading';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    toggleComponent?: React.ReactElement;
    id: string;
    columnWidth?: string;
    backgroundColor?: string;
    margin?: string;
    right?: string;
    left?: string;
    onCloseTranslateXAxis?: string;
    cssPosition?: string;
    isOpen?: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    zIndex?: number;
    mediaMixin?: string;
    mediaMargin?: string;
    mediaRight?: string;
    mediaLeft?: string;
    mediaCssPosition?: string;
    mediaOnCloseTranslateXAxis?: string;
}

export const List: React.FC<ListProps> = ({
    loading = false,
    children,
    header,
    footer,
    columnWidth = '280px',
    backgroundColor = 'white',
    isOpen = true,
    setIsOpen,
    toggleComponent,
    id,
    ...props
}): React.ReactElement => {
    useEffect((): void | (() => void | undefined) => {
        const handler = ({ type }: { type: string }): void => {
            if (setIsOpen) {
                switch (type) {
                    case 'swipeRight':
                        setIsOpen(true);
                        break;
                    case 'swipeLeft':
                        setIsOpen(false);
                        break;
                    default:
                        break;
                }
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
        <Wrapper isOpen={isOpen} {...props}>
            <Container
                columnWidth={columnWidth}
                id={id}
                backgroundColor={backgroundColor}
            >
                {header}
                <Items>{loading ? <Loading /> : children}</Items>
                {footer}
            </Container>
            {toggleComponent}
        </Wrapper>
    );
};

interface WrapperProps {
    isOpen: boolean;
    columnWidth?: string;
    margin?: string;
    right?: string;
    left?: string;
    cssPosition?: string;
    onCloseTranslateXAxis?: string;
    zIndex?: number;
    mediaMixin?: string;
    mediaMargin?: string;
    mediaRight?: string;
    mediaLeft?: string;
    mediaCssPosition?: string;
    mediaOnCloseTranslateXAxis?: string;
}

interface ColumnProps {
    columnWidth: string;
    backgroundColor: string;
}

const Wrapper = styled.div<WrapperProps>`
    ${Mixins.flex()}
    ${Mixins.transition(['transform'])}
    height: 100%;
    ${({
        isOpen,
        onCloseTranslateXAxis,
        columnWidth,
        margin,
        right,
        left,
        cssPosition,
        zIndex,
        theme,
        mediaMixin,
        mediaMargin,
        mediaRight,
        mediaLeft,
        mediaCssPosition,
        mediaOnCloseTranslateXAxis,
    }): string => {
        const media = mediaMixin
            ? `
                @media (max-width: ${theme.media[mediaMixin] || mediaMixin}px) {
                    transform: translateX(${
                        isOpen ? '0' : mediaOnCloseTranslateXAxis
                    });
                    position: ${mediaCssPosition};
                    margin: ${mediaMargin};
                    top: 0;
                    right: ${mediaRight};
                    bottom: 0;
                    left: ${mediaLeft};
                }
            `
            : `position: ${cssPosition};
                margin: ${margin};
                top: 0;
                right: ${right};
                bottom: 0;
                left: ${left};`;
        const onClose = onCloseTranslateXAxis
            ? `transform: translateX(${isOpen ? '0' : onCloseTranslateXAxis});`
            : '';
        return `
        width: ${columnWidth};
        z-index: ${zIndex};
        ${onClose}
        ${media}`;
    }}
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
    height: 100%;
    list-style-type: none;
    overflow: auto;
    padding: 0;
    margin: 0;
`;
