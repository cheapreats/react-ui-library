import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Check } from '@styled-icons/fa-solid/Check';
import {
    Main,
    MainInterface,
    MainProps,
    Responsive,
    ResponsiveInterface,
    ResponsiveProps,
} from '@Utils/BaseStyles';
import { __useImplicitProps, ImplicitPropsInterface } from '@Utils/Hooks';
import { darken, flex, position, transition } from '@Utils/Mixins';

export interface CheckboxProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface,
        Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    column?: boolean;
    className?: string;
    activeStyle?: Function;
    checkboxStyle?: Function;
    disabled?: boolean;
    name?: string;
    value?: boolean;
    onChange?: Function;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    column,
    className,
    activeStyle,
    checkboxStyle,
    disabled,
    value,
    name,
    onChange = (): void => undefined,
    ...props
}): React.ReactElement => {
    const implicitProps = __useImplicitProps(props, [
        ...MainProps,
        ...ResponsiveProps,
    ]);
    const checkboxProps = {
        activeStyle,
        checkboxStyle,
    };

    return (
        <Container className={className} column={column} {...implicitProps}>
            <CheckContainer>
                <Input
                    type="checkbox"
                    name={name}
                    onChange={(event: SyntheticEvent<HTMLInputElement>): void =>
                        onChange(event)
                    }
                    {...props}
                    value={
                        value === undefined || value === null
                            ? ''
                            : value.toString()
                    }
                    checked={value}
                    disabled={disabled}
                />
                <CheckBox {...checkboxProps} disabled={disabled}>
                    <CheckIcon />
                </CheckBox>
            </CheckContainer>
            {label && (
                <Label htmlFor={name} column={column}>
                    {label}
                </Label>
            )}
        </Container>
    );
};

const Container = styled.div<CheckboxProps>`
    ${({ column }): string => (column ? 'flex-direction: column;' : '')}
    ${flex('center')}
    ${Responsive}
    ${Main}

    display: inline-flex;
`;

const Input = styled.input`
    ${position('absolute')}
    cursor: pointer;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;

    &:disabled {
        cursor: not-allowed;
    }
`;

const CheckContainer = styled.div`
    ${flex('center')}
    display: inline-flex;
    position: relative;
    overflow: hidden;
    ${({ theme }): string => `
        border-radius: ${theme.dimensions.radius};
    `}
`;

const CheckBox = styled.div<CheckboxProps>`
    ${flex('center')}
    ${transition(['border-color', 'background-color'])}
    margin: 0;

    // Disabled
    ${Input}:disabled ~ & {
        opacity: 0.6;
    }

    ${({ activeStyle, ...props }): string => {
        const { colors, dimensions } = props.theme;
        return `
            height: ${dimensions.checkbox.size}px;
            width: ${dimensions.checkbox.size}px;
            border: 3px solid ${darken(colors.input.default)};
            border-radius: ${dimensions.radius};

            ${Input}:checked ~ & {
                border-color: ${colors.primary};
                background-color: ${colors.primary};
                ${activeStyle ? activeStyle(props) : ''}
            }

            ${Main({
                padding: `${dimensions.checkbox.spacing}px`,
                ...props,
            })}
        `;
    }}
    ${({ checkboxStyle, ...props }): string =>
        checkboxStyle ? checkboxStyle(props) : ''}
`;

const CheckIcon = styled(Check)`
    ${transition(['opacity'])}
    opacity: 0;
    color: white;
    width: 100%;
    height: auto;

    ${Input}:checked ~ ${CheckBox} > & {
        opacity: 1;
    }
`;

const Label = styled.label<CheckboxProps>`
    margin: ${({ column }): string => (column ? '6px' : '0 8px 2px')};
    font-size: 0.85rem;
    font-weight: bold;
`;

export default Checkbox;
