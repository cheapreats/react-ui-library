import React from 'react';
import styled from 'styled-components';
import { LabelLayoutProps } from '@Layouts';

export interface PopupProps extends LabelLayoutProps {
    left?:string|number;
    top?:string|number;
    width?:string|number;
    height?:string|number;
    popup?:boolean;
}

export const Popup : React.FC<PopupProps> = ({
    children,
    left,
    top,
    width,
    height,
    popup,
}): React.ReactElement =>{
        return (
            <Container popup={popup} left={left} top={top}>
                <Rectangle width={width} height={height}>{children}</Rectangle>
                <Triangle>
                    <InnerTriangle></InnerTriangle>
                </Triangle>
            </Container>
        );
    };

    const Rectangle = styled.div<PopupProps>`
        height: ${({height})=> height ? height+'px' : 'auto'};
        width: ${({width})=> width ? width+'px' : 'auto'};
        background-color: white;
        border:1px solid #cec0c0;
        box-shadow:3px 3px #827474;
        text-align: center;
        font-weight:bold;
        font-size:smaller;
    `;
    
    const Triangle = styled.div`
        width: 0;
        height: 0;
        border-left: 24px solid transparent;
        border-right: -2px solid transparent;
        border-top: 27px solid #cec0c0;`;
    
    const InnerTriangle = styled.div`
        position: relative;
        top: -29px;
        left: -23px;
        width: 0;
        height: 0;
        border-left: 21px solid transparent;
        border-right: 0px solid transparent;
        border-top: 24px solid #fff;;`;
    
    const Container = styled.div<PopupProps>`
        width: 100px;
        height: 100px;
        left:${({left})=> left ? left+'px' : ''};
        top:${({top})=> top ? top+'px' : ''};
        z-index: 10;
        opacity: 1;
        pointer-events: none;
        position:absolute;
    `;
    