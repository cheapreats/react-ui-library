import React, { Children, isValidElement } from 'react';
import { AccordionItem } from './AccordionItem';

const defaultActiveStyle = (): string => `
    color: #ee2434;
    font-weight: bold;
`;

export interface AccordionProps {
    activeStyle: Function;
}

export const Accordion: React.FC<AccordionProps> = ({
    activeStyle = defaultActiveStyle,
    children,
    ...props
}): React.ReactElement => {
    const childrenArr = Children.toArray(children);
    return (
        <div {...props}>
            {childrenArr.map(
                (section: React.ReactNode): React.ReactElement | null => {
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
                },
            )}
        </div>
    );
};
