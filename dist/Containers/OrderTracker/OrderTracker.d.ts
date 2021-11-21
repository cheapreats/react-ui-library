import React from 'react';
import { StyledIcon } from 'styled-icons/types';
interface OrderStatus {
    icon: StyledIcon;
    text: string;
}
interface Color {
    iconNonFocusedColor: string;
    iconFocusedColor: string;
    textNonFocusedColor: string;
    textFocusedColor: string;
}
export interface OrderTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    statuses: OrderStatus[];
    colors: Color;
    currIndex: number;
    size?: 'small' | 'medium' | 'large';
}
interface IconContainerProps {
    size: string;
}
interface IconProps {
    colors: Color;
    currIndex: number;
    index: number;
}
/**
 * The component informing the customer of the progress of a food order.
 *
 * @param {OrderStatus[]} statuses - An array of OrderStatus objects representing each status of an order
 * @param {Color} colors - An object of different colors
 * @param {number} currIndex - An integer representing the current status
 * @param {string} size - A string indicating the size of the components
 * @param {any} props - Other props injected
 * @constructor
 */
export declare const OrderTracker: React.VFC<OrderTrackerProps>;
/**
 * A container for icons
 */
export declare const IconContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, IconContainerProps, never>;
/**
 * An icon representing a status of the component
 */
export declare const Icon: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, IconProps, never>;
export {};
