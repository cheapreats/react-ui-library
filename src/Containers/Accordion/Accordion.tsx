import React, { Children, isValidElement } from 'react';
import { AccordionItem } from './AccordionItem';

const defaultActiveStyle = () => `
    font-color: red;

`;

export interface AccordionProps {
    activeStyle: Function;
}

export const Accordion: React.FC<AccordionProps> = ({
    activeStyle = defaultActiveStyle,
    children,
    ...props
}) => {
    const childrenArr = Children.toArray(children);
    return (
        <div {...props}>
            {childrenArr.map((section: React.ReactNode) => {
                if (isValidElement(section)) {
                    return (
                        <AccordionItem
                            header={section.props.header}
                            activeStyle={activeStyle}
                        >
                            {section.props.children}
                        </AccordionItem>
                    );
                }
                return null;
            })}
        </div>
    );
};
