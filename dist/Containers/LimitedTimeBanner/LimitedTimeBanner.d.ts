import React from 'react';
import { MainInterface } from "../../Utils/BaseStyles";
export interface LimitedTimeBannerProps extends MainInterface {
    minsRemaining: number;
}
export declare const LimitedTimeBanner: React.FC<LimitedTimeBannerProps>;
export default LimitedTimeBanner;
