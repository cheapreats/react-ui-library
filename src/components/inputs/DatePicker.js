import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Picker from 'react-datepicker';
import { PRIMARY_FONT, PRIMARY_COLOUR } from '../variables';
import 'react-datepicker/dist/react-datepicker.css';

const FormTitle = styled.label`
    margin-top: 10px;
`;

const InformationMessage = styled.p`
    margin: 2px 0 0;
    font-size: 0.8rem;
    color: rgba(0,0,0,0.5);
`;

const Container = styled.div`

    font-family: ${ PRIMARY_FONT };
    padding: 10px 0;
    font-weight: bold;
    font-size: 0.9rem;

    & input {
        box-sizing: border-box;
        font-weight: bold;
        font-family: ${ PRIMARY_FONT };
        background-color: rgba(0,0,0,0.05);
        border-radius: 10px;
        border: none;
        outline: none;
        width: 100%;
        padding: 10px 20px;
        margin: 5px 0;
        opacity: 0.8;
    }

    & .react-datepicker {
        $self: &;
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

export class DatePicker extends Component {

    onChange = date => {
        const { name, onChange } = this.props;
        if (onChange) onChange(date, name);
    }

    render() {
        const { className, title, description, selected = new Date() } = this.props;
        return (
            <Container className={ className }>
                <FormTitle>{ title }</FormTitle>
                { description ? <InformationMessage>{ description }</InformationMessage> : null }
                <Picker
                    selected={ selected }
                    onSelect={ this.onChange }
                />
            </Container>
        );
    }
}

DatePicker.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    /** A JavaScript Date object, defaults to today */
    selected: PropTypes.object,
    /** Takes 2 parameters, the new date and identifier (name) of input */
    onChange: PropTypes.func
}