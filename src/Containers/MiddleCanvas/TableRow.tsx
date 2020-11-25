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
                    {labels.map(label => (
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

const Tr = styled.tr`
    text-align: left;
`;
const Text = styled.div`
    display: inline-block;
    padding: 5px 27px;
`;