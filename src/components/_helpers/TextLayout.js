import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PRIMARY_FONT } from '../variables';

const Text = styled.p`
    color: black;
    font-family: ${ PRIMARY_FONT };
    line-height: ${ ({ lineHeight }) => lineHeight };
    font-weight: ${ ({ bold }) => bold ? 'bold' : 'normal' };
    margin: ${ ({ margin }) => margin + (typeof(margin) === 'string' ? '' : 'px') };
`;

export const TextLayout = ({
    className,
    margin = '10px 0',
    lineHeight = 1.7,
    type,
    bold,
    text,
    children
}) => (
    <Text
        className={ className }
        margin={ margin }
        lineHeight={ lineHeight }
        as={ type }
        bold={ bold }
    >
        { text || children }
    </Text>
);

export const TextLayoutProps = {
    className: PropTypes.string,
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    lineHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    bold: PropTypes.bool,
    text: PropTypes.node,
    children: PropTypes.node
};

TextLayout.propTypes = {
    ...TextLayoutProps,
    type: PropTypes.string
};

export default TextLayout;