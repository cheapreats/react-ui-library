import styled from 'styled-components';
import { PRIMARY_FONT } from '../../components/variables';

export const Page = styled.main`
    font-family: ${ PRIMARY_FONT };
    max-width: 800px;
    padding-left: 20px;
`;

export const Section = styled.div`
    padding-bottom: 40px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
`;