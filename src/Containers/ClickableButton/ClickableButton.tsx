import React from 'react';
import styled from 'styled-components';


export interface ClickableButtonProps extends React.HTMLAttributes<HTMLDivElement>{
    buttontext: string;
};

export const ClickableButton: React.FC<ClickableButtonProps> = ({
    buttontext,
    onClick,
    ...props
}): React.ReactElement => <ClickableButtonBox {...props}>{
    <p>{buttontext}</p>
}</ClickableButtonBox>;

const ClickableButtonBox = styled.div`
    ${({theme, ...props}):string => `
        text-align: center;
        line-height: 30px;
        width: 100px;
        height: 35px;
        font-family: ${theme.font.family};
        border-radius:${theme.dimensions.radius};
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
    `}
`

//to-do create states and chage based on user interaction