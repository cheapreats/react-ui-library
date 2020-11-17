import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TableRowProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    labels: string []
};

export const TableRow: React.FC<TableRowProps> = ({
    labels,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <Tr>
                <td>
                    {Object.values(labels).map(label => (
                        <Text> 
                            {label} 
                        </Text>
                    ))}
                </td>
            </Tr>
        </Wrapper>
    );
}

const Wrapper = styled.div``;

interface TableProps {
    isPreview?: boolean
}
const Tr = styled.tr<TableProps>`
    width: 330px;
    text-align: left;
`;
const Text = styled.div<TableProps>`
    display: inline-block;
    padding: 5px 27px;
    line-height: 1.45;
`;