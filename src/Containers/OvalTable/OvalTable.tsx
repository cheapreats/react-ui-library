import React from "react";
import {Chair} from "@Containers";
import styled from "styled-components";
import {ITable} from "@Utils";

type chairsPositionType =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'around';

type getChairsType = () => JSX.Element[];

export interface IOvalTable extends ITable{
    /* Identifier of chairs placement relative to the table */
    chairsPosition: chairsPositionType;

}

/**
 * Primary UI component for user interaction
 */
export const OvalTable: React.FC<IOvalTable> = ({
    chairs = [],
    relativeSize = 1.0,
    tableUse = 'TableForManagement',
    // arrayIndex = 0,
    // selectedIndex = -1,
    chairsPosition = 'around',

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
                    chairsPosition={chairsPosition}
                >
                    <Chair
                        relativeSize={relativeSize}
                        position={position}
                        occupiedBy={occupiedBy}
                        isSeated={isSeated}
                        isVisible={isVisible}
                        isRound={isRound}
                        tableUse={tableUse}
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

const BASE_TABLE_WIDTH = 40;
const HEIGHT_TO_WIDTH_RATIO= 0.7;
const BASE_TABLE_HEIGHT = BASE_TABLE_WIDTH * HEIGHT_TO_WIDTH_RATIO;

const RIGHT_ANGLE = 90;
const STRAIGHT_ANGLE = 180;
const FULL_TURN = 360;

type getTurnValueType = (
    counter: number,
    numOfChairs: number,
    chairsPosition: chairsPositionType,
) => string;

/**
 * Returns a string with the correct CSS turn positioning for a given chair.
 * For all positions other than 'around', the function calculates turn value as there is one
 * more additional chair. It prevents placement the last chair on x or y axis.
 *
 * Based on chairsPosition, adds additional turn value if needed.
 *
 * @param counter - the chair's number relative to other chairs in the array
 * @param numOfChairs - the total number of chairs at the table
 * @param chairsPosition - the placement position of all chairs (top, bottom, left, right or around)
 * @return {string} - the correct turn value for a specific chair
 */
const getTurnValue: getTurnValueType = (counter, numOfChairs, chairsPosition) => {
    const QUARTER_TURN = 0.25;
    const HALF_TURN = 0.5;
    const THREE_QUARTERS_TURN = 0.75;

    const ADDITIONAL_SPACE =
        chairsPosition === 'around' ? 0 : 1;

    const PART_OF_TABLE_USED =
        chairsPosition === 'around' ? 1 : 0.5;

    let turnValue = counter * PART_OF_TABLE_USED / (numOfChairs + ADDITIONAL_SPACE);

    switch (chairsPosition){
    case "top":
        turnValue += HALF_TURN;
        break;
    case "left":
        turnValue += QUARTER_TURN;
        break;
    case "right":
        turnValue += THREE_QUARTERS_TURN;
        break;
    default:
        break;
    }

    return `${turnValue}turn`;
};

type getTranslateValueType = (
    counter: number,
    numOfChairs: number,
    relativeSize: number,
    chairsPosition: chairsPositionType,
) => string;

/**
 * Calculates the translate distance for a specific chair based on it's position on Oval Table.
 * Divides the table on 4 quadrants. Increasing the angle of rotation (clockwise) will decrease the
 * translation distance in even quadrants, and increase in odd quadrants.
 *
 * Returns a string with the correct CSS translate length.
 *
 * @param chairIndex - the index of the chair in the array + 1
 * @param numOfChairs - the total number of chairs at the table
 * @param relativeSize - The size for the component relative to the parent
 * @param chairsPosition - the placement position of all chairs (top, bottom, left, right or around)
 * @return {string} - the correct translate value for a specific chair
 */
const getTranslateValue: getTranslateValueType = (chairIndex, numOfChairs, relativeSize,chairsPosition) => {
    const ADDITIONAL_SPACE = 1;
    // The angle between chairs according their quantity.
    const SPACING_DIFFERENCE =
        chairsPosition === 'around' ?
            (FULL_TURN / numOfChairs) :
            (STRAIGHT_ANGLE / (numOfChairs + ADDITIONAL_SPACE));

    // Clockwise rotation angle of current chair from x-axis of 4th quadrant
    const CHAIR_ROTATION_ANGLE = chairIndex * SPACING_DIFFERENCE;

    const BASE_RADIUS = BASE_TABLE_WIDTH / 2

    const WHOLE_COEFFICIENT = 1;
    const HEIGHT_TO_WIDTH_DIFFERENCE =  WHOLE_COEFFICIENT - HEIGHT_TO_WIDTH_RATIO;

    // Reformat any chair rotation angle to not exceed 2 quadrants format (180 degrees).
    const QUADRANT_BASED_ANGLE = getQuadrantBasedAngle(CHAIR_ROTATION_ANGLE, chairsPosition);

    // Calculate the coefficient which may vary from 0.7 to 1, based on angle of the chair.
    const translationCoefficient = WHOLE_COEFFICIENT - (HEIGHT_TO_WIDTH_DIFFERENCE * (QUADRANT_BASED_ANGLE/RIGHT_ANGLE));

    return `
        ${BASE_RADIUS * translationCoefficient * relativeSize}em
    `;
};

type getQuadrantBasedAngleType = (
    angle: number,
    chairsPosition: chairsPositionType,
) => number;

/** Accepts any angle, locates in which quadrant it is located (odd with growing, or even
 * with decreasing translateValue), and based at which quadrant angle placed reformat
 * the angle to not exceed 1 quadrant (90 degree).
 *
 * If chairs position is left or right, add additional 90 degree to switch the angle to the
 * next quadrant.
 *
 * @param angle the angle from positive x-axis to the current chair
 * @param chairsPosition - the placement position of all chairs (top, bottom, left, right or around)
 * @return {number} angle from 0 to 90
 */
const getQuadrantBasedAngle: getQuadrantBasedAngleType = (angle,chairsPosition) => {
    angle =
        chairsPosition === 'left' || chairsPosition === 'right' ?
            angle + RIGHT_ANGLE :
            angle;

    // Reformat any chair rotation angle to not exceed 2 quadrants format (180 degrees).
    let quadrantBasedAngle = angle % STRAIGHT_ANGLE;

    // In odd quadrants (angle > 90) increasing angle increase radius,
    // so the angle can be proportionally inverted. For even quadrants, the angle remain the same.
    if(quadrantBasedAngle > RIGHT_ANGLE){
        quadrantBasedAngle = STRAIGHT_ANGLE - quadrantBasedAngle
    }

    return quadrantBasedAngle;
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
    chairsPosition: chairsPositionType;
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
          ${({ counter, numOfChairs, chairsPosition}) =>
        getTurnValue(counter, numOfChairs, chairsPosition)}
  ;
  transform: rotate(var(--turnValue))
  translate(${({ counter, numOfChairs, relativeSize, chairsPosition }) =>
        getTranslateValue(counter, numOfChairs, relativeSize, chairsPosition)})
  rotate(calc(-1 * var(--turnValue)));
`;
