import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Chair, IChair } from '@Containers/Chair';

// Define a type for the getOccupancyColor function
type getOccupancyColorType = () => string;

// Define a type for the getChairs function
type getChairsType = (array: Array<IChair>) => JSX.Element[];

// Define a type for the generateKey function
type generateKeyType = (pre: string) => string;

export interface ICircleTable2 {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
}

enum occupancyStatusTypes {
    Vacant = 'Vacant',
    Reserved = 'Reserved',
    Occupied = 'Occupied',
}

/**
 * Primary UI component for user interaction
 */
export const CircleTable2: React.FC<ICircleTable2> = ({
    tableID = 'T1',
    chairs = [],
    partyName = 'Null',
    occupancyStatus = occupancyStatusTypes.Vacant,
    ...props
}) => {
    const { colors } = useTheme();

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

    /**
     * Returns a JSX element array containing the Chairs and ChairWrappers
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - Chairs and ChairWrappers for the table
     */
    const getChairs: getChairsType = (array) => {
        return array.map((item, index) => (
            <ChairWrapper
                numOfChairs={chairs.length}
                counter={index + 1}
                key={generateKey(item.position + index)}
                position={item.position}
            >
                <Chair
                    position={item.position}
                    occupiedBy={item.occupiedBy}
                    isSeated={item.isSeated}
                    isVisible={item.isVisible}
                    isRound={item.isRound}
                />
            </ChairWrapper>
        ));
    };

    /**
     * Generates a unique key based on a string and a random number
     * @param pre - a string to append to random number
     * @returns {string} a unique key
     */
    const generateKey: generateKeyType = (pre) => {
        return `${pre}_${Math.random()}`;
    };

    // Calculate the tangent based on the number of chairs in the array
    const tan = Math.tan(Math.PI / chairs.length);

    return (
        <div {...props}>
            <TableBody
                numOfChairs={chairs.length}
                chairTableBackground={colors.chairTableBackground}
                tangentValue={tan}
                occupancyColor={getOccupancyColor()}
            >
                {getChairs(chairs)}

                <TableInfo>
                    <div>
                        {tableID}
                        <br />
                        {partyName}
                        <br />
                        <Status occupancyColor={getOccupancyColor()}>
                            {occupancyStatus}
                        </Status>
                        <br />
                    </div>
                </TableInfo>
            </TableBody>
        </div>
    );
};

// Define a type for Position to restrict to four specific values
type Position = 'top' | 'bottom' | 'left' | 'right';

// Define a type for the getPositionValue function
type getPositionValueType = (position: Position) => number;

/**
 * Returns a number value for each position (right, left, top, bottom)
 * that will allow chairs to be positioned on the correct side of the
 * table when there are less than three chairs at a CircleTable2 component
 *
 * @param position - the position on the table ("top", "bottom", "left", "right")
 * @return {number} - the value associated with a given position
 */
const getPositionValue: getPositionValueType = (position) => {
    switch (position) {
        case 'top':
            return 0.75;
        case 'bottom':
            return 0.25;
        case 'left':
            return 0.5;
        default:
            return 1;
    }
};

/**
 * Variables for the styled components
 */

interface ITableBody {
    numOfChairs: number;
    tangentValue: number;
    occupancyColor: string;
    chairTableBackground: string;
}

const TableBody = styled.div<ITableBody>`
    --d: 6.5em; /* chair size */
    --rel: 1; /* how much extra space we want between images, 1 = one chair size */
    --tan: ${({ numOfChairs, tangentValue }) =>
        numOfChairs < 3 ? 1.73 : tangentValue};
    --r: calc(
        ${({ numOfChairs }) => (numOfChairs < 4 ? 1.0 : 0.5)} * (1 + var(--rel)) *
            var(--d) / var(--tan)
    ); /* circle radius */
    --s: calc(2 * var(--r)); /* container size */
    position: relative;
    width: var(--s);
    height: var(--s);
    background: ${({ chairTableBackground }) => chairTableBackground};
    border-radius: 50%;
    border-style: solid;
    border-color: ${({ occupancyColor }) => occupancyColor};
    border-width: 1.5em;
    margin: 3em;
`;

interface IChairWrapper {
    counter: number;
    numOfChairs: number;
    position: Position;
}

const ChairWrapper = styled.div<IChairWrapper>`
    --d: 6.5em; /* chair size */
    --rel: 1; /* how much extra space we want between images, 1 = one image size */
    --r: calc(
        ${({ numOfChairs }) => (numOfChairs < 4 ? 1.0 : 0.5)} * (1 + var(--rel)) *
            var(--d) / var(--tan)
    ); /* circle radius */
    position: absolute;
    top: 50%;
    left: 50%;
    margin: calc(-0.5 * var(--d));
    width: var(--d);
    height: var(--d);
    --az: calc(
        ${({ counter, position, numOfChairs }) =>
                numOfChairs < 3
                    ? getPositionValue(position)
                    : counter * 1}turn /
            ${({ numOfChairs }) => (numOfChairs < 3 ? 1 : numOfChairs)}
    );
    transform: rotate(var(--az)) translate(var(--r))
        rotate(calc(-1 * var(--az)));
`;

const TableInfo = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.background};
    padding: calc(var(--s) / 2.4) 0;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    font-weight: bold;
`;

interface IStatus {
    occupancyColor: string;
}

const Status = styled.div<IStatus>`
    color: ${({ occupancyColor }) => occupancyColor};
`;
