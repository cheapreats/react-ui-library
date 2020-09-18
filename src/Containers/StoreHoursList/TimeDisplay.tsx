import React from 'react';
import styled from 'styled-components';
import { convertTime } from './TimeFunctions';
import { ICategoryWithHoursTypes } from './types';
import { Heading } from '../../Text';
import { Tag } from '../Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface TimeDisplayProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    activeCategorySchedule: ICategoryWithHoursTypes,
    setActiveCategorySchedule: React.Dispatch<React.SetStateAction<ICategoryWithHoursTypes>>,
    is24: boolean
}

const CHECKBOX_DAY = 0;
const CHECKBOX_TIME = 1;
const FIRST_TIME = 0;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
    activeCategorySchedule,
    setActiveCategorySchedule,
    is24,
    ...props
}): React.ReactElement => {
    return (
        <>
            {Object.entries(activeCategorySchedule.hoursByDay).map((day): React.ReactElement | null => {
                const capitalDay = day[CHECKBOX_DAY].replace(MATCH_FIRST_LETTER_PATTERN, (chr: string): string =>
                    chr.toUpperCase(),
                );
                return day[CHECKBOX_TIME].length > 0 ? (
                    <div>
                        <Heading bold size='0.95em' padding='5'>
                            { capitalDay }
                        </Heading>
                        <Section
                            as={Tag}
                            key={day[CHECKBOX_DAY]}
                            onClick={(): void => {
                                const firstTime = activeCategorySchedule.hoursByDay[day[CHECKBOX_DAY]];
                                firstTime.pop() // only works with one time tag
                                setActiveCategorySchedule({
                                    ...activeCategorySchedule,
                                    [day[CHECKBOX_DAY]]: []
                                });
                            }}
                            {...props}
                        >
                            { convertTime(day[CHECKBOX_TIME][FIRST_TIME].from, is24) } 
                            {` - `} 
                            { convertTime(day[CHECKBOX_TIME][FIRST_TIME].to, is24) }
                        </Section>
                    </div>
                ) : (
                    <Heading bold size='0.95em' margin='0'>
                        { capitalDay }
                    </Heading>
                )
            })}
        </>
    );
}
const Section = styled.div`
    margin: 5px;
`;