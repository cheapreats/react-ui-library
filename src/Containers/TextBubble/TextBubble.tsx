import React from 'react';
import styled from 'styled-components';
import { Robot, User } from '@styled-icons/fa-solid/';

export interface ITextBubbleProps {
    content: React.ReactElement;
    fromBot: boolean;
    icon: React.ReactElement;
    iconSize: number;
    iconStyle: React.HTMLAttrs;
    bubbleStyle: React.HTMLAttrs;
}

export const TextBubble = ({content, fromBot, icon, iconSize, iconStyle, bubbleStyle, ...props}: ITextBubbleProps): React.ReactElement => {
    if (!icon)
        icon = fromBot ? Robot : User;

    if (!iconSize)
        iconSize = 25;

    return (
        <BubbleContainer>
            { fromBot &&
                <StyledImg as={ icon } imgSize={ iconSize } style={ iconStyle } />
            }

            <Bubble fromBot={ fromBot } style={ bubbleStyle }>
                { content }
            </Bubble>

            { !fromBot &&
                <StyledImg as={ icon } imgSize={ iconSize } style={ iconStyle } />
            }
        </BubbleContainer>
    );
}

const StyledImg = styled.svg<{ imgSize: number }>`
    ${({ imgSize }) => `
        width: ${imgSize}px;
        height: ${imgSize}px;
    `}
    margin: 0 10px;
    border-radius: 999px;
    border-style: solid;
    padding: 10px;
`

const BubbleContainer = styled.div`
    display: inline-block;
`

const Bubble = styled.div<{ fromBot: boolean }>`
    display: inline-block;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    padding: 0 10px;

    ${({ theme, fromBot }): string =>
        fromBot
            ? `
            border-radius: 20px 20px 20px 5px;
            background-color: ${theme.colors["background"]};
            `
            : `
            border-radius: 20px 20px 5px 20px;
            background-color: ${theme.colors["primary"]};
            `
    }

    animation: appear 0.5s ease-in 1;
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 100;
        }
    }
`;

export default TextBubble;
