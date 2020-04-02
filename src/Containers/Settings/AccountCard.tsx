import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { BaseStyles } from '@Utils';
import { SignOutAlt } from 'styled-icons/fa-solid/SignOutAlt';
import { UserCircle } from 'styled-icons/fa-solid/UserCircle';
import { Paragraph, SmallText } from '../../Text';
import { SettingsCard } from '../SettingsCard';
import { Button } from '../../Inputs/Button';

interface DisplayItemProps extends MainInterface, ResponsiveInterface {
    label: string;
    value: string;
}
export interface AccountProps extends MainInterface, ResponsiveInterface {
    employee: { username: string; role: string; _id: string };
    logout: Function;
}

export const AccountCard: React.FC<AccountProps> = ({ employee, logout }) => {
    return (
        <SettingsCard heading="Account Information" icon={UserCircle}>
            <DisplayItem label="Username" value={employee.username} />
            <DisplayItem
                label="Role"
                value={
                    employee.role.charAt(0).toUpperCase() +
                    employee.role.slice(1)
                }
            />
            <DisplayItem
                label="Account Id"
                value={employee._id}
                margin="2px 0 auto"
            />
            <Button
                margin="20px 0 0"
                onClick={() => logout()}
                icon={SignOutAlt}
            >
                Logout
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
    ${props => BaseStyles.Main({ margin: '2px 0', ...props })}
`;

const Text = styled(Paragraph)`
    overflow-wrap: break-word;
`;
