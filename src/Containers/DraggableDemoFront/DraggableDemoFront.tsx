/*
    Created by:                Level Up team
    Date submitted:            12/08/2020
    File:                      DraggableDemoFront.js
    File Description:          This component creates the draggable demo for the front page. It includes the
                               example data for the tables and the capacity component in the demo.
*/

import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { SquareTable } from '..';
import { CircleTable } from '..';
import { CapacityDisplay } from '..';

/**
 *  This component creates the draggable demo for the front page.
 *  It includes the example data for the tables and the capacity
 *  component in the demo.
 */
export class DraggableCanvas extends React.Component {
    state = {
        activeDrags: 0,
        deltaPosition: {
            x: 0,
            y: 0,
        },
        controlledPosition: {
            x: -400,
            y: 200,
        },
    };

    handleDrag = (e, ui) => {
        const { x, y } = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            },
        });
    };

    onStart = () => {
        this.setState({ activeDrags: ++this.state.activeDrags });
    };

    onStop = () => {
        this.setState({ activeDrags: --this.state.activeDrags });
    };

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        this.setState({ controlledPosition: { x, y } });
    };

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    };

    render() {
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return (
            <Pb3Mb5 id="demo">
                <Pb2TextCenterWithH5>
                    Drag the tables and create your own design!
                </Pb2TextCenterWithH5>
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
                                    tableID="T1"
                                    partyName=""
                                    occupancyStatus="Vacant"
                                    relativeSize={0.4}
                                    chairs={[
                                        {
                                            position: 'top',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'bottom',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                    ]}
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
                                    tableID="T4"
                                    partyName="Tina"
                                    occupancyStatus="Occupied"
                                    relativeSize={0.4}
                                    chairs={[
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Suzy',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'bottom',
                                            isSeated: true,
                                            occupiedBy: 'Tina',
                                            isVisible: true,
                                        },
                                    ]}
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
                                    tableID="T5"
                                    partyName="Scott"
                                    occupancyStatus="Occupied"
                                    chairs={[
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Scott',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'left',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'left',
                                            isSeated: true,
                                            occupiedBy: 'Jessica',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'right',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: false,
                                        },
                                        {
                                            position: 'right',
                                            isSeated: true,
                                            occupiedBy: 'Jack',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'bottom',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'bottom',
                                            isSeated: true,
                                            occupiedBy: 'Tara',
                                            isVisible: true,
                                        },
                                    ]}
                                    relativeSize={0.4}
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
                                    tableID="T3"
                                    partyName="Dmytro"
                                    occupancyStatus="Reserved"
                                    relativeSize={0.4}
                                    chairs={[
                                        {
                                            position: 'top',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'bottom',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                        {
                                            position: 'bottom',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                        },
                                    ]}
                                />
                            </RectangleFourTopWidth>
                        </Draggable>
                        <Draggable
                            bounds="parent"
                            {...dragHandlers}
                            defaultPosition={{ x: 350, y: -750 }}
                        >
                            <CircleTableWidth>
                                <CircleTable
                                    tableID="T2"
                                    partyName="Corey"
                                    occupancyStatus="Occupied"
                                    relativeSize={0.5}
                                    chairs={[
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Sarah',
                                            isVisible: true,
                                            isRound: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: false,
                                            occupiedBy: '',
                                            isVisible: true,
                                            isRound: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Dean',
                                            isVisible: true,
                                            isRound: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Corey',
                                            isVisible: true,
                                            isRound: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Claire',
                                            isVisible: true,
                                            isRound: true,
                                        },
                                        {
                                            position: 'top',
                                            isSeated: true,
                                            occupiedBy: 'Sam',
                                            isVisible: true,
                                            isRound: true,
                                        },
                                    ]}
                                />
                            </CircleTableWidth>
                        </Draggable>{' '}
                        {/* End draggable table 2 */}
                    </StylesForCanvas>
                </StylesForDraggableDemo>{' '}
                {/* End Draggable Canvas */}
            </Pb3Mb5>
        );
    }
}

/**
 * variables for the styled components
 */
const RectangleTwoTopWidth = styled.div`
    width: 140px;
`;

const SquareEightTopWidth = styled.div`
    width: 300px;
`;

const FloatRight = styled.div`
    float: right;
`;

const CircleTableWidth = styled.div`
    width: 290px;
`;

const RectangleFourTopWidth = styled.div`
    width: 270px;
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

const Pb3Mb5 = styled.div`
    padding-bottom: 1rem;
    margin-bottom: 3rem;
`;

const Pb2TextCenterWithH5 = styled.h5`
    text-align: center;
    padding-bottom: 0.5rem;
`;

/**
 * Helper class for the DraggableDemoFront Component
 */
class RemWrapper extends React.Component {
    translateTransformToRem(transform, remBaseline = 16) {
        const convertedValues = transform
            .replace('translate(', '')
            .replace(')', '')
            .split(',')
            .map((px) => px.replace('px', ''))
            .map((px) => parseInt(px, 10) / remBaseline)
            .map((x) => `${x}rem`);
        const [x, y] = convertedValues;

        return `translate(${x}, ${y})`;
    }

    render() {
        const { children, remBaseline = 16, style } = this.props;
        const child = React.Children.only(children);

        const editedStyle = {
            ...child.props.style,
            ...style,
            transform: this.translateTransformToRem(
                style.transform,
                remBaseline,
            ),
        };

        return React.cloneElement(child, {
            ...child.props,
            ...this.props,
            style: editedStyle,
        });
    }
}

export default DraggableCanvas;
