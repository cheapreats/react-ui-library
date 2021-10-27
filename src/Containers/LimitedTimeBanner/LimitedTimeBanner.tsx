// import React, { useState, useRef, useLayoutEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { Clock } from '@styled-icons/bootstrap/Clock';
import { Main, MainInterface, ResponsiveInterface, } from '@Utils/BaseStyles';
// eslint-disable-next-line import/no-cycle
import { Paragraph } from '../../index';

export interface IconProps {}

const Icon = styled(Clock)<IconProps>`
    width: 16px;
    float: left;
    margin-bottom: auto;
    margin-top: auto;
`;

export interface ClockItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    header: string;
    activeStyle: Function;
}

export interface BannerProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {

}

export interface LimitedTimeBannerProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const LimitedTimeBanner: React.FC<LimitedTimeBannerProps> = ({
    ...props
}): React.ReactElement => (
    <BannerBox {...props}>
        <Paragraph bold>&nbsp;&nbsp;&nbsp;2 hours remaining<Icon /></Paragraph>
    </BannerBox>
) ;

const BannerBox = styled.div<BannerProps>`
   background-color: black;
    // Theme Stuff
    ${({ theme, ...props }): string => `
    font-family: ${theme.font.family};
    color: white;
    width: 318px;
    opacity: 0.6;
    height: 20px; 
    
    ${Main({
        padding: theme.dimensions.padding.container,
        ...props,
    })}
    `}

`;

export default LimitedTimeBanner;