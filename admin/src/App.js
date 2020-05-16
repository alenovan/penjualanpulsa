import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { AuthProvider } from "./views/API/Auth";
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Containers
const Login = React.lazy(() => import('./views/Login/login'));
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

class App extends Component {

  render() {
    return (
      <AuthProvider>
      <HashRouter>
          <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
          </React.Suspense>
        </HashRouter>
      </AuthProvider>
    );
  }
}

export default App;
