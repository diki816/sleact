import useInput from '@hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useState } from 'react';
import { Header, Form, Label, Input, LinkContainer, Button, Error, Success} from './styles';
import {Link, Redirect} from 'react-router-dom'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {

    const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher, { dedupingInterval: 100000})

    //use custom tag
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    // const [password, onChangePassword] = useInput('');
    // const [email, setEmail] = useState('');
    // const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    // const onChangeEmail = useCallback( (e) => {
    //     setEmail(e.target.value);
    // }, []);
    // const onChangeNickname = useCallback( (e) => {
    //     setNickname(e.target.value);
    // }, []);
    const onChangePassword = useCallback( (e) => {
        setPassword(e.target.value);
        setMismatchError(e.target.value !== passwordCheck);
    }, [passwordCheck]);

    const onChangePasswordCheck = useCallback( (e) => {
        setPasswordCheck(e.target.value);
        setMismatchError(e.target.value !== password);
    }, [password]);

    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        if(!mismatchError && nickname) {
            console.log('Regist Member');
            // axios.post('http://localhost:3095/api/users', {email, nickname, password})
            //webpack.config.ts의 devServer 세팅으로 3095로 감
            setSignUpError('');
            setSignUpSuccess(false);
            axios.post('/api/users', {email, nickname, password})
            .then((response: AxiosResponse<any>) => {
                console.log(response);
                setSignUpSuccess(true);
            })
            .catch((error) => {
                console.log(error.response);
                setSignUpError(error.response.data);
            })
            .finally( () => {});
        }
        //console.log(email, nickname, password, passwordCheck);
    }, [email, nickname, password, passwordCheck]);

    if (data == undefined) {
        return <div> Loading ... ... </div>
    }
    // return은 항상 callback 다음에 위치
    if (data) {
        return <Redirect to="/workspace/channel" />;
    }
    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span> Email Address </span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span> Nickname </span>
                    <div>
                        <Input type="nickname" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span> Password </span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                </Label>
                <Label id="password-check-label">
                    <span> Password Check </span>
                    <div>
                        <Input type="password" id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} />
                    </div>
                    {mismatchError && <Error> Not same </Error>}
                    {!nickname && <Error> Please, enter nickname </Error>}
                    {signUpError && <Error> {signUpError} </Error>}
                    {signUpSuccess && <Success> Success to signup! Please log in </Success >}
                </Label>
                <Button type="submit">Sign Up</Button> 
            </Form>
            <LinkContainer>
                이미 회원이신가요? &nbsp;
                <Link to="/login"> 로그인 하러가기</Link>
            </LinkContainer>
        </div>
    )
}

export default SignUp;