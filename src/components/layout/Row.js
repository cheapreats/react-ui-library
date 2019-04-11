import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-shrink: 0;
    width: ${ ({ width }) => width + (typeof(width) === 'string' ? '' : 'px') };
    margin: ${ ({ margin }) => margin + (typeof(margin) === 'string' ? '' : 'px') };
    padding: ${ ({ padding }) => padding + (typeof(padding) === 'string' ? '' : 'px') };
    ${ ({ wrap }) => wrap ? `flex-wrap: wrap;` : '' }
    ${
        ({ top, bottom, center, stretch }) => (
            top ? 'align-items: flex-start;' : 
            bottom ? 'align-items: flex-end;' :
            center ? 'align-items: center;' :
            stretch ? 'align-items: stretch;' : ''
        )
    };
`;

export const Row = ({ className, margin = 0, padding = 0, wrap, children, top, bottom, center, stretch, width = '100%' }) => (
    <Container
        className={ className }
        wrap={ wrap }
        padding={ padding }
        margin={ margin }
        top={ top }
        width={ width }
        bottom={ bottom }
        center={ center }
        stretch={ stretch }
    >
        { children }
    </Container>
);

Row.propTypes = {
    className: PropTypes.string,
    wrap: PropTypes.bool,
    padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    children: PropTypes.node,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    center: PropTypes.bool,
    stretch: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}