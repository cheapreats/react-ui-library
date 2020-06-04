import React, {
    useState,
    useLayoutEffect,
    useRef,
    MouseEvent,
    useMemo,
    useEffect,
} from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import { Popup } from '../Containers/Popup';

export interface MarkProps {
    key: number;
    mark: string;
}

export interface Values {
    leftValue: number;
    rightValue: number;
}

export interface SliderProps extends LabelLayoutProps {
    values?: Values;
    onChange?: Function;

    disabled?: boolean;
    hasTwoKnobs?: boolean;
    hasRail?: boolean;
    hasPopup?: boolean;
    step?: number;
    max?: number;
    min?: number;
    marks?: MarkProps[];
    theme?: DefaultTheme;
}

export const Slider: React.FunctionComponent<SliderProps> = ({
    onChange = (): void => {},
    hasPopup = false,
    disabled = false,
    hasRail = false,
    hasTwoKnobs = false,
    step = 1,
    min = 0,
    max = 100,
    marks,
    values = { leftValue: min, rightValue: max },
    theme,
    ...props
}): React.ReactElement => {
    // DOM Elements
    const barRef = useRef<HTMLDivElement>(null);
    const selectedBarRef = useRef<HTMLDivElement>(null);
    const marksBarRef = useRef<HTMLDivElement>(null);

    // Knob Positions
    const [rightKnobPosition, setRightKnobPosition] = useState(
        values.rightValue,
    );

    const [leftKnobPosition, setLeftKnobPosition] = useState(values.leftValue);

    const [isRightKnobDragging, setIsRightKnobDragging] = useState(false);
    const [isLeftKnobDragging, setIsLeftKnobDragging] = useState(false);

    const maxAndMinDifference = useMemo((): number => {
        return max - min;
    }, [max, min]);

    // Translate a value to Pixel
    const translateToPixels = (theValue: number): number => {
        const pixelTranslator =
            (barRef.current?.clientWidth as number) / maxAndMinDifference;
        return (theValue - min) * pixelTranslator;
    };

    // Rounding up/down to steps
    const roundToSteps = (theValue: number): number => {
        return (
            Math.round(
                ((theValue * maxAndMinDifference) /
                    (barRef.current?.clientWidth as number) +
                    min) /
                    step,
            ) * step
        );
    };

    useLayoutEffect((): void => {
        onChange({
            values: {
                leftValue: leftKnobPosition,
                rightValue: rightKnobPosition,
            },
        });
    }, [rightKnobPosition, leftKnobPosition]);

    const onMouseMove = (theevent: MouseEvent): void => {
        theevent.preventDefault();
        // clicked on pure position
        const newLeft =
            theevent.clientX -
            (barRef.current as HTMLElement).getBoundingClientRect().left;

        // new position based on steps
        const newPosition = roundToSteps(newLeft);

        // setting the positions
        if (newLeft < (barRef.current?.clientWidth as number) && newLeft >= 0) {
            if (
                (isRightKnobDragging && newPosition > leftKnobPosition) ||
                !hasTwoKnobs
            ) {
                setRightKnobPosition(newPosition);
            } else if (isLeftKnobDragging && newPosition < rightKnobPosition) {
                setLeftKnobPosition(newPosition);
            }
        }
    };

    const onMouseUp = (): void => {
        setIsRightKnobDragging(false);
        setIsLeftKnobDragging(false);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove as any);
    };

    const handleMouseDown = (e: MouseEvent): void => {
        e.preventDefault();
        if (!disabled) {
            // position the clicked taken placed on based on the position of Bar
            const clickedOn =
                e.clientX -
                (barRef.current as HTMLElement).getBoundingClientRect().left;

            const isOnRightSide =
                clickedOn >=
                    (translateToPixels(rightKnobPosition) +
                        translateToPixels(leftKnobPosition)) /
                        2 || !hasTwoKnobs;

            setIsRightKnobDragging(isOnRightSide);
            setIsLeftKnobDragging(!isOnRightSide);

            if (
                e.target === barRef.current ||
                e.target === selectedBarRef.current
            ) {
                if (isOnRightSide) {
                    setRightKnobPosition(roundToSteps(clickedOn));
                } else {
                    setLeftKnobPosition(roundToSteps(clickedOn));
                }
            }
        }
    };

    useEffect((): void => {
        if (isRightKnobDragging || isLeftKnobDragging) {
            document.addEventListener('mousemove', onMouseMove as any);
            document.addEventListener('mouseup', onMouseUp);
        }
    }, [isRightKnobDragging, isLeftKnobDragging]);

    return (
        <LabelLayout {...props}>
            <SliderBoard
                ref={barRef}
                disabled={disabled}
                onMouseDown={(event): void => handleMouseDown(event)}
                theme={theme}
            >
                <SliderBoardSelected
                    ref={selectedBarRef}
                    left={translateToPixels(leftKnobPosition)}
                    right={
                        translateToPixels(rightKnobPosition) -
                        translateToPixels(leftKnobPosition)
                    }
                    disabled={disabled}
                    hasRail={hasRail}
                    theme={theme}
                />
                {hasTwoKnobs && (
                    <SliderKnobLeft
                        left={translateToPixels(leftKnobPosition)}
                        disabled={disabled}
                        hasTwoKnobs={hasTwoKnobs}
                        onMouseDown={(event): void => handleMouseDown(event)}
                    >
                        {hasPopup && (
                            <Popup
                                left={-11}
                                top={-50}
                                height={20}
                                width={50}
                                {...props}
                            >
                                {leftKnobPosition}
                            </Popup>
                        )}
                    </SliderKnobLeft>
                )}

                <SliderKnobRight
                    disabled={disabled}
                    hasTwoKnobs={hasTwoKnobs}
                    left={translateToPixels(rightKnobPosition)}
                    onMouseDown={(event): void => handleMouseDown(event)}
                >
                    {hasPopup && (
                        <Popup
                            left={-11}
                            top={-50}
                            height={20}
                            width={50}
                            {...props}
                        >
                            {rightKnobPosition}
                        </Popup>
                    )}
                </SliderKnobRight>
            </SliderBoard>
            {marks && (
                <SliderBoardMarks
                    ref={marksBarRef}
                    theme={theme}
                    disabled={disabled}
                >
                    {marks.map(
                        ({ key, mark }): React.ReactElement => (
                            <div
                                key={key}
                                style={{
                                    position: 'absolute',
                                    left: `${translateToPixels(key)}px`,
                                }}
                            >
                                {mark}
                            </div>
                        ),
                    )}
                </SliderBoardMarks>
            )}
        </LabelLayout>
    );
};

