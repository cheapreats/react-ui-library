import React from 'react';
import styled from 'styled-components';
import { styledCondition, transition } from '../Utils/Mixins';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';

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
    width?: number | string;
}

export const InputFragment = React.forwardRef<
    HTMLInputElement,
    InputFragmentProps
>(
    ({ ...props }, ref): React.ReactElement => (
        <InputElement {...props} ref={ref} />
    ),
);

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

    ${({ width }): string => {
        if (width) {
            switch (typeof width) {
                case 'number':
                    return `width:${width}px;`;
                case 'string':
                    return `width:${width};`;
                default:
                    return '';
            }
        }
        return '';
    }}

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
