import React from 'react';
import styled from 'styled-components';
import { transition, styledCondition } from '../Utils/Mixins';
import { ResponsiveInterface, MainInterface } from '../Utils/BaseStyles';

export interface InputFragmentProps
    extends ResponsiveInterface,
        MainInterface,
        React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | string[];
    error?: boolean | string;
    success?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
    children?: React.ReactNode;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    className?: string;
    type?: string;
}

export const InputFragment: React.FC<InputFragmentProps> = ({
    ...props
}): React.ReactElement => <InputElement {...props} />;

const InputElement = styled.input<InputFragmentProps>`
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

export default InputFragment;
