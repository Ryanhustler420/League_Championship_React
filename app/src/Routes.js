import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home';
import SignIn from './Components/signin/index';
import DashBoard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/privateRoutes';

const Routes = (props) => {

  // console.log(props.user);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign_in" exact component={SignIn}/>
        <PrivateRoutes {...props} path="/dashboard" exact component={DashBoard}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
