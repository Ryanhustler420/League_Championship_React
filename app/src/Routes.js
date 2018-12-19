import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home';
import SignIn from './Components/signin/index';
import DashBoard from './Components/admin/Dashboard';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign_in" exact component={SignIn}/>
        <Route path="/dashboard" exact component={DashBoard}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
