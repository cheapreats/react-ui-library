
import React, {useState} from 'react';
import styled from 'styled-components';
import { MainTheme } from '@Themes';
import { ClickableSmallText } from '@Text';
import { HighlightedString } from './HighlightedText';

/**
 * construct the element for a special text
 * @param label - HighlightedString of the special text
 */
export const getSpecialTextComponent = (label: HighlightedString, opacity: number): React.ReactElement => {
    const [onClick, setOnClick] = useState(false);
    const handleOnClick = () => {
        setOnClick(!onClick);
    }
    
    return <StyledClickableSmallText style={{opacity}} bold={true} onClick={handleOnClick} {...label.textProps}>{`${label.text  } `}</StyledClickableSmallText>
}

const StyledClickableSmallText = styled(ClickableSmallText)`
    color: ${({bold}) => bold ? MainTheme.colors.statusColors.orange : MainTheme.colors.text}
`;