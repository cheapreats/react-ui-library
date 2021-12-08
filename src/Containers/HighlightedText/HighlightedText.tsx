import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { SmallText } from '@Text';
import SpecialTextComponent from './StyledClickableSmallText';
// import { MainTheme } from '@Themes';
import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem, { IDropdownItemProps } from '../Dropdown/DropdownItem';
import { TextLayoutProps } from '../../Fragments/TextLayout';

const newTextOpacity = 1;
const oldTextOpacity = 0.5;

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
    /** whether the string shows on the right side*/
    isRight?: boolean;
    /** whether the dropdown is open */
    isOpen?: boolean;
}

// extends line div
export interface HighlightedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    labels: Array<HighlightedString>;
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
    const [numEntries, setNumEntries] = useState(0);
    const [_, setNumNewEntries] = useState(0);
    const [refreshHighlights, setRefreshHighlights] = useState(false);
    const [isOpened, setIsOpened] = useState<Array<boolean>>([]);


    useEffect(() => {
        if (labels.length !== numEntries) {
            setNumNewEntries (labels.length - numEntries)
            setNumEntries(labels.length)

            if (labels.length <= numEntries){
                let nextisOpened: Array<boolean> = isOpened.slice()
                nextisOpened.push(true)
                setIsOpened([...nextisOpened])
            }
        }
    })


    

    /**
     * construct the dropdown or text for a HighlightedString
     * @param label - HighlightedString of the text
     */
    const getTextComponent = (label: HighlightedString, index: number): React.ReactElement => {
        let opacity: number;
        if (label.age != null){
            opacity = newTextOpacity - label.age*oldTextOpacity
        } else if (index >= labels.length - 0) {
            opacity = newTextOpacity
        } else {
            opacity = oldTextOpacity
        }
        
        const openFunc = (target: boolean): void => {
            const nextisOpened = isOpened.slice()
            nextisOpened[index] = target
            setIsOpened([...nextisOpened])

            setRefreshHighlights(!refreshHighlights);
        }
        
        if (label.isSpecial){
            const listItemsArgs: Array<IDropdownItemProps> = label.listItemsArgs || []
            const listItemsBodies: Array<JSX.Element> = label.listItemsBodies || []
            const DropDownProps: IDropdownProps = {
                // dropdownButton: getSpecialTextComponent(label, opacity),
                openFunc: openFunc,
                dropdownButton: <SpecialTextComponent bold={isOpened[index]} label={{...label}} opacity={opacity}/>
            }
            return <Dropdown {...DropDownProps} {...label.listProps}>
                {listItemsBodies.map((_, i) => (
                    <DropdownItem {...listItemsArgs[i]}>
                        {listItemsBodies[i]}
                    </DropdownItem>
                ))}
            </Dropdown>
        } 


        return <SmallText style={{opacity}} {...label.textProps}>{`${label.text  } `}</SmallText>
        
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