const SliderBoard = styled.div<SliderProps>`
        width: 100%;
        height: 4px;
        background: #e9e9e9;
        cursor:pointer;
        ${({ theme }): string => `
            border-radius: ${theme.dimensions.radius};
            box-shadow: ${theme.depth[1]};
        `}
        // Disabled
        ${({ disabled }): string =>
            disabled
                ? `
            cursor: not-allowed;
            opacity: 0.6;
        `
                : ''}
        `;

export interface SelectedBarProps {
    left: number;
    right: number;
    disabled: boolean;
    hasRail: boolean;
}

const SliderBoardSelected = styled.div<SelectedBarProps>`
    top: 1px;
    height: 4px;
    position: relative;
    left: ${({ left }): string => `${left}px` || '0px'};
    ${({ theme, hasRail }): string => `
            border-radius: ${theme.dimensions.radius};
            box-shadow: ${theme.depth[1]};
            background: ${hasRail ? theme.colors.primary : '#e9e9e9'};
        `}
    width: ${({ right }): string => `${right}px` || '0px'};
    ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ''}
`;

const SliderBoardMarks = styled.div<SliderProps>`
    display: flex;
    width: 100%;
    position: relative;
    font-weight: bold;
    top: 6px;
    ${({ disabled }): string =>
        disabled
            ? `
            cursor: not-allowed;
            opacity: 0.6;
        `
            : ''}
    ${({ theme }): string => `
                border-radius: ${theme.dimensions.radius};
                box-shadow: ${theme.depth[1]};
            `}
`;

export interface KnobProps {
    left: number;
    hasTwoKnobs: boolean;
    disabled: boolean;
}

const SliderKnobRight = styled.div<KnobProps>`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: relative;
    left: ${({ left }): string => `${left}px` || '100px'};
    ${({ hasTwoKnobs }): string =>
        hasTwoKnobs
            ? `
         top: -21px;
`
            : 'top: -7px; '}

    cursor: grab;
    ${({ theme }): string => `
            background: ${theme.colors.primary};
        `}
    &:active {
        box-sizing: border-box;
        border: solid 2px #96dbfa;
        cursor: grabbing;
    }
    ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ' '}
`;

const SliderKnobLeft = styled.div<KnobProps>`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: relative;
    top: -7px;
    cursor: grab;
    left: ${({ left }): string => `${left}px` || '0px'};
    ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ' '}
    ${({ theme }): string => `
            background: ${theme.colors.primary};
        `}
        &:active {
        box-sizing: border-box;
        border: solid 2px #96dbfa;
        cursor: grabbing;
    }
`;

export default Slider;
