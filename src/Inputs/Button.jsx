import React from 'react';
import styled from 'styled-components';

const Container = styled.button`

`;

export const Button = ({ children, ...props }) => {
    return (
        <Container { ...props }>
            { children }
        </Container>
    );
}