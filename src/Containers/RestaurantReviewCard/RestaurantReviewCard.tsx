import React from 'react';
import { Card, CardProps } from '../Card/Card';

export interface IRestaurantReviewCardProps extends CardProps {}

export const RestaurantReviewCard: React.FC<IRestaurantReviewCardProps> = ({
    ...props
}) => <Card widthFitContent {...props}>hey</Card>;

