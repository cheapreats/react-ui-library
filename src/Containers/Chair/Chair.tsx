import React from 'react';
import styled, { css, useTheme } from 'styled-components';

type Position = 'top' | 'bottom' | 'left' | 'right';

type getRoundChairType = () => JSX.Element;

type getPositionChairType = () => JSX.Element;

export interface IChair {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position;
    /**
     * Indicates whether someone is seated in the chair
     * True if someone is seated in the chair, otherwise false
     */
    isSeated: boolean;
    /**
     * Name of Person Sitting on Chair
     */
    occupiedBy: string;
    /**
     * Determines if the chair will be visible or not
     */
    isVisible: boolean;
    /**
     * Indicates whether the chair is round.
     * True if the chair is round, otherwise false.
     */
    isRound?: boolean;
    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;
}

/**
 * Primary UI component for user interaction
 */
export const Chair: React.FC<IChair> = ({
    position = 'top',
    isSeated = false,
    occupiedBy = '',
    isVisible = true,
    isRound = false,
    relativeSize = 1.0,
    ...props
}) => {
    /**
     * Returns a JSX.Element for the Chair with RoundChair styles
     * @returns {JSX.Element}
     *
     */
    const getRoundChair: getRoundChairType = () => (
        <div {...props}>
            <RoundChair
                relativeSize={relativeSize}
                isSeated={isSeated}
                isVisible={isVisible}
            >
                <RoundChairText relativeSize={relativeSize}>
                    {occupiedBy}
                </RoundChairText>
            </RoundChair>
        </div>
    );

    /**
     * Returns a JSX.Element for the Chair with the correct styles based on position
     * @returns {JSX.Element}
     *
     */
    const getPositionChair: getPositionChairType = () => (
        <div {...props}>
            <RectangleChair
                relativeSize={relativeSize}
                isSeated={isSeated}
                isVisible={isVisible}
                position={position}
            >
                <RectangleChairText
                    position={position}
                    relativeSize={relativeSize}
                >
                    {occupiedBy}
                </RectangleChairText>
            </RectangleChair>
        </div>
    );

    return isRound ? getRoundChair() : getPositionChair();
};

// Define a type for the getChairColor function
type getChairColorType = (isSeated: boolean) => string;

/**
 * Determines what color the chair will be
 * @param isSeated {boolean} - true if chair is taken/occupied, otherwise false
 * @return {string} - Hexadecimal color
 */
const getChairColor: getChairColorType = (isSeated) => {
    const { colors } = useTheme();

    if (isSeated) {
        return colors.chairOccupiedBackground;
    }

    return colors.chairTableBackground;
};

type getRectangleChairStyles = (
    position: Position,
    relativeSize: number,
) => string;

/**
 * Returns the correct styles for the RectangleChair based on the chair's position
 *
 * @return {string} - the correct styles for the given chair
 */
const getRectangleChairStyles: getRectangleChairStyles = (
    position,
    relativeSize,
) => {
    const BASE_BORDER_RADIUS = 3;
    const BASE_MARGIN_FOR_TOP_AND_BOTTOM_CHAIRS = 0.25;
    switch (position) {
        case 'top':
            return `border-top-left-radius:  ${
                relativeSize * BASE_BORDER_RADIUS
            }rem;
            border-top-right-radius: ${relativeSize * BASE_BORDER_RADIUS}rem;
            margin-bottom: ${
                relativeSize * BASE_MARGIN_FOR_TOP_AND_BOTTOM_CHAIRS
            }rem;
        `;
        case 'left':
            return `border-top-left-radius: ${
                relativeSize * BASE_BORDER_RADIUS
            }rem;
            border-bottom-left-radius: ${relativeSize * BASE_BORDER_RADIUS}rem;
        `;
        case 'right':
            return `border-top-right-radius: ${
                relativeSize * BASE_BORDER_RADIUS
            }rem;
            border-bottom-right-radius: ${relativeSize * BASE_BORDER_RADIUS}rem;
        `;
        case 'bottom':
            return `border-bottom-left-radius: ${
                relativeSize * BASE_BORDER_RADIUS
            }rem;
            border-bottom-right-radius: ${relativeSize * BASE_BORDER_RADIUS}rem;
            margin-top: ${
                relativeSize * BASE_MARGIN_FOR_TOP_AND_BOTTOM_CHAIRS
            }rem;
        `;
        default:
            return '';
    }
};

/**
 * variables for the styled components
 */

const HorizontalChairStyle = css<Pick<IChair, 'relativeSize' | 'position'>>`
    ${({ relativeSize }) => {
        const HORIZONTAL_CHAIR_BASE_HEIGHT = 3;
        const HORIZONTAL_CHAIR_BASE_WIDTH = 10;
        return `height: ${relativeSize * HORIZONTAL_CHAIR_BASE_HEIGHT}rem;
            width: ${relativeSize * HORIZONTAL_CHAIR_BASE_WIDTH}rem;
            margin-left: auto;
            margin-right: auto;
        `;
    }}
    ${({ relativeSize, position }) =>
        getRectangleChairStyles(position, relativeSize)}
`;

