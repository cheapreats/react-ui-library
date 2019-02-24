import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, {ThemeProvider} from 'styled-components';
import Picker from 'react-datepicker';
import { PRIMARY_FONT, PRIMARY_COLOUR } from '../variables';
import { THEMES } from '../theme.js';
import 'react-datepicker/dist/react-datepicker.css';
import theme from 'styled-theming';


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
            border-bottom-color: ${props => props.theme.PRIMARY_COLOUR } !important;
        }

        &__header {
            & * { color: white; }
            background-color: ${props => props.theme.PRIMARY_COLOUR };
        }

        &__day {
            margin: 0;
            padding: 0.166rem;
            &--selected {
                background-color: ${props => props.theme.PRIMARY_COLOUR };
            }

            &--keyboard-selected {
                background-color: ;
            }

            &--outside-month {
                opacity: 0.4;
            }
        }
    }
`;

export class DatePicker extends Component {

    state = {
        themeCurrent: THEMES.light
    }

    onChange = date => {
        const { name, onChange } = this.props;
        if (onChange) onChange(date, name);
    }

    
    // THEMES =  {
    //     light: themes('mode', {
    //         PRIMARY_COLOUR: "#ED242A",
    //         SECONDARY_COLOR: "#515151",
    //         BORDER_COLOR: "#000000",
    //         BACKGROUND_COLOR: "#b9b9b9"
    //     }),
    //     dark: themes('mode', {
    //         PRIMARY_COLOUR: "#b9b9b9",
    //         SECONDARY_COLOR: "#ED242A",
    //         BORDER_COLOR: "#000000",
    //         BACKGROUND_COLOR: "#161616"
    //     })
        
    // };
    
    
    render() {

        const { className, title, description, selected = new Date(), theme } = this.props;
        return (
            <ThemeProvider theme={theme === 'light' ? THEMES.light : THEMES.dark }>
                <Container className={ className }>
                    <FormTitle>{ title }</FormTitle>
                    { description ? <InformationMessage>{ description }</InformationMessage> : null }
                    <Picker
                        selected={ selected }
                        onSelect={ this.onChange }
                    />
                </Container>
            </ThemeProvider>
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
    onChange: PropTypes.func,
    /** Theme object e.g. 'dark' or 'light', defaults to 'light'*/
    theme: PropTypes.string
}