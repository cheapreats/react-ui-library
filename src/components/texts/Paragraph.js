import React from 'react';
import styled from 'styled-components';
import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';

const Text = styled(TextLayout)`color: #464646`;
export const Paragraph = props => <Text { ...props }/>;
Paragraph.propTypes = TextLayoutProps;
