/**
 * Documentation – the order of chairs are in the chairs array will populate the table from top left to the bottom right
 * “the purpose of the order in the array is to populate the chairs from top left to bottom right”
 */
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Chair, IChair } from '@Containers/Chair';

// Define a type for the getSquareTableSize function
type getSquareTableSizeType = (
    top: number,
    bottom: number,
    left: number,
    right: number,
) => number;

// Define a type for the getRectangleTop function
type getRectangleTopType = (top: number, bottom: number) => number;

// Define a type for the getRectangleSide function
type getRectangleSideType = (left: number, right: number) => number;

// Define a type for the getOccupancyColor function
type getOccupancyColorType = () => string;

// Define a type for the fillArray function
type fillArrayType = (
    array: Array<IChair>,
    targetSize: number,
    position: Position,
) => void;

export interface ISquareTable {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
    /**
     * Whether the table is a square
     */
    isSquare: boolean;
}

enum occupancyStatusTypes {
    Vacant = 'Vacant',
    Reserved = 'Reserved',
    Occupied = 'Occupied',
}

/**
 * Primary UI component for user interaction
 * Square Table
 */
export const SquareTable: React.FC<ISquareTable> = ({
    tableID = 'T1',
    partyName = 'Null',
    occupancyStatus = occupancyStatusTypes.Vacant,
    chairs = [],
    isSquare = false,
    ...props
}) => {
    /**
     * Split chairs array into four arrays for each table side
     */
    const topArray = chairs.filter((i) => i.position === 'top');
    const rightArray = chairs.filter((i) => i.position === 'right');
    const leftArray = chairs.filter((i) => i.position === 'left');
    const bottomArray = chairs.filter((i) => i.position === 'bottom');

    /**
     * Get proper theme color for the table
     */
    const { colors } = useTheme();

    /**
     * Determines how many chairs to put per each side
     * of a square table (left, right, top, bottom)
     * @param top {number} - Number of chairs on top side
     * @param bottom {number} - Number of chairs on bottom side
     * @param left {number} - Number of chairs on left side
     * @param right {number} - Number of chairs on right side
     * @return {number} - The largest number of chairs
     */
    const getSquareTableSize: getSquareTableSizeType = (
        top,
        bottom,
        left,
        right,
    ) => {
        const maxSideValue = Math.max(top, bottom, left, right);
        return maxSideValue > 0 ? maxSideValue : 1;
    };

    const squareTableSize = getSquareTableSize(
        topArray.length,
        bottomArray.length,
        leftArray.length,
        rightArray.length,
    );

    /**
     * Determines how many chairs to put on the top and bottom sides
     * of a rectangle table (top, bottom)
     * @param top {number} - Number of chairs on top side
     * @param bottom {number} - Number of chairs on bottom side
     * @return {number} - The largest number of chairs
     */
    const getRectangleTopSize: getRectangleTopType = (top, bottom) => {
        const maxSideValue = Math.max(top, bottom);
        return maxSideValue > 0 ? maxSideValue : 1;
    };

    const rectangleTopSize = getRectangleTopSize(
        topArray.length,
        bottomArray.length,
    );

    /**
     * Determines how many chairs to put on the left and right sides
     * of a rectangle table (left, right)
     * @param left {number} - Number of chairs on left side
     * @param right {number} - Number of chairs on right side
     * @return {number} - The largest number of chairs
     */
    const getRectangleSideSize: getRectangleSideType = (left, right) => {
        const maxSideValue = Math.max(left, right);
        return maxSideValue > 0 ? maxSideValue : 1;
    };

    const rectangleSideSize = getRectangleSideSize(
        leftArray.length,
        rightArray.length,
    );

    /**
     * Checks an array to see if it has fewer chairs than the target size
     * and adds invisible chairs if needed so array size matches target size
     */
    const fillArray: fillArrayType = (array, size, position) => {
        while (array.length < size) {
            array.push({
                position: position,
                isSeated: false,
                occupiedBy: '',
                isVisible: false,
            });
        }
    };

    // Add empty/invisible chairs to the arrays as needed so there are chairs at each
    // spot on the table
    if (isSquare) {
        fillArray(topArray, squareTableSize, 'top');
        fillArray(bottomArray, squareTableSize, 'bottom');
        fillArray(leftArray, squareTableSize, 'left');
        fillArray(rightArray, squareTableSize, 'right');
    } else {
        fillArray(topArray, rectangleTopSize, 'top');
        fillArray(bottomArray, rectangleTopSize, 'bottom');
        fillArray(leftArray, rectangleSideSize, 'left');
        fillArray(rightArray, rectangleSideSize, 'right');
    }

    /**
     * Determines the correct color for Status and ColorDiv based on occupancyStatus
     * and returns the hexadecimal color value as a string
     *
     * @return {string} - Hexadecimal color value
     */
    const getOccupancyColor: getOccupancyColorType = () => {
        switch (occupancyStatus) {
            case occupancyStatusTypes.Vacant:
                return colors.occupancyStatusColors.Vacant;

            case occupancyStatusTypes.Reserved:
                return colors.occupancyStatusColors.Reserved;

            case occupancyStatusTypes.Occupied:
                return colors.occupancyStatusColors.Occupied;

            default:
                return '';
        }
    };

    return (
        <div {...props}>
            {/** chairs top */}
            <ChairRow position="top" chairs={topArray} />

            {/** table itself */}
            <div>
                <Row>
                    {/** chairs left */}
                    <ChairRow position="left" chairs={leftArray} />

                    <TableBody
                        chairNumOnSide={
                            isSquare ? squareTableSize : rectangleSideSize
                        }
                        chairNumOnTop={
                            isSquare ? squareTableSize : rectangleTopSize
                        }
                    >
                        <Row>
                            <TableInfo>
                                <div>
                                    {`${tableID}\n${partyName}`}
                                    <Status
                                        occupancyColor={getOccupancyColor()}
                                    >
                                        {occupancyStatus}
                                    </Status>
                                </div>
                            </TableInfo>
                            <ColorDiv
                                chairNumOnSide={
                                    isSquare
                                        ? squareTableSize
                                        : rectangleSideSize
                                }
                                occupancyColor={getOccupancyColor()}
                            />
                        </Row>
                    </TableBody>

                    {/** chairs right */}
                    <ChairRow position="right" chairs={rightArray} />
                </Row>
            </div>

            {/** chairs bottom */}
            <ChairRow position="bottom" chairs={bottomArray} />
        </div>
    );
};

