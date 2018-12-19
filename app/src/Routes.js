import React from 'react';
import Layout from './Hoc/Layout';
import {Switch} from 'react-router-dom';
import Home from './Components/home';
import SignIn from './Components/signin/index';
import DashBoard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';
import AdminMatches from './Components/admin/matches/index';
import AddEditMatch from './Components/admin/matches/addEditMatch';
import AdminPlayers from './Components/admin/players/index';

const Routes = (props) => {

  // console.log(props.user);

  return (
    <Layout>
      <Switch>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn} />
        <PrivateRoutes {...props} path="/dashboard" exact component={DashBoard}/>
        <PrivateRoutes {...props} path="/admin_players" exact component={AdminPlayers}/>
        <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches}/>
        <PrivateRoutes {...props} path="/admin_matches/edit_match" exact component={AddEditMatch}/>
        <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
