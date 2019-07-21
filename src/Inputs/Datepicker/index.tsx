import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { CalendarAlt } from 'styled-icons/fa-solid/CalendarAlt';
import styled, { withTheme } from 'styled-components';
import { transition, styledCondition, position, flex } from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import { Datebox } from './Datebox';
import { MainThemeInterface } from '@Themes/';

const printDate = (date: Date): string => {
    const day = String(date.getMonth()).padStart(2, '0');
    const month = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export interface DatepickerProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    onChange?: Function;
    theme: MainThemeInterface;
    value?: Date;
}

const _Datepicker: React.FunctionComponent<DatepickerProps> = ({
    value = new Date(),
    onChange = (): void => {},
    placeholder = 'MM-DD-YYYY',
    className,
    theme,
    ...props
}): React.ReactElement => {
    const [selectedDate, setDate] = useState(value);
    const dateText = useMemo((): string => printDate(value), [value]);
    const [show, setShow] = useState(false);
    const [text, setText] = useState(dateText);
    const [, mount, animate] = useTransition(show, {
        end: theme.speed.normal,
    });

    useEffect((): void => setDate(value), [value]);

    const handleText = useCallback(
        ({ target }): void => {
            const d = new Date(target.value);
            if (d.getDate()) {
                onChange({
                    target: {
                        name: props.name,
                        value: d,
                    },
                });
            }
            setText(target.value);
        },
        [text],
    );

    const selectDate = useCallback(({ target }): void => {
        const val = new Date(target.getAttribute('data'));
        onChange({
            target: {
                name: props.name,
                value: val,
            },
        });
        setText(printDate(val));
        setShow(false);
    }, []);

    const changePage = useCallback(
        (change = 1): (() => void) => (): void => {
            setDate(
                (d): Date => {
                    const curr = new Date(d);
                    curr.setMonth(curr.getMonth() + change);
                    return curr;
                },
            );
        },
        [],
    );

    return (
        <LabelLayout {...props} className={className}>
            <Wrapper>
                <InputElement
                    {...props}
                    placeholder={placeholder}
                    onChange={handleText}
                    onFocus={(): void => setShow(true)}
                    onKeyDown={({ key }: React.KeyboardEvent): void => {
                        if (key === 'Enter') setShow(false);
                    }}
                    value={text}
                />
                <Icon />
            </Wrapper>
            {mount && (
                <Datebox
                    changePage={changePage}
                    selectedDate={selectedDate}
                    selectDate={selectDate}
                    animate={animate}
                    value={value}
                />
            )}
        </LabelLayout>
    );
};

export const Datepicker = withTheme(_Datepicker);

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

const Icon = styled(CalendarAlt)`
    ${position('absolute', 'auto 20px auto auto')}
    width: 10px;
`;

const Wrapper = styled.div`
    ${flex('column')}
    position: relative;
`;

export default Datepicker;
