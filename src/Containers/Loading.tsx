import React, { Fragment } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { position, flex, transition } from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';

export interface LoadingProps {
    loading?: boolean;
    theme: DefaultTheme;
}

const _Loading: React.FC<LoadingProps> = ({
    children,
    loading = false,
    theme,
    ...props
}): React.ReactElement => {
    const [, mount, animate] = useTransition(loading, {
        end: theme.speed.normal,
    });
    return (
        <Container {...props} animate={animate} invert={mount}>
            {mount ? (
                <Fragment>
                    <Bar />
                    <Text>Loading...</Text>
                </Fragment>
            ) : (
                children
            )}
        </Container>
    );
};

export const Loading = withTheme(_Loading);

const Container = styled.div<{
    animate: boolean;
    invert: boolean;
}>`
    ${transition(['opacity'])}
    opacity: ${({ animate, invert }): number => {
        let res = animate ? 0 : 1;
        if (invert) res = (res + 1) % 2;
        return res;
    }};
    position: relative;
`;

const Bar = styled.div`
    ${position('absolute', '0 auto auto')}
    ${flex('center')}
    overflow: hidden;
    width: 100%;

    ${({ theme }): string => `
        height: ${theme.dimensions.loading.height}px;
        background-color: ${theme.colors.input.default};
        &::before {
            height: ${theme.dimensions.loading.height}px;
            background-color: ${theme.colors.primary};
        }
    `}

    &::before {
        content: '';
        width: 100%;
        border-radius: 999px;
        animation: bar 1s ease-in-out infinite;
    }

    @keyframes bar {
        0% {
            transform: translateX(-100%);
        }
        60% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
`;

const Text = styled.span`
    ${position('absolute', '8px 8px auto auto', 0, 0, 0, 'auto')}
    animation: fader 1.2s ease-in-out infinite;
    font-weight: bold;
    font-size: 0.8rem;
    @keyframes fader {
        0% {
            opacity: 0.7;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 0.7;
        }
    }
`;

export default Loading;
