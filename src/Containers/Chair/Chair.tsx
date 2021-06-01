import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { Eye, EyeSlash } from '@styled-icons/bootstrap';

type Position = 'top' | 'bottom' | 'left' | 'right';

type getRoundChairType = () => JSX.Element;

type getPositionChairType = () => JSX.Element;

type getChairTextType = () => JSX.Element;

type handleClickType = () => void;

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

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
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Passes in the parent table index
     */
    tableIndex: number;
    /**
     * Unique index for each chair
     */
    chairIndex: number;
    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;
    /**
     * Function to handle onClick event for the chair
     * @param parentTableIndex - parent table index in the tables array
     * @param chairIndex - chair index in chair array
     */
    onChairClick: (
        parentTableIndex: number,
        chairIndex: number,
        selectedIndex: number,
    ) => void;
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
    tableUse = 'TableForManagement',
    tableIndex = -1,
    chairIndex = -1,
    selectedIndex = -1,
    onChairClick,
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
                tableUse={tableUse}
                isVisible={isVisible}
            >
                {getChairText()}
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
                position={position}
                tableUse={tableUse}
                isVisible={isVisible}
            >
                {getChairText()}
            </RectangleChair>
        </div>
    );

    /**
     * Returns a JSX.Element for the text or symbol on the chair with correct
     * styles based on tableUse, whether the chair isRound, and whether the
     * chair isVisible
     * @returns {JSX.Element}
     *
     */
    const getChairText: getChairTextType = () => {
        switch (tableUse) {
            case 'AddTableButton':
                return <div />;
            case 'TableForManagement':
                if (isRound) {
                    return (
                        <RoundChairText relativeSize={relativeSize}>
                            {occupiedBy}
                        </RoundChairText>
                    );
                }
                return (
                    <RectangleChairText
                        position={position}
                        relativeSize={relativeSize}
                    >
                        {occupiedBy}
                    </RectangleChairText>
                );
            case 'TableForEditCanvas':
                if (isVisible) {
                    if (isRound) {
                        return <RoundEyeSlash />;
                    }
                    if (position === 'top' || position === 'bottom') {
                        return <TopBottomEyeSlash />;
                    }
                    return <LeftRightEyeSlash />;
                }
                if (isRound) {
                    return <RoundEye />;
                }
                if (position === 'top' || position === 'bottom') {
                    return <TopBottomEye />;
                }
                return <LeftRightEye />;
            default:
                return <div />;
        }
    };

    /**
     * This function will handle the chair click and will
     * Update the state and call onChairClick function
     */
    const onHandleClick: handleClickType = () => {
        onChairClick(tableIndex, chairIndex, selectedIndex);
    };

    if (tableUse === 'TableForEditCanvas') {
        return (
            <ChairWrapperForClick
                onClick={onHandleClick}
                onKeyPress={onHandleClick}
                role="button"
                tabIndex={0}
            >
                {isRound ? getRoundChair() : getPositionChair()}
            </ChairWrapperForClick>
        );
    }

    return isRound ? getRoundChair() : getPositionChair();
};

type getChairColorType = (
    isSeated: boolean,
    tableUse: tableUseTypes,
    isVisible: boolean,
) => string;

/**
 * Determines what color the chair will be
 * @param isSeated {boolean} - true if chair is taken/occupied, otherwise false
 * @param tableUse - the use type for the table the chair appears with
 * @param isVisible - true if chair is visible, otherwise false
 * @return {string} - Hexadecimal color
 */
const getChairColor: getChairColorType = (isSeated, tableUse, isVisible) => {
    const { colors } = useTheme();
    switch (tableUse) {
        case 'TableForManagement':
            if (isSeated) {
                return colors.chairOccupiedBackground;
            }
            return colors.chairTableBackground;
        case 'AddTableButton':
            return colors.chairTableEditBackground;
        case 'TableForEditCanvas':
            if (isVisible) {
                return colors.chairTableBackground;
            }
            return colors.chairTableEditBackground;
        default:
            return colors.chairTableBackground;
    }
};

type getChairVisibilityType = (
    tableUse: tableUseTypes,
    isVisible: boolean,
) => string;

/**
 * Determines whether the chair will be visible and how it will appear
 * @param isVisible {boolean} - true if chair is visible, otherwise false
 * @param tableUse - the use type for the table the chair appears with
 * @return {string} - 'visible' or 'hidden'
 */
const getChairVisibility: getChairVisibilityType = (tableUse, isVisible) => {
    switch (tableUse) {
        case 'TableForManagement':
            if (isVisible) {
                return 'visible';
            }
            return 'hidden';
        case 'AddTableButton':
            return 'visible';
        case 'TableForEditCanvas':
            return 'visible';
        default:
            return 'visible';
    }
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

const textBaseStyle = css<Pick<IChair, 'relativeSize'>>`
    ${({ relativeSize }) => {
        const BASE_CHAIR_FONT_SIZE = 1.5;
        return `font-size: ${BASE_CHAIR_FONT_SIZE * relativeSize}em;`;
    }}
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IBaseChair {
    isSeated: boolean;
    tableUse: tableUseTypes;
    isVisible: boolean;
}

const BaseChair = styled.div<IBaseChair>`
    ${({ isSeated, tableUse, isVisible }) => `visibility: ${getChairVisibility(
        tableUse,
        isVisible,
    )};
    background-color: ${getChairColor(isSeated, tableUse, isVisible)};`}
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

const LeftRightEye = styled(Eye)`
    color: black;
    width: 75%;
    height: 100%;
    margin: auto;
    display: block;
`;

const TopBottomEye = styled(Eye)`
    color: black;
    width: 25%;
    height: 100%;
    margin: auto;
    display: block;
`;

const RoundEye = styled(Eye)`
    color: black;
    width: 40%;
    height: 100%;
    margin: auto;
    display: block;
`;

const LeftRightEyeSlash = styled(EyeSlash)`
    width: 75%;
    color: white;
    height: 100%;
    margin: auto;
    display: block;
`;

const TopBottomEyeSlash = styled(EyeSlash)`
    width: 25%;
    color: white;
    height: 100%;
    margin: auto;
    display: block;
`;

const RoundEyeSlash = styled(EyeSlash)`
    width: 40%;
    color: white;
    height: 100%;
    margin: auto;
    display: block;
`;

const ChairWrapperForClick = styled.div`
    outline: none;
`;
