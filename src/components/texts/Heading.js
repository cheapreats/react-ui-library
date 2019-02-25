import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';

// For custom styling in the future
const TYPES = {
    h1: ``,
    h2: ``,
    h3: ``,
    h4: ``,
    h5: ``,
    h6: ``
};

const HeadingText = styled(TextLayout)`
    ${ ({ type }) => TYPES[type] }
`;

export const Heading = ({
    className,
    margin = '20px 0 10px',
    lineHeight,
    bold,
    children,
    text,
    type = 'h1'
}) => (
    <HeadingText
        className={ className }
        margin={ margin }
        lineHeight={ lineHeight }
        bold={ bold }
        text={ text }
        type={ type }
    >
        { children }
    </HeadingText>
);

Heading.propTypes = {
    ...TextLayoutProps,
    type: PropTypes.oneOf(Object.keys(TYPES))
};

