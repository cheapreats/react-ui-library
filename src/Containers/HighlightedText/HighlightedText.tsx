import React, {useState} from 'react';
import styled from 'styled-components';
import { ClickableSmallText, SmallText } from '@Text';
import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem, { IDropdownItemProps } from '../Dropdown/DropdownItem';
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
}

// extends line div
export interface HighlightedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    labels: Array<HighlightedString>;
}

export interface HeaderDivProps {
    isActive: boolean;
}

/**
 * Paragraph with special strings that can be clicked to reveal a dropdown list of more options
 * @param labels - Array of HighlightedString; These will be displayed in the paragraph.
 * @param props
 * @constructor
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
    labels,
    ...props
}): React.ReactElement => {
    const [selectedText, setSelectedText] = useState(-1);

    /**
     * construct the element for a special text
     * @param label - HighlightedString of the special text
     */
    const getSpecialTextComponent = (label: HighlightedString): React.ReactElement => {
        const [textColor, setTextColor] = useState('black');
        const handleChangeTextColor = () => {
            setTextColor(textColor === 'black' ? 'orange' : 'black');
        }

        return <ClickableSmallText bold onClick={handleChangeTextColor} color={textColor} {...label.textProps}>{`${label.text  } `}</ClickableSmallText>
    }

    /**
     * construct the dropdown or text for a HighlightedString
     * @param label - HighlightedString of the text
     */
    const getTextComponent = (label: HighlightedString, index: number): React.ReactElement => {
        
        if (label.isSpecial){
            const toggleSelectedText = (isTargetTrue: boolean): void => {
                if (isTargetTrue) {
                    setSelectedText(index);
                } else {
                    setSelectedText(-1);
                }
            }

            const listItemsArgs: Array<IDropdownItemProps> = label.listItemsArgs || []
            const listItemsBodies: Array<JSX.Element> = label.listItemsBodies || []
            const DropDownProps: IDropdownProps = {
                dropdownButton: getSpecialTextComponent(label),
                startState: selectedText === index,
                toggleFunc: toggleSelectedText,
            }
            return <Dropdown {...DropDownProps} {...label.listProps}>
                {listItemsBodies.map((_, index) => (
                    <DropdownItem {...listItemsArgs[index]}>
                        {listItemsBodies[index]}
                    </DropdownItem>
                ))}
            </Dropdown>
        } 
        return <SmallText {...label.textProps}>{`${label.text  } `}</SmallText>
    }

    /**
     * construct elements from labels
     */
    const renderText = (): React.ReactElement => (
        <p>
            {labels.map((label, index) => (
                getTextComponent(label, index)
            ))}
        </p>
    )

    return (
        <HighlightedRow {...props}>
            {renderText()}
        </HighlightedRow>
    )
};


const HighlightedRow = styled.div``;
