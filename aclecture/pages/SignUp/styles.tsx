import styled from '@emotion/styled';

export const Header = styled.header`
    text-align: center;
    font-family: Slack-Larsseit, Hevetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
    font-weight: 700;
    font-szie: 40px;
    line-height: 46px;
    letter-spacing: -0.75px;
    margin-top: 50px;
    margin-bottom: 50px;
`;

export const Form = styled.form`
    margin: 0 auto;
    width: 400px;
    max-width: 400px;
`;

export const Label = styled.label`
    margin-bottom: 16px;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667
    font-weight: 700;
`;

export const Input = styled.input`
    border-radius: 4px;
    --saf-0: rgba(var(--sk__foreground_high_solid, 134, 134,134), 1);
    border: 1px solid var(--saf-0);
    transition: border 80ms ease-out, box-shadow

`;