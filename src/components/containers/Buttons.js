import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flex } from '../mixins';

const Container = styled.div`
    margin-top: 15px;
    & > button {
        ${ ({ spacing, column }) => `margin: 0 ${ !column ? spacing : 0 }px ${ spacing }px 0;` }
    }

    ${ ({ column }) => column ? flex('column') : '' }
`;

export const Buttons = ({ className, children, column, spacing = 10 }) => (
    <Container className={ className } column={ column } spacing={ spacing }>
        { children }
    </Container>
);

Buttons.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

