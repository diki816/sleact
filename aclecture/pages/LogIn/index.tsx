import React, { useState, useCallback } from 'react';
import useInput from '@hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import {Header, Form, Label, Input, LinkContainer, Button, Error } from '@pages/SignUp/styles'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
    const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher, { 
        dedupingInterval: 100000}) //dedupingInterval : cache 유지시간, 재요청은 유지시간이 지나면 자동
    const [logInError, setLogInError] = useState(false);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmit = useCallback( (e) => {
            e.preventDefault();
            setLogInError(false);
            axios.post(
                '/api/users/login',
                {email, password},
                {withCredentials: true},
            )
            .then((response: AxiosResponse<any>) => {
                mutate(response.data, true); // true: OPTIMISTIC UI, false: 서버에 요청자체를 안함, default: 서버에 다녀와야 반영
            })
            .catch((error) => {
                setLogInError(error.respon?.data?.statusCode === 401);
            });
        }, [email, password],
    );

    // console.log(error, userData);
    if (data) {
        return <Redirect to='/workspace/channel' />;
    }
    // if(!error && userData) {
    //     console.log('logined', userData);
    //     return <Redirect to="/workspace/sleact/channel/일반" />;
    // }

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>Email Adress</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>Passwword</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                    {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다. </Error>}
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요? &nbsp; 
                <Link to="/signUp">Let's sign up</Link>
            </LinkContainer>
        </div>
    )
}

export default LogIn; 