const VerticalChairStyle = css<Pick<IChair, 'relativeSize' | 'position'>>`
    ${({ relativeSize }) => {
        const VERTICAL_CHAIR_BASE_WIDTH = 3;
        const VERTICAL_CHAIR_BASE_HEIGHT = 10;
        const VERTICAL_CHAIR_BASE_MARGIN = 1.25;
        return `width: ${relativeSize * VERTICAL_CHAIR_BASE_WIDTH}rem;
            height: ${relativeSize * VERTICAL_CHAIR_BASE_HEIGHT}rem;
            margin: ${relativeSize * VERTICAL_CHAIR_BASE_MARGIN}rem;
        `;
    }}
    ${({ relativeSize, position }) =>
        getRectangleChairStyles(position, relativeSize)}
`;

const textBaseStyle = css`
    color: ${({ theme }) => theme.colors.background};
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const textHorizontalChairStyle = css<Pick<IChair, 'relativeSize'>>`
    ${textBaseStyle};
    ${({ relativeSize }) => {
        const HORIZONTAL_CHAIR_BASE_WIDTH = 9;
        const HORIZONTAL_CHAIR_BASE_MARGIN_LEFT = 0.65;
        const HORIZONTAL_CHAIR_BASE_PADDING_TOP = 0.35;
        return `width: ${relativeSize * HORIZONTAL_CHAIR_BASE_WIDTH}rem;
            margin-left: ${relativeSize * HORIZONTAL_CHAIR_BASE_MARGIN_LEFT}rem;
            padding-top: ${
                relativeSize * HORIZONTAL_CHAIR_BASE_PADDING_TOP
            }rem;`;
    }}
`;

const textVerticalChairStyle = css<Pick<IChair, 'relativeSize'>>`
    ${textBaseStyle};
    height: 90%;
    ${({ relativeSize }) => {
        const VERTICAL_CHAIR_TEXT_BASE_PADDING_TOP = 0.5;
        const VERTICAL_CHAIR_TEXT_BASE_MARGIN_LEFT = 0.5;
        return `padding-top: ${
            relativeSize * VERTICAL_CHAIR_TEXT_BASE_PADDING_TOP
        }rem;
            margin-left: ${
                relativeSize * VERTICAL_CHAIR_TEXT_BASE_MARGIN_LEFT
            }rem;
            writing-mode: vertical-rl;`;
    }}
`;

const textRoundStyle = css<Pick<IChair, 'relativeSize'>>`
    ${textBaseStyle};
    padding: ${({ relativeSize }) => {
            const BASE_PADDING_FOR_TEXT_ROUND_STYLE = 2.0;
            return relativeSize * BASE_PADDING_FOR_TEXT_ROUND_STYLE;
        }}em
        0;
`;

const BaseChair = styled.div<Pick<IChair, 'isVisible' | 'isSeated'>>`
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    background-color: ${({ isSeated }) => getChairColor(isSeated)};
`;

const RoundChair = styled(BaseChair)<Pick<IChair, 'relativeSize'>>`
    border-radius: 50%;
    ${({ relativeSize }) => {
        const BASE_WIDTH_AND_HEIGHT_FOR_ROUND_CHAIR = 6.5;
        const BASE_BORDER_WIDTH_FOR_ROUND_CHAIR = 2;
        return `width: ${
            relativeSize * BASE_WIDTH_AND_HEIGHT_FOR_ROUND_CHAIR
        }rem;
            height: ${relativeSize * BASE_WIDTH_AND_HEIGHT_FOR_ROUND_CHAIR}rem;
            border: ${
                relativeSize * BASE_BORDER_WIDTH_FOR_ROUND_CHAIR
            }px solid black;`;
    }}
`;

const RectangleChair = styled(BaseChair)<
    Pick<IChair, 'position' | 'relativeSize'>
>`
    ${({ position }) =>
        ({
            top: HorizontalChairStyle,
            bottom: HorizontalChairStyle,
            left: VerticalChairStyle,
            right: VerticalChairStyle,
        }[position])};
`;

const RectangleChairText = styled.div<
    Pick<IChair, 'position' | 'relativeSize'>
>`
    ${({ position }) =>
        ({
            top: textHorizontalChairStyle,
            bottom: textHorizontalChairStyle,
            left: textVerticalChairStyle,
            right: textVerticalChairStyle,
        }[position])};
`;

const RoundChairText = styled.div<Pick<IChair, 'relativeSize'>>`
    ${textRoundStyle};
`;
