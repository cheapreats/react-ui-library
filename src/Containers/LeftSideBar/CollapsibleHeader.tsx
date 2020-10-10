import React, { useState } from 'react';
import styled from 'styled-components';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { StyledIcon } from '@styled-icons/styled-icon';
import { 
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { ReceiptElements, IDraggableComponent } from './ReceiptElements';
import { DraggableElement } from './DraggableElement';
import { Heading } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface CollapsibleHeaderProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    padding?: string,
    headerSpacingStyle?: string,
    icon?: StyledIcon,
    category: string
};

interface WrapperProps {
    padding?: string;
};

interface RowProps {
    display?: string;
};

interface IconProps {
    isCollapsed?: boolean;
};

export const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
    padding = '10px 20px',
    headerSpacingStyle = 'space-between',
    icon,
    category,
    ...props
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    /**
     * Filters draggable components based on editor category name given 
     * @param {string} categoryName - Name of editor Category
     * @returns {IDraggableComponent}
     */
    const getCategoryElements = (categoryName: string): IDraggableComponent => {
        const matchedCategory = Object.values(ReceiptElements).find(el => el.editorCategory === categoryName);
        return matchedCategory.draggableComponents;
    };
      
    return (
        <Wrapper padding={padding} {...props}>
            <Row display={headerSpacingStyle}>
                <Container>
                    <Icon
                        as={icon}
                    />
                    <Heading bold type='h2' size='1.1rem' padding='0 0 0 5px'> 
                        { category }
                    </Heading>
                </Container>
                <Icon
                    as={AngleDown}
                    isCollapsed={isCollapsed}
                    onClick={(): void => setIsCollapsed(!isCollapsed)}
                />
            </Row>
            {isCollapsed && Object.values(getCategoryElements(category)).map((element, index) => (
                <Draggable
                    key={element.key}
                    draggableId={element.key}
                    index={index}
                >
                    {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                        <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            style={getElementStyle(
                                providedDraggable.draggableProps.style,
                                snapshotDraggable.isDragging
                            )}
                        >
                            { element.field }
                        </div>
                    )}
                </Draggable>
            ))}
        </Wrapper>
    )
};

const Wrapper = styled.div<WrapperProps>`
    ${({ padding }): string => `
        padding: ${padding};
    `};
`;
const Row = styled.div<RowProps>`
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
`;
const Container = styled.div`
    ${Mixins.flex('row')};
`;
const Icon = styled.svg<IconProps>`
    ${Mixins.transition(['transform'])}
    transform: rotate(${({ isCollapsed }): string => (isCollapsed ? '180deg' : '0')});
    height: 22px;
    margin: 5px 12px;
`;
const getElementStyle = (draggableStyle: any, isDragging: boolean):{} => ({
    userSelect: 'none',
    padding: '20px',
    margin: '10px',
    background: isDragging ? 'lightgray' : 'white',
    ...draggableStyle
});