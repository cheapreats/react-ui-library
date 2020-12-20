import React, { useState, useEffect, useCallback } from 'react';
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
    locale: string;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
    timelineData,
    verticalSpacing,
    widthLeftPanels,
    widthRightPanels,
    heightPanels,
    redColor,
    greenColor,
    locale,
}): React.ReactElement => {
    const [deltas, setDeltas] = useState<Array<IDelta>>([]);
    const isMounted = Hooks.useMounted();

    /**
     * This functions transforms an input of two numbers into a message of hours and minutes
     * @param hours {number} - The number of hours
     * @param minutes {number} - The number of minutes
     * @returns {string} The message formatted of hours and minutes
     */
    const getLabel = useCallback(
        (hours: number, minutes: number) => {
            // @ts-ignore
            const relativeTimeFormat = new Intl.RelativeTimeFormat(locale);

            if (hours === 0) {
                return relativeTimeFormat.format(minutes, 'minutes');
            }
            return `${relativeTimeFormat.format(
                hours,
                'hours',
            )} ${relativeTimeFormat.format(minutes, 'minutes')}`;
        },
        [locale],
    );

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

    const renderBlocks = useCallback(
        (deltas: IDelta[]): JSX.Element[] => {
            return deltas.map((delta, index, deltas) => (
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
                    length={deltas.length}
                    getLabel={getLabel}
                />
            ));
        },
        [
            deltas,
            getLabel,
            timelineData,
            widthRightPanels,
            heightPanels,
            verticalSpacing,
            widthLeftPanels,
        ],
    );

    return (
        <div>
            {renderBlocks(deltas)}
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
    length?: number;
    getLabel?: (hours: number, minutes: number) => string;
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
    length,
    getLabel,
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
                {!!getLabel && getLabel(hours, minutes)}
            </StepBox>
            <Divider
                verticalSpacing={verticalSpacing}
                end={end}
                heightPanels={heightPanels}
                color={color}
                relative={relative}
                length={length}
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
    relative?: number;
    length?: number;
}

const Divider = styled.div<IDividerProps>`
    border-radius: 50%;
    height: 7px;
    width: 7px;
    ${({
        end,
        verticalSpacing,
        heightPanels,
        color,
        relative,
        length,
    }): string => `
    ${color ? `color:${color};background-color:currentColor;` : 'color:black;'}
    border: 1px solid currentColor;
    ${
    !end && !!heightPanels && relative !== undefined && length !== undefined
        ? `
        @keyframes ${`flow${relative}`} {
            0%{height:0px;}
            ${(relative * 100) / length}%{height: 0px;}
            ${((relative + 1) * 100) / length}%{height:${
    heightPanels + verticalSpacing - 2
}px;}
100%{height:${heightPanels + verticalSpacing - 2}px;}
          }
    &::before {
        content: '';
        display: block;
        width: 0px;
        height:0px;
        animation-name:${`flow${relative}`};
        animation-duration:${2 * length}s;
        animation-iteration-count:infinite;
        border: 1px solid currentColor;
        position: relative;
        left: 2px;
    }
    `
        : ''
}
    `}
`;