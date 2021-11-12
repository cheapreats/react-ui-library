import React from 'react';
import styled from 'styled-components';

export interface ClickableButtonProps extends React.HTMLAttributes<HTMLDivElement>{
    buttontext: string;
};

export const ClickableButton: React.FC<ClickableButtonProps> = ({
    buttontext, //the text that is displayed on the button.
    onClick, //onclick not currently used but would be if the button did anything and would run on press.
    ...props
}): React.ReactElement => <ClickableButtonBox {...props}>{
    <p>
        {buttontext}
    </p>
}</ClickableButtonBox>;

const ClickableButtonBox = styled.div`
    ${({theme, ...props}):string => `
        p{
            text-align: center;
            line-height: 30px;
            width: 100px;
            height: 35px;
            overflow: hidden;
            font-family: ${theme.font.family};
            border-radius:${theme.dimensions.radius};
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
        }
        p:hover{
            background-color: ${theme.colors.chairTableEditBackground};
            color: ${theme.colors.text};
        }
        p:active{
            background-color: ${theme.colors.clickedBackground};
            color: ${theme.colors.clickedText};
        }
    `}
`
export default ClickableButton;

//todo change from css to prop state for hover