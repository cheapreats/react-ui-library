import React from 'react';
import styled from 'styled-components';
import { ClickableSmallText, SmallText } from '@Text';
import { JSXElement } from '@babel/types';
import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem, { IDropdownItemProps } from '../Dropdown/DropdownItem';
import { TextLayoutProps } from '../../Fragments/TextLayout';


export interface HighlightedString {
    /** Text: contents of the string */
    text: string;
    /** IsSpecial: whether or not the string has options; if it has options, it will be bolded */
    isSpecial: boolean;
    /** ItemProps: props for a dropdownItem representing an option */
    listItemsArgs?: Array<IDropdownItemProps>;
    /** ItemBodies: contents of a dropdownItem representing an option */
    listItemsBodies?: Array<JSXElement>;
}

export interface HighlightedTextProps extends TextLayoutProps {
    labels: Array<HighlightedString>;
}

/**
 * A paragraph with special strings that can be clicked to reveal a dropdown list of more options
 * @param labels - An array of HighlightedString; These will be displayed in the paragraph.
 * @param props
 * @constructor
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
    labels,
    ...props
}): React.ReactElement => {

    /**
     * construct the element for a special text
     * @param label - HighlightedString of the special text
     */
    const GetSpecialText = (label: HighlightedString): React.ReactElement => <ClickableSmallText bold>{`${label.text  } `}</ClickableSmallText>

    /**
     * construct the dropdown or text for a HighlightedString
     * @param label - HighlightedString of the text
     */
    const StyleSpecial = (label: HighlightedString): React.ReactElement => {
        if (label.isSpecial){
            const listItemsArgs: Array<IDropdownItemProps> = label.listItemsArgs || []
            const listItemsBodies: Array<JSXElement> = label.listItemsBodies || []
            const DropDownProps: IDropdownProps = {
                dropdownButton: GetSpecialText(label),
            }
            return <Dropdown {...DropDownProps}>
                {listItemsArgs.map((listItemsArg, index) => (
                    <DropdownItem {...listItemsArg}>
                        {listItemsBodies && listItemsBodies[index]}
                    </DropdownItem>
                ))}
            </Dropdown>
        } 
        return <SmallText>{`${label.text  } `}</SmallText>
    }

    /**
     * construct the elements from labels
     */
    const RenderText = (): React.ReactElement => (
        <p>
            {labels.map((label) => (
                StyleSpecial(label)
            ))}
        </p>
    )

    return (
        <HighlightedRow {...props}>
            {RenderText()}
        </HighlightedRow>
    )
};


const HighlightedRow = styled.div``;