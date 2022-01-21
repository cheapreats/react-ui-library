import React from 'react';
import styled from 'styled-components';

export interface ITypingDotsProps {
    num: number;
    delayStep: number;
}

export const TypingDots = ({ num, delayStep, ...props }: ITypingDotsProps): React.ReactElement => {

    let dots = [];

    for (let i = 0; i < num; i ++) {
        dots.push(<Dot delay={i * delayStep} />);
    }

    return (
        <DotContainer>
            { dots }
        </DotContainer>
    );
}

const DotContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
`

const Dot = styled.div<{ delay: number }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 10px 5px 10px 5px;
    ${({ theme }): string => `
        background-color: ${theme.colors.border};
    `}
    animation: bounce 0.5s ease-in-out infinite;
    animation-delay: ${p => p.delay}s;

    @keyframes bounce {
        10% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-25%);
        }
        90% {
            transform: translateY(25%);
        }
    }
`

export default TypingDots;
