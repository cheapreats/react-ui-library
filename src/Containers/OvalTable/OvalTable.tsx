//import { IChair } from '@Containers/Chair/Chair';
import React, {useRef} from "react";
import {IChair} from "@Containers";
import styled from "styled-components";
//import {ICircleTable} from "@Containers";

//TODO: delete it later
//type getTableContentType = () => JSX.Element;

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
    //occupancyStatus: occupancyStatusTypes;

    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;

    /**
     * The use type for the table component (how it will be used in the app)
     */
    //tableUse: tableUseTypes;
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
        //tableUse = 'TableForManagement',

        ...props
    }) => {
    // Create a reference to the TableBody styled component
    const tableBodyRef = useRef(document.createElement('div'));

    //TODO: delete it later
    //const getTableContent:getTableContentType = () => {
    //    return(
    //        <TableContent relativeSize={relativeSize}>
//
    //        </TableContent>
    //    );
//
    //}

    return(
        <div {...props}>
            <TableBody
                ref={tableBodyRef}
                relativeSize={relativeSize}
                numOfChairs={chairs.length}
            >

            </TableBody>
        </div>
    );


};

interface ITableBody {
    numOfChairs: number;
    relativeSize: number;
}

const TableBody = styled.div<ITableBody>`
    ${({ relativeSize }) => {
      const BASE_TABLE_BORDER_WIDTH = 1.5;
      const BASE_TABLE_BODY_MARGIN = 3;
      const BASE_TABLE_WIDTH = 40;
      const BASE_TABLE_HEIGHT = BASE_TABLE_WIDTH * 0.7;
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

//TODO: delete it later
//interface ITableContent {
//    relativeSize: number;
//}
//
//const TableContent = styled.div<ITableContent>`
//  text-align: center;
//  width: 100%;
//  height: 100%;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  font-weight: bold;
//`;

