import React, {useState} from 'react';
import styled from 'styled-components';
import { ClickableSmallText, SmallText } from '@Text';
import { 
    List,
    ListProps,
} from '../List/List';
import {
    VerticalListItemProps,
    ListItem,
} from '../List/ListItem';



interface RowProps {
    padding?: string;
    width?: number;
}

export interface HighlightedString {
    text: string;
    isSpecial: boolean;
    listArgs?: ListProps;
    listItems?: Array<typeof ListItem>;
    listItemsArgs?: Array<VerticalListItemProps>;
    listItemsBodies?: Array<any>;
    // onClick?: () => void;
}

export interface HighlightedTextProps {
    labels: Array<HighlightedString>;
    display?: string;
    type?: string;
    padding?: string;
    width?: number;
    size?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
    labels,
    display,
    type,
    padding,
    width,
    size,
    children,
    ...props
}): React.ReactElement => {
    const [currSpecialIndex, setSpecialIndex] = useState(-1);

    const StyleSpecial = (label: HighlightedString, index: number): React.ReactElement => {
        // console.log(label)
        if (label.isSpecial){
            return <ClickableSmallText bold
                onClick={() => 
                {
                    if (index === currSpecialIndex){
                        setSpecialIndex(-1)
                    } else {setSpecialIndex(index)}
                }
                }>{`${label.text  } `}</ClickableSmallText>
        } 
        return <SmallText>{`${label.text  } `}</SmallText>
        
    }

    const RenderList = (labelIndex: number): React.ReactElement => {
        const defaultListArgs = {id: 'SpecialTextList'}

        if (labelIndex < 0){
            return <></>
        }

        const label = labels[labelIndex]
        if (!label.isSpecial){
            return <></>
        }
        
        const {listArgs} = label
        const listItemsArgs = label.listItemsArgs || []
        const listItemsBodies = label.listItemsBodies || []

        return (
            <List {...listArgs || defaultListArgs}>
                {listItemsArgs.map((listItemsArg, index) => (
                    <ListItem {...listItemsArg}>
                        <p>{listItemsBodies && listItemsBodies[index]}</p>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <HighlightedRow padding={padding} width={width} {...props}>
            <p>
                {labels.map((label, index) => (
                    StyleSpecial(label, index)
                ))}
            </p>
            {RenderList(currSpecialIndex)}
        </HighlightedRow>
    )
};

const HighlightedRow = styled.div<RowProps>`
    padding: ${(props): string => props.padding || '10px 10px'};
    width: ${(props): number | undefined => props.width}px;
`;
