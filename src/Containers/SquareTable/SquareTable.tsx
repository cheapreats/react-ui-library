/**
 * Documentation – the order of chairs are in the chairs array will populate the table from top left to the bottom right
 * “the purpose of the order in the array is to populate the chairs from top left to bottom right”
 */
import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Plus } from '@styled-icons/boxicons-regular';
import { IChair } from '../Chair/Chair';
import { ChairRow } from './_ChairRow';

type Position = 'top' | 'bottom' | 'left' | 'right';

type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';

type callOnTableClickType = () => void;

type getSquareTableSizeType = (
    top: number,
    bottom: number,
    left: number,
    right: number,
) => number;

type getRectangleTopType = (top: number, bottom: number) => number;

type getRectangleSideType = (left: number, right: number) => number;

type fillArrayType = (
    array: Array<IChair>,
    targetSize: number,
    position: Position,
) => void;

type getTableBodyContentType = (tableUse: tableUseTypes) => JSX.Element;

//type getNumberOfOccupiedChairsType = () => JSX.Element;

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

export interface ISquareTable {
    /**
     * The shape for the ISquareTable ("Square", "HorizontalRectangle", "VerticalRectangle")
     */
    tableShape: 'Square' | 'HorizontalRectangle' | 'VerticalRectangle';
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
    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Array index number for this table
     */
    arrayIndex?: number;
    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;
    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: (selectedChildIndex: number) => void;
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
    /**
     * Determines if the table is used in the toolbar or not
     */
    isNotHighlightedWhenSelected?: boolean;
}

/**
 * Primary UI component for user interaction
 * Square Table
 */
