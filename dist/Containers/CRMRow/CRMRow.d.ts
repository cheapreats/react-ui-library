import React from 'react';
import { CustomerProfileProps } from '../CustomerProfile/CustomerProfile';
import { CreatedDateProps } from '../CreatedDate/CreatedDate';
import { TagGroupProps } from '../TagGroup/TagGroup';
export interface CRMRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    dateCreated: CreatedDateProps;
    customerProfile: CustomerProfileProps;
    tags: TagGroupProps;
}
export declare const CRMRow: React.FC<CRMRowProps>;
