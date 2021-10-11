import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';

interface OrderStatus {
    /** icon: the styled icon used in different statuses */
    icon: StyledIcon;
    /** text: the text under the styled icon */
    text: String;
}

interface Color {
    /** nonFocusedIcon: the color of the icon when not focused */
    nonFocusedIcon: string;
    /** nonFocusedIcon: the color of the icon when focused */
    focusedIcon: string;
    /** nonFocusedText: the color of the text when not focused */
    nonFocusedText: string;
    /** focusedText: the color of the text when not focused */
    focusedText: string;
}

export interface OrderTrackerProps {
    /** statuses: different statuses appearing on the component */
    statuses: OrderStatus[];
    /** colors: the object Color with different color settings */
    colors: Color;
    /** currIndex: the current status of the component, represented by an integer */
    currIndex: number;
    /** size: the size of the component, could be in both px and em */
    size: string;
}

/**
 * The component informing the customer of the progress of a food order.
 * @param statuses An array of status objects
 * @param colors An object of different colors
 * @param currIndex An integer representing the current status
 * @param size A string indicating the size of the components
 * @param props
 * @constructor
 */
export const OrderTracker: React.VFC<OrderTrackerProps> = ({
    statuses,
    colors,
    currIndex,
    size,
    ...props
}: OrderTrackerProps): React.ReactElement => {
    /**
     * An array of JSX elements, each representing a status of the component
     */
    const elements: JSX.Element[] = statuses.map((status, i) => {
        /**
         * An array representing size of the component with
         * the element at first index the number and
         * the element at the second index the unit
         */
        const sizeArr = size.split(/(\d+)/).slice(1);

        /**
         * A function that renders progress bar according to current status
         * @returns A JSX element that is a progress bar according to current status
         */
        const renderBar = (): React.ReactNode => {
            if (currIndex < i + 1) {
                return null;
            }
            if (currIndex === i + 1) {
                return (
                    <BarActive
                        currIndex={currIndex}
                        colors={colors}
                        statuses={statuses}
                    />
                );
            }
            return (
                <Bar
                    currIndex={currIndex}
                    colors={colors}
                    statuses={statuses}
                />
            );
        };

        /**
         * A function that renders status icons according to the current status
         * @returns A JSX element that is an icon according to the current status
         */
        const renderIcon = (): React.ReactNode => {
            if (currIndex === i) {
                return (
                    <StatusIconActive
                        colors={colors}
                        currIndex={currIndex}
                        index={i}
                        status={status}
                    />
                );
            }
            return (
                <StatusIcon
                    colors={colors}
                    currIndex={currIndex}
                    index={i}
                    status={status}
                />
            );
        };

        return (
            <RowDiv>
                <ColDiv>
                    <IconContainer size={size} colors={colors}>
                        {renderIcon()}
                    </IconContainer>
                    <TextWrapper
                        colors={colors}
                        size={sizeArr}
                        currIndex={currIndex}
                        index={i}
                    >
                        {status.text}
                    </TextWrapper>
                </ColDiv>
                <BarContainer
                    colors={colors}
                    index={i}
                    size={sizeArr}
                    statuses={statuses}
                >
                    {renderBar()}
                </BarContainer>
            </RowDiv>
        );
    });

    return <RowDiv {...props}>{elements}</RowDiv>;
};

/**
 * A container for an icon and a text
 */
const ColDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1%;
`;

/**
 * The container of the whole component
 */
const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

/**
 * CSS for the animation of progress bar
 */
const barAnimation = keyframes`
 0% { width: 0%; }
 100% { width: 100%; }
`;

/**
 * CSS for the animation of the status icon
 */
const iconAnimation = keyframes`
 0% { opacity: 0%; color: red}
 100% { opacity: 100%; color: red}
`;

interface IconContainerProps {
    colors: Color;
    size: string;
}

/**
 * A container for icons
 */
const IconContainer = styled.div<IconContainerProps>`
    height: ${(props) => props.size};
    width: ${(props) => props.size};
    color: ${(props) => props.colors.nonFocusedIcon};
`;

interface StatusIconProps {
    colors: Color;
    currIndex: number;
    index: number;
    statuses: OrderStatus[];
}

/**
 * An icon representing a status of the component
 */
const StatusIcon = styled((props) => props.status.icon)<StatusIconProps>`
    height: 100%;
    width: 100%;
    color: ${(props) =>
        props.currIndex <= props.index
            ? props.colors.nonFocusedIcon
            : props.colors.focusedIcon};
`;

/**
 * An icon with animation representing the change in statuses
 */
const StatusIconActive = styled((props) => props.status.icon)<StatusIconProps>`
    height: 100%;
    width: 100%;
    animation-name: ${iconAnimation};
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: ${(props) => (props.currIndex === 0 ? '0s' : '4s')};
    animation-duration: 2s;
    animation-iteration-count: 1;
`;

interface BarContainerProps {
    colors: Color;
    index: number;
    size: string[];
    statuses: OrderStatus[];
}

/**
 * A container for progress bars
 */
const BarContainer = styled.div<BarContainerProps>`
    width: ${(props) => `${parseInt(props.size[0], 10) * 4}${props.size[1]}`};
    height: ${(props) => `${parseInt(props.size[0], 10) / 10}${props.size[1]}`};
    align-self: center;
    border-radius: 50%;
    background-color: ${(props) =>
        props.index !== props.statuses.length - 1
            ? props.colors.nonFocusedIcon
            : 'transparent'};
`;

interface BarProps {
    currIndex: number;
    colors: Color;
    statuses: OrderStatus[];
}

/**
 * A bar displaying the progress of the order
 */
const Bar = styled.div<BarProps>`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
        props.currIndex <= props.statuses.length - 1
            ? props.colors.focusedIcon
            : 'transparent'};
`;

/**
 * A bar with animation representing change in statuses
 */
const BarActive = styled.div<BarProps>`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
        props.currIndex <= props.statuses.length - 1
            ? props.colors.focusedIcon
            : 'transparent'};
    animation-name: ${barAnimation};
    animation-timing-function: linear;
    animation-duration: 4s;
    animation-iteration-count: 1;
`;

interface TextWrapperProps {
    colors: Color;
    currIndex: number;
    index: number;
    size: string[];
}

/**
 * A container for texts of each status
 */
const TextWrapper = styled.p<TextWrapperProps>`
    colors: ${(props) =>
        props.currIndex === props.index
            ? props.colors.focusedText
            : props.colors.nonFocusedText};
    font-weight: ${(props) =>
        props.currIndex === props.index ? 'bold' : 'normal'};
    font-size: ${(props) =>
        `${parseInt(props.size[0], 10) / 3} + ${props.size[1]}`};
    text-align: center;
`;
