import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Timepicker } from '../../Inputs/Timepicker';
import {
    MainInterface,
    ResponsiveInterface,
    Main,
} from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';
import { IToFromHours } from './constants';

interface FromToDualTimeSelectorProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    storeHours: IToFromHours;
    setStoreHours: (hours: IToFromHours) => void
}

const MATCH_FIRST_LETTER_PATTERN = /^\w/;

// TODO: errors
export const FromToDualTimeSelector: React.FC<FromToDualTimeSelectorProps> = ({
    storeHours,
    setStoreHours,
    ...props
}): React.ReactElement => (
    <TimeRow {...props}>
        {Object.entries(storeHours).map(
            ([key, time]): React.ReactElement => (
                <Container
                    as={Timepicker}
                    key={key}
                    name={key}
                    label={key.replace(
                        MATCH_FIRST_LETTER_PATTERN,
                        (char): string => char.toUpperCase(),
                    )}
                    value={moment(time, 'HH:mm').toDate()}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void =>
                        setStoreHours({
                            ...storeHours,
                            [key]: moment(e.target.value).format('HH:mm'),
                        })}
                    
                />
            ),
        )}
    </TimeRow>
);

const TimeRow = styled.div`
    ${Mixins.flex()}
    width: 100%;
    ${Main};

    & > * {
        width: calc(50% - 5px);
        box-sizing: border-box;
    }
    justify-content: space-between;
    ${Mixins.media(
        'phone',
        `
        flex-direction: column;
        & > * {
            width: 100%;
        }
    `,
    )}
`;
const Container = styled.div`
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;
