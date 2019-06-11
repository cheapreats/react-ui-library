import React, { ReactNode } from "react";
import styled from 'styled-components';

export interface LoadingProps {
    children?: ReactNode
}


export const Loading = ({ children, ...props }: LoadingProps) => {
    return (
        <Container { ...props }>
            { children }
        </Container>
    );
};

const Container = styled.div`

`;

export default Loading;
