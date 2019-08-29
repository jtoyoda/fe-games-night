import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from 'ui/components/PrivateRoute';
import { LoginDeterminer } from 'ui/containers/login/LoginDeterminerContainer';
import { Login } from 'ui/containers/login/LoginContainer';
import { Register } from 'ui/containers/register/RegisterContainer';
import * as React from 'react';
import styles from 'App.module.css';
import { UserDashboard } from 'ui/containers/dashboard/UserDashboardContainer';
import { AdminRoute } from 'ui/components/AdminRoute';
import { AdminEvent, AdminNight, AdminGamer } from 'ui/containers/admin/routing';


const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Router>
        <div style ={{ 'height': '100%', 'width': 'auto' }}>
          <Route exact path="/" component={LoginDeterminer} />
          <Route exact path="/login" component={Login} />
          <AdminRoute exact path="/admin/events" component={AdminEvent} />
          <AdminRoute exact path="/admin/nights" component={AdminNight} />
          <AdminRoute exact path="/admin/gamers" component={AdminGamer} />
          <PrivateRoute exact path="/dashboard" component={UserDashboard} />
          <Route exact path="/signup" component={Register} />
        </div>
      </Router>
    </div>
  )
}

export default App;
