import React from 'react';
import styled from 'styled-components';
import { convertTime } from './TimeFunctions';
import { IHoursByDay, IToFromHours } from './constants';
import { Heading } from '../../Text';
import { Tag } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

const NO_HOURS_FOR_DAY = 0;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;

interface TimeDisplayProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    allCategoriesWithHours: IHoursByDay;
    handleRemoveHours: (day: string, hoursIndex: number) => void;
    is24: boolean;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
    allCategoriesWithHours,
    handleRemoveHours,
    is24,
    ...props
}): React.ReactElement => (
    <Section {...props}>
        {Object.entries(allCategoriesWithHours).map(
            ([day, toFromHoursArray]: [string, IToFromHours[]]): React.ReactElement | null => {
                const capitalDay = day.replace(
                    MATCH_FIRST_LETTER_PATTERN,
                    (chr: string): string => chr.toUpperCase(),
                );
                return toFromHoursArray.length > NO_HOURS_FOR_DAY ? (
                    <div>
                        <Heading bold size="0.95em" padding="5">
                            {capitalDay}
                        </Heading>
                        {toFromHoursArray.map((toFromHours, hoursIndex) => (
                            <Section
                                as={Tag}
                                key={`${toFromHours.to}`}
                                onClick={() => handleRemoveHours(day, hoursIndex)}
                            >
                                {convertTime(
                                    toFromHours.from,
                                    is24,
                                )}
                                {` - `}
                                {convertTime(
                                    toFromHours.to,
                                    is24,
                                )}
                            </Section>
                        ))}
                            
                    </div>
                ) : (
                    <Heading bold size="0.95em" margin="0">
                        {capitalDay}
                    </Heading>
                );
            },
        )}
    </Section>
);
const Section = styled.div`
    margin: 5px;
`;
