import React from 'react';
import { Template } from './Template';
import { ITemplatePrefill } from './DraggableRowTypes';

export interface DraggableRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /*Template of a draggable element that can be reordered*/
    templatePrefills: ITemplatePrefill;
}

export const DraggableRow: React.FC<DraggableRowProps> = ({
    templatePrefills,
    ...props
}): React.ReactElement => {

    return (
        <div {...props}>
            <Template
                templatePrefills={templatePrefills}
            />
        </div>
    );
};
