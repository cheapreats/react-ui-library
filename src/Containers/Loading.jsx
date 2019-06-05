import React from 'react';
import styled from 'styled-components';

const Loading = ({ children, ...props }) => {
    return (
        <Container { ...props }>
            { children }
        </Container>
    );
}

const Container = styled.div`

`;

export default Loading;