import React from 'react';
import styled from 'styled-components';
import { transition, styledCondition, scroll } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

export interface TextareaProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    ...props
}): React.ReactElement => (
    <LabelLayout {...props}>
        <TextareaElement {...props} />
    </LabelLayout>
);

const TextareaElement = styled.textarea<LabelLayoutProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${scroll}
    font-size: 0.85rem;
    font-weight: bold;
    outline: none;
    border: none;
    resize: vertical;

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

export default Textarea;
