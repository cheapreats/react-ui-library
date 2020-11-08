import React from 'react';
import styled from 'styled-components';
import { Button } from '@Inputs/Button';


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


export interface EditImageProps {}


export const EditImage: React.FC<EditImageProps> = ({}): React.ReactElement => {
    return (
        <Wrapper>
            <Title>Edit Image</Title>
            <Txt>Select</Txt>
            <StyledButton>Upload image</StyledButton>
        </Wrapper>
    );
};
