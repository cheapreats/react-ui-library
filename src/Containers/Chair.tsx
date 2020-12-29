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
    const getRoundChair: getRoundChairType = () => {
        return (
            <div {...props}>
                <RoundChair
                    relativeSize={relativeSize}
                    isSeated={isSeated}
                    isVisible={isVisible}
                >
                    <RoundText relativeSize={relativeSize}>
                        {occupiedBy}
                    </RoundText>
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
                    relativeSize={relativeSize}
                    isSeated={isSeated}
                    isVisible={isVisible}
                    position={position}
                >
                    <StyledText position={position} relativeSize={relativeSize}>
                        {occupiedBy}
                    </StyledText>
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

const topChairStyle = css<Pick<IChair, 'relativeSize'>>`
    border-top-left-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    border-top-right-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    height: ${({ relativeSize }) => relativeSize * 3}rem;
    width: ${({ relativeSize }) => relativeSize * 10}rem;
    margin-bottom: ${({ relativeSize }) => relativeSize * 0.25}rem;
    margin-left: auto;
    margin-right: auto;
`;

const leftChairStyle = css<Pick<IChair, 'relativeSize'>>`
    border-top-left-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    border-bottom-left-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    width: ${({ relativeSize }) => relativeSize * 3}rem;
    height: ${({ relativeSize }) => relativeSize * 10}rem;
    margin: ${({ relativeSize }) => relativeSize * 1.25}rem;
`;

const rightChairStyle = css<Pick<IChair, 'relativeSize'>>`
    border-top-right-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    border-bottom-right-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    width: ${({ relativeSize }) => relativeSize * 3}rem;
    height: ${({ relativeSize }) => relativeSize * 10}rem;
    margin: ${({ relativeSize }) => relativeSize * 1.25}rem;
`;

const bottomChairStyle = css<Pick<IChair, 'relativeSize'>>`
    border-bottom-left-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    border-bottom-right-radius: ${({ relativeSize }) => relativeSize * 3}rem;
    height: ${({ relativeSize }) => relativeSize * 3}rem;
    width: ${({ relativeSize }) => relativeSize * 10}rem;
    margin-top: ${({ relativeSize }) => relativeSize * 0.25}rem;
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

const textTopBottomStyle = css<Pick<IChair, 'relativeSize'>>`
    ${textBaseStyle};
    width: ${({ relativeSize }) => relativeSize * 9}rem;
    margin-left: ${({ relativeSize }) => relativeSize * 0.65}rem;
    padding-top: ${({ relativeSize }) => relativeSize * 0.35}rem;
`;

const textLeftRightStyle = css<Pick<IChair, 'relativeSize'>>`
    ${textBaseStyle};
    height: 90%;
    padding-top: ${({ relativeSize }) => relativeSize * 0.5}rem;
    margin-left: ${({ relativeSize }) => relativeSize * 0.5}rem;
    writing-mode: vertical-rl;
`;

const textRoundStyle = css<Pick<IChair, 'relativeSize'>>`
    ${textBaseStyle};
    padding: ${({ relativeSize }) => relativeSize * 2.0}em 0;
`;

const BaseChair = styled.div<Pick<IChair, 'isVisible' | 'isSeated'>>`
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    background-color: ${({ isSeated }) => getChairColor(isSeated)};
`;

const RoundChair = styled(BaseChair)<Pick<IChair, 'relativeSize'>>`
    border-radius: 50%;
    width: ${({ relativeSize }) => relativeSize * 6.5}rem;
    height: ${({ relativeSize }) => relativeSize * 6.5}rem;
    border: ${({ relativeSize }) => relativeSize * 2}px solid black;
`;

const PositionChair = styled(BaseChair)<
    Pick<IChair, 'position' | 'relativeSize'>
>`
    ${({ position }) =>
        ({
            top: topChairStyle,
            bottom: bottomChairStyle,
            left: leftChairStyle,
            right: rightChairStyle,
        }[position])};
`;

const StyledText = styled.div<Pick<IChair, 'position' | 'relativeSize'>>`
    ${({ position }) =>
        ({
            top: textTopBottomStyle,
            bottom: textTopBottomStyle,
            left: textLeftRightStyle,
            right: textLeftRightStyle,
        }[position])};
`;

const RoundText = styled.div<Pick<IChair, 'relativeSize'>>`
    ${textRoundStyle};
`;
