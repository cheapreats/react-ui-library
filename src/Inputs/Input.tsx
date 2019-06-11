import React from "react";
import styled from 'styled-components';
import { styledSwitch, transition } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

export interface InputProps extends LabelLayoutProps {

};

export const Input = (props: InputProps) => {
    return (
        <LabelLayout { ...props }>
            <InputElement { ...props }/>
        </LabelLayout>
    )
};

const InputElement = styled.input`
    ${ transition(['background-color', 'opacity', 'box-shadow']) }
    font-size: 0.85rem;
    font-weight: bold;
    outline: none;
    border: none;


    // Disabled
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Theme Stuff
    ${({ theme }) => `
        padding: ${ theme.dimensions.padding.default };
        border-radius: ${ theme.dimensions.radius };
        font-family: ${ theme.font.family };
        &:focus {
            box-shadow: ${ theme.depth[1] };
        }
    `}

    // Background color
    ${({ theme, error, success }) => `
        background-color: ${
            styledSwitch(
                error, theme.colors.input.error,
                success, theme.colors.input.success,
                theme.colors.input.default
            )
        };
    `}
`;

export default Input;
