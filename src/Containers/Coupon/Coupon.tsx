import React from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';

export interface CouponProps extends CouponBoxProps {
    couponTitle: string;
    couponDescription: string;
    couponSubdescription: string;
}

export const Coupon: React.FC<CouponProps> = ({
    couponTitle,
    couponDescription,
    couponSubdescription,
    color = 'primary',
    ...props
}): React.ReactElement => (
    <CouponBox {...props} color={color}>
        <TextBig>
            <strong>{couponTitle}</strong>
        </TextBig>
        <DashedLine />
        <TextSmall1>
            <strong>{couponDescription}</strong>
        </TextSmall1>
        <TextSmall2>{couponSubdescription}</TextSmall2>
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

interface CouponBoxProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    color: string;
}

const CouponBox = styled.div<CouponBoxProps>`
    ${({ theme, color }): string => `
    background-color:${theme.colors[color] || color};
    `}
    width: fit-content;
    min-width: 150px;

    // Theme Stuff
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    ${Main({
        ...props,
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
        right: -3%;
        top: 44%;
        ${({ theme }): string => `
            background-color:${theme.colors.background};
        `}
    }
`;

export default Coupon;
