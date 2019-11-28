import React, { useState } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { useTransition } from '@Utils/Hooks';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import { TimeDisplay } from './TimeDisplay';
import { Timebox } from './Timebox';

export interface TimepickerProps extends LabelLayoutProps {
    value?: Date;
    period?: boolean;
    theme: DefaultTheme;
    onChange: Function;
}

export const Timepicker: React.FC<TimepickerProps> = withTheme(
    ({
        value = new Date(),
        onChange,
        theme,
        name,
        ...props
    }): React.ReactElement => {
        value = new Date(value);
        const [show, setShow] = useState<boolean>();
        const [, mount, animate] = useTransition(show, {
            end: theme.speed.normal,
        });

        return (
            <LabelLayout {...props}>
                <TimeDisplay
                    name={name}
                    value={value}
                    setShow={setShow}
                    show={animate}
                    onChange={onChange}
                />
                {mount && (
                    <Timebox
                        name={name}
                        show={animate}
                        value={value}
                        onChange={onChange}
                    />
                )}
            </LabelLayout>
        );
    },
);
