import React, {useState} from 'react';
import styled from 'styled-components';

export interface ClickableButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    buttontext: string;
    isclicked: boolean;
};

export const ClickableButton: React.FC<ClickableButtonProps> = ({
    buttontext, //the text that is displayed on the button.
    isclicked, //is true when the button is clicked, which changes the button colors
    ...props
}): React.ReactElement => {
    const [clicked, setClicked] = useState(false);
    return( 
        <ClickableButtonBox buttontext={buttontext} isclicked={clicked} onMouseDown={() => setClicked(true)} onMouseUp={() => setClicked(false)} {...props}>
            {buttontext}
        </ClickableButtonBox> 
    );
};

const ClickableButtonBox = styled.button<ClickableButtonProps>`
    ${({theme, isclicked}):string => `
        border: 0;
        text-align: center;
        line-height: 0px;
        width: 100px;
        height: 35px;
        overflow: hidden;
        font-family: ${theme.font.family};
        border-radius:${theme.dimensions.radius};
        background-color: ${isclicked ? theme.colors.clickedBackground : theme.colors.background}};
        color: ${isclicked ? theme.colors.clickedText : theme.colors.text};
        &:hover{
            background-color: ${isclicked ? theme.colors.clickedBackground : theme.colors.hoverColor};
        }
    `}
`;

export default ClickableButton;