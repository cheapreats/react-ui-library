import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface AccountProps extends React.HTMLAttributes<HTMLDivElement>, MainInterface, ResponsiveInterface {
    employee: {
        username: string;
        role: string;
        _id: string;
    };
    logout: (event: React.MouseEvent<HTMLButtonElement>) => void;
    accountInfo: string;
    userName: string;
    accountID: string;
    logoutButton: string;
    role: string;
}
export declare const AccountCard: React.FC<AccountProps>;
