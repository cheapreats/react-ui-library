import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface IFeaturedProfileProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLLIElement> {
    background: string;
    key: number;
    image?: string;
    initials?: string;
    remainingProfiles?: number;
    icon?: boolean;
    width?: number;
    height?: number;
    alt?: string;
}
export declare const FeaturedProfile: React.FC<IFeaturedProfileProps>;
