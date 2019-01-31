import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_FONT } from '../variables';

const Small = styled.p`
    font-family: ${ PRIMARY_FONT };
    margin: 2px 0 0;
    font-size: 0.8rem;
    color: rgba(0,0,0,0.5);
    ${ ({ bold }) => bold ? 'font-weight: bold;' : '' }
`;

export const SmallText = ({ className, children, text, bold }) => (
    <Small bold={ bold } className={ className }>
        { text ? text : children }
    </Small>
);

SmallText.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    text: PropTypes.node,
    bold: PropTypes.bool
};