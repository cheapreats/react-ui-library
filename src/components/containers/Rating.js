import React from 'react';
import styled from 'styled-components';
import { Star } from 'styled-icons/fa-solid';
import { flex } from '../mixins';

const Container = styled.span`
    ${ flex('row', 'center') }
    ${ ({ margin }) => margin ? `margin: ${ margin };` : '' }
    ${ ({ size }) => `
        height: ${ size }px;
        width: ${ size }px;
    ` }

    font-size: 0.79rem;
    font-weight: bold;
    padding: 4px;
    background-color: rgba(237, 36, 42, 0.12);
    border-radius: 50%;
    color: ${ ({ theme }) => theme.colors.primary };
`;

const Icon = styled.svg`
    margin: 1px 0 0 1px;
    height: auto;
`;

export const Rating = ({ rating, icon, ...props }) => {
    return (
        <Container { ...props }>
            { rating }
            <Icon as={ icon } size={ props.size }/>
        </Container>
    );
};

Rating.defaultProps = {
    margin: 0,
    size: 18,
    icon: Star
}

