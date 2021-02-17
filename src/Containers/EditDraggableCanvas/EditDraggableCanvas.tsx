import React from "react";
import styled from "styled-components";

export interface IEditDraggableCanvas {
    /**
     * The current number of chairs being used in the layout
     */
    CurrentNumberOfChairs: number;

    /**
     * The Max amount of chairs the layout can have currently
     */
    MaxCapacity: number;
}

/**
 * Primary UI component for user interaction
 * EditDraggableCanvas
 */
export const EditDraggableCanvas: React.FC<IEditDraggableCanvas> = ({
    CurrentNumberOfChairs= 0,
    MaxCapacity = 0,
    ...props
}) => (
    <CanvasBorder>
        <TextStyles>
            <FontTop>Get Started!</FontTop>
            <FontBottom>Start creating your new layout by</FontBottom>
            <FontBottom>dragging and dropping your tables here</FontBottom>
        </TextStyles>
        <CapacityDisplayStyles>
            <FontForCapacityDisplay>
                <div>Total Seat Capacity</div>
                <div>{`${CurrentNumberOfChairs} / ${MaxCapacity}`}</div>
            </FontForCapacityDisplay>
        </CapacityDisplayStyles>
    </CanvasBorder>
);

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

const FontForCapacityDisplay = styled.div`
    font-size: 14px;
    text-align: center;
    margin-top: .6rem;
    margin-left: .2rem;
    color: black;
`;

const CapacityDisplayStyles = styled.div`
    width: 10rem;
    height: 3rem;
    background: grey;
    bottom:0;
    right:0;
    position: absolute;
    border-bottom-right-radius: 11px;
    border-top-left-radius: 50px;
`;

export default EditDraggableCanvas;