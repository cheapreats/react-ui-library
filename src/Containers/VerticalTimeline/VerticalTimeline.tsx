import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { Hooks } from '../../Utils';

interface ITimelineData {
    label: string;
    time: number;
}

export interface VerticalTimelineProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    timelineData: Array<ITimelineData>;
    verticalSpacing: number;
    widthLeftPanels: number;
    widthRightPanels: number;
    heightPanels: number;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
    timelineData,
    verticalSpacing,
    widthLeftPanels,
    widthRightPanels,
    heightPanels,
}): React.ReactElement => {
    const [deltas, setDeltas] = useState<Array<number>>([]);
    const isMounted = Hooks.useMounted();

    // set deltas
    useEffect(() => {
        let aux: number | null = null;

        const deltas = timelineData.reduce((acc, value) => {
            if (aux) {
                const delta = value.time - aux;
                acc.push(delta);
            }
            aux = value.time;
            return acc;
        }, [] as Array<number>);

        if (isMounted.current) {
            setDeltas(deltas);
        }
    }, [timelineData]);

    return (
        <div>
            {deltas.map((delta, index) => (
                <Block
                    delta={delta}
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
    }): string => `
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
}

const Block: React.FC<IBlockProps> = ({
    delta,
    step,
    relative,
    verticalSpacing,
    widthLeftPanels,
    heightPanels,
    end,
}): React.ReactElement => {
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
            >
                {delta}
            </StepBox>
            <Divider
                verticalSpacing={verticalSpacing}
                end={end}
                heightPanels={heightPanels}
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
}

const Divider = styled.div<IDividerProps>`
    color: black;
    border: 1px solid currentColor;
    border-radius: 50%;
    height: 7px;
    width: 7px;
    ${({ end, verticalSpacing, heightPanels }): string => `
    ${
    !end && !!heightPanels
        ? `
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
