import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { auth } from './firebase/firebase';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {

  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          {user ? (
            <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Switch>
                <Route path="/" exact={true}>
                  <Redirect to="/dashboard" />
                </Route>
                <Route path="/dashboard" exact={true}>
                  <Dashboard />
                </Route>
                <Route path="/profile" exact={true}>
                  <Profile />
                </Route>
                <Route path="*" exact={true}>
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </IonRouterOutlet>
          </IonSplitPane>
          ) : (
            <IonRouterOutlet>
              <Switch>
                <Route path="/login" exact={true}>
                  <Login />
                </Route>
                <Route path="/register" exact={true}>
                  <Register />
                </Route>
                <Route path="/" exact={true}>
                  <Redirect to="/login" />
                </Route>
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </IonRouterOutlet>
          )}
        </IonReactRouter>
      </IonApp>     
    </AuthProvider>

  );
};

export default App;
