import React from "react";
import { StyledIcon } from "styled-icons/types";
import { UserCircle } from '@styled-icons/fa-solid/UserCircle';
import { SignOutAlt } from '@styled-icons/fa-solid/SignOutAlt';
import { SettingsCard, DisplayItem } from "..";
import {Button} from '../../Inputs';

export interface IAccountSettingsCard {
    usernameLabel: string,
    username: string,
    roleLabel: string,
    role: string,
    accountIdLabel: string,
    accountId: string,
    iconHeader: StyledIcon,
    header: string,
    onLogoutClick: () => void,
    iconLogoutButton: StyledIcon,
    logoutLabel: string
}

export const AccountSettingsCard: React.FC<IAccountSettingsCard> = ({
    iconHeader = UserCircle,
    header = 'Account Information',
    usernameLabel = 'Username',
    username,
    roleLabel = 'Role',
    role,
    accountIdLabel = 'Account Id',
    accountId,
    iconLogoutButton =  SignOutAlt,
    onLogoutClick,
    logoutLabel = 'Logout',
    ...props
}) => (
    <SettingsCard heading={header} icon={iconHeader} {...props}>
        <DisplayItem
            label={usernameLabel}
            value={username}
        />
        <DisplayItem
            label={roleLabel}
            value={role}
        />
        <DisplayItem
            label={accountIdLabel}
            value={accountId}
            margin="2px 0 auto"
        />
        <Button
            margin="20px 0 0"
            onClick={onLogoutClick}
            icon={iconLogoutButton}
            data-cy="signOutButton"
        >
            {logoutLabel}
        </Button>
    </SettingsCard>
)