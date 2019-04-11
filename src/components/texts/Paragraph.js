import React from 'react';
import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';

export const Paragraph = props => <TextLayout { ...props }/>;
Paragraph.propTypes = TextLayoutProps;
