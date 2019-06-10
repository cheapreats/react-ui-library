import * as React from "react";
import styled from 'styled-components';

export interface LoadingProps {
    children?: React.ReactNode,
}


const Loading = ({ children, ...props }: LoadingProps) => {
    return (
        <Container { ...props }>
            { children }
        </Container>
    );
};

const Container = styled.div`

`;

export default Loading;
