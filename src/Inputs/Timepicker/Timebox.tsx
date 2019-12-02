import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { transition, position, flex } from '@Utils/Mixins';
import { TimeColumn } from './TimeColumn';

const VALUES = {
    HOURS: new Array(12).fill(0).map((k, i): number => i + 1),
    MINS: new Array(60).fill(0).map((k, i): number => i),
    PERIOD: ['AM', 'PM'],
};

interface TimeboxProps {
    value: Date;
    show: boolean;
    name: string;
    onChange: Function;
}

export const Timebox: React.FC<TimeboxProps> = ({
    value,
    onChange,
    name,
    show,
}): React.ReactElement => {
    const [hour, min, period] = useMemo(
        (): [number, number, string] => [
            value.getHours() % 12 || 12,
            value.getMinutes(),
            value
                .toLocaleString('en-US', { hour: 'numeric', hour12: true })
                .slice(-2),
        ],
        [value],
    );

    const _onChange = useCallback(
        (_name, _value): void => {
            switch (_name) {
                case 'HOUR':
                    value.setHours(
                        ((_value + 1) % 12) + (period === 'AM' ? 0 : 12),
                    );
                    break;
                case 'MINUTE':
                    value.setMinutes(_value);
                    break;
                case 'PERIOD':
                    value.setHours(value.getHours() % 12);
                    if (_value) {
                        value.setHours(value.getHours() + 12);
                    }
                    break;
                default:
                    break;
            }
            onChange({
                target: {
                    name,
                    value,
                },
            });
        },
        [value, period, name, onChange],
    );

    return (
        <Container show={show}>
            <TimeColumn
                items={VALUES.HOURS}
                onChange={_onChange}
                name="HOUR"
                active={hour}
            />
            <TimeColumn
                format={(v): string => v.toString().padStart(2, '0')}
                items={VALUES.MINS}
                onChange={_onChange}
                name="MINUTE"
                active={min}
            />
            <TimeColumn
                items={VALUES.PERIOD}
                onChange={_onChange}
                name="PERIOD"
                active={period}
            />
        </Container>
    );
};

const Container = styled.div<{ show?: boolean }>`
    ${transition(['transform', 'opacity'])}
    ${position('absolute', '10px 0 20px', '100%', 'auto', 0, 0)}
    ${flex()}
    ${({ show }): string =>
        show
            ? `
        transform: translateY(0);
        opacity: 1;
    `
            : `
        transform: translateY(-20px);
        pointer-events: none;
        opacity: 0; 
    `}

    ${({ theme }): string => `
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        box-shadow: ${theme.depth[1]};
    `}
    box-sizing: border-box;
    background-color: white;
    display: inline-flex;
    height: 160px;
`;