/**
 * variables for the styled components
 */

interface ITableBody {
    chairNumOnSide: number;
    chairNumOnTop: number;
}

const TableBody = styled.div<ITableBody>`
    height: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    width: ${({ chairNumOnTop }) => chairNumOnTop * 20}rem;
    border-radius: 3rem;
    background-color: #6c757d;
`;

interface IColorDiv {
    chairNumOnSide: number;
    occupancyColor: string;
}

const ColorDiv = styled.div<IColorDiv>`
    height: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    width: 3rem;
    margin-left: auto;
    margin-right: 0.95rem;
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    background-color: ${({ occupancyColor }) => occupancyColor};
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;

const TableInfo = styled.div`
    color: ${({ theme }) => theme.colors.background};
    font-weight: bold;
    margin-top: 2rem;
    margin-left: 3rem;
    white-space: pre-line;
`;

interface IStatus {
    occupancyColor: string;
}

const Status = styled.div<IStatus>`
    color: ${({ occupancyColor }) => occupancyColor};
`;

// Typings and Interface for the ChairRow component

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

interface IChairRow {
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
 * ChairRow component for chair placement around tables
 */
const ChairRow: React.FC<IChairRow> = ({
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
                        <TopBottomRow chairNumOnSide={chairs.length}>
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'bottom':
                return (
                    <div>
                        <TopBottomRow chairNumOnSide={chairs.length}>
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

/**
 * variables for the styled components for the ChairRow component
 */

interface ITopBottomRow {
    chairNumOnSide: number;
}

const TopBottomRow = styled.div<ITopBottomRow>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ chairNumOnSide }) => chairNumOnSide * 20}rem;
    margin-left: 1.5rem;
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
