import React from 'react';
export interface IProfile {
    image: string;
    initials: string;
    id: number;
}
export interface IFeaturedProfilesCardProps {
    profileData: IProfile[];
}
export declare const FeaturedProfilesCard: React.FC<IFeaturedProfilesCardProps>;
