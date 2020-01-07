import React from 'react';
import styled from 'styled-components';
import { AngleLeft } from 'styled-icons/fa-solid/AngleLeft';
import { AngleRight } from 'styled-icons/fa-solid/AngleRight';
import {
    transition,
    styledCondition,
    flex,
    clickable,
    position,
} from '@Utils/Mixins';
import { WEEKDAYS, MONTHS } from '@Utils/Constants';
import { Button } from '../Button';

const SIZE = 40;
const displayDate = (date: Date): string =>
    `${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;

const sameDate = (date1: Date, date2: Date): boolean =>
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear();

const buildCalendar = (
    date: Date,
    value: Date,
    selectDate: React.MouseEventHandler,
): React.ReactElement[] => {
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
                onClick={selectDate}
                selected={sameDate(start, value)}
                key={start.toDateString()}
                data={start.toISOString()}
            >
                {start.getDate()}
            </CalendarDay>,
        );
        start.setDate(start.getDate() + 1);
        if (start.getDay() === 0) {
            items.push(<CalendarWeek key={items.length}>{row}</CalendarWeek>);
            if (
                start.getMonth() <= date.getMonth() &&
                start.getFullYear() <= date.getFullYear()
            ) {
                row = [];
            } else {
                exit = true;
            }
        }
    }

    return items;
};

export interface DateboxProps {
    changePage: (change?: number) => React.MouseEventHandler;
    selectedDate: Date;
    selectDate: React.MouseEventHandler;
    animate: boolean;
    value: Date;
}

export const Datebox: React.FC<DateboxProps> = ({
    changePage,
    selectedDate,
    selectDate,
    animate,
    value,
}): React.ReactElement => (
    <DateBox animate={animate}>
        <DateControls>
            <Button onClick={changePage(-1)} icon={AngleLeft} />
            <DateDisplay>{displayDate(selectedDate)}</DateDisplay>
            <Button onClick={changePage()} icon={AngleRight} />
        </DateControls>
        <WeekDays>
            {WEEKDAYS.map(
                (day): React.ReactElement => (
                    <WeekDay key={day}>{day.slice(0, 3)}</WeekDay>
                ),
            )}
        </WeekDays>
        <Calendar>{buildCalendar(selectedDate, value, selectDate)}</Calendar>
    </DateBox>
);

const DateBox = styled.div<{
    animate: boolean;
}>`
    ${position('absolute', 'auto', '100%', 'auto', 'auto')}
    margin: 0 auto auto 0;
    padding: 15px 10px 10px;
    box-sizing: border-box;
    background-color: white;
    text-align: center;
    font-size: 0.9rem;
    z-index: 90;

    // Theme Stuff
    ${({ theme }): string => `
        ${transition(['transform', 'opacity'])}
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        box-shadow: ${theme.depth[1]};
    `}

    ${({ animate }): string =>
        !animate
            ? `
        transform: translateY(-20px);
        opacity: 0;
    `
            : ''}
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

const CalendarDay = styled.span<{
    faded: boolean;
    selected: boolean;
    data: string;
}>`
    ${transition(['background-color', 'color'])}
    ${flex('center')}
    width: ${SIZE - 4}px;
    height: ${SIZE - 4}px;
    margin: 2px;
    border-radius: 50%;

    ${({ faded }): string => (faded ? 'opacity: 0.3' : '')}
    ${({ selected, theme }): string =>
        styledCondition(
            selected,
            `
                background-color: ${theme.colors.primary};
                cursor: pointer;
                color: white;
            `,
            clickable('#ffffff', 0.05),
        )}
`;
