import React from 'react';
import styled from 'styled-components';
import { Main, Responsive } from '@Utils/BaseStyles';
import { styledCondition, transition } from '@Utils/Mixins';
import { LabelLayout } from '@Layouts';

const Input = props => {
    return (
        <LabelLayout { ...props }>
            <InputElement { ...props }/>
        </LabelLayout>
    )
}

const InputElement = styled.input`
    // Base styles
    ${ Main }
    ${ Responsive }
    ${ transition(['background-color']) }

    border: none;
    outline: none;
    font-size: 0.85rem;
    font-weight: bold;

    // Theme Stuff
    ${({ theme }) => `
        padding: ${ theme.dimensions.padding.default };
        border-radius: ${ theme.dimensions.radius };
        font-family: ${ theme.font.family };
    `}

    // Background color
    ${({ theme, error, success }) => `
        background-color: ${
            styledCondition(
                error, theme.colors.input.error,
                success, theme.colors.input.success,
                theme.colors.input.default
            )
        };
    `}
`;

export default Input;