export const SquareTable: React.FC<ISquareTable> = ({
                                                        // tableShape = 'Square',
                                                        tableID = 'T1',
                                                        partyName = 'Null',
                                                        occupancyStatus = 'Vacant',
                                                        chairs = [],
                                                        relativeSize = 1.0,
                                                        isSquare = false,
                                                        tableUse = 'TableForManagement',
                                                        arrayIndex = 0,
                                                        selectedIndex = -1,
                                                        onTableClick,
                                                        onChairClick,
                                                        isNotHighlightedWhenSelected = false,
                                                        ...props
                                                    }) => {
    // Create a reference to the TableBody styled component
    const tableBodyRef = useRef(document.createElement('div'));

    /**
     * Use useEffect to keep focus on TableBody after re-render if the
     * selectedIndex number matches the arrayIndex number for this table
     */
    useEffect(() => {
        if (selectedIndex === arrayIndex) {
            if (tableBodyRef != null) {
                tableBodyRef.current.focus();
            }
        }
    });

    /**
     * Split chairs array into four arrays for each table side
     */
    const topArray = Array<IChair>();
    const rightArray = Array<IChair>();
    const bottomArray = Array<IChair>();
    const leftArray = Array<IChair>();

    chairs.map((i, index) => {
        if (i.position === 'top') {
            i.chairIndex = index;
            topArray.push(i);
        } else if (i.position === 'right') {
            i.chairIndex = index;
            rightArray.push(i);
        } else if (i.position === 'bottom') {
            i.chairIndex = index;
            bottomArray.push(i);
        } else {
            i.chairIndex = index;
            leftArray.push(i);
        }
    });

    /**
     * Calls the onTableClick prop function with the arrayIndex prop as its
     * parameter
     */
    const callOnTableClick: callOnTableClickType = () =>
        onTableClick(arrayIndex);

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
                position,
                isSeated: false,
                occupiedBy: '',
                isVisible: false,
                relativeSize,
                tableUse,
                chairIndex: array.length,
                tableIndex: arrayIndex,
                selectedIndex,
                onChairClick,
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
     * calculates how many chairs are seated
     * @return <string> div for the table
     */
    const getNumberOfOccupiedChairs: () => (null | JSX.Element) = () =>
    {
        if(tableUse === "AddTableButton" ){
            return null;
        }
        const seatCount = chairs.reduce((seatedCount, chair)=>{
            if(chair.isSeated){
                seatedCount+=1;
                return seatedCount;
            }
            return seatedCount;
        },0)
        return(
        <div>
            {seatCount}/{chairs.length}
        </div>
    );
    }

    /**
     * Returns a JSX element for the TableBody Content with the correct styles
     * and content based on whether the table is used in the management screen,
     * the add table toolbar, or the create/edit layout screen
     * @returns {JSX.Element} the correct JSX.Element for the TableBody
     */
    const getTableBodyContent: getTableBodyContentType = () => {
        switch (tableUse) {
            case 'AddTableButton':
                return <StyledPlus />;
            case 'TableForManagement':
                return (
                    <Row relativeSize={relativeSize}>
                        <TableInfo relativeSize={relativeSize}>
                            <div>
                                {`${tableID}\n${partyName}`}
                                <Status occupancyStatus={occupancyStatus}>
                                    {occupancyStatus}
                                </Status>
                            </div>
                            {getNumberOfOccupiedChairs()}
                        </TableInfo>
                        <ColorDiv
                            relativeSize={relativeSize}
                            chairNumOnSide={
                                isSquare ? squareTableSize : rectangleSideSize
                            }
                            occupancyStatus={occupancyStatus}
                        />
                    </Row>
                );
            case 'TableForEditCanvas':
                return (
                    <TableNumForEditScreen relativeSize={relativeSize}>
                        <div>
                            {tableID}
                        </div>

                        {getNumberOfOccupiedChairs()}

                    </TableNumForEditScreen>
                );
            default:
                return <div />;
        }
    };


    return (
        <div {...props}>
            {/** chairs top */}
            <ChairRow
                position="top"
                chairs={topArray}
                relativeSize={relativeSize}
                tableUse={tableUse}
                selectedIndex={selectedIndex}
            />

            {/** table itself */}
            <div>
                <Row relativeSize={relativeSize}>
                    {/** chairs left */}
                    <ChairRow
                        relativeSize={relativeSize}
                        position="left"
                        chairs={leftArray}
                        tableUse={tableUse}
                        selectedIndex={selectedIndex}
                    />

                    <TableBody
                        ref={tableBodyRef}
                        relativeSize={relativeSize}
                        chairNumOnSide={
                            isSquare ? squareTableSize : rectangleSideSize
                        }
                        chairNumOnTop={
                            isSquare ? squareTableSize : rectangleTopSize
                        }
                        tableUse={tableUse}
                        tabIndex={0}
                        onClick={callOnTableClick}
                        toolbarUse={isNotHighlightedWhenSelected}
                    >
                        {getTableBodyContent(tableUse)}
                    </TableBody>

                    {/** chairs right */}
                    <ChairRow
                        relativeSize={relativeSize}
                        position="right"
                        chairs={rightArray}
                        tableUse={tableUse}
                        selectedIndex={selectedIndex}
                    />
                </Row>
            </div>

            {/** chairs bottom */}
            <ChairRow
                relativeSize={relativeSize}
                position="bottom"
                chairs={bottomArray}
                tableUse={tableUse}
                selectedIndex={selectedIndex}
            />
        </div>
    );
};

type getOccupancyColorType = (occupancyStatus: occupancyStatusTypes) => string;

/**
 * Determines the correct color for Status and ColorDiv based on occupancyStatus
 * and returns the hexadecimal color value as a string
 *
 * @return {string} - Hexadecimal color value
 */
const getOccupancyColor: getOccupancyColorType = (occupancyStatus) => {
    switch (occupancyStatus) {
        case 'Vacant':
            return useTheme().colors.occupancyStatusColors.Vacant;
        case 'Reserved':
            return useTheme().colors.occupancyStatusColors.Reserved;
        case 'Occupied':
            return useTheme().colors.occupancyStatusColors.Occupied;
        default:
            return '';
    }
};

/**
 * variables for the styled components
 */

interface ITableBody {
    chairNumOnSide: number;
    chairNumOnTop: number;
    relativeSize: number;
    tableUse: tableUseTypes;
    onClick: (e: Event) => void;
    toolbarUse: boolean;
}

