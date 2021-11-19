import React, { Children, isValidElement } from 'react';
import { CollapsibleAccordionItem } from './CollapsibleAccordionItem';

export const CollapsibleAccordion: React.FC = ({
    /* Child elements */
    children,
    ...props
}): React.ReactElement => {
    /* Convert children to array */
    const childrenArr = Children.toArray(children);
    return (
        <div {...props}>
            {childrenArr.map(
                (section: React.ReactNode): React.ReactElement | null => {
                    if (isValidElement(section)) {
                        return (
                            <CollapsibleAccordionItem
                                header={section.props['data-header']}
                                purchaseDate={section.props['data-purchaseDate']}
                                purchaseCount={section.props['data-purchaseCount']}
                            >
                                {section.props.children}
                            </CollapsibleAccordionItem>
                        );
                    }
                    return null;
                },
            )}
        </div>
    );
};
