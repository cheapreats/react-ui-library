import React from 'react';
import styled from 'styled-components';
import {
    DraggableTable,
    IDraggableTable,
} from '@Containers/EditDraggableCanvas/_DraggableTable';

type getCanvasFillType = () => JSX.Element;

type canvasTypes = 'newUserCanvas' | 'editCanvas' | 'managementCanvas';

type getTablesType = () => JSX.Element[];

type generateTableKeyType = (pre: string) => string;

export interface IEditDraggableCanvas {
    /**
     * The current number of chairs being used in the layout
     */
    currentNumberOfChairs: number;

    /**
     * The Max amount of chairs the layout can have currently
     */
    maxCapacity: number;
    /**
     * How the canvas will be used in the application (newUserCanvas,
     * editCanvas, or managementCanvas)
     */
    canvasType: canvasTypes;
    /**
     * Array of DraggableTables
     */
    tables?: Array<IDraggableTable>;
}

/**
 * Primary UI component for user interaction
 * EditDraggableCanvas
 */
export const EditDraggableCanvas: React.FC<IEditDraggableCanvas> = ({
    currentNumberOfChairs = 0,
    maxCapacity = 0,
    canvasType = 'newUserCanvas',
    tables = [],
    ...props
}) => {
    /**
     * Generates a unique key based on a string and a random number
     * @param prefix - a string to append to random number
     * @returns {string} a unique key
     */
    const generateTableKey: generateTableKeyType = (prefix) =>
        `${prefix}_${Math.random()}`;

    /**
     * Returns a JSX element array containing the tables
     * @return {JSX.Element[]} - the DraggableTables
     */
    const getTables: getTablesType = () =>
        tables.map((item, index) => (
            <DraggableTable
                tableInput={item.tableInput}
                defaultXY={item.defaultXY}
                arrayIndex={index}
                key={generateTableKey(item.defaultXY.x.toString() + index)}
            />
        ));

    /**
     * Returns the correct text for a new user canvas or the tables
     * with the correct styles for a returning user canvas based on the
     * canvasType
     * @returns {JSX.Element}
     *
     */
    const getCanvasFill: getCanvasFillType = () => {
        switch (canvasType) {
            case 'newUserCanvas':
                return (
                    <TextStyles>
                        <FontTop>Get Started!</FontTop>
                        <FontBottom>
                            Start creating your new layout by
                        </FontBottom>
                        <FontBottom>
                            dragging and dropping your tables here
                        </FontBottom>
                    </TextStyles>
                );
            case 'editCanvas':
                return (
                    <StylesForDraggableDemo>
                        <StylesForCanvas>{getTables()}</StylesForCanvas>
                    </StylesForDraggableDemo>
                );
            case 'managementCanvas':
                return (
                    <StylesForDraggableDemo>
                        <StylesForCanvas>{getTables()}</StylesForCanvas>
                    </StylesForDraggableDemo>
                );

            default:
                return <div />;
        }
    };

    return (
        <CanvasBorder {...props}>
            {getCanvasFill()}
            <CapacityDisplayStyles>
                <FontForCapacityDisplay>
                    <div>Total Seat Capacity</div>
                    <div>{`${currentNumberOfChairs} / ${maxCapacity}`}</div>
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
