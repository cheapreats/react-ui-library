import React, { Children, isValidElement } from 'react';
import { AccordionItem } from './AccordionItem';

const defaultHoveredStyle = () => `
    background-color: grey;
`;

const defaultActiveStyle = () => `
    background-color: red;
`;

export interface AccordionProps {
    hoveredStyle: Function;
    activeStyle: Function;
}

export const Accordion: React.FC<AccordionProps> = ({
    hoveredStyle = defaultHoveredStyle,
    activeStyle = defaultActiveStyle,
    children,
    ...props
}) => {
    const childrenArr = Children.toArray(children);
    console.log(childrenArr);
    return (
        <div {...props}>
            {childrenArr.map((section: React.ReactNode) => {
                if (section && isValidElement(section)) {
                    return (
                        <AccordionItem
                            headerType={section.props.headerType}
                            header={section.props.header}
                            mainText={section.props.mainText}
                            hoveredStyle={hoveredStyle}
                            activeStyle={activeStyle}
                        >
                            {children}
                        </AccordionItem>
                    );
                }
                return null;
            })}
        </div>
    );
};
