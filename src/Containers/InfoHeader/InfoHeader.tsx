import React from 'react';
import styled from 'styled-components';
import {InfoCircleFill} from '@styled-icons/bootstrap/InfoCircleFill';

export interface InfoHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /* Text that will be shown */
    infotext: String;
}

export const InfoHeader: React.FC<InfoHeaderProps>  = ({
    infotext,
    ...props
}): React.ReactElement => (
    <InfoHeaderStyle {...props}>
        {infotext} 
            <Icon />
    </InfoHeaderStyle>
);

const InfoHeaderStyle = styled.header`
text-align:left;
padding-top: 8px;
`;

const Icon = styled(InfoCircleFill)`
    width: 16px;
    float: center;
    padding: 0 0 5px 8px;
`;

export default InfoHeader;