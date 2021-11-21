import React from 'react';
import { IFeaturedProfileProps } from '../FeaturedProfile/FeaturedProfile';
import { HeaderRowProps } from '../HeaderRow/HeaderRow';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IProfileProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    key: number;
    name: string;
    email: string;
    imageUrl?: string;
    headerRowProps?: HeaderRowProps;
    profileProps?: Omit<IFeaturedProfileProps, 'key' | 'background'>;
}
export declare const Profile: React.FC<IProfileProps>;
