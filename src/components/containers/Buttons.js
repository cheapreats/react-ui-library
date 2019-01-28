import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 15px;
    & > * {
        margin: 0 10px 10px 0;
    }
`;

export const Buttons = ({ className, children }) => (
    <Container className={ className }>
        { children }
    </Container>
);

Buttons.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

