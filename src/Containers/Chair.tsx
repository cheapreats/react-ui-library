import React from 'react';
import styled, {useTheme} from 'styled-components';

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

        const {colors} = useTheme();

        /**
         * Returns a JSX element for the Chair with the correct styles
         * @returns {JSX.Element} the correct JSX.Element based on position
         */
        function chairSwitch()
        {
            switch (position) {
            case 'top':
                return <TopChair chairTableBackground={colors.chairTableBackground} />;
            case 'bottom':
                return <BottomChair chairTableBackground={colors.chairTableBackground} />;
            case 'left':
                return <LeftChair chairTableBackground={colors.chairTableBackground} />;
            case 'right':
                return <RightChair chairTableBackground={colors.chairTableBackground} />;
            default:
                return null;
            }
        }
        return (
            <div>
                {chairSwitch()}
            </div>
        );
    };

interface IBaseChair {
    chairTableBackground: string,
}

const BaseChair=styled.div<IBaseChair>`
    
    background-color: ${({chairTableBackground}) => chairTableBackground }; 
`;

const TopChair=styled(BaseChair)`

    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-bottom: 0.25rem;
    margin-left: auto;
    margin-right: auto;        
`;

const LeftChair=styled(BaseChair)`

    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin-top:auto;
    margin-bottom: auto;
    margin-right: 1.25rem;
    margin-left: 1rem;
`;

const RightChair=styled(BaseChair)`

    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    width: 2rem;
    height: 10rem;
    margin-top:auto;
    margin-bottom: auto;
    margin-left: 1.25rem;
`;

const BottomChair=styled(BaseChair)`

    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    height: 2rem;
    width: 10rem;
    margin-top: 0.25rem;
    margin-left: auto;
    margin-right: auto;
`;


