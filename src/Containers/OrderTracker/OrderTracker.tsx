import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';

interface OrderStatus {
    /* icon representing the current status */
    icon: StyledIcon;
    /* the descriptive name of the current status */
    text: string;
}

interface Color {
    /* color of the icon when not focused */
    iconNonFocusedColor: string;
    /* color of the icon when focused */
    iconFocusedColor: string;
    /* color of the text when not focused */
    textNonFocusedColor: string;
    /* color of the text when focused */
    textFocusedColor: string;
}

export interface OrderTrackerProps {
    /* list of statuses that the component can be in */
    statuses: OrderStatus[];
    /* color options for different states of the component */
    colors: Color;
    /* integer representing the current status of the component */
    currIndex: number;
    /* size of the component in CSS */
    size: string;
}

interface IconContainerProps {
    /* color options for different states of the component */
    colors: Color;
    /* size of the component in CSS */
    size: string;
}

interface IconProps {
    /* color options for different states of the icon */
    colors: Color;
    /* integer representing the current status of the icon */
    currIndex: number;
    /* index of the status */
    index: number;
}

interface BarContainerProps {
    /* color options for different states of the component */
    colors: Color;
    /* index of the progress bar */
    index: number;
    /* size of the progress bar formatted as [size, unit] */
    size: string[];
    /* array of objects representing each status */
    statuses: OrderStatus[];
}

interface BarProps {
    /* integer representing the current status */
    currIndex: number;
    /* color options for different states of the component */
    colors: Color;
    /* array of objects representing each status */
    statuses: OrderStatus[];
}

interface TextProps {
    /* color options for different states of the component */
    colors: Color;
    /* integer representing the current status */
    currIndex: number;
    /* index of the progress bar */
    index: number;
    /* size of the progress bar formatted as [size, unit] */
    size: string[];
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
export const OrderTracker: React.VFC<OrderTrackerProps> = ({
    statuses,
    colors,
    currIndex,
    size,
    ...props
}: OrderTrackerProps): React.ReactElement => {
    /**
     * @returns {JSX.React.ReactElement[]} An array of elements each representing a status of the component
     */
    const getElements = (): React.ReactElement[] =>
        statuses.map((status, i) => {
            /* The split turns the size string, which is formatted as "DDpx" where "DD" is the size,
               into an array of the form ['', 'DD', 'px'] so it needs to be sliced at index 1
             */
            const EMPTY_LINE_REGEX = /(\d+)/;
            const FIRST_ELEMENT_INDEX = 1;

            /**
             * An array representing size of the component with
             * the element at first index the number and
             * the element at the second index the unit
             */
            const sizeArr = size
                .split(EMPTY_LINE_REGEX)
                .slice(FIRST_ELEMENT_INDEX);

            /**
             * A function that renders progress bar according to current status
             * @returns A JSX element that is a progress bar according to current status
             */
            const renderBar = (): React.ReactElement | null => {
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
            const renderIcon = (): React.ReactElement => {
                if (currIndex === i) {
                    return (
                        <IconActive
                            colors={colors}
                            currIndex={currIndex}
                            index={i}
                            as={status.icon}
                        />
                    );
                }
                return (
                    <Icon
                        colors={colors}
                        currIndex={currIndex}
                        index={i}
                        as={status.icon}
                    />
                );
            };

            return (
                <RowDiv>
                    <ColDiv>
                        <IconContainer size={size} colors={colors}>
                            {renderIcon()}
                        </IconContainer>
                        <Text
                            colors={colors}
                            size={sizeArr}
                            currIndex={currIndex}
                            index={i}
                        >
                            {status.text}
                        </Text>
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

    return <RowDiv {...props}>{getElements()}</RowDiv>;
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
 * Duration of the icon animation
 */
const iconAnimationDuration = 0.5;

/**
 * Duration of the bar animation
 */
const barAnimationDuration = 0.3;

/**
 * CSS animation of the status icon
 */
const iconAnimation = keyframes`
 0% { opacity: 0%; color: red}
 100% { opacity: 100%; color: red}
`;

/**
 * A container for icons
 */
export const IconContainer = styled.div<IconContainerProps>`
    height: ${({ size }) => size};
    width: ${({ size }) => size};
    color: ${({ colors }) => colors.iconNonFocusedColor};
`;

/**
 * An icon representing a status of the component
 */
export const Icon = styled.div<IconProps>`
    height: 100%;
    width: 100%;
    color: ${({ currIndex, index, colors }) =>
        currIndex <= index
            ? colors.iconNonFocusedColor
            : colors.iconFocusedColor};
`;

/**
 * An icon with animation representing the change in statuses
 */
export const IconActive = styled.div<IconProps>`
    height: 100%;
    width: 100%;
    animation-name: ${iconAnimation};
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: ${({ currIndex }) =>
        currIndex === 0 ? '0s' : `${barAnimationDuration}s`};
    animation-duration: ${iconAnimationDuration}s;
    animation-iteration-count: 1;
`;

/**
 * CSS animation of progress bar
 */
const barAnimation = keyframes`
 0% { width: 0%; }
 100% { width: 100%; }
`;

/**
 * A container for progress bars
 */
const BarContainer = styled.div<BarContainerProps>`
    width: ${({ size }) => `${parseInt(size[0], 10) * 4}${size[1]}`};
    height: ${({ size }) => `${parseInt(size[0], 10) / 10}${size[1]}`};
    align-self: center;
    border-radius: 50%;
    background-color: ${({ index, statuses, colors }) =>
        index !== statuses.length - 1
            ? colors.iconNonFocusedColor
            : 'transparent'};
`;

/**
 * A bar displaying the progress of the order
 */
const Bar = styled.div<BarProps>`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: ${({ currIndex, statuses, colors }) =>
        currIndex <= statuses.length - 1
            ? colors.iconFocusedColor
            : 'transparent'};
`;

/**
 * A bar with animation representing change in statuses
 */
const BarActive = styled.div<BarProps>`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: ${({ currIndex, statuses, colors }) =>
        currIndex <= statuses.length - 1
            ? colors.iconFocusedColor
            : 'transparent'};
    animation-name: ${barAnimation};
    animation-timing-function: linear;
    animation-duration: ${barAnimationDuration}s;
    animation-iteration-count: 1;
`;

/**
 * A container for texts of each status
 */
const Text = styled.p<TextProps>`
    colors: ${({ currIndex, index, colors }) =>
        currIndex === index
            ? colors.textFocusedColor
            : colors.textNonFocusedColor};
    font-weight: ${({ currIndex, index }) =>
        currIndex === index ? 'bold' : 'normal'};
    font-size: ${({ size }) => `${parseInt(size[0], 10) / 3} + ${size[1]}`};
    text-align: center;
`;
