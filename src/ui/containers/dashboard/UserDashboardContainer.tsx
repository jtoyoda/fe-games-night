import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import styles from 'ui/containers/dashboard/UserDashboardContainer.module.css';
import { eventService, GameEvent } from 'services/eventService';
import { EventDisplay } from 'ui/components/EventDisplay';


interface IProps extends RouteComponentProps {}
interface IState {events: GameEvent[]}
class UserDashboardContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      events: []
    }
    this.reload()
  }

  logout = () => {
    authenticationService.logout();
    this.props.history.push('/login');
  }

  reload = () => {
    eventService.loadEvents().then((events: GameEvent[]) => {console.log(events); this.setState({events});});

  }

  handleAttendingChange = (isAttending: boolean) => {
    this.reload();
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const user = authenticationService.currentUserValue;
    const email = (user && user.email) || '';
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={styles.title}>
              Board Game Schedule
            </Typography>
            <Button color="inherit" onClick={this.logout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <div className={styles.root}>
          <Typography variant={'h4'}>
            Your Upcoming Events
          </Typography>
          <EventDisplay events={this.state.events} handleAttendingChange={this.handleAttendingChange} email={email}/>
        </div>
      </div>
    )
  }
}

export const UserDashboard = withRouter(UserDashboardContainer);
