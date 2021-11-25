import React from 'react';
import styled from 'styled-components';

export interface QuestionMarkProps
    extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

/**
 *
 * returns a component whith a question mark which the user can hover over to
 * reveal a textbook with some text
 * @param {string} title - the text which will be displayed on the textbox
 *
 */
export const QuestionMarkHover: React.FC<QuestionMarkProps> = ({
    title,
    ...props
}) => (
    <Section {...props}>
        <QuestionMark> ? </QuestionMark>
        <Hover>
            <Rectangle> {title} </Rectangle>
            <Triangle> </Triangle>
        </Hover>
    </Section>
);

const QuestionMark = styled.div`
    font-size: 20px;
    background: rgb(238 36 52);
    color: white;
    width: 25px;
    border-radius: 50%;
    text-align: center;
    margin-top: 10px;
`;

const Rectangle = styled.div`
    display: flex;
    height: 50px;
    width: 225px;
    background: white;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: 15px;
    box-shadow: 0 0 40px -15px rgba(0, 0, 0, 0.5);
`;

const Triangle = styled.div`
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid white;
    margin-top: -1px;
`;

const Hover = styled.div`
    visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    & ${QuestionMark}:hover + ${Hover} {
        visibility: visible;
    }
`;
