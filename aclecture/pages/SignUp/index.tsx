import React from 'react';

const SignUp = () => {
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
            </Form>
        </div>
    ); 
};

export default SignUp;