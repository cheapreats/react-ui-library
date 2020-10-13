import React from 'react';
import styled from 'styled-components';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { StyledIcon } from '@styled-icons/styled-icon';
import { 
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { getCategoryElements } from './ElementFunctions';
import { DraggableElement } from './DraggableElement';
import { Heading } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface CollapsibleHeaderProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    padding?: string,
    headerSpacingStyle?: string,
    icon?: StyledIcon,
    category: string,
    isCollapsedProp: [boolean[], React.Dispatch<React.SetStateAction<boolean []>>],
    position: number
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

const ISCOLLAPSED_ARR = 0;
const SET_ISCOLLAPSED = 1;

export const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
    padding = '10px 20px',
    headerSpacingStyle = 'space-between',
    icon,
    category,
    isCollapsedProp,
    position,
    ...props
}) => {

    return (
        <Wrapper padding={padding} {...props}>
            <Row display={headerSpacingStyle}>
                <Container>
                    <Icon as={icon} />
                    <Heading bold type='h2' size='1.2rem' padding='0 0 0 5px'> 
                        { category }
                    </Heading>
                </Container>
                <Icon
                    as={AngleDown}
                    isCollapsed={isCollapsedProp[ISCOLLAPSED_ARR][position]}
                    onClick={(): void => {
                        isCollapsedProp[SET_ISCOLLAPSED](isCollapsedProp[ISCOLLAPSED_ARR].map((isCollapsed, idx) => {
                            if(idx === position) return !isCollapsed;
                            return isCollapsed;
                        }))
                    }}
                />
            </Row>
            {!!isCollapsedProp[ISCOLLAPSED_ARR][position] && Object.values(getCategoryElements(category)).map((element, index) => (
                <Draggable
                    key={element.key}
                    draggableId={element.key}
                    index={index}
                >
                    {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                        <>
                            <DraggableElement
                                key={element.key}
                                refObj={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                style={providedDraggable.draggableProps.style}
                                isDragged={snapshotDraggable.isDragging}
                                isRecommended={element.isRecommended}
                                isRequired={element.isRequired}
                            >
                                { element.field }
                            </DraggableElement>
                        </>
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
    height: 25px;
    margin: 5px 12px;
`;