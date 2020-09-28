import React from 'react';
import styled from 'styled-components';
import { flex } from '../Utils/Mixins';
import {
    Main,
    Responsive,
    MainInterface,
    ResponsiveInterface,
} from '../Utils/BaseStyles';

export interface CouponProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    bg: sring;
    text1: string;
    text2: string;
    text3: string;
}

export const Coupon: React.FC<CouponProps> = ({
    text1,
    text2,
    text3,
    ...rest
}): React.ReactElement => (
    <CouponBox {...rest}>
        <TextBig>
            <strong>{text1}</strong>
        </TextBig>
        <DashedLine />
        <TextSmall1>
            <strong>{text2}</strong>
        </TextSmall1>
        <TextSmall2>{text3}</TextSmall2>
    </CouponBox>
);

const Text = styled.div`
    ${({ theme }): string => `
        color:${theme.colors.background};
    `}
    margin:10px;
`;

const TextBig = styled(Text)`
    ${({ theme }): string => `
        font-size:${theme.font.size.h1};
    `}
`;

const TextSmall = styled(Text)`
    ${({ theme }): string => `
        font-size:${theme.font.size.small};
    `}
`;

const TextSmall1 = styled(TextSmall)`
    margin: 10px 10px 2px 10px;
`;

const TextSmall2 = styled(TextSmall)`
    margin: 0px 10px 10px 10px;
`;

const DashedLine = styled.div`
    height: 1px;
    background: repeating-linear-gradient(
        to right,
        ${({ theme }) => `
        ${theme.colors.text}
        `}
            0,
        ${({ theme }) => `
        ${theme.colors.text}
        `}
            5px,
        transparent 5px,
        transparent 7px
    );
    position: absolute;
    top: 49%;
    left: 9%;
    width: 80%;
`;

const CouponBox = styled.div<MainInterface & ResponsiveInterface>`
    ${({ theme, ...rest }): string => `
    background-color:${rest.bg};
    `}
    width: fit-content;
    min-width: 150px;

    // Theme Stuff
    ${({ theme, ...rest }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    ${Main({
        ...rest,
    })}
    `}
    // Base Styles
    ${Responsive}
    overflow:hidden;
    position: relative;
    ${flex('column', 'center')}

    &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 5000px;
        position: absolute;
        right: 97%;
        top: 44%;
        ${({ theme }): string => `
            background-color:${theme.colors.background};
        `}
    }
    &::after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 5000px;
        position: absolute;
        right: -4%;
        top: 44%;
        ${({ theme }): string => `
            background-color:${theme.colors.background};
        `}
    }
`;

export default Coupon;
