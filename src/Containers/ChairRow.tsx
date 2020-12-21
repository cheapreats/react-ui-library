import React from 'react';
import styled from 'styled-components';
import { Chair, IChair } from './Chair';

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';

// Define a type for the getChairsTopBottom function
type getChairsTopBottomType = (array: Array<IChair>) => JSX.Element[];

// Define a type for the getChairsLeftRight function
type getChairsLeftRightType = (array: Array<IChair>) => JSX.Element[];

// Define a type for the generateKey function
type generateKeyType = (pre: string) => string;

// Define a type for the chairRowSwitch function
type chairRowSwitchType = () => JSX.Element;

export interface IChairRow {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
}

/**
 * Primary UI component for user interaction
 */

export const ChairRow: React.FC<IChairRow> = ({
    position = 'top',
    chairs = [],
    ...props
}) => {
    /**
     * Returns the chairs for the top and bottom rows
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - chairs on top and bottom row
     */
    const getChairsTopBottom: getChairsTopBottomType = (array) => {
        return array.map((i) => (
            <ChairCol key={generateKey(position + i)}>
                <Chair
                    position={i.position}
                    occupiedBy={i.occupiedBy}
                    isSeated={i.isSeated}
                    isVisible={i.isVisible}
                />
            </ChairCol>
        ));
    };

    /**
     * Return the chairs for the left and right rows
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - chairs on right and left row
     */
    const getChairsLeftRight: getChairsLeftRightType = (array) => {
        return array.map((i) => (
            <SideChairRow key={generateKey(position + i)}>
                <SideChairCentering>
                    <Chair
                        position={i.position}
                        occupiedBy={i.occupiedBy}
                        isSeated={i.isSeated}
                        isVisible={i.isVisible}
                    />
                </SideChairCentering>
            </SideChairRow>
        ));
    };

    /**
     * Generates a unique key based on a string and a current timestamp
     * @param pre - a string to append to timestamp
     * @returns {string} a unique key
     */
    const generateKey: generateKeyType = (pre) => {
        return `${pre}_${Math.random()}`;
    };

    /**
     * Returns a JSX element for the ChairRow with the correct styles
     * based on whether position is top/bottom or left/right
     * @returns {JSX.Element} the correct JSX.Element based on position
     */
    const chairRowSwitch: chairRowSwitchType = () => {
        switch (position) {
            case 'top':
                return (
                    <div>
                        <TopBottomRow
                            chairs={chairs}
                            chairNumOnSide={chairs.length}
                        >
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'bottom':
                return (
                    <div>
                        <TopBottomRow
                            chairs={chairs}
                            chairNumOnSide={chairs.length}
                        >
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'left':
                return <div>{getChairsLeftRight(chairs)}</div>;
            case 'right':
                return <div>{getChairsLeftRight(chairs)}</div>;
            default:
                return <div />;
        }
    };

    return <div {...props}>{chairRowSwitch()}</div>;
};

// Define a type for the isSideChairs function
type isSideChairsType = (chairs: Array<IChair>) => boolean;

/**
 * Determines if there are any chairs on the left side of the table
 * to correct top or bottom row's margins
 * @return {boolean} - Returns true if there are left chairs, otherwise false
 */
const isSideChairs: isSideChairsType = (chairs) => {
    const left = chairs.map((i) => i.position === 'left').length;
    return left > 0;
};

/**
 * variables for the styled components
 */

interface ITopBottomRow {
    chairNumOnSide: number;
    chairs: Array<IChair>;
}

const TopBottomRow = styled.div<ITopBottomRow>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    margin-left: ${({ chairs }) => (isSideChairs(chairs) ? 1.5 : -1)}rem;
`;

const ChairCol = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
`;

const SideChairRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    height: 20rem;
`;

const SideChairCentering = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;
