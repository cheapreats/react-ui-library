import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DraggableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    
};

export const DraggableElement: React.FC<DraggableElementProps> = ({
    children,
    ...props
}) => {
    return (
        <div>
            { children }
        </div>
    );
};