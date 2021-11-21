import React from 'react';
import { ResponsiveInterface, MainInterface } from "../../Utils/BaseStyles";
export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>, ResponsiveInterface, MainInterface {
    loading?: boolean;
    message?: string;
}
export declare const Loading: React.FC<LoadingProps>;
export default Loading;
