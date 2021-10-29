import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';

/* The split turns the size string, which is formatted as "DDpx" where "DD" is the size,
               into an array of the form ['', 'DD', 'px'] so it needs to be sliced at index 1
             */
const EMPTY_LINE_REGEX = /(\d+)/;
const WHITE_SPACE_INDEX = 1;

interface OrderStatus {
    /* visual of one of the states */
    icon: StyledIcon;
    /* name of the status */
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

export interface OrderTrackerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* statuses that the component can be in */
    statuses: OrderStatus[];
    /* color options for different states of the component */
    colors: Color;
    /* the current status of the component */
    currIndex: number;
    /* size of the component in CSS */
    size: string;
}

interface IconContainerProps {
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
    /* color options for different states of the component */
    colors: Color;
    /* integer representing the current status */
    currIndex: number;
    /* index of the progress bar */
    index: number;
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
}): React.ReactElement => {
    /**
     * Returns all HTML elements of component
     * @returns {React.ReactElement[]} An array of elements each representing a status of the component
     */
    const getElements = (): React.ReactElement[] =>
        statuses.map((status, i) => {
            /**
             * An array representing size of the component with
             * the element at first index the number and
             * the element at the second index the unit
             * NOTE: there is an issue in this code
             */
            const sizeArr = size
                .split(EMPTY_LINE_REGEX)
                .slice(WHITE_SPACE_INDEX);

            /**
             * Renders progress bar according to current status
             * @returns {React.ReactElement} A React element that is a progress bar according to current status
             */
            const renderBar = (): React.ReactElement | null => {
                if (currIndex < i + 1) {
                    return null;
                }
                return (
                    <Bar
                        colors={colors}
                        currIndex={currIndex}
                        index={i}
                        statuses={statuses}
                    />
                );
            };

            /**
             * Renders status icons according to the current status
             * @returns A JSX element that is an icon according to the current status
             */
            const renderIcon = (): React.ReactElement => (
                <Icon
                    colors={colors}
                    currIndex={currIndex}
                    index={i}
                    as={status.icon}
                    key={currIndex}
                />
            );

            return (
                <RowDiv>
                    <ColDiv>
                        <IconContainer size={size}>
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
    width: 50%;
    height: 100%;
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
const inactiveToActiveIconAnimation = (color: string) => keyframes`
    from { opacity: 0%; color: transparent}
    to { opacity: 100%; color: ${color}}
`;

/**
 * A container for icons
 */
export const IconContainer = styled.div<IconContainerProps>`
    height: ${({ size }) => size};
    width: ${({ size }) => size};
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
    animation-name: ${({ colors }) =>
        inactiveToActiveIconAnimation(colors.iconFocusedColor)};
    ${({ currIndex, index }) =>
        currIndex === index &&
        `
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        animation-delay: ${currIndex === 0 ? `0s` : `${barAnimationDuration}s`};
        animation-duration: ${iconAnimationDuration}s;
        animation-iteration-count: 1;
    `};
`;

/**
 * CSS animation of progress bar
 */
const barAnimation = keyframes`
    from { width: 0%; }
    to { width: 100%; }
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
    animation-name: ${barAnimation};
    ${({ currIndex, index }) =>
        currIndex === index + 1 &&
        `
        animation-timing-function: linear;
        animation-duration: ${barAnimationDuration}s;
        animation-iteration-count: 1;
    `}
`;

/**
 * A container for texts of each status
 */
const Text = styled.p<TextProps>`
    color: ${({ currIndex, index, colors }) =>
        currIndex === index
            ? colors.textFocusedColor
            : colors.textNonFocusedColor};
    font-weight: ${({ currIndex, index }) =>
        currIndex === index ? 'bold' : 'normal'};
    font-size: ${({ size }) => `${parseInt(size[0], 10) / 3} + ${size[1]}`};
    text-align: center;
    width: 100px;
    height: 20px;
    overflow: hidden;
`;
