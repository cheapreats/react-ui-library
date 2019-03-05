import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SmallText } from '../texts/SmallText';
import { PRIMARY_FONT } from '../variables';
import { flex, transition } from '../mixins';

const Container = styled.div`
    overflow-wrap: break-word;
    position: relative;
    font-family: ${ PRIMARY_FONT };
    max-width: ${ ({ maxWidth }) => maxWidth + (typeof(maxWidth) === 'string' ? '' : 'px') }
    ${ ({ disabled }) => disabled ? 'opacity: 0.5;' : '' }
    ${ flex('column') }
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 3px;
    font-size: 0.95rem;
`;

const ErrorText = styled(SmallText)`
    color: red;
    ${ transition(['opacity', 'max-height']) }
    ${ ({ error }) => error ? `
        opacity: 1;
        max-height: 200px;
    ` : `
        opacity: 0;
        max-height: 0;
    ` };
`;

export const InputLayout = ({
    className,
    margin = '20px 0 10px',
    maxWidth = 550,
    name,
    label,
    description,
    disabled,
    error,
    children
}) => (
    <Container className={ className } margin={ margin } maxWidth={ maxWidth } disabled={ disabled }>
        { !label ? null : <Label htmlFor={ name }>{ label }</Label> }
        {
            !description ? null :
            <SmallText id={ name } margin='0 0 5px' lineHeight='1.3' text={ description } bold/>
        }
        { children }
        <ErrorText margin='5px 0 0' lineHeight='1.3' text={ error || '' } error={ error } bold/>
    </Container>
);

export const InputLayoutProps = {
    /** Adding a class for SC inheritance or Custom classes */
    className: PropTypes.string,
    /** The spacing of the input. If provided a number, would be in px */
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /** The max length the input. If provided a number, would be in px */
    maxWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /** The name of input for accessbility labelling */
    name: PropTypes.string.isRequired,
    /** The label of the input (aka the title) */
    label: PropTypes.node,
    /** A short blurb about the input */
    description: PropTypes.node,
    /** Whether or not the input is disabled */
    disabled: PropTypes.bool,
    /** The error message for the input component */
    error: PropTypes.node
};

InputLayout.propTypes = {
    ...InputLayoutProps,
    /** The actual input component */
    children: PropTypes.node.isRequired
};

export const InputStyles = `
    width: 100%;
    padding: 12px 16px;
    border: none;
    outline: none;
    border-radius: 8px;
    font-weight: bold;
    margin-top: 5px;
    font-size: 0.825rem;
    box-sizing: border-box;
`;

export default InputLayout;