import React, {
    useState,
    useLayoutEffect,
    useRef,
    RefObject,
    MouseEvent,
    useMemo,
} from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import { Popup } from '../Containers/Popup';

export interface MarkProps {
    key: number;
    mark: string;
}

export interface ResultValues {
    lowValue: number;
    highValue: number;
}

export interface SliderProps extends LabelLayoutProps {
    result?: ResultValues;
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    hasTwoInputs?: boolean;
    marks?: MarkProps[];
    onChange?: Function;
    valueFinish?: number;
    valueStart?: number;
    hasRail?: boolean;
    left?: number;
    right?: number;
    hasPopup?: boolean;
    popupLeft?: number;
    popupTop?: number;
    popupWidth?: number;
    popupHeight?: number;
    theme?: DefaultTheme;
}

export const Slider: React.FunctionComponent<SliderProps> = ({
    disabled = false,
    marks,
    min = 0,
    max = 100,
    hasRail,
    hasTwoInputs = false,
    valueFinish = max,
    valueStart = min,
    hasPopup,
    step = 1,
    onChange = (): void => {},
    popupLeft = -17,
    popupTop = -51,
    popupWidth = 'auto',
    popupHeight = 20,
    theme,
    ...props
}): React.ReactElement => {
    // DOM Elements
    const bar = useRef() as RefObject<HTMLDivElement>;
    const selectedBar = useRef() as RefObject<HTMLDivElement>;
    const startThumb = useRef() as RefObject<HTMLDivElement>;
    const finishThumb = useRef() as RefObject<HTMLDivElement>;
    const marksBar = useRef() as RefObject<HTMLDivElement>;

    // Thumb Positions in Px
    const [finishThumbLeft, setFinishThumbLeft] = useState(max);
    const [startThumbLeft, setStartThumbLeft] = useState(min);
    const [activeThumb, setActiveThumb] = useState('');

    // Translate a value to Pixel
    const translateToPixels = (theValue: number): number => {
        const pixelTranslator =
            (bar.current?.clientWidth as number) / (max - min);
        return (theValue - min) * pixelTranslator;
    };

    // Translate pixels to a value and rounding up/down to steps
    const translateToValue = (theValue: number): number => {
        return (
            Math.round(
                ((theValue * (max - min)) /
                    (bar.current?.clientWidth as number) +
                    min) /
                    step,
            ) * step
        );
    };

    // thumb positions in values whenever it changes (by pixels)
    const finishThumbLeftInValue = useMemo((): number => {
        const value = finishThumbLeft
            ? translateToValue(finishThumbLeft)
            : valueFinish;
        return value;
    }, [finishThumbLeft]);

    const startThumbLeftInValue = useMemo((): number => {
        const value = startThumbLeft
            ? translateToValue(startThumbLeft)
            : valueStart;
        return value;
    }, [startThumbLeft]);

    // Final Result
    useMemo((): void => {
        onChange({
            values: {
                lowValue: startThumbLeftInValue,
                highValue: finishThumbLeftInValue,
            },
        });
    }, [finishThumbLeftInValue, startThumbLeftInValue]);

    // Calcs of Positioning a thumb in the specific scale with provided steps
    const calculatePosition = (theValue: number): number => {
        return translateToPixels(translateToValue(theValue));
    };

    useLayoutEffect((): void => {
        if (bar.current) {
            // setting up initial positions
            if (valueFinish) {
                setFinishThumbLeft(translateToPixels(valueFinish));
            }
            if (valueStart) {
                setStartThumbLeft(translateToPixels(valueStart));
            }

            // placing the marks
            if (marksBar.current) {
                const theMarks = marksBar.current.children as any;
                theMarks.forEach((child: HTMLElement): void => {
                    child.style.left = `${translateToPixels(
                        parseInt(child.style.left, 10),
                    )}px`;
                });
            }
        }
    }, []);

    // repositions marks and thumbs when resizing
    const resizing = (): void => {
        if (finishThumbLeftInValue) {
            setFinishThumbLeft(translateToPixels(finishThumbLeftInValue));
        }
        if (startThumbLeftInValue) {
            setStartThumbLeft(translateToPixels(startThumbLeftInValue));
        }

        if (marksBar.current && marks) {
            const theMarks = marksBar.current.children as any;
            theMarks.forEach((child: HTMLElement): void => {
                child.style.left = `${translateToPixels(
                    marks[
                        Array.from(
                            (child.parentNode as HTMLElement)
                                .children as HTMLCollection,
                        ).indexOf(child)
                    ].key,
                )}px`;
            });
        }
    };

    window.onresize = resizing;

    const onMouseMove = (theevent: MouseEvent): void => {
        // clicked on pure position
        const newLeft =
            theevent.clientX -
            (bar.current as HTMLElement).getBoundingClientRect().left;

        // new position based on steps
        const newPosition = calculatePosition(newLeft);

        // setting the positions
        if (newLeft < (bar.current?.clientWidth as number) && newLeft >= 0) {
            if (activeThumb === 'Finish' && newPosition > startThumbLeft) {
                setFinishThumbLeft(newPosition);
            } else if (
                activeThumb === 'Start' &&
                newPosition < finishThumbLeft
            ) {
                setStartThumbLeft(newPosition);
            }
        }
    };

    const onMouseUp = (): void => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove as any);
    };

    const handleMouseDown = (e: MouseEvent): void => {
        if (!disabled) {
            // position the clicked taken placed on based on the position of bar
            const clickedOn =
                e.clientX -
                (bar.current as HTMLElement).getBoundingClientRect().left;

            if (clickedOn >= (finishThumbLeft + startThumbLeft) / 2) {
                setActiveThumb('Finish');

                // in Case user clicks on the Bar
                if (
                    e.target === bar.current ||
                    e.target === selectedBar.current
                ) {
                    setFinishThumbLeft(calculatePosition(clickedOn));
                }
            } else {
                setActiveThumb('Start');

                // in Case user clicks on the Bar
                if (
                    e.target === bar.current ||
                    e.target === selectedBar.current
                ) {
                    setStartThumbLeft(calculatePosition(clickedOn));
                }
            }
            document.addEventListener('mousemove', onMouseMove as any);
            document.addEventListener('mouseup', onMouseUp);
        }
    };

    return (
        <LabelLayout {...props}>
            <SliderBoard
                ref={bar}
                disabled={disabled}
                onMouseDown={(event): void => handleMouseDown(event)}
                theme={theme}
            >
                <SliderBoardSelected
                    ref={selectedBar}
                    left={startThumbLeft}
                    right={finishThumbLeft - startThumbLeft}
                    disabled={disabled}
                    hasRail={hasRail}
                    theme={theme}
                />
                {hasTwoInputs && (
                    <SliderThumbStart
                        ref={startThumb}
                        left={startThumbLeft}
                        disabled={disabled}
                        hasTwoInputs={hasTwoInputs}
                        onMouseDown={(event): void => handleMouseDown(event)}
                    >
                        {hasPopup && (
                            <Popup
                                top={popupTop}
                                left={popupLeft}
                                width={popupWidth}
                                height={popupHeight}
                            >
                                {startThumbLeftInValue}
                            </Popup>
                        )}
                    </SliderThumbStart>
                )}

                <SliderThumb
                    ref={finishThumb}
                    disabled={disabled}
                    hasTwoInputs={hasTwoInputs}
                    left={finishThumbLeft}
                    onMouseDown={(event): void => handleMouseDown(event)}
                >
                    {hasPopup && (
                        <Popup
                            top={popupTop}
                            left={popupLeft}
                            width={popupWidth}
                            height={popupHeight}
                        >
                            {finishThumbLeftInValue}
                        </Popup>
                    )}
                </SliderThumb>
            </SliderBoard>
            {marks && (
                <SliderBoardMarks
                    ref={marksBar}
                    theme={theme}
                    disabled={disabled}
                >
                    {marks.map(
                        ({ key, mark }): React.ReactElement => (
                            <div
                                key={key}
                                style={{
                                    position: 'absolute',
                                    left: `${key}px`,
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
        animate: 0.2s;
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

const SliderBoardSelected = styled.div<SliderProps>`
    top: 1px;
    height: 4px;
    animate: 0.2s;
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
    animate: 0.2s;
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

export interface ThumbProps {
    left: number;
    hasTwoInputs: boolean;
    disabled: boolean;
}

const SliderThumb = styled.div<ThumbProps>`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: relative;
    left: ${({ left }): string => `${left}px` || '100px'};
    ${({ hasTwoInputs }): string =>
        hasTwoInputs
            ? `
         top: -21px;
`
            : 'top: -7px; '}

    cursor: grab;
    ${({ theme }): string => `
            background: ${theme.colors.primary};
        `}
    &:active {
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

const SliderThumbStart = styled.div<ThumbProps>`
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
        border: solid 2px #96dbfa;
        cursor: grabbing;
    }
`;

export default Slider;
