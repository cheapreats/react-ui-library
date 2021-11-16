import React from "react";
import {Chair, IChair} from "@Containers";
import styled from "styled-components";

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

type chairsPositionType =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'around';

type getChairsType = () => JSX.Element[];

export interface IOvalTable{
    /* Comment */
    tableID: string;
    /* Array of chairs */
    chairs: Array<IChair>;
    /* The name of the party assigned to the table */
    partyName: string;
    /* The size for the component relative to the parent */
    relativeSize: number;
    /* The use type for the table component (how it will be used in the app) */
    tableUse: tableUseTypes;
    /* Array index for the table */
    tableIndex: number;
    /* Index number for the currently selected table */
    selectedIndex: number;
    // TODO:comments
    isOneSideChairs: boolean;   //TODO: delete isOneSideChairs if unused
    chairsPosition: chairsPositionType;

}

/**
 * Primary UI component for user interaction
 */
export const OvalTable: React.FC<IOvalTable> = ({
        tableID = 'T1',
        chairs = [],
        partyName = 'Null',
        relativeSize = 1.0,
        tableUse = 'TableForManagement',
        tableIndex = 0,
        selectedIndex = -1,
        isOneSideChairs = false,
        chairsPosition = 'top',

        ...props
    }): React.ReactElement => {
    /**
     * Returns an array of chairs elements.
     * @return {JSX.Element[]} - Chairs and ChairWrappers for the table
     */
    const getChairs: getChairsType = () =>
        chairs.map((chair, index) => {
            const {position, occupiedBy, isSeated, isVisible, isRound} = chair;
            return(
            <ChairWrapper
                relativeSize={relativeSize}
                numOfChairs={chairs.length}
                counter={index + 1}
                isOneSideChairs={isOneSideChairs}
                chairPosition={chairsPosition}
            >
                <Chair
                    relativeSize={relativeSize}
                    position={position}
                    occupiedBy={occupiedBy}
                    isSeated={isSeated}
                    isVisible={isVisible}
                    isRound={isRound}
                    tableUse={tableUse}
                    tableIndex={tableIndex}
                    chairIndex={index}
                    selectedIndex={selectedIndex}
                    onChairClick={chair.onChairClick}
                />
            </ChairWrapper>
            )});

    return(
        <div {...props}>
            <TableBody
                relativeSize={relativeSize}
                numOfChairs={chairs.length}
            >
                {getChairs()}
            </TableBody>
        </div>
    );
};

type getTurnValueType = (
    counter: number,
    numOfChairs: number,
    chairPosition: chairsPositionType,
) => string;

type getTranslateValueType = (
    counter: number,
    numOfChairs: number,
    relativeSize: number,
) => string;

const BASE_TABLE_WIDTH = 40;
const HEIGHT_TO_WIDTH_RATIO= 0.7;
const BASE_TABLE_HEIGHT = BASE_TABLE_WIDTH * HEIGHT_TO_WIDTH_RATIO;

// TODO: add description and param to the JSDOC,
/**
 * Returns a string with the correct CSS turn positioning for a given chair
 *
 * @param counter - the chair's number relative to other chairs in the array
 * @param numOfChairs - the total number of chairs at the table
 * @return {string} - the correct turn value for a specific chair
 */
const getTurnValue: getTurnValueType = (counter, numOfChairs, chairPosition) => {
    return `${counter/(numOfChairs)}turn`;
};


/**
 * Calculates the translate distance for a specific chair based on it's position on Oval Table.
 * Divides the table on 4 quadrants. Increasing the angle of rotation (clockwise) will decrease the
 * translation distance in even quadrants, and increase in odd quadrants.
 *
 *
 * Returns a string with the correct CSS translate length.
 *
 * @param chairIndex - the index of the chair in the array + 1
 * @param numOfChairs - the total number of chairs at the table
 * @param relativeSize - The size for the component relative to the parent
 * @return {string} - the correct translate value for a specific chair
 */
const getTranslateValue: getTranslateValueType = (chairIndex, numOfChairs, relativeSize) => {
    const RIGHT_ANGLE = 90;
    const STRAIGHT_ANGLE = 180;
    const FULL_TURN = 360;

    // The angle between chairs according their quantity.
    const SPACING_DIFFERENCE = FULL_TURN / numOfChairs;//TODO: for half table numOfChairs + 1

    // Clockwise rotation angle of current chair from x-axis of 4th quadrant
    const CHAIR_ROTATION_ANGLE = chairIndex * SPACING_DIFFERENCE;

    const BASE_RADIUS = BASE_TABLE_WIDTH / 2

    const WHOLE_COEFFICIENT = 1;
    const HEIGHT_TO_WIDTH_DIFFERENCE =  WHOLE_COEFFICIENT - HEIGHT_TO_WIDTH_RATIO;

    // Reformat any chair rotation angle to not exceed 2 quadrants format (180 degrees).
    let quadrantBasedAngle = CHAIR_ROTATION_ANGLE % STRAIGHT_ANGLE;

    // In odd quadrants (angle > 90) increasing angle increase radius,
    // so the angle can be proportionally inverted. For even quadrants, the angle remain the same.
    if(quadrantBasedAngle > RIGHT_ANGLE){
        quadrantBasedAngle = STRAIGHT_ANGLE - quadrantBasedAngle
    }

    // Calculate the coefficient which may vary from 0.7 to 1, based on angle of the chair.
    const translationCoefficient = WHOLE_COEFFICIENT - (HEIGHT_TO_WIDTH_DIFFERENCE * (quadrantBasedAngle/RIGHT_ANGLE));

    return `
        ${BASE_RADIUS * translationCoefficient * relativeSize}em
    `;
};

interface ITableBody {
    numOfChairs: number;
    relativeSize: number;
}

const TableBody = styled.div<ITableBody>`
  
  ${({ relativeSize }) => {
    const BASE_TABLE_BORDER_WIDTH = 1.5;
    const BASE_TABLE_BODY_MARGIN = 3;

    return `
        border-width: ${relativeSize * BASE_TABLE_BORDER_WIDTH}em;
        margin: ${relativeSize * BASE_TABLE_BODY_MARGIN}em;
        width: ${relativeSize * BASE_TABLE_WIDTH}em;
        height: ${relativeSize * BASE_TABLE_HEIGHT}em;
        `;
  }}
  
  ${({theme}): string =>`
    background-color: ${theme.colors.chairTableBackground};
    border-color: ${theme.colors.occupancyStatusColors.Vacant};
    `}
  position: relative;
  border-radius: 50%;
  border-style: solid;
  outline: none;
  padding: 0;
`;

interface IChairWrapper {
    counter: number;
    numOfChairs: number;
    relativeSize: number;
    isOneSideChairs: boolean;
    chairPosition: chairsPositionType;
}

const ChairWrapper = styled.div<IChairWrapper>`
  --chairDiameter: ${({ relativeSize }) => {
    const BASE_CHAIR_SIZE = 6.5;
    return BASE_CHAIR_SIZE * relativeSize;
  }}em; /* chair size */

  position: absolute;
  top: 50%;
  left: 50%;
  margin: calc(-0.5 * var(--chairDiameter));
  
  --turnValue: 
          ${({ counter, numOfChairs, chairPosition}) =>
                  getTurnValue(counter, numOfChairs, chairPosition)}
  ;
  transform: rotate(var(--turnValue))
  translate(${({ counter, numOfChairs, relativeSize }) =>
          getTranslateValue(counter, numOfChairs, relativeSize)})
  rotate(calc(-1 * var(--turnValue)));
`;
