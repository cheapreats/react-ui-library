import React from 'react';
import PropTypes from 'prop-types';
import { flex } from '../mixins';
import styled from 'styled-components';

const Container = styled.div`
    ${ flex() }
`;

export const Tags = ({ className, children }) => (
    <Container className={ className }>
        { children }
    </Container>
);

Tags.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
}