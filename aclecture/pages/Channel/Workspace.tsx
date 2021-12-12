import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router';

//VFC는 children을 사용하지 않는 컴포넌트
const Workspace: FC = ({children}) => {
    const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher, { dedupingInterval: 100000})
    const onLogout = useCallback( () => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials: true,
        })
        .then( () => {
            mutate(false);
        })
    }, []);

    if (!data) {
        return <Redirect to='/login' />;
    }
    return (
        <div>
            <button onClick={onLogout}>Logout</button>
            {children}
        </div>
    )
}

export default Workspace;