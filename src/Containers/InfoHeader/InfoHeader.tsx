import React from 'react';
import styled from 'styled-components';
import {InfoCircleFill} from '@styled-icons/bootstrap/InfoCircleFill';
import {Heading, HeadingProps} from '@Text';

export interface InfoHeaderProps extends HeadingProps {
    /* Text that will be shown */ // More specific 
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

const InfoHeaderStyle = styled(Heading)`
text-align:left;
padding-top: 0px;
`;

const Icon = styled(InfoCircleFill)`
    width: 20px;
    float: center;
    padding: 0 0 12px 15px;
`;

export default InfoHeader;