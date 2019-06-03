import React from 'react';
import styled from 'styled-components';
import { Main, Responsive, MainProps, ResponsiveProps } from '@Utils/BaseStyles';
import { __useImplicitProps } from '@Utils/Hooks';
import { position, darken, flex } from '@Utils/Mixins';

const Radio = ({
    label,
    className,
    ...props
}) => {
    const implicitProps = __useImplicitProps(props, [
        ...MainProps,
        ...ResponsiveProps
    ]);

    return (
        <Container className={ className } { ...implicitProps }>
            <RadioBox>
                <Input type='checkbox' { ...props }/>
                <RadioDot/>
            </RadioBox>
            { label && <Label htmlFor={ props.name }>{ label }</Label> }
        </Container>
    );
}

const Container = styled.div`
    // Base Styles
    ${ Main }
    ${ Responsive }
`;

const Input = styled.input`
    ${ position() }
    width: 100%;
    height: 100%;
    opacity: 0;
`;

const RadioBox = styled.div`
    ${ flex('center') }
    position: relative;
    border-radius: 50%;
    overflow: hidden;

    ${({ theme }) => `
        height: ${ theme.dimensions.radio.size }px;
        width: ${ theme.dimensions.radio.size }px;
        padding: ${ theme.dimensions.radio.spacing }px;
        border: 1.5px solid ${ darken(theme.colors.input.default) };
    `}
`;

const RadioDot = styled.div`
    border-radius: 50%;
    height: 100%;
    flex-grow: 1;

    ${({ theme }) => `
        background-color: ${ theme.colors.primary };
    `}

    ${ Input }:checked ~ ${ RadioBox } > & {
        
    }
`;

const Label = styled.label`

`;

export default Radio;