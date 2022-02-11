/*
    Created by:                Level Up team
    Date submitted:            12/08/2020
    File:                      DraggableDemoFront.js
    File Description:          This component creates the draggable demo for the front page. It includes the
                               example data for the tables and the capacity component in the demo.
*/
import React, { ReactElement, useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { CircleTable } from '../CircleTable/CircleTable';
import { CapacityDisplay } from '../CapacityDisplay/CapacityDisplay';
import { SquareTable } from '../SquareTable/SquareTable';

/**
 *  This component creates the draggable demo for the front page.
 *  It includes the example data for the tables and the capacity
 *  component in the demo.
 */
export const DraggableCanvas = (): ReactElement => {
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0,
        y: 0,
    });

    const handleDrag = (e: Event, ui: { deltaX: number; deltaY: number }) => {
        const { x, y } = deltaPosition;
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        });
    };

    const dragHandlers = {
        handleDrag,
    };

    /**
     * Prints the Selected Child index to the console when Table is clicked
     * @param selectedChildIndex
     */
    const handleTableClick = (selectedChildIndex: number) => {
        console.log(selectedChildIndex);
    };

    return (
        <SpacingForBottom id="demo">
            <PaddingForH52TextCenter>
                Drag the tables and create your own design!
            </PaddingForH52TextCenter>
            <StylesForDraggableDemo>
                <StylesForCanvas>
                    <FloatRight>
                        <CapacityDisplay
                            totalNumberOfSeats={21}
                            totalSeatsOccupied={11}
                        />
                    </FloatRight>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 150, y: 93 }}
                    >
                        <RectangleTwoTopWidth>
                            <SquareTable
                                tableShape="Square"
                                tableID="T1"
                                partyName=""
                                isSquare
                                occupancyStatus="Vacant"
                                timeLastServed="00:00:00"
                                relativeSize={0.4}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                ]}
                                tableUse="TableForManagement"
                                selectedIndex={3}
                                onTableClick={handleTableClick}
                            />
                        </RectangleTwoTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 520, y: 215 }}
                    >
                        <RectangleTwoTopWidth>
                            <SquareTable
                                tableShape="Square"
                                tableID="T4"
                                partyName="Tina"
                                isSquare
                                occupancyStatus="Occupied"
                                timeLastServed="00:00:00"
                                relativeSize={0.4}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Suzy',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: true,
                                        occupiedBy: 'Tina',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                ]}
                                tableUse="TableForManagement"
                                selectedIndex={3}
                                onTableClick={handleTableClick}
                            />
                        </RectangleTwoTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 670, y: -142 }}
                    >
                        <SquareEightTopWidth>
                            <SquareTable
                                tableShape="Square"
                                tableID="T5"
                                partyName="Scott"
                                isSquare={false}
                                occupancyStatus="Occupied"
                                timeLastServed="00:00:00"
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'left',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'left',
                                        isSeated: true,
                                        occupiedBy: 'Jessica',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'right',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: false,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'right',
                                        isSeated: true,
                                        occupiedBy: 'Jack',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: true,
                                        occupiedBy: 'Tara',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                ]}
                                relativeSize={0.4}
                                tableUse="TableForManagement"
                                selectedIndex={3}
                                onTableClick={handleTableClick}
                            />
                        </SquareEightTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 90, y: -250 }}
                    >
                        <RectangleFourTopWidth>
                            <SquareTable
                                tableShape="Square"
                                tableID="T3"
                                partyName="Dmytro"
                                isSquare={false}
                                occupancyStatus="Reserved"
                                timeLastServed="00:00:00"
                                relativeSize={0.4}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                ]}
                                tableUse="TableForManagement"
                                selectedIndex={3}
                                onTableClick={handleTableClick}
                            />
                        </RectangleFourTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 350, y: -625 }}
                    >
                        <CircleTableWidth>
                            <CircleTable
                                tableShape="Circle"
                                tableID="T2"
                                partyName="Corey"
                                occupancyStatus="Occupied"
                                timeLastServed="00:00:00"
                                relativeSize={0.5}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Sarah',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Dean',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Corey',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Claire',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Sam',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForManagement',
                                        chairIndex: 0
                                    },
                                ]}
                                tableUse="TableForManagement"
                                selectedIndex={3}
                                onTableClick={handleTableClick}
                            />
                        </CircleTableWidth>
                    </Draggable>{' '}
                    {/* End draggable table 2 */}
                </StylesForCanvas>
            </StylesForDraggableDemo>{' '}
            {/* End Draggable Canvas */}
        </SpacingForBottom>
    );
};

/**
 * variables for the styled components
 */
const RectangleTwoTopWidth = styled.div`
    width: 175px;
`;

const SquareEightTopWidth = styled.div`
    width: 310px;
`;

const FloatRight = styled.div`
    float: right;
`;

const CircleTableWidth = styled.div`
    width: 290px;
`;

const RectangleFourTopWidth = styled.div`
    width: 300px;
`;

const StylesForCanvas = styled.div`
    height: 700px;
    width: 1100px;
    padding: 10px;
`;

const StylesForDraggableDemo = styled.div`
    width: 1120px;
    position: relative;
    overflow: auto;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    border-radius: 0.25rem;
    background-color: transparent;
`;

const SpacingForBottom = styled.div`
    padding-bottom: 1rem;
    margin-bottom: 3rem;
`;

const PaddingForH52TextCenter = styled.h5`
    text-align: center;
    padding-bottom: 0.5rem;
`;
