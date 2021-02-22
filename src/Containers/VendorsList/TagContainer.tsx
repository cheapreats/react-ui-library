import React from 'react';
import styled from 'styled-components';
import { Tag as T, TagProps } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface ITagContainerProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    tags: string[];
    isHoverable?: boolean;
    tagProps?: Omit<TagProps, 'children'>;
    onRemoveTag?: (index: number) => void;
}

export const TagContainer: React.FC<ITagContainerProps> = ({
    tags,
    isHoverable,
    tagProps,
    onRemoveTag = () => console.log('tag clicked'),
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        {tags.map((tag, index) => (
            <Tag
                key={tag}
                isHoverable={isHoverable}
                {...tagProps}
                onClick={() => onRemoveTag(index)}
            >
                {tag}
            </Tag>
        ))}
    </Wrapper>
);

const Wrapper = styled.div`
    position: relative;
    flex-wrap: wrap;
    ${flex('start')};
`;
const Tag = styled(T)`
    margin: 2px;
`;
