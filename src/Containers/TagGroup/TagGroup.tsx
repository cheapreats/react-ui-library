import React from 'react';
import styled from 'styled-components';
import { Tag, TagProps } from '../Tag/Tag';

const LEFT_MOST_TAG = 0;
const SINGLE_TAG = 1;
const FONT_HEIGHT_MOD = 0.8;
const BOTH_SIDES = 2;
const PADDING_BUFFER = 3;
export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /* [{text: value, icon: value}, {text: value, icon: value}] */
    tags: Array<TagProps>;
};
type positionType = 'left' | 'middle' | 'right';
interface TagPositionProps extends TagProps {
    /* Leftmost, rightmost, or middle tag */
    position?: positionType;
}

export const TagGroup: React.FC<TagGroupProps> = ({
    tags,
    ...props
}): React.ReactElement => {
    /**
     * Displays the array of tags
     * @param tagComponents {Array}
     */
    const displayTags = (tagComponents: Array<TagProps>) => {
        if (tagComponents.length === SINGLE_TAG) {
            return <Tag {...tagComponents[0]} />
        }
        return tags.map((tag, index) => {
            const tagPieceProps = {...tag, position: 'middle' as positionType};
            if (index === LEFT_MOST_TAG ){
                tagPieceProps.position = 'left';
            } 
            if (index === tagComponents.length - 1) {
                tagPieceProps.position = 'right';
            }
            return <TagPiece {...tagPieceProps} />
        })
    };

    return (
        <Container {...props}>
            <SubContainer>
                {displayTags(tags)}
            </SubContainer>
        </Container>
    );
}

const Container = styled.div`
    ${({theme}) => `
        height: calc((${theme.dimensions.tag.fontSize} / ${FONT_HEIGHT_MOD}) + (${theme.dimensions.tag.padding.toString().split(" ")[0]} * ${BOTH_SIDES}) + ${PADDING_BUFFER}px);
    ` }
    overflow: hidden;
`;

const SubContainer = styled.div`
    white-space: nowrap;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
    mask-image: linear-gradient(to left, transparent 0, black 30px, black calc(100% - 30px), transparent 100%);
`;

const TagPiece = styled(Tag)<TagPositionProps>`
    border-radius: ${({position}) => {
        if (position === 'left') {return '999px 0px 0px 999px'}
        if (position === 'right') {return '0px 999px 999px 0px'}
        if (position === 'middle') {return '0px'}
        return ''
    }};
`;
