
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
    text: String;
    toggleFunc?: (target:boolean) => void;
    isHighlighted?: boolean;
    opacity?: number;
}

const SpecialTextComponent: React.FC<SpecialTextComponentProps> = ({
    label,
    text,
    isHighlighted,
    ...props
}): React.ReactElement => {
    // const [onClick, setOnClick] = useState(true);
    // const handleOnClick = () => {
    //     setOnClick(!onClick);
    // }
    
    return <StyledClickableSmallText isHighlighted={isHighlighted || false} {...label.textProps} {...props}>{`${text  } `}</StyledClickableSmallText>
}

const StyledClickableSmallText = styled(ClickableSmallText)<{ isHighlighted: boolean }>`
    color: ${({isHighlighted}) => isHighlighted ? MainTheme.colors.statusColors.orange : MainTheme.colors.text}
`;

export default SpecialTextComponent;