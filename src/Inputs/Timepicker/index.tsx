import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
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
    onChange?: Function;
    disabled?: boolean;
    name: string;
}

export const Timepicker: React.FC<TimepickerProps> = ({
    value = new Date(),
    onChange = (): void => undefined,
    disabled,
    name,
    ...props
}): React.ReactElement => {
    const theme = useTheme();
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
};

const Wrapper = styled.div`
    ${flex('column')}
    position: relative;
`;

export default Timepicker;
