import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { Card as C, CardProps } from '../Card/Card';
import { RatingItem as RI } from '../RatingItem/RatingItem';

export interface IRestaurantReviewCardProps extends CardProps {
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
    title?: string;
    icon?: React.ReactNode;
}

export const RestaurantReviewCard: React.FC<IRestaurantReviewCardProps> = ({
    fiveStars,
    fourStars,
    threeStars,
    twoStars,
    oneStar,
    title = 'Restaurant ratings',
    icon = null,
    ...props
}) => {
    const getRatings = useCallback(() => {
        const votes = fiveStars + fourStars + threeStars + twoStars + oneStar;
        if (votes > 0)
            return [
                fiveStars / votes,
                fourStars / votes,
                threeStars / votes,
                twoStars / votes,
                oneStar / votes,
            ];
        return [0, 0, 0, 0, 0];
    }, [fiveStars, fourStars, threeStars, twoStars, oneStar]);
    const ratingItems = useMemo(
        () =>
            getRatings().map((rating, index) => {
                const stars = 5 - index;
                if (
                    stars === 1 ||
                    stars === 2 ||
                    stars === 3 ||
                    stars === 4 ||
                    stars === 5
                ) {
                    return (
                        <RatingItem rating={rating} stars={stars} key={stars} />
                    );
                }
                return null;
            }),
        [getRatings],
    );

    const restaurantRating = useMemo(
        () =>
            getRatings()
                .reduce((acc, curr, index) => acc + curr * (5 - index), 0)
                .toFixed(2),
        [getRatings],
    );

    return (
        <Card widthFitContent {...props}>
            {icon}
            <RatingLabel>{title}</RatingLabel>
            <RatingBox>{restaurantRating}</RatingBox>
            {ratingItems}
        </Card>
    );
};

const Card = styled(C)`
    min-width: 300px;
`;

const RatingBox = styled.div`
    font-weight: 700;
    font-size: ${({ theme }) => theme.font.size.h1};
    margin: 0 0 20px 0;
`;

const RatingLabel = styled.div`
    font-weight: 700;
    font-size: ${({ theme }) => theme.font.size.h6};
`;

const RatingItem=styled(RI)`
margin:10px 0;
`