import React  from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// import LogIn from '@pages/LogIn';
// import SignUp from '@pages/SignUp';

const LogIn = loadable( () => import('@pages/LogIn'));
const SignUp = loadable( () => import('@pages/SignUp'));

//workspace까지만 라우팅하고 workspace에서 다시 라우팅(nested routing)
// const Channel = loadable( () => import('@pages/Channel'));
// const DirectMessage = loadable( () => import('@pages/DirectMessage'));
const Workspace = loadable( () => import('@layouts/Workspace'));

const App = () => {
    // return <div> Plase, Wait!!! </div>;
    return <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={LogIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/workspace" component={Workspace} />
        {/* <Route path="/workspace/channel" component={Channel} />
        <Route path="/worksapce/dm" component={DirectMessage} /> */}
    </Switch>

};
export default App;