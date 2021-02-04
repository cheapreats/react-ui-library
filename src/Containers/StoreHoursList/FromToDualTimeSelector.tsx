import React from 'react';
import styled from 'styled-components';
import { Timepicker } from '../../Inputs/Timepicker';
import {
    MainInterface,
    ResponsiveInterface,
    Main,
} from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface FromToDualTimeSelectorProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    fromTimeTooBigError: string;
    toTimeTooSmallError: string;
    storeHours: { from: Date; to: Date };
    setStoreHours: React.Dispatch<
        React.SetStateAction<{ from: Date; to: Date }>
    >;
}

const INITIAL_TIME_INDEX = 0;
const INITIAL_DATE_INDEX = 1;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;
const FROM = 'from';
const TO = 'to';

export const FromToDualTimeSelector: React.FC<FromToDualTimeSelectorProps> = ({
    fromTimeTooBigError,
    toTimeTooSmallError,
    storeHours,
    setStoreHours,
    ...props
}): React.ReactElement => {
    const errors = {
        fromTooBig: storeHours.from > storeHours.to ? fromTimeTooBigError : '',
        anotherTime: storeHours.from > storeHours.to ? toTimeTooSmallError : '',
    };

    return (
        <TimeRow {...props}>
            {Object.entries(storeHours).map(
                (time): React.ReactElement => (
                    <Container
                        as={Timepicker}
                        key={time[INITIAL_TIME_INDEX]}
                        name={time[INITIAL_TIME_INDEX]}
                        label={time[
                            INITIAL_TIME_INDEX
                        ].replace(MATCH_FIRST_LETTER_PATTERN, (char): string =>
                            char.toUpperCase(),
                        )}
                        value={time[INITIAL_DATE_INDEX]}
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                        ): void =>
                            setStoreHours({
                                ...storeHours,
                                [time[INITIAL_TIME_INDEX]]: e.target.value,
                            })
                        }
                        error={
                            (time[INITIAL_TIME_INDEX] === FROM &&
                                errors.fromTooBig) ||
                            (time[INITIAL_TIME_INDEX] === TO &&
                                errors.anotherTime)
                        }
                    />
                ),
            )}
        </TimeRow>
    );
};

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
