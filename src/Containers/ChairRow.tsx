import React from 'react';
import styled from 'styled-components';
import { Chair } from './Chair';

export interface IChairRow {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position,
    /**
     * The number of chairs for top
     */
    chairsTop:number,
    /**
     * The number of chairs for bottom
     */
    chairsBottom:number,
    /**
     * The number of chairs for left
     */
    chairsLeft:number,
    /**
     * The number of chairs for right
     */
    chairsRight:number,
    /**
     * Will indicate if there are side chairs in the table
     */
    sideChairs:boolean,
}

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * Primary UI component for user interaction
 */
export const ChairRow: React.FC<IChairRow>
    = ({
        position = 'top',
        chairsRight=0,
        chairsTop=0,
        chairsLeft=0,
        chairsBottom=0,
        sideChairs=false,
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
                return (
                    <div>
                        <TopBottomRow chairNumOnSide={chairsTop} sideChairs={sideChairs} >
                            {[...Array(chairsTop)].map((e,i) => (
                                    <ChairCol key={i}>
                                        <Chair position={position} />
                                    </ChairCol>
                                )
                            )}
                        </TopBottomRow>
                    </div>
                );
            case 'bottom':
                return (
                    <div>
                        <TopBottomRow chairNumOnSide={chairsBottom} sideChairs={sideChairs}>
                            {[...Array(chairsBottom)].map((e,i) => (
                                <ChairCol key={i}>
                                    <Chair position={position} />
                                </ChairCol>
                            )
                            )}
                        </TopBottomRow>
                    </div>
                );
            case 'left':
                return (
                    <div>
                        {[...Array(chairsLeft)].map((e,i) => (
                                <SideChairRow key={i}>
                                    <SideChairCentering>
                                        <Chair position={position} />
                                    </SideChairCentering>
                                </SideChairRow>
                            )
                        )}
                    </div>
                );
            case 'right':
                return (
                    <div>
                        {[...Array(chairsRight)].map((e,i) => (
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

/**
 * variables for the styled components
 */
const TopBottomRow=styled.div`

    display: flex;
    flex-wrap: wrap;
    width: ${({chairNumOnSide}) => chairNumOnSide * 20}rem;
    margin-left: ${ ({sideChairs}) => sideChairs ? 1.5 : -1 }rem;
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