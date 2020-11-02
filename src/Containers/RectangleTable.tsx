/*
    Created by:                Corey Rogers
    Date submitted (v2):       ___________
    File:                      RectangleTable.tsx
    File Description:          Rectangle table in horizontal orientation. Resizable based on number of chairs.
*/

import React from 'react';

import styled from 'styled-components';


export interface IRectangleTable {
    /**
     * The unique identifier for the table
     */
    tableID: string,
        /**
         * The number of chairs at the table
         */
        numOfChairs: number,
        /**
         * The name of the party assigned to the table
         */
        partyName: string,
        /**
         * The occupancy status for the table
         */
        occupancyStatus: string,
        /**
         * The seating/reservation time for the party at the table
         */
        reservationTime: Date,
}

/**
 * Primary UI component for user interaction
 */
export const RectangleTable: React.FC<IRectangleTable>
    = ({
           tableID = 'T1',
           numOfChairs = 4,
           partyName = 'Null',
           occupancyStatus = 'Vacant',
           reservationTime = Date.now(),
           ...props
       }) => {

    const occupancyColor = getOccupancyColor(occupancyStatus);

    function getOccupancyColor(status: string) {
        if (occupancyStatus === 'Vacant') {
            return '#28a745';
        } if (occupancyStatus === 'Reserved') {
            return '#ffc107';
        }
        return '#17a2b8';

    }

    // Determine the number of columns based on numOfChairs
    const colNumber = numOfChairs / 2;

    const StyledTable = styled.div`
            width: ${numOfChairs * 11}em;
        `;

    const TopChair = styled.div`
            height: 3em;
            border-top-left-radius: 3rem !important;
            border-top-right-radius: 3rem !important;
            flex: 0 0 50%;
            max-width: 50%;
            background-color: #6c757d !important;
            margin: auto !important;
        `;

    const TableBody = styled.div`
            height: 22em;
            border-radius: 3rem !important;
            background-color: #6c757d !important;
            margin: .25rem !important;
            
        `;

    const BottomChair = styled.div`
            height: 3em;
            border-bottom-left-radius: 3rem !important;
            border-bottom-right-radius: 3rem !important;
            flex: 0 0 50%;
            max-width: 50%;
            background-color: #6c757d !important;
            margin: auto !important;
        `;

    const ColorBand = styled.div`
        border-top-right-radius: 3rem !important;
        border-bottom-right-radius: 3rem !important;
        height: 22em;
        flex: 0 0 16.666667%;
        max-width: 16.666667%;
        position: relative;
        width: 100%;
        background-color: ${occupancyColor} !important;
    `;

    const Row = styled.div`
        display: flex;
        flex-wrap: wrap;
        margin-right: 15px;
        margin-left: 15px;
    `;

    const RowMargin0 = styled(Row)`
        margin: 0 !important;  
    `;

    const RowM0H25 = styled(RowMargin0)`
        height: 25% !important;  
    `;

    const RowM0H50 = styled(RowMargin0)`
        height: 50% !important;  
    `;

    const Col = styled.div`
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
    `;

    const Col6P0 = styled.div`
        flex: 0 0 50%;
        max-width: 50%;
        position: relative;
        width: 100%;
    `;

    const Col4P0 = styled.div`
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
        position: relative;
        width: 100%;
    `;

    const Col6MxAutoMt3TxtLt = styled(Col6P0)`
        padding-right: 15px;
        padding-left: 15px;
        color: #f8f9fa !important;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-top: 1rem !important;
    `;

    const Col6MxAutoMt5 = styled(Col6P0)`
        padding-right: 15px;
        padding-left: 15px;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-top: 3rem !important;
    `;

    const TextWhiteDiv = styled.div`
        color: #fff !important;
    `;

    const TextOccupancyColor = styled.div`
        color: ${occupancyColor} !important;
    `;


    /*
    const renderOccupancyStatus = (occupancyStatus)=> {

        if(occupancyStatus !== 'Vacant') {

            return <div className="text-white">{reservationTime}</div>

        } else {
            return;
        }

    }
    */

    return (
        <StyledTable>
            <div>
                <RowMargin0>
                    {[...Array(colNumber)].map((e, i) => (
                        <Col key={i}>
                            <Row>
                                <TopChair />
                            </Row>
                        </Col>
                    ))}
                </RowMargin0>
            </div>

            <TableBody>
                <RowMargin0>
                    <Col6P0>
                        <RowM0H25>
                            <Col6MxAutoMt3TxtLt>
                                {tableID}
                            </Col6MxAutoMt3TxtLt>
                        </RowM0H25>
                        <RowM0H25 />
                        <RowM0H50>
                            <Col6MxAutoMt5>
                                <TextWhiteDiv>{partyName}</TextWhiteDiv>
                                <TextOccupancyColor>
                                    {occupancyStatus}
                                </TextOccupancyColor>
                            </Col6MxAutoMt5>
                        </RowM0H50>
                    </Col6P0>
                    <Col4P0 />
                    <ColorBand />
                </RowMargin0>
            </TableBody>

            <div>
                <RowMargin0>
                    {[...Array(colNumber)].map((e, i) => (
                        <Col key={i}>
                            <Row>
                                <BottomChair />
                            </Row>
                        </Col>
                    ))}
                </RowMargin0>
            </div>
        </StyledTable>
    );
};