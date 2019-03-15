import React, { useState, Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputLayout, { InputLayoutProps, InputStyles } from '../_helpers/InputLayout';

import {
    SHADOW_RAISE_1, INPUT_BACKGROUND,
    INPUT_BACKGROUND_VALID, INPUT_BACKGROUND_INVALID
} from '../variables';
import { transition, position, flex, scroll } from '../mixins';
import { AngleDown } from 'styled-icons/fa-solid/AngleDown';
import { ExtractProps } from '../_helpers/Util';

const ITEM_HEIGHT = 40;
const NUM_OF_ITEMS = 4;

const SelectWrapper = styled.div`
    position: relative;
    font-size: 0.825rem;
    font-weight: bold;
    width: ${ ({ width }) => width + (typeof(width) === 'string' ? '' : 'px') };
    ${ ({ disabled }) => disabled ? `
        & * {
            cursor: not-allowed !important;
        }
    ` : '' }
`;

const Icon = styled(AngleDown)`
    margin-left: auto;
    padding-left: 12px;
    height: 18px;
    width: 18px;
`;

const SelectedItem = styled.p`
    ${ InputStyles }
    ${ flex('row', 'flex-start', 'center') }
    margin-bottom: 0;
    cursor: pointer;
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
    z-index: 10;
    width: 100%;

    ${ scroll }
    ${ transition(['opacity', 'max-height']) }
    ${
        ({ expanded }) => expanded ? `
            pointer-events: all;
            max-height: ${ ITEM_HEIGHT * NUM_OF_ITEMS }px;
            opacity: 1;
        ` : `
            pointer-events: none;
            max-height: ${ ITEM_HEIGHT }px;
            opacity: 0;
        `
    }
`;

const SelectItem = styled.li`
    ${ InputStyles }
    ${ transition(['background-color']) }
    background-color: transparent;
    border-radius: none;
    cursor: pointer;
    margin: 0;

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

export const Select = params => {
    const [ layoutProps, selectProps ] = ExtractProps(
        InputLayout.propTypes, params, {}, ['error', 'disabled', 'name']
    );
    const {
        valid, value, placeholder, onChange, isActive,
        children, disabled, error, name, width
    } = selectProps;

    const [ expanded, setExpanded ] = useState(false);
    const items = Children.toArray(children);
    const activeItem = items.find(({ props }) => isActive(props.value, value));

    const _onClick = el => {
        if (onChange) {
            el.target.name = name;
            onChange(el);
        }
    };

    const open = () => {
        if (!disabled) {
            setExpanded(true);
            window.requestAnimationFrame(
                () => {
                    window.addEventListener('click', () => setExpanded(false), { once: true });
                }, 10
            );
        }
    }

    return (
        <InputLayout { ...layoutProps }>
            <SelectWrapper disabled={ disabled } width={ width }>
                <SelectedItem onClick={ open } expanded={ expanded } valid={ valid } error={ error }>
                    { activeItem ? activeItem.props.children : placeholder }
                    <Icon/>
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

Select.defaultProps = {
    isActive: (curr, active) => curr === active,
    width: '100%',
};

Select.propTypes = {
    ...InputLayoutProps,
    valid: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    onChange: PropTypes.func,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    isActive: PropTypes.func
};