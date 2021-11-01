//import { IChair } from '@Containers/Chair/Chair';
import React, {useRef} from "react";
import {Chair, IChair} from "@Containers";
import styled from "styled-components";

//TODO: delete it later
//type getTableContentType = () => JSX.Element;

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

type getChairsType = () => JSX.Element[];

export interface IOvalTable{
    /**
     * The shape for the IOvalTable ("Oval")
     */
    tableShape: 'Oval';

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
    //occupancyStatus: occupancyStatusTypes;    //TODO: delete later

    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;

    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;

    /**
     * Array index for the table
     */
    tableIndex: number;

    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: (selectedChildIndex: number) => void;

    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;

    /**
     * Function to handle onClick event for the chair
     * @param parentTableIndex - parent table index in the tables array
     * @param chairIndex - chair index in chair array
     */
    onChairClick: (
        parentTableIndex: number,
        chairIndex: number,
        selectedTableIndex: number,
    ) => void;
}

/**
 * Primary UI component for user interaction
 */
export const OvalTable: React.FC<IOvalTable> = ({
        tableID = 'T1',
        chairs = [],
        partyName = 'Null',
        //occupancyStatus = 'Vacant',
        relativeSize = 1.0,
        tableUse = 'TableForManagement',
        tableIndex = 0,
        selectedIndex = -1,
        onChairClick,

        ...props
    }) => {
    // Create a reference to the TableBody styled component
    const tableBodyRef = useRef(document.createElement('div'));

    const tangent = Math.tan(Math.PI / chairs.length);

    const getChairs: getChairsType = () =>
        chairs.map((item, index) => (
            <ChairWrapper
                relativeSize={relativeSize}
                numOfChairs={chairs.length}
                counter={index + 1}
                position={item.position} //TODO: delete it later
                tangentValue={tangent}
            >
                <Chair
                    relativeSize={relativeSize}
                    position={item.position}
                    occupiedBy={item.occupiedBy}
                    isSeated={item.isSeated}
                    isVisible={item.isVisible}
                    isRound={item.isRound}
                    tableUse={tableUse}
                    tableIndex={tableIndex}
                    chairIndex={index}
                    selectedIndex={selectedIndex}
                    onChairClick={onChairClick}
                />
            </ChairWrapper>
        ));
    return(
        <div {...props}>
            <TableBody
                ref={tableBodyRef}
                relativeSize={relativeSize}
                numOfChairs={chairs.length}
                tangentValue={tangent}
            >
                {getChairs()}
            </TableBody>
        </div>
    );


};

type Position = 'top' | 'bottom' | 'left' | 'right';

type getPositionValueType = (position: Position) => number;

type getTurnValueType = (
    counter: number,
    numOfChairs: number,
    position: Position,
) => string;

type getTranslateValueType = (
    counter: number,
    numOfChairs: number,
    relativeSize: number,
) => string;

const MIN_CHAIRS_BEFORE_TABLE_RESIZE = 4;
const TANGENT_VALUE_FOR_LESS_THAN_THREE_CHAIRS = 1.73;
const MIN_CHAIRS_BEFORE_SET_TANGENT_VALUE = 3;
const BASE_TABLE_WIDTH = 40;
const COEFFICIENT_OF_HEIGHT_REDUCTION= 0.7;
const BASE_TABLE_HEIGHT = BASE_TABLE_WIDTH * COEFFICIENT_OF_HEIGHT_REDUCTION;

/**
 * Returns a number value for each position (right, left, top, bottom)
 * that will allow chairs to be positioned on the correct side of the
 * table when there are less than three chairs at a CircleTable component
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
 * Returns a string with the correct CSS turn positioning for a given chair
 *
 * @param counter - the chair's number relative to other chairs in the array
 * @param numOfChairs - the total number of chairs at the table
 * @param position - the position for the chair ('top', 'bottom', 'left', 'right')
 * @return {string} - the correct turn value for a specific chair
 */
const getTurnValue: getTurnValueType = (counter, numOfChairs, position) => {
    if (numOfChairs < MIN_CHAIRS_BEFORE_SET_TANGENT_VALUE) {
        return `${getPositionValue(position)}turn / 1`;
    }
    return `${counter}turn / ${numOfChairs}`;
};

const getTranslateValue: getTranslateValueType = (counter, numOfChairs, relativeSize) => {
    const CHAIR_ANGLE = counter * (360/numOfChairs);
    const TABLE_BIGGEST_RADIUS = BASE_TABLE_WIDTH/2
    let chairAngleForHalfOval = CHAIR_ANGLE % 180;
    let translationCoefficient;

    if(chairAngleForHalfOval <= 90){
        translationCoefficient = 1-(0.3*(chairAngleForHalfOval/90))
    }else {
        chairAngleForHalfOval = 90-(chairAngleForHalfOval-90)
        translationCoefficient = 1-(0.3*(chairAngleForHalfOval/90))
    }

    return `
        ${TABLE_BIGGEST_RADIUS*translationCoefficient*relativeSize}em
    `;
};

interface ITableBody {
    numOfChairs: number;
    relativeSize: number;
    tangentValue: number;
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

  --relativeSpaceBetweenChairs: 1; /* how much extra space we want between chairs, 1 = one chair size */
  ${({ numOfChairs, tangentValue }) =>
          `--tangent: ${
                  numOfChairs < MIN_CHAIRS_BEFORE_SET_TANGENT_VALUE
                          ? TANGENT_VALUE_FOR_LESS_THAN_THREE_CHAIRS
                          : tangentValue
          };
        --circleRadius: calc(
            ${numOfChairs < MIN_CHAIRS_BEFORE_TABLE_RESIZE ? 1.0 : 0.5} *
                (1 + var(--relativeSpaceBetweenChairs)) * var(--chairDiameter) / var(--tangent)
        ); /* circle radius */`}
  --containerSize: calc(2 * var(--circleRadius)); /* container size */
  
  position: relative;
  background-color: gray;
  border-radius: 50%;
  border-style: solid;
  border-color: green;
  outline: none;
`;

interface IChairWrapper {
    counter: number;
    numOfChairs: number;
    tangentValue: number;
    position: Position;
    relativeSize: number;
}

const ChairWrapper = styled.div<IChairWrapper>`
  --chairDiameter: ${({ relativeSize }) => {
    const BASE_CHAIR_SIZE = 6.5;
    return BASE_CHAIR_SIZE * relativeSize;
  }}em; /* chair size */
  --relativeSpaceBetweenChairs: 1; /* how much extra space we want between chairs, 1 = one chair size */

  position: absolute;
  top: 50%;
  left: 50%;
  margin: calc(-0.5 * var(--chairDiameter));
  --perimeterPlacementValue: calc(
          ${({ counter, position, numOfChairs }) =>
                  getTurnValue(counter, numOfChairs, position)}
  );
  transform: rotate(var(--perimeterPlacementValue))
  translate(${({ counter, numOfChairs, relativeSize }) =>
          getTranslateValue(counter, numOfChairs, relativeSize)})
  rotate(calc(-1 * var(--perimeterPlacementValue)));
`;
