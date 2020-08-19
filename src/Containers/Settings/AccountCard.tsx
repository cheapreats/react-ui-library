import React from 'react';
import styled from 'styled-components';
import { SignOutAlt } from '@styled-icons/fa-solid/SignOutAlt';
import { UserCircle } from '@styled-icons/fa-solid/UserCircle';
import { BaseStyles } from '../../Utils';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Paragraph, SmallText } from '../../Text';
import { SettingsCard } from '../SettingsCard';
import { Button } from '../../Inputs/Button';

interface DisplayItemProps extends MainInterface, ResponsiveInterface {
    label: string;
    value: string;
}
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
}): React.ReactElement => {
    return (
        <SettingsCard heading={accountInfo} icon={UserCircle}>
            <DisplayItem label={userName} value={employee.username} />
            <DisplayItem
                label={role}
                value={
                    employee.role.charAt(0).toUpperCase() +
                    employee.role.slice(1)
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
};
const DisplayItem: React.FC<DisplayItemProps> = ({
    label,
    value,
    ...props
}): React.ReactElement => (
    <Item {...props}>
        <SmallText lineHeight="1" size="0.9rem" bold>
            {label}
        </SmallText>
        <Text color="grey" bold>
            {value}
        </Text>
    </Item>
);

const Item = styled.div`
    ${(props): string => BaseStyles.Main({ margin: '2px 0', ...props })}
`;

const Text = styled(Paragraph)`
    overflow-wrap: break-word;
`;
