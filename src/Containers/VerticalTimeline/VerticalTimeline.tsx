import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { Hooks, msToTime } from '../../Utils';

interface ITimelineData {
    label: string;
    time: number;
    maxTime: number;
}

interface IDelta {
    value: number;
    color: string;
}

/**
 * This functions transforms an input of two numbers into a message of hours and minutes
 * @param hours {number} - The number of hours
 * @param minutes {number} - The number of minutes
 * @returns {string} The message formatted of hours and minutes
 */
const getLabel = (hours: number, minutes: number) => {
    if (hours === 0) {
        return `${minutes} mins`;
    }
    return `${hours} hours ${minutes} mins`;
};

export interface VerticalTimelineProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    timelineData: Array<ITimelineData>;
    verticalSpacing: number;
    widthLeftPanels: number;
    widthRightPanels: number;
    heightPanels: number;
    redColor: string;
    greenColor: string;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
    timelineData,
    verticalSpacing,
    widthLeftPanels,
    widthRightPanels,
    heightPanels,
    redColor,
    greenColor,
}): React.ReactElement => {
    const [deltas, setDeltas] = useState<Array<IDelta>>([]);
    const isMounted = Hooks.useMounted();

    // set deltas
    useEffect(() => {
        let previous: ITimelineData | null = null;

        const deltas = timelineData.reduce((acc, value) => {
            if (previous) {
                const delta: { value: number; color: string } = {
                    value: 0,
                    color: greenColor,
                };
                delta.value = value.time - previous.time;
                if (previous.maxTime < delta.value) {
                    delta.color = redColor;
                }
                acc.push(delta);
            }
            previous = value;
            return acc;
        }, [] as Array<IDelta>);

        if (isMounted.current) {
            setDeltas(deltas);
        }
    }, [timelineData]);

    return (
        <div>
            {deltas.map((delta, index) => (
                <Block
                    delta={delta.value}
                    color={delta.color}
                    step={(
                        <Step
                            label={timelineData[index].label}
                            width={widthRightPanels}
                            height={heightPanels}
                            center
                        />
                    )}
                    relative={index}
                    verticalSpacing={verticalSpacing}
                    widthLeftPanels={widthLeftPanels}
                    heightPanels={heightPanels}
                />
            ))}
            <Block
                step={(
                    <Step
                        label={timelineData[timelineData.length - 1].label}
                        width={widthRightPanels}
                        height={heightPanels}
                        center
                    />
                )}
                relative={timelineData.length - 1}
                verticalSpacing={verticalSpacing}
                widthLeftPanels={widthLeftPanels}
                heightPanels={heightPanels}
                end
            />
        </div>
    );
};

interface IStepProps {
    label: string;
    width: number;
    height: number;
    center?: boolean;
}

const Step: React.FC<IStepProps> = ({
    label,
    width,
    height,
    center,
}): React.ReactElement => {
    return (
        <StepBox
            width={width}
            height={height}
            margin="0 0 0 10px"
            center={center}
        >
            {label}
        </StepBox>
    );
};

interface IStepBoxProps {
    width: number;
    height: number;
    relative?: boolean;
    margin?: string;
    verticalSpacing?: number;
    end?: boolean;
    center?: boolean;
    color?: string;
}

const StepBox = styled.div<IStepBoxProps>`
    box-shadow: 0 0 0 1px;
    ${({
        width,
        height,
        relative,
        margin,
        verticalSpacing,
        end,
        center,
        color,
    }): string => `
    ${color ? `color:${color};` : 'color:black;'}
    width:${width}px;
    height:${height}px;
    ${
    relative && verticalSpacing
        ? `position:relative;top:${(verticalSpacing + 44) / 2 + 6}px;`
        : ''
}
    ${margin ? `margin:${margin};` : ''}
    ${end ? 'visibility:hidden;' : ''}
    ${center ? `${flex('center', 'center')}` : ''}
    `}
`;

interface IBlockProps {
    delta?: number;
    step: React.ReactElement;
    relative: number;
    verticalSpacing: number;
    widthLeftPanels: number;
    heightPanels: number;
    end?: boolean;
    color?: string;
}

const Block: React.FC<IBlockProps> = ({
    delta,
    step,
    relative,
    verticalSpacing,
    widthLeftPanels,
    heightPanels,
    end,
    color,
}): React.ReactElement => {
    let delta_ = 0;
    if (delta) {
        delta_ = delta;
    }

    const { hours, minutes } = msToTime(delta_);

    return (
        <Container relative={relative} verticalSpacing={verticalSpacing}>
            <StepBox
                width={widthLeftPanels}
                height={heightPanels}
                relative
                margin="0 10px 0 0"
                verticalSpacing={verticalSpacing}
                end={end}
                center
                color={color}
            >
                {getLabel(hours, minutes)}
            </StepBox>
            <Divider
                verticalSpacing={verticalSpacing}
                end={end}
                heightPanels={heightPanels}
                color={color}
            />
            {step}
        </Container>
    );
};

interface IContainerProps {
    relative: number;
    left?: number;
    verticalSpacing: number;
}

const Container = styled.div<IContainerProps>`
    ${flex('center')}
    ${({ relative, left, verticalSpacing }): string => `
    ${relative ? `position:relative;top:${relative * verticalSpacing}px;` : ''}
    ${left ? `left:${left}%` : ''}
    `}
`;

interface IDividerProps {
    end?: boolean;
    verticalSpacing: number;
    heightPanels?: number;
    color?: string;
}

const Divider = styled.div<IDividerProps>`
    border-radius: 50%;
    height: 7px;
    width: 7px;
    ${({ end, verticalSpacing, heightPanels, color }): string => `
    ${color ? `color:${color};background-color:currentColor;` : 'color:black;'}
    border: 1px solid currentColor;
    ${
    !end && !!heightPanels
        ? `
        @keyframes flow {
            from {height: 0;}
            to {height: ${heightPanels + verticalSpacing - 9}px;}
          }
    &::before {
        content: '';
        display: inline-block;
        width: 0px;
        height: ${heightPanels + verticalSpacing - 9}px;
        border: 1px solid currentColor;
        position: relative;
        top: 7px;
        left: 2px;
    }
    `
        : ''
}
    `}
`;
