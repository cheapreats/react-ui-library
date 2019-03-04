import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';
import { ExtractProps } from '../_helpers/Util';

// For custom styling in the future
const TYPES = {
    h1: ``,
    h2: ``,
    h3: ``,
    h4: ``,
    h5: ``,
    h6: ``
};

const HeadingText = styled(TextLayout)`${ ({ type }) => TYPES[type] }`;

export const Heading = props => {
    const [layoutProps, { type, children }] = ExtractProps(
        TextLayoutProps, props
    );
    return (
        <HeadingText { ...layoutProps } type={ type }>
            { children }
        </HeadingText>
    );
};

Heading.defaultProps = {
    margin: '20px 0 10px',
    type: 'h1'
}

Heading.propTypes = {
    ...TextLayoutProps,
    type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

