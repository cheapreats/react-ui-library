import React from 'react';
import { SignOutAlt } from '@styled-icons/fa-solid/SignOutAlt';
import { UserCircle } from '@styled-icons/fa-solid/UserCircle';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { SettingsCard } from '../SettingsCard/SettingsCard';
import { DisplayItem } from '../DisplayItem/DisplayItem';
import { Button } from '../../Inputs/Button/Button';

export interface AccountProps
    extends React.HTMLAttributes<HTMLDivElement>,
        MainInterface,
        ResponsiveInterface {
    employee: { username: string; role: string; _id: string };
    logout: (event: React.MouseEvent<HTMLButtonElement>) => void;
    accountInfo: string;
    userName: string;
    accountID: string;
    logoutButton: string;
    role: string;
}

export const AccountCard: React.FC<AccountProps> = ({
    employee,
    logout,
    accountInfo = 'Account Information',
    userName = 'Username',
    accountID = 'Account Id',
    logoutButton = 'Logout',
    role = 'Role',
}): React.ReactElement => (
    <SettingsCard heading={accountInfo} icon={UserCircle}>
        <DisplayItem label={userName} value={employee.username} />
        <DisplayItem
            label={role}
            value={
                employee.role.charAt(0).toUpperCase() + employee.role.slice(1)
            }
        />
        <DisplayItem
            label={accountID}
            value={employee._id}
            margin="2px 0 auto"
        />
        <Button margin="20px 0 0" onClick={logout} icon={SignOutAlt}>
            {logoutButton}
        </Button>
    </SettingsCard>
);
