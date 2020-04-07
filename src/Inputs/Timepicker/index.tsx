import React, { useState, useRef, useEffect } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useTransition } from '@Utils/Hooks';
import { flex } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import { TimeDisplay } from './TimeDisplay';
import { Timebox } from './Timebox';

export interface TimepickerProps extends LabelLayoutProps {
    value?: Date;
    period?: boolean;
    theme: DefaultTheme;
    onChange?: Function;
    disabled?: boolean;
}
// @ts-ignore Issue with withTheme
export const Timepicker: React.FC<TimepickerProps> = withTheme(
    ({
        value = new Date(),
        onChange = (): void => {},
        disabled,
        theme,
        name,
        ...props
    }): React.ReactElement => {
        value = new Date(value);
        const ref = useRef<HTMLDivElement>(null);
        const [show, setShow] = useState<boolean>();
        const [, mount, animate] = useTransition(show, {
            end: theme.speed.normal,
        });

        useEffect((): void | (() => undefined | void) => {
            if (!mount) return undefined;
            const handler = ({ target }: MouseEvent): void => {
                if (
                    ref.current &&
                    !ref.current.contains(target as HTMLElement)
                ) {
                    setShow(false);
                }
            };

            window.setTimeout((): void => {
                window.addEventListener('click', handler);
            }, 100);
            return (): void => {
                window.removeEventListener('click', handler);
                if (disabled) setShow(false);
            };
        }, [mount, disabled]);

        return (
            <LabelLayout name={name} ref={ref} {...props}>
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
