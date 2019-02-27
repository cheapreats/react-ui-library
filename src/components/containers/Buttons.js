import React from 'react';
import PropTypes from 'prop-types';
import ContainerLayout from '../_helpers/ContainerLayout';

export const Buttons = ({ className, children, column, spacing }) => (
    <ContainerLayout
        className={ className }
        column={ column }
        spacing={ spacing }
    >
        { children }
    </ContainerLayout>
);

Buttons.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

