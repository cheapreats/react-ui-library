import React from 'react';
import PropTypes from 'prop-types';
import { PRIMARY_FONT } from '../variables';
import { flex } from '../mixins';
import styled from 'styled-components';

const Container = styled.div`
    font-family: ${ PRIMARY_FONT };
    font-weight: bold;
    ${ ({ margin }) => `margin: ${ margin };` }
`;

const Head = styled.div`
    margin-bottom: 10px;
`;

const Text = styled.p`
    opacity: 0.7;
    margin: 0;
    font-size: 0.9rem;
`;

const Content = styled.div`
    ${ ({ column }) => column ? flex('column'): flex() }
    & > div {
        margin: 0 10px 10px 0;
    }
`;

export const Checkboxes = ({ className, children, title, description, column, margin = 0 }) => (
    <Container className={ className } margin={ margin }>
        <Head>
            { title ? <label>{ title }</label> : null }
            { description ? <Text>{ description }</Text> : null }
        </Head>
        <Content column={ column }>
            { children }
        </Content>
    </Container>
)

Checkboxes.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    column: PropTypes.bool,
    margin: PropTypes.string
}