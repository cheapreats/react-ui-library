import React from 'react';
import { IDropdownProps } from '../Dropdown/Dropdown';
import { IDropdownItemProps } from '../Dropdown/DropdownItem';
import { TextLayoutProps } from '../../Fragments/TextLayout';
export interface HighlightedString {
    /** contents of the string */
    text: string;
    /** whether or not the string has options; if it has options, it will be bolded */
    isSpecial: boolean;
    /** props for text component */
    textProps?: TextLayoutProps;
    /** props for Dropdown */
    listProps?: IDropdownProps;
    /** props for DropdownItems */
    listItemsArgs?: Array<IDropdownItemProps>;
    /** content of DropdownItems */
    listItemsBodies?: Array<JSX.Element>;
    /** in [0, 1]; 0 for newest (opaque), 1 for oldest (most transparent). None for automatic */
    age?: number;
}
export interface HighlightedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    labels: Array<HighlightedString>;
}
/**
 * Paragraph with special strings that can be clicked to reveal a dropdown list of more options
 * @param labels - Array of HighlightedString; These will be displayed in the paragraph.
 * @param props
 * @constructor
 */
export declare const HighlightedText: React.FC<HighlightedTextProps>;
