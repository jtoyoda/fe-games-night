import * as React from 'react';
import {
  Button,
  Card,
  CircularProgress, Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { GameEvent, GamerAttending } from 'services/eventService'
import styles from 'ui/components/events/EventGrid.module.css';
import moment from 'moment';
import { authenticationService } from 'services/authenticationService';
import { GameDisplay } from 'ui/components/gamePick/GameDisplay';
import { UpdatableGameSelectDisplay } from 'ui/components/gamePick/UpdatableGameSelectDisplay';
import { AttendeeLists } from 'ui/components/attendees/AttendeeLists';

interface IProps {
  event: GameEvent,
  game: string,
  loading: boolean,

  handleAttendingChange(isAttending: boolean): void,

  handleGameChange(game: string): void,

  handleGameChangeSubmit(): void,
}

export class EventGrid extends React.Component<IProps> {

  handleAttendingChange = (attending: boolean) => () => {
    this.props.handleAttendingChange(attending);
  }

  handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleGameChange(event.target.value);
  }

  getMe = (attendees: GamerAttending[]) => {
    const email = authenticationService.currentUserValue === null ? '' : authenticationService.currentUserValue.email
    return attendees.find((gamer) =>
      gamer.email === email,
    ) || {
      email: '',
      name: '',
      attending: false,
      id: -1,
    };
  }

  render() {
    const me = this.getMe(this.props.event.attendees);
    const event = this.props.event;
    const gameComponent = this.props.event.picker && this.props.event.picker.id === me.id ?
      (
        <UpdatableGameSelectDisplay
          event={event}
          loading={this.props.loading}
          game={this.props.game}
          handleGameChange={this.handleGameChange}
          handleGameChangeSubmit={this.props.handleGameChangeSubmit}
        />
      ) : (
        <GameDisplay event={event}/>
      );
    return (
      <Card key={`${this.props.event.name}-${this.props.event.date}`} className={styles.card}>
        <Grid container={true} direction={'column'} className={styles.root}>
          <Grid container={true} direction={'row'} justify={'space-between'} alignItems={'center'}>
            <Grid item={true}>
              <Typography variant={'subtitle1'}>
                {moment(this.props.event.date).format('MMM Do h:mmA')}
              </Typography>
              <Typography variant={'h5'}>
                {this.props.event.name}
              </Typography>
            </Grid>
            <Grid item={true}>
              <Grid container={true}>
                <Grid item={true}>
                  <Grid container={true} spacing={1} alignItems={'center'}>
                    <Grid item={true}>
                      <Typography>Attending:</Typography>
                    </Grid>
                    <Grid item={true}>
                      <Button
                        onClick={this.handleAttendingChange(true)}
                        variant={me.attending ? 'contained' : 'outlined'}
                        color={me.attending ? 'primary' : 'default'}
                      >
                        Yes
                      </Button>
                    </Grid>
                    <Grid item={true}>
                      <Button
                        onClick={this.handleAttendingChange(false)}
                        variant={me.attending === false ? 'contained' : 'outlined'}
                        color={me.attending === false ? 'secondary' : 'default'}
                      >
                        No
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item={true}>
                  {this.props.loading && <CircularProgress size={30} color={'secondary'}
                                                           className={styles.buttonProgressAttending}/>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            {gameComponent}
          </Grid>
          <Divider className={styles.divider}/>
          <AttendeeLists attendees={this.props.event.attendees} highlighted={me}/>
        </Grid>
      </Card>
    )
  }
}
