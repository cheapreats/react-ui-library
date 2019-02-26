import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputLayout, { InputLayoutProps } from '../_helpers/InputLayout';

import {
    PRIMARY_FONT, SHADOW_RAISE_1, INPUT_BACKGROUND,
    INPUT_BACKGROUND_VALID, INPUT_BACKGROUND_INVALID
} from '../variables';
import { transition, position, flex, scroll } from '../mixins';

const ITEM_HEIGHT = 40;
const NUM_OF_ITEMS = 4;

const SelectWrapper = styled.div`
    position: relative;
    font-size: 0.825rem;
    font-weight: bold;

    ${ ({ disabled }) => disabled ? `
        & * {
            cursor: not-allowed !important;
        }
    ` : '' }
`;

const SelectedItem = styled.p`
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    margin: 5px 0 0;
    cursor: pointer;
    box-sizing: border-box;
    font-family: ${ PRIMARY_FONT };
    background-color: ${ ({ valid, error }) => (
        error ? INPUT_BACKGROUND_INVALID :
        valid ? INPUT_BACKGROUND_VALID :
        INPUT_BACKGROUND
    )};
    ${ transition(['background-color', 'color']) }
    ${
        ({ expanded }) => expanded ? `
            color: transparent;
        ` : ``
    }
`;

const SelectList = styled.ul`
    ${ position('absolute', '5px 0 0', 0, 0, 'auto') }
    ${ flex('column') }
    border-radius: 8px;
    background-color: white;
    overflow: auto;
    box-shadow: ${ SHADOW_RAISE_1 };
    list-style-type: none;
    padding: 0;
    width: 100%;

    ${ scroll }
    ${ transition(['opacity', 'max-height']) }
    ${
        ({ expanded }) => expanded ? `
            pointer-events: all;
            max-height: ${ ITEM_HEIGHT * NUM_OF_ITEMS }px;
            opacity: 1;
            z-index: 1;
        ` : `
            pointer-events: none;
            max-height: ${ ITEM_HEIGHT }px;
            opacity: 0;
        `
    }
`;

const SelectItem = styled.li`
    padding: 12px 16px;
    border: none;
    margin: 0;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    ${ transition(['background-color']) }

    &:first-child {
        border-radius: 8px 8px 0 0;
    }

    &:last-child {
        border-radius: 0 0 8px 8px;
    }

    ${ ({ active }) => active ? `background-color: ${ INPUT_BACKGROUND };` : '' }
    &:hover, &:focus {
        background-color: ${ INPUT_BACKGROUND };
    }
`;

const SelectField = styled.select`display: none`;

export const Select = ({
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
    onChange,
    isActive = (curr, active) => curr + '' === active + '',
    children
}) => {

    const [ expanded, setExpanded ] = useState(false);
    const items = Array.isArray(children) ? children : [ children ];
    const activeItem = items.find(({ props }) => props.value === value);

    const _onClick = el => {
        if (onChange) {
            el.target.name = name;
            onChange(el);
        }
    };

    const open = () => {
        if (!disabled) {
            setExpanded(true);
            window.setTimeout(
                () => {
                    window.addEventListener('click', () => setExpanded(false), { once: true });
                }, 10
            );
        }
    }

    return (
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
            <SelectWrapper disabled={ disabled }>
                <SelectedItem onClick={ open } expanded={ expanded } valid={ valid } error={ error }>
                    { activeItem ? activeItem.props.children : placeholder }
                </SelectedItem>
                <SelectList expanded={ expanded }>
                    {
                        items.map(({ props }) => (
                            <SelectItem
                                key={ props.value }
                                onClick={ _onClick }
                                value={ props.value }
                                active={ isActive(props.value, value) }
                            >
                                { props.children }
                            </SelectItem>
                        ))
                    }
                </SelectList>
            </SelectWrapper>
            <SelectField name={ name } onChange={ onChange } value={ value }>
                { children }
            </SelectField>
        </InputLayout>
    );
};

Select.propTypes = {
    ...InputLayoutProps,
    valid: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
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
    isActive: PropTypes.func
};