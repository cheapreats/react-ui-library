
import React from 'react';
import styled from 'styled-components';
import { MainTheme } from '@Themes';
import { ClickableSmallText } from '@Text';
import { HighlightedString } from './HighlightedText';

/**
 * construct the element for a special text
 * @param label - HighlightedString of the special text
 */

interface SpecialTextComponentProps {
    label: HighlightedString;
    toggleFunc?: (target:boolean) => void;
    bold?: boolean;
    opacity?: number;
}

const SpecialTextComponent: React.FC<SpecialTextComponentProps> = ({
    label,
    opacity,
    bold,
    ...props
}): React.ReactElement => {
    // const [onClick, setOnClick] = useState(true);
    // const handleOnClick = () => {
    //     setOnClick(!onClick);
    // }
    
    return <StyledClickableSmallText style={{opacity}} bold={bold} {...label.textProps}>{`${label.text  } `}</StyledClickableSmallText>
}

const StyledClickableSmallText = styled(ClickableSmallText)`
    color: ${({bold}) => bold ? MainTheme.colors.statusColors.orange : MainTheme.colors.text}
`;

export default SpecialTextComponent;