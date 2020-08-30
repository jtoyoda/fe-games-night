import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import styles from 'ui/containers/dashboard/UserDashboardContainer.module.css';
import { eventService, GameEvent, IGame } from 'services/eventService';
import { EventsDisplay } from 'ui/components/events/EventsDisplay';

interface IProps extends RouteComponentProps {
}

interface IState {
  events: GameEvent[]
  gameMap: { [key: number]: IGame }
  loadingMap: { [key: number]: boolean }
}


class UserDashboardContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      events: [],
      gameMap: {},
      loadingMap: {},
    }
    this.reload(true)
  }

  logout = () => {
    authenticationService.logout();
    this.props.history.push('/login');
  }

  reload = (initialLoad?: boolean) => {
    eventService.loadEvents().then((events: GameEvent[]) => {
      if (initialLoad) {
        this.setState({
          events,
          gameMap: events.reduce((accumulator, it) => ({
            ...accumulator,
            [it.id]: {name: it.game, id: it.gameId},
          }), {}),
          loadingMap: events.reduce((accumulator, it) => ({...accumulator, [it.id]: false}), {}),
        });
      } else {
        this.setState({
          events,
        })
      }
    });
  }

  handleAttendingChange = (eventId: number, isAttending?: boolean, message?: string) => {
    const loadingMap = this.state.loadingMap;
    loadingMap[eventId] = true;
    this.setState({
      loadingMap,
    });
    eventService.updateEventAttendance(eventId, isAttending, message).then(this.reload).finally(
      () => {
        loadingMap[eventId] = false;
        this.setState({loadingMap})
      });
  }

  handleGameChange = (eventId: number, name: string, id?: number) => {
    const gameMap = this.state.gameMap;
    gameMap[eventId] = {
      name,
      id,
    };
    this.setState({
      gameMap,
    });
  }

  handleGameChangeSubmit = (eventId: number) => {
    const loadingMap = this.state.loadingMap;
    loadingMap[eventId] = true;
    this.setState({
      loadingMap,
    });
    eventService.updateEventGame(eventId, this.state.gameMap[eventId]).then(this.reload).finally(
      () => {
        loadingMap[eventId] = false;
        this.setState({loadingMap});
      },
    )
  }

  render() {
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container={true} justify={'space-between'} alignItems={'center'}>
              <Grid item={true}>
                <Typography className={styles.title}>
                  Board Game Schedule
                </Typography>
              </Grid>
              <Grid item={true}>
                <Grid container={true} spacing={1} alignItems={'center'}>
                  <Grid item={true}>
                    <Typography>
                      {authenticationService.currentUserValue && authenticationService.currentUserValue.name}
                    </Typography>
                  </Grid>
                  <Grid item={true}>
                    <Button color="inherit" onClick={this.logout}
                            variant={'outlined'}>Logout</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={styles.root}>
          <Typography variant={'h4'}>
            Your Upcoming Events
          </Typography>
          <EventsDisplay
            events={this.state.events}
            handleAttendingChange={this.handleAttendingChange}
            handleGameChange={this.handleGameChange}
            handleGameChangeSubmit={this.handleGameChangeSubmit}
            gameMap={this.state.gameMap}
            loadingMap={this.state.loadingMap}
          />
        </div>
      </div>
    )
  }
}

export const UserDashboard = withRouter(UserDashboardContainer);
