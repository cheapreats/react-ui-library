import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { transition, styledCondition } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

const WEEKDAY = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday,',
];

const printDate = (date: Date): string => {
    const day = String(date.getMonth()).padStart(2, '0');
    const month = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export interface DatepickerProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: Date;
}

export const Datepicker: React.FunctionComponent<DatepickerProps> = ({
    value = new Date(),
    placeholder = 'MM-DD-YYYY',
    ...props
}): React.ReactElement => {
    const dateText = useMemo((): string => printDate(value), [value]);
    const [text, setText] = useState(dateText);

    const handleText = useCallback(
        ({ target }): void => {
            setText(target.value);
        },
        [text],
    );

    return (
        <LabelLayout {...props}>
            <InputElement
                {...props}
                placeholder={placeholder}
                onChange={handleText}
                value={text}
            />
            <DateBox>{WEEKDAY.map((day): string => day.slice(0, 3))}</DateBox>
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

const DateBox = styled.div``;

export default Datepicker;
