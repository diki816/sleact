import React  from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable( () => import('@pages/LogIn'));
const SignUp = loadable( () => import('@pages/SignUp'));

// import LogIn from '@pages/LogIn';
// import SignUp from '@pages/SignUp'; 

const App = () => {
    return ( 
    <Switch>
        <Redirect exact path="/" to="/Login" />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
    </Switch>
    );
}
// const App = () => {
//     return <div> Plase, Wait </div>;
// };

export default App;