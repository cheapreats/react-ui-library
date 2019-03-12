import React, { useState, useEffect } from 'react';
import { Check as Icon } from 'styled-icons/fa-solid/Check';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position, flex } from '../mixins';
import { PRIMARY_COLOUR } from '../variables';
import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';

const Container = styled(TextLayout)`
    position: relative;
    ${ flex('row', 'flex-start', 'center') }
    ${({ size }) => `
        border-radius: ${ size * 0.3 }px;
        height: ${ size * 1.1 }px;
    `}
`;

const StyledIcon = styled(Icon)`
    color: white;
    opacity: 0;
    transition:
        opacity 150ms ease-in-out,
        transform 150ms ease-in-out
    ;
    transform: translate3d(0,0,0) scale(0) rotate(-45deg);
    ${({ size }) => `
        width: ${ size * 0.55 }px;
        height: ${ size * 0.55 }px;
    `}
`;

const Cover = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    transition:
        background-color 150ms ease-in-out,
        border-color 150ms ease-in-out
    ;
    ${({ size }) => `
        border-radius: ${ size * 0.3 }px;
        margin-right: ${ size * 0.3 }px;
        border: ${ size * 0.1 }px solid #efefef;
        width: ${ size * 1.1 }px;
        height: ${ size * 1.1 }px;
    `}
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 0.85rem;
    opacity: 0.7;
    ${({ size }) => `
        font-size: ${ size / 25 * 0.85 }rem;
    `}
`;

const Check = styled.input`
    ${({ size }) => `width: ${ size * 1.1 }px;`}
    ${ position('absolute', 0, 0) }
    height: 100%;
    opacity: 0;
    z-index: 1;
    cursor: pointer;

    &:checked ~ div {
        border-color: ${ PRIMARY_COLOUR };
        background-color: ${ PRIMARY_COLOUR };
        & > svg {
            opacity: 1;
            transform: translate3d(0,0,0) scale(1) rotate(0);
        }
    }

    &:disabled ~ div {
        opacity: 0.7;
    }
`;

export const Checkbox = ({
    className,
    margin,
    name,
    label,
    value = false,
    onChange = () => {},
    disabled,
    size = 25,
}) => {
    const [ checked, setChecked ] = useState(value);
    useEffect(() => setChecked(value), [ value ]);
    const toggle = () => setChecked(!checked);
    const _onChange = el => {
        el.target.value = checked;
        onChange(el);
    };

    return (
        <Container size={size} disabled={disabled} className={className} margin={margin} type='span'>
            <Check
                size={size}
                name={name}
                type='checkbox'
                checked={checked}
                onChange={_onChange}
                onClick={toggle}
                disabled={disabled}
            />
            <Cover size={size}>
                <StyledIcon size={size}/>
            </Cover>
            <Label size={size} htmlFor={name}>{ label }</Label>
        </Container>
    );
};

Checkbox.propTypes = {
    ...TextLayoutProps,
    className: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool
};