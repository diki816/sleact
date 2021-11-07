import React, { useCallback, useState } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header } from './styles'
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const onChangeEmail = useCallback( (e) => {
        setEmail(e.target.value);
    }, []);
    const onChangeNickname = useCallback( (e) => {
        setNickname(e.target.value);
    }, []);
    const onChangePassword = useCallback( (e) => {
        setPassword(e.target.value);
    }, []);
    const onChangePasswordCheck = useCallback( (e) => {
        setPasswordCheck(e.target.value);
    }, []);
    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        
        console.log(email, nickname, password, passwordCheck)
    }, [email, nickname, password, passwordCheck ]);
    
    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id='email-label'>
                    <span>Email Adress</span>
                    <div>
                        <Input type='email' id='email' name='email' value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span>Nickname</span>
                    <div>
                        <Input type='text' id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>password</span>
                    <div>
                        <Input type='password' id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                </Label>
                <Label id="password-check-label">
                    <span>password check</span>
                    <div>
                        <Input type='password' id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} />
                    </div>
                </Label>
                <Button type='submit'>회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요? &nbsp; <a href="/login">로그인 하러가기</a>
            </LinkContainer>
        </div>
    ); 
};

export default SignUp;