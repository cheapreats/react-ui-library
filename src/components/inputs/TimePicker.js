import React, { Component } from 'react';
import moment from 'moment';
import Picker from 'rc-time-picker';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { position, scroll, flex } from '../mixins';
import { PRIMARY_FONT, PRIMARY_COLOUR, SHADOW_RAISE_1 } from '../variables';
import 'rc-time-picker/assets/index.css';

const FormTitle = styled.label`
    margin-top: 10px;
`;

const InformationMessage = styled.p`
    margin: 2px 0 0;
    font-size: 0.8rem;
    color: rgba(0,0,0,0.5);
`;

const Global = createGlobalStyle`
    .rc-time-picker {

        &-panel-input-wrap {
            display: none;
        }

        &-panel &-panel-select-option-selected {
            &, &:hover {
                color: ${ PRIMARY_COLOUR };
            }
        }

        &-panel &-panel-inner {
            border: none;
            width: 208px;
            font-family: ${ PRIMARY_FONT };
            box-shadow: ${ SHADOW_RAISE_1 };
        }

        &-panel &-panel-select {
            ${ scroll }
            width: 70px;
            max-height: 180px;
            font-size: 0.85rem;
            & li {
                padding: 6px 0;
                width: 100%;
                box-sizing: content-box;
                ${ flex('row', 'center') }
                text-align: center;
            }
        }

        &-panel-inner {
            margin-top: 48px;
            overflow: hidden;
        }
    }
`;

const Container = styled.div`
    font-family: ${ PRIMARY_FONT };
    padding: 10px 0;
    font-weight: bold;
    font-size: 0.9rem;

    & .rc-time-picker {
        display: block;

        &-clear {
            ${ position('absolute', 'auto 0', 0, '5px', '5px', 'auto') }
        }

        &-input {
            height: auto;
            color: black;
            display: block;
            line-height: normal;
            font-size: 13.3333px;
            font-weight: bold;
            box-sizing: border-box;
            font-family: ${PRIMARY_FONT};
            background-color: rgba(0,0,0,0.05);
            border-radius: 10px;
            border: none;
            outline: none;
            width: 100%;
            padding: 10px 20px;
            margin: 5px 0;
            opacity: 0.8;
        }
    }

    & * {
        font-family: ${ PRIMARY_FONT };
    }
`;

export class TimePicker extends Component {

    onChange = date => {
        const { name, onChange } = this.props;
        if (onChange) onChange(date, name);
    }

    render() {
        const { className, title, description, value = new Date() } = this.props;
        return (
            <Container className={ className }>
                <FormTitle>{ title }</FormTitle>
                { description ? <InformationMessage>{ description }</InformationMessage> : null }
                <Picker
                    defaultValue={ moment(value) }
                    placeholder='Pick a time'
                    format='h:mm A'
                    showSecond={ false }
                    inputReadOnly
                    use12Hours
                />
                <Global/>
            </Container>
        );
    }
}

TimePicker.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    /** A JavaScript Date object, defaults to today */
    selected: PropTypes.object,
    /** Takes 2 parameters, the new date and identifier (name) of input */
    onChange: PropTypes.func
}