import React from 'react';
import styled from 'styled-components';
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

export interface RadioProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface,
        React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    column?: boolean;
    className?: string;
    activeStyle?: Function;
    radioStyle?: Function;
    disabled?: boolean;
    value?: boolean;
    name?: string;
}

export const Radio: React.FC<RadioProps> = ({
    label,
    column,
    className,
    activeStyle,
    radioStyle,
    disabled,
    value,
    name,
    ...props
}): React.ReactElement => {
    const implicitProps = __useImplicitProps(props, [
        ...MainProps,
        ...ResponsiveProps,
    ]);
    const radioProps = {
        activeStyle,
        radioStyle,
    };

    return (
        <Container className={className} column={column} {...implicitProps}>
            <RadioContainer>
                <Input
                    type="checkbox"
                    {...props}
                    name={name}
                    value={value === undefined ? '' : value.toString()}
                    checked={value}
                    disabled={disabled}
                />
                <RadioBox {...radioProps} disabled={disabled}>
                    <RadioDot />
                </RadioBox>
            </RadioContainer>
            {label && (
                <Label htmlFor={name} column={column}>
                    {label}
                </Label>
            )}
        </Container>
    );
};

const Container = styled.div<RadioProps>`
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

const RadioContainer = styled.div`
    ${flex('center')}
    display: inline-flex;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
`;

const RadioBox = styled.div<RadioProps>`
    ${flex('center')}
    ${transition(['border-color'])}
    border-radius: 50%;
    margin: 0;

    // Disabled
    ${Input}:disabled ~ & {
        opacity: 0.6;
    }

    ${({ activeStyle, ...props }): string => {
        const { colors, dimensions } = props.theme;
        return `
            height: ${dimensions.radio.size}px;
            width: ${dimensions.radio.size}px;
            border: 3px solid ${darken(colors.input.default)};

            ${Input}:checked ~ & {
                border-color: ${colors.primary};
                ${activeStyle ? activeStyle(props) : ''}
            }

            ${Main({
                padding: `${dimensions.radio.spacing}px`,
                ...props,
            })}
        `;
    }}
    ${({ radioStyle, ...props }): string =>
        radioStyle ? radioStyle(props) : ''}
`;

const RadioDot = styled.div`
    ${transition(['transform', 'opacity'])};
    border-radius: 50%;
    transform: scale(0, 0);
    opacity: 0;
    height: 100%;
    flex-grow: 1;

    ${({ theme }): string => `
        background-color: ${theme.colors.primary};
    `}

    ${Input}:checked ~ ${RadioBox} & {
        transform: scale(1, 1);
        opacity: 1;
    }
`;

const Label = styled.label<RadioProps>`
    margin: ${({ column }): string => (column ? '6px' : '0 8px 2px')};
    font-size: 0.85rem;
    font-weight: bold;
`;

export default Radio;
