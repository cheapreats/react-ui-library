import React from 'react';
import styled from 'styled-components';
import { Chair } from './Chair';

export interface IChairRow {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position,
    /**
     * Array of chairs
     */
    chairs:Array<{position:string, isSeated: boolean, occupiedBy:string}>,
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
           chairs=Array,
           sideChairs=false,
           ...props
       }) => {


    /**
     * This function will return chairs for top and bottom rows
     * @param array {array} - array of chairs
     * @return {JSX.Element} - chairs on top and bottom row
     */
    function getChairsTopBottom(array:Array<any>){
        const chairs= array.map( (i)=>
            <ChairCol key={i.key}>
                <Chair position={position} occupiedBy={i.occupiedBy} isSeated={i.isSeated} />
            </ChairCol>
        );
        return chairs;
    }

    /**
     * This function will return chairs for left and right rows
     * @param array {array} - array of chairs
     * @return {JSX.Element} - chairs on right and left row
     */
    function getChairsLeftRight(array:Array<any>){
        const chairs= array.map( (i)=>
            <SideChairRow key={i.key}>
                <SideChairCentering>
                    <Chair position={position} occupiedBy={i.occupiedBy} isSeated={i.isSeated} />
                </SideChairCentering>
            </SideChairRow>
        );
        return chairs;
    }

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
                        <TopBottomRow chairNumOnSide={chairs.length} sideChairs={sideChairs} >
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'bottom':
                return (
                    <div>
                        <TopBottomRow chairNumOnSide={chairs.length} sideChairs={sideChairs} >
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'left':
                return (
                    <div>
                        {getChairsLeftRight(chairs)}
                    </div>
                );
            case 'right':
                return (
                    <div>
                        {getChairsLeftRight(chairs)}
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