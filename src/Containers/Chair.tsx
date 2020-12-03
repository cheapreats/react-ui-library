import React from 'react';
import styled, { css, useTheme } from 'styled-components';

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';

export interface IChair {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position;
    /**
     * Boolean value for whether someone is seated in the chair
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
     * Boolean value for whether the chair is round.
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
    if (isRound) {
        return (
            <div {...props}>
                <RoundChair isSeated={isSeated} isVisible={isVisible}>
                    <RoundText>{occupiedBy}</RoundText>
                </RoundChair>
            </div>
        );
    }

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

/**
 * This function will determine what color the chair will be
 * @param isSeated {boolean} - indicated is chair is taken/occupied
 * @return {string} - Hexadecimal of color
 */
function getChairColor(isSeated: boolean) {
    const { colors } = useTheme();

    if (isSeated) {
        return colors.chairOccupiedBackground;
    }

    return colors.chairTableBackground;
}

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
    color: black;
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
