import React from 'react';
import { Template } from './Template';
import { ITemplatePrefill } from './DraggableRowTypes';

export interface DraggableRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /*Template of a draggable element that can be reordered*/
    templatePrefills: ITemplatePrefill[];
    draggable?: boolean;
}

export const DraggableRow: React.FC<DraggableRowProps> = ({
    templatePrefills,
    draggable = true,
    ...props
}): React.ReactElement => {

    return (
        <div {...props}>
            <Template
                templatePrefills={templatePrefills}
                draggable={draggable}
            />
        </div>
    );
};