const TableBody = styled.div<ITableBody>`
  ${({ chairNumOnSide, chairNumOnTop, relativeSize }) => {
    const BASE_TABLE_BODY_WIDTH_AND_HEIGHT = 20;
    const BASE_BORDER_RADIUS = 3;
    return `height: ${
            chairNumOnSide * BASE_TABLE_BODY_WIDTH_AND_HEIGHT * relativeSize
    }rem;
            width: ${
            chairNumOnTop * BASE_TABLE_BODY_WIDTH_AND_HEIGHT * relativeSize
    }rem;
            border-radius: ${BASE_BORDER_RADIUS * relativeSize}rem;`;
  }}
  background-color: ${({ theme, tableUse }) =>
          tableUse === 'AddTableButton' || tableUse === 'TableForEditCanvas'
                  ? theme.colors.chairTableEditBackground
                  : theme.colors.chairTableBackground};
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  &:focus {
    box-shadow: ${({ toolbarUse }) => (!toolbarUse ? '0 0 0 2px' : '')};
    ${({ theme }) => theme.colors.primary};
  }
`;

interface IColorDiv {
    chairNumOnSide: number;
    occupancyStatus: occupancyStatusTypes;
    relativeSize: number;
}

const ColorDiv = styled.div<IColorDiv>`
  ${({ chairNumOnSide, relativeSize }) => {
    const BASE_COLOR_DIV_HEIGHT = 20;
    const BASE_COLOR_DIV_WIDTH = 3;
    const BASE_COLOR_DIV_BORDER_RADIUS = 3;
    const BASE_COLOR_DIV_MARGIN_RIGHT = 0.95;
    return `height: ${
            chairNumOnSide * BASE_COLOR_DIV_HEIGHT * relativeSize
    }rem;
            width: ${BASE_COLOR_DIV_WIDTH * relativeSize}rem;
            margin-right: ${BASE_COLOR_DIV_MARGIN_RIGHT * relativeSize}rem;
            border-top-right-radius: ${
            BASE_COLOR_DIV_BORDER_RADIUS * relativeSize
    }rem;
            border-bottom-right-radius: ${
            BASE_COLOR_DIV_BORDER_RADIUS * relativeSize
    }rem;`;
  }}
  margin-left: auto;
  background-color: ${({ occupancyStatus }) =>
          getOccupancyColor(occupancyStatus)};
`;

interface IRow {
    relativeSize: number;
}

const Row = styled.div<IRow>`
  display: flex;
  flex-wrap: wrap;
  ${({ relativeSize }) => {
    const BASE_ROW_LEFT_AND_RIGHT_MARGIN = -15;
    return `margin-right: ${
            BASE_ROW_LEFT_AND_RIGHT_MARGIN * relativeSize
    }px;
            margin-left: ${BASE_ROW_LEFT_AND_RIGHT_MARGIN * relativeSize}px;`;
  }}
`;

interface ITableInfo {
    relativeSize: number;
}

const TableInfo = styled.div<ITableInfo>`
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
  white-space: pre-line;
  text-align: left;
  ${({ relativeSize }) => {
    const BASE_TABLE_INFO_MARGIN_TOP = 2;
    const BASE_TABLE_INFO_MARGIN_LEFT = 3;
    const BASE_TABLE_INFO_FONT_SIZE = 2;
    return `margin-top: ${BASE_TABLE_INFO_MARGIN_TOP * relativeSize}rem;
            margin-left: ${BASE_TABLE_INFO_MARGIN_LEFT * relativeSize}rem;
            font-size: ${BASE_TABLE_INFO_FONT_SIZE * relativeSize}em;`;
  }}
`;

const Status = styled.div<Pick<ISquareTable, 'occupancyStatus'>>`
  color: ${({ occupancyStatus }) => getOccupancyColor(occupancyStatus)};
`;

const StyledPlus = styled(Plus)`
  color: black;
  width: 75%;
  height: 100%;
  margin: auto;
  display: block;
`;

interface ITableNumForEditScreen {
    relativeSize: number;
}

const TableNumForEditScreen = styled.div<ITableNumForEditScreen>`
  color: black;
  ${({ relativeSize }) => {
    const BASE_TABLE_NUM_FONT_SIZE = 5;
    return `font-size: ${BASE_TABLE_NUM_FONT_SIZE * relativeSize}em;`;
  }}
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;