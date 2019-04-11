import styled from 'styled-components';

export const Typography = styled.div`
    background-color: rgba(0,0,0,0.02);
    border-radius: 10px;
    font-weight: bold;
    color: rgba(0,0,0,0.5);
    letter-spacing: 0.4rem;
    word-break: break-all;
    font-size: 1.2rem;
    margin-top: 20px;
    line-height: 1.5;
    padding: 15px;
`;

export const Headings = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    margin: 0 0 0 20px;
    align-items: stretch;
`;

export const HeadingBox = styled.li`
    display: flex;
    padding: 10px;
    margin: 0 15px 15px 0;
    flex-direction: column;
    justify-content: flex-end;

    & p {
        margin-top: -15px;
        font-size: 0.9rem;
    }
`;