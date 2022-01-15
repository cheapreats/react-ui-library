import React from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';

export interface ITextBubbleProps {
    content: React.ReactElement;
    fromBot: boolean;
}

export const TextBubble = ({content, fromBot, ...props}: ITextBubbleProps): React.ReactElement => {
    return (
        <BubbleContainer fromBot={ fromBot }>
            <Bubble fromBot={ fromBot }>
                <div style={{
                    marginLeft: textMarginSize,
                    marginRight: textMarginSize,
                    display: "flex",
                    flexDirection: "row"
                }}>
                    { content }
                </div>
            </Bubble>
        </BubbleContainer>
    );
}

const textMarginSize = "10px";

const container_margin = "10px";
const BubbleContainer = styled.div<{ fromBot: boolean }>`
    ${Mixins.flex("row")};
    ${Mixins.flex("center")};
    position: relative;

    maxwidth: "80%";
    width: "fit-content";
    ${({ fromBot }): string =>
        fromBot
            ? `
            justify-content: left;
            margin-left: 0px;
            margin-right: ${container_margin};
            `
            : `
            justify-content: right;
            margin-left: ${container_margin};
            margin-right: 0px;
            `
    }
    marginTop: standardMarginSize;
    margin-top: -20px;
    margin-bottom: 20px;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.withBorder};
    `}

    animation: appear 0.5s ease-in 1;
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 100;
        }
    }
`

const bubble_margin = "50px";
const Bubble = styled.div<{ fromBot: boolean }>`
    ${({ fromBot }): string =>
        fromBot
            ? `
            margin-left: ${bubble_margin};
            margin-right: 0px;
            `
            : `
            margin-left: 0px;
            margin-right: ${bubble_margin};
            `
    }
    border: 1.5px solid rgba(0, 0, 0, 0.1);
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
    margin-bottom: 10px;
`;

export default TextBubble;
