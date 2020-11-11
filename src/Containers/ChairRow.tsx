import React from 'react';
import styled from 'styled-components';
import { Chair } from './Chair';

export interface IChairRow {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position,
    /**
     * The number of chairs for the ChairRow
     */
    chairNumOnSide: number,
}

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * Primary UI component for user interaction
 */
export const ChairRow: React.FC<IChairRow>
    = ({
        position = 'top',
        chairNumOnSide = 0,
        ...props
    }) => {

        /**
         * Returns a JSX element for the ChairRow with the correct styles
         * based on whether position is top/bottom or left/right
         * @returns {JSX.Element} the correct JSX.Element based on position
         */
        function chairRowSwitch(): JSX.Element
        {
            switch (position) {
            case 'top':
            case 'bottom':
                return (
                    <div>
                        <TopBottomRow chairNumOnSide={chairNumOnSide}>
                            {[...Array(chairNumOnSide)].map((e,i) => (
                                <ChairCol key={i}>
                                    <Chair position={position} />
                                </ChairCol>
                            )
                            )}
                        </TopBottomRow>
                    </div>
                );
            case 'left':
            case 'right':
                return (
                    <div>
                        {[...Array(chairNumOnSide)].map((e,i) => (
                            <SideChairRow key={i}>
                                <SideChairCentering>
                                    <Chair position={position} />
                                </SideChairCentering>
                            </SideChairRow>
                        )
                        )}
                    </div>
                );
            default:
                return <div />;
            }
        }
        return (
            <div>
                {chairRowSwitch()}
            </div>
        );
    };

const TopBottomRow=styled.div`

    display: flex;
    flex-wrap: wrap;
    width: ${({chairNumOnSide}) => chairNumOnSide * 20}rem;
    margin-left: 1.5rem;
`;

const ChairCol=styled.div`

    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
`;

const SideChairRow=styled.div`

   display: flex;
   flex-wrap: wrap;
   margin-right: -15px;
   margin-left: -15px;
   height: 20rem;
`;

const SideChairCentering=styled.div`

    margin-top: auto;
    margin-bottom: auto;
`;