import React from 'react';
import styled from 'styled-components';
import { LabelLayoutProps } from '@Layouts';

export interface PopupProps extends LabelLayoutProps {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
}

export const Popup: React.FC<PopupProps> = ({
    children,
    left,
    top,
    width,
    height,
    ...props
}): React.ReactElement => {
    return (
        <Container left={left} top={top}>
            <Rectangle width={width} height={height} {...props}>
                {children}
            </Rectangle>
            <Triangle>
                <InnerTriangle />
            </Triangle>
        </Container>
    );
};

const Rectangle = styled.div<PopupProps>`
    height: ${({ height }): string => (height ? `${height}px` : 'auto')};
    width: ${({ width }): string => (width ? `${width}px` : 'auto')};
    background-color: white;
    border: 1px solid #cec0c0;
    box-shadow: 3px 3px #827474;
    text-align: center;
    font-weight: bold;
    font-size: smaller;
`;

const Triangle = styled.div`
    width: 0;
    height: 0;
    border-left: 24px solid transparent;
    border-right: -2px solid transparent;
    border-top: 27px solid #cec0c0;
`;

const InnerTriangle = styled.div`
    position: relative;
    top: -29px;
    left: -23px;
    width: 0;
    height: 0;
    border-left: 21px solid transparent;
    border-right: 0px solid transparent;
    border-top: 24px solid #fff;
`;

const Container = styled.div<PopupProps>`
    left: ${({ left }): string => (left ? `${left}px` : '')};
    top: ${({ top }): string => (top ? `${top}px` : '')};
    z-index: 10;
    opacity: 1;
    pointer-events: none;
    position: absolute;
`;
