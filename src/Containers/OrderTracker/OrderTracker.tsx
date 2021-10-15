import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';

/**
 * The icon and text representing the current status of the application
 *
 * @interface OrderStatus
 * @field {StyledIcon} icon - the icon representing the current status
 * @field {string} text - the descriptive name of the current status
 */
interface OrderStatus {
    icon: StyledIcon;
    text: string;
}

/**
 * Color groups to use in different states of the component
 *
 * @field {string} iconNonFocusedColor - color of the icon when not focused
 * @field {string} iconFocusedColor - color of the icon when focused
 * @field {string} textNonFocusedColor - color of the text when not focused
 * @field {string} textFocusedColor - color of the text when focused
 */
interface Color {
    iconNonFocusedColor: string;
    iconFocusedColor: string;
    textNonFocusedColor: string;
    textFocusedColor: string;
}

/**
 * Properties of the main component
 *
 * @field {OrderStatus[]} statuses - the list of statuses that the component can be in
 * @field {Color} colors - the color options for different states of the component
 * @field {number} currIndex - integer representing the current status of the component
 * @field {string} size - size of the component in CSS
 */
export interface OrderTrackerProps {
    statuses: OrderStatus[];
    colors: Color;
    currIndex: number;
    size: string;
}

/**
 * Properties of the icon container
 *
 * @field {Color} colors - the color options for different states of the component
 * @field {string} size - size of the component in CSS
 */
interface IconContainerProps {
    colors: Color;
    size: string;
}

/**
 * Properties of the icon
 *
 * @field {Color} colors - the color options for different states of the icon
 * @field {number} currIndex - integer representing the current status of the icon
 * @field {number} index - the index of the status
 */
interface IconProps {
    colors: Color;
    currIndex: number;
    index: number;
}

/**
 * Properties of the bar container
 *
 * @field {Color} colors - the color options for different states of the component
 * @field {number} index - the index of the progress bar
 * @field {string[]} size - size of the progress bar formatted as [size, unit]
 * @field {OrderStatus[]} statuses - array of objects representing each status
 */
interface BarContainerProps {
    colors: Color;
    index: number;
    size: string[];
    statuses: OrderStatus[];
}

/**
 * Properties of the bar
 *
 * @field {number} currIndex - an integer representing the current status
 * @field {Color} colors - the color options for different states of the component
 * @field {OrderStatus[]} statuses - array of objects representing each status
 */
interface BarProps {
    currIndex: number;
    colors: Color;
    statuses: OrderStatus[];
}

/**
 * Properties of the status texts
 *
 * @field {Color} colors - the color options for different states of the component
 * @field {number} currIndex - an integer representing the current status
 * @field {number} index - the index of the progress bar
 * @field {string[]} size - size of the progress bar formatted as [size, unit]
 */
interface TextProps {
    colors: Color;
    currIndex: number;
    index: number;
    size: string[];
}

/**
 * The component informing the customer of the progress of a food order.
 *
 * @param {OrderStatus[]} statuses - An array of strings representing each status of an order
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
     * @returns {JSX.Element[]} An array of elements each representing a status of the component
     */
    const getElements = (): JSX.Element[] =>
        statuses.map((status, i) => {
            /* The split turns the size string, which is formatted as "DDpx" where "DD" is the size,
               into an array of the form ['', 'DD', 'px'] so it needs to be sliced at index 1
             */
            const SPLIT_REGEX = /(\d+)/;
            const sliceIndex = 1;

            /**
             * An array representing size of the component with
             * the element at first index the number and
             * the element at the second index the unit
             */
            const sizeArr = size.split(SPLIT_REGEX).slice(sliceIndex);

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
