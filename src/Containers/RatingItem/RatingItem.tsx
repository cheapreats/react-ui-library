import React, { useCallback,useMemo } from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { RatingBar as RB } from '../RatingBar/RatingBar';

export interface IRatingItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** a number between 0 and 1 */
    rating?: number;
    barThickness?: number;
    barColor?:string;
    /** a number between 1 and 5 */
    numberOfStars: 1 | 2 | 3 | 4 | 5;
}

export const RatingItem: React.FC<IRatingItemProps> = ({
    rating = 0,
    numberOfStars,
    barThickness,
    barColor,
    ...props
}) => {
    const getEmoticon = useCallback((): string => {
        switch (numberOfStars) {
        case 1:
            return '😢';
        case 2:
            return '😟';
        case 3:
            return '😀';
        case 4:
            return '😄';
        case 5:
            return '🤩';
        default:
            return '?';
        }
    }, [numberOfStars]);

    const innerRating=useMemo(()=>{
        if(rating>1)return 1;
        if(rating<0) return 0;
        return rating;
    },[rating]);

    const getBarColorProp=useCallback(():object=>{
        if(barColor)return {color:barColor};
        return {};
    },[barColor]);

    return (
        <RatingItemBox {...props}>
            <Emoticon>{getEmoticon()}</Emoticon>
            <RatingBar rating={rating} thickness={barThickness} {...getBarColorProp()} />
            <Label>{innerRating * 100}%</Label>
        </RatingItemBox>
    );
};

const RatingItemBox = styled.div`
    ${flex('center')}
`;

const Label = styled.div`
    font-weight: 700;
    font-size:${({theme})=>theme.font.size.small};
    opacity:0.7;
`;

const RatingBar = styled(RB)`
    margin: 0 10px;
`;

const Emoticon=styled.div`
font-weight:700;
font-size:${({theme})=>theme.font.size.h2};
`