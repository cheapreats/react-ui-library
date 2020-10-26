import React from 'react';
import styled from 'styled-components';
import { Button } from '@Inputs/Button';

// API KEY: AIzaSyBW6afsWt6KM6yvzXgfJ9UmUGImHvedZbc

// STYLED COMPONENTS
const Wrapper = styled.div``;
const Title = styled.h1`
    font-size: 19px;
    margin: 20px;
`;
const Txt = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin: 20px;
`;
const StyledButton = styled(Button)`
    margin: 20px;
    margin-top: 30px;
`;
// END OF STYLED COMPONENTS

// EditImage PROPS
export interface EditImageProps {}
// END OF EditImage PROPS

export const EditImage: React.FC<EditImageProps> = ({}): React.ReactElement => {
    return (
        <Wrapper>
            <Title>Edit Image</Title>
            <Txt>Select</Txt>
            <StyledButton>Upload image</StyledButton>
        </Wrapper>
    );
};
