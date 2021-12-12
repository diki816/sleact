import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, WorkspaceWrapper } from '@layouts/Workspace/styles'
import gravatar from 'gravatar'
import loadable from '@loadable/component';


//VFC는 children을 사용하지 않는 컴포넌트
const Workspace: FC = ({children}) => {
    const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher, { dedupingInterval: 100000})
    const onLogout = useCallback( () => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials: true,
        })
        .then( () => {
            mutate(false, false);
        })
    }, []);

    if (!data) {
        return <Redirect to='/login' />;
    }
    const Channel = loadable(() => import('@pages/Channel'));
    const DirectMessage = loadable(() => import('@pages/DirectMessage'));
    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro'})} alt={data.nickname} />
                    </span>
                </RightMenu>d: 'retro'
            </Header>
            <button onClick={onLogout}>Logout</button>
            <WorkspaceWrapper>
                <Workspace>test</Workspace>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>
                        Menuscroll
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/channel" component={Channel} />
                        <Route path="/workspace/dm" component={DirectMessage} />
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
        </div>
    );
}

export default Workspace;