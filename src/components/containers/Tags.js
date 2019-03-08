import React from 'react';
import PropTypes from 'prop-types';
import { flex } from '../mixins';
import styled from 'styled-components';

const Container = styled.div`
    ${ flex() }
    flex-wrap: wrap;
    ${ ({ margin }) => `margin: ${ margin };` }
    & span {
        margin: 0 5px 5px 0;
    }
`;

export const Tags = ({ className, children, margin = 0 }) => (
    <Container className={ className } margin={ margin }>
        { children }
    </Container>
);

Tags.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    margin: PropTypes.string
}