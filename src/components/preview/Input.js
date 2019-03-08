import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputLayout, { InputLayoutProps, InputStyles } from '../_helpers/InputLayout';
import {
    PRIMARY_FONT, SHADOW_RAISE_1, INPUT_BACKGROUND,
    INPUT_BACKGROUND_VALID, INPUT_BACKGROUND_INVALID
} from '../variables';
import { transition } from '../mixins';

const InputField = styled.input`
    ${ InputStyles }
    font-family: ${ PRIMARY_FONT };
    background-color: ${ ({ valid, error }) => (
        error ? INPUT_BACKGROUND_INVALID :
        valid ? INPUT_BACKGROUND_VALID :
        INPUT_BACKGROUND
    )};
    ${ transition(['box-shadow', 'background-color']) }
    
    &:disabled {
        cursor: not-allowed;
        background-color: ${ INPUT_BACKGROUND };
        &:active, &:focus {
            box-shadow: none;
        }
    }
    &:active, &:focus {
        box-shadow: ${ SHADOW_RAISE_1 };
    }
`;

export const Input = ({
    // Layout Props
    className,
    margin,
    maxWidth,
    name,
    label,
    description,
    disabled,
    error,

    // Input Props
    valid,
    value,
    placeholder,
    type,
    min,
    max,
    step,
    onChange,
    onKeyPress
}) => (
    <InputLayout
        className={ className }
        margin={ margin }
        maxWidth={ maxWidth }
        name={ name }
        label={ label }
        description={ description }
        disabled={ disabled }
        error={ error }
    >
        <InputField
            name={ name }
            aria-describedby={ name }
            error={ error }
            valid={ valid }
            disabled={ disabled }
            placeholder={ placeholder }
            type={ type }
            onChange={ onChange }
            value={ value }
            onKeyPress={ onKeyPress }
            min={ min }
            max={ max }
            step={ step }
        />
    </InputLayout>
);

Input.propTypes = {
    ...InputLayoutProps,
    valid: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    max: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    step: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    onChange: PropTypes.func,
    onKeypress: PropTypes.func
};
