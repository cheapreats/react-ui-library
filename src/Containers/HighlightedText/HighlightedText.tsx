import React from 'react';
import styled from 'styled-components';
import { ClickableSmallText, SmallText } from '@Text';
import { JSXElement } from '@babel/types';
import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem, { IDropdownItemProps } from '../Dropdown/DropdownItem';
import { TextLayoutProps } from '../../Fragments/TextLayout';



export interface HighlightedString {
    text: string;
    isSpecial: boolean;
    listItemsArgs?: Array<IDropdownItemProps>;
    listItemsBodies?: Array<JSXElement>;
}

export interface HighlightedTextProps extends TextLayoutProps {
    labels: Array<HighlightedString>;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
    labels,
    ...props
}): React.ReactElement => {

    const GetSpecialText = (label: HighlightedString): React.ReactElement => <ClickableSmallText bold>{`${label.text  } `}</ClickableSmallText>

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