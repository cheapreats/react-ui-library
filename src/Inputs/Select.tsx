import React, { Children } from 'react';
import styled from 'styled-components';
import { transition, styledCondition } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

export interface SelectProps extends LabelLayoutProps {
    disabled?: boolean,
    placeholder?: string,
    value?: string | number,
};

export const Select = ({
    disabled,
    value,
    children,
    placeholder = '',
    ...props
}: SelectProps) => {
    const displayProps = {
        success: props.success,
        error: props.error,
        disabled
    };

    const options = Children.toArray(children);
    console.log(options);

    return (
        <LabelLayout { ...props }>
            <SelectDisplay { ...displayProps }>
                { placeholder }
            </SelectDisplay>
            <SelectList>
                <SelectItem/>
            </SelectList>
        </LabelLayout>
    );
};

const SelectDisplay = styled.p`
    ${ transition(['background-color', 'opacity', 'box-shadow']) }
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0;

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
        &:hover:not(:disabled) {
            box-shadow: ${ theme.depth[1] };
        }
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

const SelectList = styled.ul`

`;

const SelectItem = styled.li`

`;

export default Select;