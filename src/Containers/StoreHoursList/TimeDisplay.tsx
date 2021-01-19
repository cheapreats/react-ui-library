import React from 'react';
import styled from 'styled-components';
import { convertTime } from './TimeFunctions';
import { IHoursByDay, IToFromHours } from './types';
import { Heading } from '../../Text';
import { Tag } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface TimeDisplayProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    allCategoriesWithHours: IHoursByDay;
    handleRemoveHours: (day: string, hoursIndex: number) => void;
    is24: boolean;
}

const MATCH_FIRST_LETTER_PATTERN = /^\w/;

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
                return toFromHoursArray.length > 0 ? (
                    <div>
                        <Heading bold size="0.95em" padding="5">
                            {capitalDay}
                        </Heading>
                        {toFromHoursArray.map((toFromHours, hoursIndex) => (
                            <Section
                                as={Tag}
                                key={day}
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
