import React from 'react';
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
    visitCount: string;
    profileName: string;
    lastVisitedDate: string;
    onCallClick: () => void;
    profileImage: string;
    customerLoyaltyType: string;
    isFavoriteStore: boolean;
}
export declare const ProfileCard: React.FC<ProfileCardProps>;
