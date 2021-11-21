import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface CouponProps extends CouponBoxProps {
    couponTitle: string;
    couponDescription: string;
    couponSubdescription: string;
}
export declare const Coupon: React.FC<CouponProps>;
interface CouponBoxProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    color: string;
}
export default Coupon;
