import React, { Fragment } from 'react';
import styled from 'styled-components';
import { position, flex } from '@Utils/Mixins';

export interface LoadingProps {
    loading?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
    children,
    loading,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        {
            loading ? (
                <Fragment>
                    <Bar/>
                    <Text>Loading...</Text>
                </Fragment>
            ): children
        }
    </Container>
);

const Container = styled.div`
    position: relative;
`;

const Bar = styled.div`
    ${position('absolute', '0 auto auto')}
    ${flex('center')}
    overflow: hidden;
    width: 100%;

    ${({theme}) => `
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
        0% { transform: translateX(-100%) }
        60% { transform: translateX(100%) }
        100% { transform: translateX(100%) }
    }
`;

const Text = styled.span`
    ${position('absolute', '8px 0 auto auto', 0, 0, 0, 'auto')}
    animation: fader 1.2s ease-in-out infinite;
    font-weight: bold;
    font-size: 0.8rem;
    @keyframes fader {
        0% { opacity: 0.7 }
        50% { opacity: 0.5 }
        100% { opacity: 0.7 }
    }
`;

export default Loading;
