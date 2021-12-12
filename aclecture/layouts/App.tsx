import React  from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// import LogIn from '@pages/LogIn';
// import SignUp from '@pages/SignUp';

const LogIn = loadable( () => import('@pages/LogIn'));
const SignUp = loadable( () => import('@pages/SignUp'));
const Channel = loadable( () => import('@pages/Channel'));

const App = () => {
    // return <div> Plase, Wait!!! </div>;
    return <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={LogIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/workspace/channel" component={Channel} />
    </Switch>

};
export default App;