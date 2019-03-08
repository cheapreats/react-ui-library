import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transition } from '../mixins';
import { PRIMARY_FONT, SHADOW_RAISE_1 } from '../variables';

export const CardBox = styled.div`
    overflow: hidden;
    background-color: white;
    font-family: ${ PRIMARY_FONT };
    border-radius: ${ ({ radius }) => typeof(radius) === 'string' ? radius : `${ radius }px` };
    padding: ${ ({ padding }) => typeof(padding) === 'string' ? padding : `${ padding }px` };
    margin: ${ ({ margin }) => typeof(margin) === 'string' ? margin : `${ margin }px` };
    ${ ({ flat }) => flat ? '' : `box-shadow: ${ SHADOW_RAISE_1 };` }
    ${ ({ animated, flat }) => animated ? `
        ${ transition(['box-shadow']) }
        &:hover {
            box-shadow: ${ flat ? SHADOW_RAISE_1 : '0 2px 6px rgba(0,0,0,0.3)' };
        }
    ` : ''}
`;

export const Card = ({ children, className, padding = 20, margin = 20, animated, flat, radius = 20 }) => (
    <CardBox
        className={ className }
        padding={ padding }
        margin={ margin }
        animated={ animated }
        flat={ flat }
        radius={ radius }
    >{ children }</CardBox>
);

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    animated: PropTypes.bool,
    flat: PropTypes.bool,
    radius: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};