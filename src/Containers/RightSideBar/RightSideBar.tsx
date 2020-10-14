import React  from 'react';
import { CheckList } from './Checklist'
import { ModifierTools } from './ModifierTools'

export interface RightSideBarProps {
    onCheckList: true,
}

export const RightSideBar: React.FC<RightSideBarProps> = ({
    onCheckList
}): React.ReactElement => {
    return(
        <>
            <CheckList
                title='Checklist'
                CRATitle='Canada Revenue Agency'
                ReqTitle='Required Information'
                RecTitle='Recommended Information'
                ReqInfoArr={}
            />
            <ModifierTools
                title='Edit Layout'
                standard='Standard View'
                alternative='Alternative View'
                isChosen={true}
            />
        </>
    );
};


// NAME_OF_BUSINESS = {
//     label: 'Name of Business',
//     value: false
// },
// BUSINESS_ADDRESS: {
//     label: 'Business Address',
//     value: false
// },
// CONTACT_INFORMATION: {
//     label: 'Contact Information',
//     value: false
// },
// DATE_WHEN_SALES_TOOK_PLACE: {
//     label: 'Date when sales took place',
//     value: false
// },
// TIME_WHEN_SALES_TOOK_PLACE: {
//     label: 'Time when sales took place',
//     value: false
// },
// RANG_UP_THE_SALE: {
//     label: 'Sales associate who rang up the sale',
//     value: false
// },
// PRICE_FOR_PRODUCT_OR_SERVICE: {
//     label: 'Price for each product or service',
//     value: false
// },
// SALES_TAX_RATE: {
//     label: 'Sales tax rate(%)',
//     value: false
// },
// AMOUNT_TAX: {
//     label: 'Amount tax',
//     value: false
// },
// TOTAL_SALE_PRICE: {
//     label: 'Total price of sale',
//     value: false
// },
// TOTAL_SALE_PRICE_TAX: {
//     label: 'Total price when tax included',
//     value: false
// },
// QUANTITY_OF_PRODUCT_OR_SERVICE: {
//     label: 'Quantity of each product or service',
//     value: false
// },
// NAME_OF_UPC: {
//     label: 'Name of UPC of each product or service',
//     value: false
// },
// STATION_NUM_OF_REGISTER: {
//     label: 'Station # of register where sale was transacted',
//     value: false
// },
 //     recInfoArr: {
                //         ORDER_TRANSACTION: {
                //             label: 'Order Transaction #',
                //             value: false
                //         },
                //         BUSINESS_LOGO: {
                //             label: 'Business Logo',
                //             value: false
                //         },
                //         DINE_IN_OUT: {
                //             label: 'Dine in/Dine out',
                //             value: false
                //         },
                //         PAYMENT_METHOD: {
                //             label: 'Payment Method',
                //             value: false
                //         },
                //         QR_CODE: {
                //             label: 'QR Code',
                //             value: false
                //         },
                //         PROMOTIONS: {
                //             label: 'Promotions',
                //             value: false
                //         },
                //         COUPONS: {
                //             label: 'Coupons',
                //             value: false
                //         },
                //     }