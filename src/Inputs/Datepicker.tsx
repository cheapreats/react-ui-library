import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { AngleLeft } from 'styled-icons/fa-solid/AngleLeft';
import { AngleRight } from 'styled-icons/fa-solid/AngleRight';
import styled from 'styled-components';
import { transition, styledCondition, flex, clickable } from '@Utils/Mixins';
import { WEEKDAYS, MONTHS } from '@Utils/Constants';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import Button from './Button';

const SIZE = 40;

const displayDate = (date: Date): string => (
    `${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
);

const printDate = (date: Date): string => {
    const day = String(date.getMonth()).padStart(2, '0');
    const month = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const sameDate = (date1: Date, date2: Date): boolean => (
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear()
);

const buildCalendar = (date: Date, value: Date): React.ReactElement[] => {
    const start = new Date(date);
    start.setDate(1);
    start.setDate(start.getDate() - start.getDay());

    const items = [];
    let row = [];
    let exit = false;
    while (!exit) {
        row.push(
            <CalendarDay
                faded={start.getMonth() !== date.getMonth()}
                selected={sameDate(start, value)}
                key={start.toDateString()}
            >
                {start.getDate()}
            </CalendarDay>
        );
        start.setDate(start.getDate() + 1);
        if (start.getDay() === 0) {
            items.push(
                <CalendarWeek key={items.length}>
                    {row}
                </CalendarWeek>
            );
            if (start.getMonth() <= date.getMonth() && start.getFullYear() <= date.getFullYear()) {
                row = [];
            } else {
                exit = true;
            }
        }
    }

    return items;
};

export interface DatepickerProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    onChange?: Function;
    value?: Date;
}

export const Datepicker: React.FunctionComponent<DatepickerProps> = ({
    value = new Date(),
    onChange = () => {},
    placeholder = 'MM-DD-YYYY',
    ...props
}): React.ReactElement => {
    const [selectedDate, setDate] = useState(value);
    const calendar = useMemo(() => buildCalendar(selectedDate, value), [selectedDate, value]);
    const dateText = useMemo((): string => printDate(value), [value]);
    const [text, setText] = useState(dateText);

    useEffect(() => setDate(value), [value]);

    const handleText = useCallback(
        (el): void => {
            const { value, name } = el.target;
            const d = new Date(value);
            if (d.getDate()) {
                onChange({ target: { name, value: d } });
            }
            setText(value);
        },
        [text],
    );

    const changePage = useCallback((change = 1) => () => {
        setDate(curr => {
            curr.setMonth(curr.getMonth() + change);
            return new Date(curr);
        });
    }, []);

    return (
        <LabelLayout {...props}>
            <InputElement
                {...props}
                placeholder={placeholder}
                onChange={handleText}
                value={text}
            />
            <DateBox>
                <DateControls>
                    <Button onClick={changePage(-1)} icon={AngleLeft} />
                    <DateDisplay>{displayDate(selectedDate)}</DateDisplay>
                    <Button onClick={changePage()} icon={AngleRight} />
                </DateControls>
                <WeekDays>
                    {WEEKDAYS.map(
                        (day): React.ReactElement => (
                            <WeekDay key={day}>
                                {day.slice(0, 3)}
                            </WeekDay>
                        ),
                    )}
                </WeekDays>
                <Calendar>{calendar}</Calendar>
            </DateBox>
        </LabelLayout>
    );
};

const InputElement = styled.input`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    font-size: 0.85rem;
    font-weight: bold;
    outline: none;
    border: none;


    // Disabled
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Theme Stuff
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.default};
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        &:focus {
            box-shadow: ${theme.depth[1]};
        }
    `}

    // Background color
    ${({ theme, error, success }): string => `
        background-color: ${styledCondition(
        error,
        theme.colors.input.error,
        success,
        theme.colors.input.success,
        theme.colors.input.default,
    )};
    `}
`;

const DateBox = styled.div`
    margin: 10px auto auto 0;
    padding: 15px 10px 10px;
    box-sizing: border-box;
    background-color: white;
    text-align: center;
    font-size: 0.9rem;

    // Theme Stuff
    ${({ theme }): string => `
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        box-shadow: ${theme.depth[1]};
    `}
`;

const DateControls = styled.div`
    ${flex('center')}
    padding-bottom: 8px;
`;

const DateDisplay = styled.span`
    font-weight: bold;
    font-size: 1.05rem;
    margin: auto;
`;

const WeekDays = styled.ul`
    ${flex()}
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

const WeekDay = styled.li`
    font-weight: bold;
    padding: 5px 0;
    width: ${SIZE}px;
`;

const Calendar = styled.ul`
    ${flex('column')}
    list-style-type: none;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
`;

const CalendarWeek = styled.li`
    ${flex()}
`;

const CalendarDay = styled.span`
    ${transition(['background-color'])}
    ${flex('center')}
    width: ${SIZE - 4}px;
    height: ${SIZE - 4}px;
    margin: 2px;
    border-radius: 50%;

    ${({faded}) => faded ? 'opacity: 0.3' : ''}
    ${({selected, theme}) => (
        styledCondition(
            selected, `
                background-color: ${theme.colors.primary};
                cursor: pointer;
                color: white;
            `, clickable('#ffffff', 0.05)
        )
    )}
`;

export default Datepicker;
