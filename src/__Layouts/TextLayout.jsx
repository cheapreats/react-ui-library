import React from 'react';
import styled from 'styled-components';
import { Main, Responsive } from '@Utils/BaseStyles';

export const TextLayout = (
    children,
    color,
    bold,
    ...props
) => {
    return (
        <Text { ...props }>{ children }</Text>
    );
}

const Text = styled.p`
    // Base Styles
    ${ Responsive }
    ${ Main }
`;