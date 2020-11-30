import React from 'react';
import styled, { useTheme } from 'styled-components';

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
}

/**
 * Primary UI component for user interaction
 */
export const Chair: React.FC<IChair> = ({
    position = 'top',
    isSeated = false,
    occupiedBy = '',
    isVisible = true,
    ...props
}) => {

    /**
     * Returns a JSX element for the Chair with the correct styles
     * @returns {JSX.Element} the correct JSX.Element based on position,
     * or null if no position is provided
     */
    const chairSwitch: () => JSX.Element | null = () => {
        switch (position) {
            case 'top':
                return (
                    <TopChair isSeated={isSeated} isVisible={isVisible}>
                        <TextTopBottom>{occupiedBy}</TextTopBottom>
                    </TopChair>
                );
            case 'bottom':
                return (
                    <BottomChair isSeated={isSeated} isVisible={isVisible}>
                        <TextTopBottom>{occupiedBy}</TextTopBottom>
                    </BottomChair>
                );
            case 'left':
                return (
                    <LeftChair isSeated={isSeated} isVisible={isVisible}>
                        <TextLeftRight>{occupiedBy}</TextLeftRight>
                    </LeftChair>
                );
            case 'right':
                return (
                    <RightChair isSeated={isSeated} isVisible={isVisible}>
                        <TextLeftRight>{occupiedBy}</TextLeftRight>
                    </RightChair>
                );

            default:
                return null;
        }

        return <div>{chairSwitch()}</div>;
    };
    return <div {...props}>{chairSwitch()}</div>;
};

/**
 * variables for the styled components
 */
interface IBaseChair {
    chairTableBackground: string;
    isSeated: boolean;
    isVisible: boolean;
}

const BaseChair = styled.div<IBaseChair>`
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    background-color: ${({ isSeated }) =>
        isSeated
            ? 'red'
            : 'black'};
`;

const TopChair = styled(BaseChair)`
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-bottom: 0.25rem;
    margin-left: auto;
    margin-right: auto;
`;

const LeftChair = styled(BaseChair)`
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin: 1.25rem;
`;

const RightChair = styled(BaseChair)`
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin: 1.25rem;
`;

const BottomChair = styled(BaseChair)`
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-top: 0.25rem;
    margin-left: auto;
    margin-right: auto;
`;

const TextTopBottom = styled.div`
    width: 9rem;
    margin-left: 0.75rem;
    padding-top: 0.35rem;
    color: black;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const TextLeftRight = styled.div`
    height: 90%;
    padding-top: 0.5rem;
    margin-left: 0.5rem;
    text-align: center;
    color: black;
    writing-mode: vertical-rl;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
