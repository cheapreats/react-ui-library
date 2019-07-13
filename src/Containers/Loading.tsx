import React from 'react';
import styled from 'styled-components';

export interface LoadingProps {
    children?: React.ReactNode;
}

export const Loading: React.FunctionComponent<LoadingProps> = ({
    children,
    ...props
}): React.ReactElement => <Container {...props}>{children}</Container>;

const Container = styled.div``;

export default Loading;
