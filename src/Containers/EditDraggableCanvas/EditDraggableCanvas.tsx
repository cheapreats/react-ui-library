import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { SquareTable } from '@Containers/SquareTable/SquareTable';
import { CircleTable } from '@Containers/CircleTable/CircleTable';

type getCanvasFillType = () => JSX.Element;

export interface IEditDraggableCanvas {
    /**
     * The current number of chairs being used in the layout
     */
    CurrentNumberOfChairs: number;

    /**
     * The Max amount of chairs the layout can have currently
     */
    MaxCapacity: number;
    /**
     * Whether the user for the component is a new user or has
     * previously saved layouts
     */
    isNewUser: boolean;
}

/**
 * Primary UI component for user interaction
 * EditDraggableCanvas
 */
export const EditDraggableCanvas: React.FC<IEditDraggableCanvas> = ({
    CurrentNumberOfChairs = 0,
    MaxCapacity = 0,
    isNewUser = true,
    ...props
}) => {
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
     * Returns a JSX.Element for the text or symbol on the chair with correct
     * styles based on tableUse, whether the chair isRound, and whether the
     * chair isVisible
     * @returns {JSX.Element}
     *
     */
    const getCanvasFill: getCanvasFillType = () => {
        if (isNewUser) {
            return (
                <TextStyles>
                    <FontTop>Get Started!</FontTop>
                    <FontBottom>Start creating your new layout by</FontBottom>
                    <FontBottom>
                        dragging and dropping your tables here
                    </FontBottom>
                </TextStyles>
            );
        }

        return (
            <StylesForDraggableDemo>
                <StylesForCanvas>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 50, y: 24 }}
                    >
                        <RectangleTwoTopWidth>
                            <SquareTable
                                tableID="T1"
                                partyName=""
                                isSquare
                                occupancyStatus="Vacant"
                                relativeSize={0.25}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                ]}
                                tableUse="TableForEditCanvas"
                            />
                        </RectangleTwoTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 375, y: 37 }}
                    >
                        <RectangleTwoTopWidth>
                            <SquareTable
                                tableID="T5"
                                partyName="Tina"
                                isSquare
                                occupancyStatus="Occupied"
                                relativeSize={0.25}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Suzy',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: true,
                                        occupiedBy: 'Tina',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'left',
                                        isSeated: true,
                                        occupiedBy: 'Tina',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'right',
                                        isSeated: true,
                                        occupiedBy: 'Tina',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                ]}
                                tableUse="TableForEditCanvas"
                            />
                        </RectangleTwoTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 367, y: -199 }}
                    >
                        <CircleTableWidth>
                            <CircleTable
                                tableID="T4"
                                partyName="Scott"
                                occupancyStatus="Occupied"
                                relativeSize={0.25}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Sarah',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Dean',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Corey',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Claire',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Sam',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                ]}
                                tableUse="TableForEditCanvas"
                            />
                        </CircleTableWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 210, y: -283 }}
                    >
                        <RectangleFourTopWidth>
                            <SquareTable
                                tableID="T3"
                                partyName="Dmytro"
                                isSquare={false}
                                occupancyStatus="Reserved"
                                relativeSize={0.25}
                                chairs={[
                                    {
                                        position: 'left',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'right',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'left',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'right',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                ]}
                                tableUse="TableForEditCanvas"
                            />
                        </RectangleFourTopWidth>
                    </Draggable>
                    <Draggable
                        bounds="parent"
                        {...dragHandlers}
                        defaultPosition={{ x: 43, y: -363 }}
                    >
                        <CircleTableWidth>
                            <CircleTable
                                tableID="T2"
                                partyName="Corey"
                                occupancyStatus="Occupied"
                                relativeSize={0.25}
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Sarah',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Dean',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Corey',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Claire',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Sam',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 1,
                                        tableUse: 'TableForEditCanvas',
                                    },
                                ]}
                                tableUse="TableForEditCanvas"
                            />
                        </CircleTableWidth>
                    </Draggable>
                </StylesForCanvas>
            </StylesForDraggableDemo>
        );
    };

    return (
        <CanvasBorder>
            {getCanvasFill()}
            <CapacityDisplayStyles>
                <FontForCapacityDisplay>
                    <div>Total Seat Capacity</div>
                    <div>{`${CurrentNumberOfChairs} / ${MaxCapacity}`}</div>
                </FontForCapacityDisplay>
            </CapacityDisplayStyles>
        </CanvasBorder>
    );
};

/**
 * Variables for styled components
 */

const FontTop = styled.div`
    font-size: 24px;
    line-height: 30px;
`;

const FontBottom = styled.div`
    font-size: 14px;
    line-height: 17.5px;
`;

const TextStyles = styled.div`
    text-align: center;
    margin-top: 122px;
`;

const CanvasBorder = styled.div`
    height: 320px;
    width: 523px;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 11px;
    position: relative;
`;

const RectangleTwoTopWidth = styled.div`
    width: 120px;
`;

const CircleTableWidth = styled.div`
    width: 123px;
    height: 123px;
`;

const RectangleFourTopWidth = styled.div`
    width: 120px;
`;

const StylesForCanvas = styled.div`
    height: 317px;
    width: 520px;
`;

const StylesForDraggableDemo = styled.div`
    width: 520px;
    position: relative;

    padding: 0;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    border-radius: 0.25rem;
    background-color: transparent;
`;

const FontForCapacityDisplay = styled.div`
    font-size: 14px;
    text-align: center;
    margin-top: 0.6rem;
    margin-left: 0.2rem;
    color: black;
`;

const CapacityDisplayStyles = styled.div`
    width: 10rem;
    height: 3rem;
    background: grey;
    bottom: 0;
    right: 0;
    position: absolute;
    border-bottom-right-radius: 11px;
    border-top-left-radius: 50px;
`;

export default EditDraggableCanvas;
