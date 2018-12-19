import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home';
import SignIn from './Components/signin/index';
import DashBoard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';

const Routes = (props) => {

  // console.log(props.user);

  return (
    <Layout>
      <Switch>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn} />
        <PrivateRoutes {...props} path="/dashboard" exact component={DashBoard}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
