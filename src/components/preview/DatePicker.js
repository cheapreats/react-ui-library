import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Picker from 'react-datepicker';
import { CalendarAlt } from 'styled-icons/fa-regular/CalendarAlt';
import 'react-datepicker/dist/react-datepicker.css';

import InputLayout, { InputLayoutProps, InputStyles } from '../_helpers/InputLayout';
import {
    PRIMARY_FONT, PRIMARY_COLOUR, SHADOW_RAISE_1, INPUT_BACKGROUND,
    INPUT_BACKGROUND_VALID, INPUT_BACKGROUND_INVALID
} from '../variables';
import { transition, position } from '../mixins';

const Container = styled(InputLayout)`
    & input {
        ${ InputStyles }
        font-family: ${ PRIMARY_FONT };
        background-color: ${ ({ valid, error }) => (
            error ? INPUT_BACKGROUND_INVALID :
            valid ? INPUT_BACKGROUND_VALID :
            INPUT_BACKGROUND
        )};
        &:active, &:focus {
            box-shadow: ${ SHADOW_RAISE_1 };
        }
        &:disabled {
            cursor: not-allowed;
        }
        ${ transition(['box-shadow', 'background-color']) }
    }

    & .react-datepicker {
        border: none;
        font-family: ${ PRIMARY_FONT };
        box-shadow: 0 0 3px 2px rgba(0,0,0,0.1);

        &__input-container, &-wrapper {
            display: block;
        }

        &__navigation {
            &--next {
                border-left-color: white;
            }

            &--previous {
                border-right-color: white;
            }
        }

        &__triangle {
            border-bottom-color: ${ PRIMARY_COLOUR } !important;
        }

        &__header {
            & * { color: white; }
            background-color: ${ PRIMARY_COLOUR };
        }

        &__day {
            margin: 0;
            padding: 0.166rem;
            &--selected {
                background-color: ${ PRIMARY_COLOUR };
            }

            &--keyboard-selected {
                background-color: #b9b9b9;
            }

            &--outside-month {
                opacity: 0.4;
            }
        }
    }
`;

const Icon = styled(CalendarAlt)`
    ${ position('absolute', '38px 14px 0 auto') }
    margin-left: auto;
    width: 18px;
    height: 18px;
`;

export const DatePicker = ({
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
    value,
    valid,
    placeholder,
    onChange
}) => {

    const ref = useRef();
    useEffect(() => { ref.current.target = { name, value } });
    const _onChange = date => {
        ref.current.target.value = date;
        if (onChange) onChange(ref.current);
    };

    return (
        <Container
            className={ className }
            margin={ margin }
            maxWidth={ maxWidth }
            name={ name }
            label={ label }
            description={ description }
            disabled={ disabled }
            error={ error }
            valid={ valid }
        >
            <Picker
                ref={ ref }
                selected={ value }
                onChange={ _onChange }
                name={ name }
                placeholderText={ placeholder }
                disabled={ disabled }
            />
            <Icon/>
        </Container>
    );
};

DatePicker.propTypes = {
    ...InputLayoutProps,
    /** A JavaScript Date object, defaults to today */
    value: PropTypes.object,
    /** Takes 2 parameters, the new date and identifier (name) of input */
    onChange: PropTypes.func
}