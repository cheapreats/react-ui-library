import React from 'react';
export interface QuestionMarkProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}
/**
 *
 * returns a component whith a question mark which the user can hover over to
 * reveal a textbook with some text
 * @param {string} title - the text which will be displayed on the textbox
 *
 */
export declare const QuestionMarkHover: React.FC<QuestionMarkProps>;
