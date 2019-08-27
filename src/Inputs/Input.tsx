import React from 'react';
import styled from 'styled-components';
import { transition, styledCondition } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

export interface InputProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
    ...props
}): React.ReactElement => (
    <LabelLayout {...props}>
        <InputElement {...props} />
    </LabelLayout>
);

const InputElement = styled.input<LabelLayoutProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
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
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.default};
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        &:focus {
            box-shadow: ${theme.depth[1]};
        }
    `}

    // Background color
    ${({ theme, error = false, success = false }): string => `
        background-color: ${styledCondition(
            error,
            theme.colors.input.error,
            success,
            theme.colors.input.success,
            theme.colors.input.default,
        )};
    `}
`;

export default Input;