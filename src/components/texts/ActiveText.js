import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';

const Text = styled(TextLayout)`
    ${ ({ active, opacity }) => active ? '' : `opacity: ${ opacity }` };
`;

export const ActiveText = props => <Text { ...props }/>;

ActiveText.defaultProps = {
    opacity: 0.4
}

ActiveText.propTypes = {
    ...TextLayoutProps,
    type: PropTypes.oneOf(['p', 'span']),
    active: PropTypes.bool,
    opacity: PropTypes.number
};