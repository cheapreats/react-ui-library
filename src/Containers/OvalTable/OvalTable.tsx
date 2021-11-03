import React, {useRef} from "react";
import {Chair, IChair} from "@Containers";
import styled from "styled-components";

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
    /* Comment */
    tableID: string;
    /* Array of chairs */
    chairs: Array<IChair>;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
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
        relativeSize = 1.0,
        tableUse = 'TableForManagement',
        tableIndex = 0,
        selectedIndex = -1,
        onChairClick,

        ...props
    }) => {
    // Create a reference to the TableBody styled component //TODO:
    const tableBodyRef = useRef(document.createElement('div'));

    const getChairs: getChairsType = () =>
        chairs.map((chair, index) => {
            const {position, occupiedBy, isSeated, isVisible, isRound} = chair;
            return(
            <ChairWrapper
                relativeSize={relativeSize}
                numOfChairs={chairs.length}
                counter={index + 1}
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
                    onChairClick={onChairClick}
                />
            </ChairWrapper>
            )});
    return(
        <div {...props}>
            <TableBody
                ref={tableBodyRef}
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
) => string;

type getTranslateValueType = (
    counter: number,
    numOfChairs: number,
    relativeSize: number,
) => string;


const BASE_TABLE_WIDTH = 40;
const LENGTH_TO_WIDTH_RATIO= 0.7;
const BASE_TABLE_HEIGHT = BASE_TABLE_WIDTH * LENGTH_TO_WIDTH_RATIO;

/**
 * Returns a string with the correct CSS turn positioning for a given chair
 *
 * @param counter - the chair's number relative to other chairs in the array
 * @param numOfChairs - the total number of chairs at the table
 * @return {string} - the correct turn value for a specific chair
 */
const getTurnValue: getTurnValueType = (counter, numOfChairs) => {

    return `${counter}turn / ${numOfChairs}`;
};

/**
 * Returns a string with the correct CSS translate length
 *
 * @param chairIndex - the index of the chair in the array + 1
 * @param numOfChairs - the total number of chairs at the table
 * @param relativeSize - The size for the component relative to the parent
 * @return {string} - the correct turn value for a specific chair
 */
const getTranslateValue: getTranslateValueType = (chairIndex, numOfChairs, relativeSize) => {
    const SPACING_DIFFERENCE = 360/numOfChairs;
    const CHAIR_ANGLE = chairIndex * SPACING_DIFFERENCE;
    const CHAIR_SPACING_FROM_CENTER = BASE_TABLE_WIDTH/2
    const RIGHT_ANGLE = 90;
    const LENGTH_TO_WIDTH_DIFFERENCE =  1 - LENGTH_TO_WIDTH_RATIO;

    //TODO: comments
    let chairAngleForHalfOval = CHAIR_ANGLE % 180;
    let translationCoefficient;

    if(!(chairAngleForHalfOval <= RIGHT_ANGLE)){
        chairAngleForHalfOval = RIGHT_ANGLE-(chairAngleForHalfOval-RIGHT_ANGLE)
    }

    translationCoefficient = 1-(LENGTH_TO_WIDTH_DIFFERENCE*(chairAngleForHalfOval/RIGHT_ANGLE))

    return `
        ${CHAIR_SPACING_FROM_CENTER*translationCoefficient*relativeSize}em
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
    relativeSize: number;
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
  --perimeterPlacementValue: calc(
          ${({ counter, numOfChairs }) =>
                  getTurnValue(counter, numOfChairs)}
  );
  transform: rotate(var(--perimeterPlacementValue))
  translate(${({ counter, numOfChairs, relativeSize }) =>
          getTranslateValue(counter, numOfChairs, relativeSize)})
  rotate(calc(-1 * var(--perimeterPlacementValue)));
`;
