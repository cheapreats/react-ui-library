import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { ISquareTable, SquareTable } from '@Containers/SquareTable/SquareTable';
import { CircleTable, ICircleTable } from '@Containers/CircleTable/CircleTable';

type getTableComponentType = () => JSX.Element | null;

type tableInputType = ISquareTable | ICircleTable;

export interface IDraggableTable {
    /**
     * The input for the DraggableTable
     */
    tableInput: tableInputType;
    /**
     * The starting coordinates on the canvas for the table
     */
    defaultXY: { x: number; y: number };
    /**
     * Array index for the table
     */
    arrayIndex: number;
    /**
     * Whether the draggable functionality is disabled (if true, then disabled)
     */
    isDisabled?: boolean;
    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: (selectedChildIndex: number) => void;
    /**
     * The function that will pass over the index value of DraggableTable in the array with its
     * coordinates on the canvas (x,y)
     * @param selectedChildIndex
     * @param deltaX
     * @param deltaY
     */
    handleStop: (
        selectedChildIndex: number,
        deltaX: number,
        deltaY: number,
    ) => void;
}

/**
 * Primary UI component for user interaction
 * EditDraggableCanvas
 */
export const DraggableTable: React.FC<IDraggableTable> = ({
    tableInput = {
        tableShape: 'Circle',
        tableID: 'T1',
        partyName: '',
        occupancyStatus: 'Vacant',
        relativeSize: 0.25,
        chairs: [
            {
                position: 'top',
                isSeated: false,
                occupiedBy: '',
                isVisible: true,
                relativeSize: 1,
                tableUse: 'TableForManagement',
            },
            {
                position: 'bottom',
                isSeated: false,
                occupiedBy: '',
                isVisible: true,
                relativeSize: 1,
                tableUse: 'TableForManagement',
            },
        ],
        tableUse: 'TableForManagement',
    },
    defaultXY = { x: 50, y: 24 },
    arrayIndex = 0,
    isDisabled = false,
    onTableClick,
    handleStop,
    ...props
}) => {
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0,
        y: 0,
    });

    const handleDrag = (e: Event, ui: { deltaX: number; deltaY: number }) => {
        const { x, y } = deltaPosition;
        console.log(deltaPosition);
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        });
    };

    const dragHandlers = {
        handleDrag,
    };

    /**
     * Returns a JSX element with the correct component based on whether the
     * TableInput is an ISquareTable or an ICircleTable
     * @returns {JSX.Element | null} the correct JSX.Element for the Table component
     */
    const getTableComponent: getTableComponentType = () => {
        switch (tableInput.tableShape) {
        case 'Square':
            return (
                <SquareTable
                    tableShape={tableInput.tableShape}
                    tableID={tableInput.tableID}
                    partyName={tableInput.partyName}
                    isSquare={tableInput.isSquare}
                    occupancyStatus={tableInput.occupancyStatus}
                    relativeSize={tableInput.relativeSize}
                    chairs={tableInput.chairs}
                    tableUse={tableInput.tableUse}
                    arrayIndex={arrayIndex}
                    onTableClick={onTableClick}
                />
            );
        case 'Circle':
            return (
                <CircleTable
                    tableShape={tableInput.tableShape}
                    tableID={tableInput.tableID}
                    partyName={tableInput.partyName}
                    occupancyStatus={tableInput.occupancyStatus}
                    relativeSize={tableInput.relativeSize}
                    chairs={tableInput.chairs}
                    tableUse={tableInput.tableUse}
                    arrayIndex={arrayIndex}
                    onTableClick={onTableClick}
                />
            );
        default:
            return null;
        }
    };

    return (
        <Draggable
            disabled={isDisabled}
            bounds="parent"
            {...dragHandlers}
            defaultPosition={{ x: defaultXY.x, y: defaultXY.y }}
            onStop={(e, data) => handleStop(arrayIndex, data.x, data.y)}
            {...props}
        >
            <TableWidthWrapper>{getTableComponent()}</TableWidthWrapper>
        </Draggable>
    );
};

const TableWidthWrapper = styled.div`
    width: 123px;
    position: absolute;
`;
