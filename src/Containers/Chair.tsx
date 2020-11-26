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
}

/**
 * Primary UI component for user interaction
 */
export const Chair: React.FC<IChair> = ({
    position = 'top',
    isSeated = false,
    occupiedBy = '',
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
                    <TopChair isSeated={isSeated}>
                        <TextTopBottom>{occupiedBy}</TextTopBottom>
                    </TopChair>
                );
            case 'bottom':
                return (
                    <BottomChair isSeated={isSeated}>
                        <TextTopBottom>{occupiedBy}</TextTopBottom>
                    </BottomChair>
                );
            case 'left':
                return (
                    <LeftChair isSeated={isSeated}>
                        <TextLeftRight>{occupiedBy}</TextLeftRight>
                    </LeftChair>
                );
            case 'right':
                return (
                    <RightChair isSeated={isSeated}>
                        <TextLeftRight>{occupiedBy}</TextLeftRight>
                    </RightChair>
                );

            default:
                return null;
        }

        return <div {...props}>{chairSwitch()}</div>;
    };
    return <div {...props}>{chairSwitch()}</div>;
};

/**
 * variables for the styled components
 */
interface IBaseChair {
    chairTableBackground: string;
}

const BaseChair = styled.div<IBaseChair>`
    background-color: ${({ chairTableBackground }) => chairTableBackground};
`;

const TopChair = styled(BaseChair)`
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-bottom: 0.25rem;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ isSeated }) => (isSeated ? 'red' : '#6c757d')};
`;

const LeftChair = styled(BaseChair)`
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin: 1.25rem;
    background-color: ${({ isSeated }) => (isSeated ? 'red' : '#6c757d')};
`;

const RightChair = styled(BaseChair)`
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1.25rem;
    background-color: ${({ isSeated }) => (isSeated ? 'red' : '#6c757d')};
`;

const BottomChair = styled(BaseChair)`
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-top: 0.25rem;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ isSeated }) => (isSeated ? 'red' : '#6c757d')};
`;

const TextTopBottom = styled.div`
    padding-top: 0.35rem;
    color: black;
    text-align: center;
`;
const TextLeftRight = styled.p`
    height: 100%;
    width: 45%;
    text-align: center;
    color: black;
    writing-mode: vertical-rl;
`;
