import React, { useState } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useTransition } from '../../Utils/Hooks';
import { flex } from '../../Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '../../Fragments';
import { TimeDisplay } from './TimeDisplay';
import { Timebox } from './Timebox';

export interface TimepickerProps
    extends LabelLayoutProps,
        Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    value?: Date;
    period?: boolean;
    theme?: DefaultTheme;
    onChange?: Function;
    disabled?: boolean;
}

export const Timepicker: React.FC<TimepickerProps> = withTheme(
    ({
        value = new Date(),
        onChange = (): void => {
            return undefined;
        },
        disabled,
        theme,
        name,
        ...props
    }): React.ReactElement => {
        value = new Date(value);
        const [show, setShow] = useState<boolean>(false);
        const [, mount, animate] = useTransition(show, {
            end: theme.speed.normal || 250,
        });
        return (
            <LabelLayout name={name} {...props}>
                <Wrapper>
                    <TimeDisplay
                        name={name}
                        value={value}
                        setShow={setShow}
                        show={animate}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    {mount && (
                        <Timebox
                            name={name}
                            show={animate}
                            value={value}
                            onChange={onChange}
                            mount={mount}
                            setShow={setShow}
                            disabled={disabled}
                        />
                    )}
                </Wrapper>
            </LabelLayout>
        );
    },
);

const Wrapper = styled.div`
    ${flex('column')}
    position: relative;
`;

export default Timepicker;
