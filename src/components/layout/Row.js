import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ${
        ({ top, bottom, center, stretch }) => (
            top ? 'align-items: flex-start;' : 
            bottom ? 'align-items: flex-end;' :
            center ? 'align-items: center;' :
            stretch ? 'align-items: stretch;' : ''
        )
    };
`;

export const Row = ({ className, children, top, bottom, center, stretch}) => (
    <Container
        className={ className }
        top={ top }
        bottom={ bottom }
        center={ center }
        stretch={ stretch }
    >
        { children }
    </Container>
);

Row.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    center: PropTypes.bool,
    stretch: PropTypes.bool
}