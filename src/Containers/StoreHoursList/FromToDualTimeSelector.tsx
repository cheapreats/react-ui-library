import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FormikErrors } from 'formik';
import { Timepicker } from '../../Inputs/Timepicker';
import {
    MainInterface,
    ResponsiveInterface,
    Main,
} from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';
import { IToFromHours, IErrors } from './interfaces';
import { MOMENT_24_HOUR_FORMAT } from './constants';

interface FromToDualTimeSelectorProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    storeHours: IToFromHours;
    setStoreHours: (hours: IToFromHours) => void;
    errors?: IErrors | FormikErrors<IToFromHours>;
}

const MATCH_FIRST_LETTER_PATTERN = /^\w/;

export const FromToDualTimeSelector: React.FC<FromToDualTimeSelectorProps> = ({
    storeHours,
    setStoreHours,
    errors,
    ...props
}): React.ReactElement => (
    <TimeRow {...props} data-cy="storeFromTimePicker">
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
                    value={moment(time, MOMENT_24_HOUR_FORMAT).toDate()}
                    error={errors ? errors[key] : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setStoreHours({
                            ...storeHours,
                            [key]: moment(e.target.value).format(
                                MOMENT_24_HOUR_FORMAT,
                            ),
                        })
                    }
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
