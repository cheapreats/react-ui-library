import React, { memo } from 'react';
import styled from 'styled-components';
import { transition, flex, position } from '../Utils/Mixins';
import { SmallText, SmallTextProps } from '../Text';
const STATUS_COLORS = {
    prepared: '#28af00',
    preparing: '#f98300',
    placed: '#ee2434',
    cancelled: '#ee2434',
    complete: '#28af00',
};

interface StatusProps extends TextProps, DotProps {
    status: string;
    large?: boolean;
}

interface TextProps extends SmallTextProps {
    large?: boolean;
}

interface DotProps {
    large?: boolean;
    color?: string;
}

export const Status: React.FC<StatusProps> = memo(
    ({ children, status, large, ...props }): React.ReactElement => (
        <Text bold large={large} color={STATUS_COLORS[status]} {...props}>
            <Dot large={large} color={STATUS_COLORS[status]} />
            {children}
        </Text>
    ),
);

const Text = styled(SmallText)<TextProps>`
    ${flex('flex-start', 'center')}
    ${transition(['color'])}
    display: inline-flex;
    ${({ color }): string => `
        color: ${color};
    `}
    ${({ large }): string => (large ? `font-size: 1.4rem;` : '')}
`;

const Dot = styled.span<DotProps>`
    ${transition(['background-color'])}
    ${({ color }): string => `
        background-color: ${color};
        &:before {
            ${transition(['background-color'])}
            background-color: ${color};
        }
    `}

    margin-right: 5px;
    position: relative;

    &,
    &:before {
        ${({ large }): string =>
            large
                ? `
            width: 11px;
            height: 11px;
        `
                : `
            width: 9px;
            height: 9px;
        `}
        border-radius: 50%;
    }

    &:before {
        ${transition(['transform', 'opacity'])}
        ${position(
            'absolute',
        )}
        animation: pulse 1s ease-in-out 0s infinite;
        content: '';

        @keyframes pulse {
            from {
                transform: scale(1);
                opacity: 0.7;
            }
            to {
                transform: scale(1.9);
                opacity: 0;
            }
        }
    }
`;
