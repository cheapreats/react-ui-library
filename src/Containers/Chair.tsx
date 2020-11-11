import React from 'react';
import styled from 'styled-components';

export interface IChair {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position,
    /**
     * Boolean value for whether someone is seated in the chair
     * True if someone is seated in the chair, otherwise false
     */
    isSeated?: boolean,

}

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';


/**
 * Primary UI component for user interaction
 */
export const Chair: React.FC<IChair>
    = ({
        position = 'top',
        isSeated = false,
        ...props
    }) => {

        function chairSwitch(): JSX.Element
        {
            switch (position) {
            case 'top':
                return <TopChair />;
            case 'bottom':
                return <BottomChair />;
            case 'left':
                return <div><LeftChair /></div>;
            case 'right':
                return <RightChair />;
            default:
                return <div />;

            }
        }

        return (
            <div>
                {chairSwitch()}
            </div>

        );

    };

const TopChair=styled.div`

    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-bottom: 0.25rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #6c757d;         
`;

const LeftChair=styled.div`

    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin-top:auto;
    margin-bottom: auto;
    margin-right: 1.25rem;
    margin-left: 1rem;
    background-color: #6c757d;
`;

const RightChair=styled.div`

    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin-top:auto;
    margin-bottom: auto;
    margin-left: 1.25rem;
    background-color: #6c757d;
`;

const BottomChair=styled.div`

    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-top: 0.25rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #6c757d;
`;


