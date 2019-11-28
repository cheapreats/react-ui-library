import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock } from 'styled-icons/fa-solid/Clock';
import { Check } from 'styled-icons/fa-solid/Check';
import styled from 'styled-components';
import { position, flex, transition, clickable } from '@Utils/Mixins';
import { InputFragment } from '@Layouts';

const getDisplay = (date: Date): string =>
    date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

interface TimeDisplayProps {
    name: string;
    value: Date;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    onChange: Function;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
    name,
    value,
    show,
    setShow,
    onChange,
}): React.ReactElement => {
    const [display, setDisplay] = useState<string>(getDisplay(value));
    const lastValue = useRef<string>(getDisplay(value));

    const handleKeys = useCallback(({ key }): void => {
        if (key === 'Tab' || key === 'Enter') {
            setShow(false);
        }
    }, []);

    useEffect((): void => {
        const val = getDisplay(value);
        lastValue.current = val;
        setDisplay(val);
    }, [value]);

    const handleDisplay = useCallback(
        ({ target }): void => {
            const val = (target as HTMLInputElement).value;
            setDisplay(val);
            if (
                val !== lastValue.current &&
                val.match(/[1]?\d:[0-5]\d [A|P]M/)
            ) {
                lastValue.current = val;
                const [hour, rest] = val.split(':');
                const min = rest.slice(0, 2);
                const period = rest.slice(-2);

                const date = new Date();
                date.setHours(
                    (parseInt(hour, 10) % 12) + (period === 'PM' ? 12 : 0),
                );
                date.setMinutes(parseInt(min, 10));
                onChange({
                    target: {
                        name,
                        value: date,
                    },
                });
            }
        },
        [onChange],
    );

    return (
        <Wrapper>
            <InputFragment
                onFocus={(): void => setShow(true)}
                onClick={(): void => setShow(true)}
                onKeyDown={handleKeys}
                onChange={handleDisplay}
                value={display}
            />
            <Button onClick={(): void => setShow(false)} show={show}>
                <Icon as={show ? Check : Clock} />
            </Button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('column')}
    position: relative;
`;

const Button = styled.button<{ show: boolean }>`
    ${position('absolute', 'auto 5px auto auto', 0, 0, 0, 'auto')}
    ${transition(['background-color'])}
    ${flex('center')}
    background-color: transparent;
    border-radius: 999px;
    outline: none;
    border: none;
    height: 32px;
    width: 32px;
    ${({ show, theme }): string =>
        show
            ? `
        &:hover > svg {
            color: ${theme.colors.text};
        }
        ${clickable('#ffffffff', 0.08)}
    `
            : ''}
`;

const Icon = styled.svg`
    ${transition(['color'])}
    ${({ theme }): string => `color: ${theme.colors.text}80;`}
    width: 14px;
`;
