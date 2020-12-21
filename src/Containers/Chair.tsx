import React from 'react';
import styled, { css, useTheme } from 'styled-components';

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';

// Define a type for the getRoundChair function
type getRoundChairType = () => JSX.Element;

// Define a type for the getPositionChair function
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
    ...props
}) => {
    /**
     * Returns a JSX.Element for the Chair with RoundChair styles
     * @returns {JSX.Element}
     *
     */
    const getRoundChair: getRoundChairType = () => {
        return (
            <div {...props}>
                <RoundChair isSeated={isSeated} isVisible={isVisible}>
                    <RoundText>{occupiedBy}</RoundText>
                </RoundChair>
            </div>
        );
    };

    /**
     * Returns a JSX.Element for the Chair with the correct styles based on position
     * @returns {JSX.Element}
     *
     */
    const getPositionChair: getPositionChairType = () => {
        return (
            <div {...props}>
                <PositionChair
                    isSeated={isSeated}
                    isVisible={isVisible}
                    position={position}
                >
                    <StyledText position={position}>{occupiedBy}</StyledText>
                </PositionChair>
            </div>
        );
    };

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

/**
 * variables for the styled components
 */

const topChairStyle = css`
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-bottom: 0.25rem;
    margin-left: auto;
    margin-right: auto;
`;

const leftChairStyle = css`
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin: 1.25rem;
`;

const rightChairStyle = css`
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin: 1.25rem;
`;

const bottomChairStyle = css`
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-top: 0.25rem;
    margin-left: auto;
    margin-right: auto;
`;

const textBaseStyle = css`
    color: ${({ theme }) => theme.colors.background};
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const textTopBottomStyle = css`
    ${textBaseStyle};
    width: 9rem;
    margin-left: 0.75rem;
    padding-top: 0.35rem;
`;

const textLeftRightStyle = css`
    ${textBaseStyle};
    height: 90%;
    padding-top: 0.5rem;
    margin-left: 0.5rem;
    writing-mode: vertical-rl;
`;

const textRoundStyle = css`
    ${textBaseStyle};
    padding: 2.5em 0;
`;

const BaseChair = styled.div<Pick<IChair, 'isVisible' | 'isSeated'>>`
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    background-color: ${({ isSeated }) => getChairColor(isSeated)};
`;

const RoundChair = styled(BaseChair)`
    border-radius: 50%;
    width: 6.5rem;
    height: 6.5rem;
    border: 2px solid black;
`;

const PositionChair = styled(BaseChair)<Pick<IChair, 'position'>>`
    ${({ position }) =>
        ({
            top: topChairStyle,
            bottom: bottomChairStyle,
            left: leftChairStyle,
            right: rightChairStyle,
        }[position])};
`;

const StyledText = styled.div<Pick<IChair, 'position'>>`
    ${({ position }) =>
        ({
            top: textTopBottomStyle,
            bottom: textTopBottomStyle,
            left: textLeftRightStyle,
            right: textLeftRightStyle,
        }[position])};
`;

const RoundText = styled.div`
    ${textRoundStyle};
`;
