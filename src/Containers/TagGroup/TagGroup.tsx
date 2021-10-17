import React from 'react';
import styled from 'styled-components';
import { Tag, TagProps } from '../Tag/Tag';

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /* [{text: value, icon: value}, {text: value, icon: value}] */
    tags: Array<TagProps>;
};

interface TagPositionProps extends TagProps {
    position?: 'left' | 'right';
}

export const TagGroup: React.FC<TagGroupProps> = ({
    tags,
    ...props
}): React.ReactElement => {
    /**
     * Displays the array of tags
     * @param tagComponents The array of tag elements
     */
    const displayTags = (tagComponents: Array<TagProps>) => {
        if (tagComponents.length === 1) {
            return <Tag {...tagComponents[0]} />
        }
        return tags.map((tag, index) => {
            if (index === 0 ){
                return <TagPiece {...tag} position='left' />
            } 
            if (index === tagComponents.length - 1) {
                return <TagPiece {...tag} position='right' />
            }
            return <TagPiece {...tag} />
        })
        
    };

    return (
        <div {...props}> 
            {displayTags(tags)}
        </div>
    );
}

const TagPiece = styled(Tag)<TagPositionProps>`
    border-radius: ${({position}) => {
        if (position === 'left') {return '999px 0px 0px 999px'}
        if (position === 'right') {return '0px 999px 999px 0px'}
        return '0px'
    }};
`;