import * as React from 'react';
import {
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { GameEvent, GamerAttending } from 'services/eventService'
import styles from 'ui/components/EventGrid.module.css';
import moment from 'moment';
import { authenticationService } from 'services/authenticationService';

interface IProps {
  event: GameEvent,
  game: string,
  handleAttendingChange(isAttending: boolean): void,
  handleGameChange(game: string): void,
  handleGameChangeSubmit(): void,
  loading: boolean,
}

export class EventGrid extends React.Component<IProps> {

  handleAttendingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleAttendingChange(event.target.checked);
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

  getOthers = (attendees: GamerAttending[]) => {
    const email = authenticationService.currentUserValue === null ? '' : authenticationService.currentUserValue.email
    return attendees.filter((gamer) =>
      gamer.email !== email,
    );
  }

  getOthersAttending = (attendees: GamerAttending[]) => {
    return this.getOthers(attendees).filter((gamer) =>
      gamer.attending,
    );
  }

  getOthersNotAttending = (attendees: GamerAttending[]) => {
    return this.getOthers(attendees).filter((gamer) =>
      !gamer.attending,
    );
  }

  createAttendee = (attendee: GamerAttending) => {
    return (
      <div key={`${attendee.name}-${attendee.email}`}>
        <Typography variant={'body1'} className={styles.withMargin}>
          {attendee.name} ({attendee.email})
        </Typography>
      </div>
    )
  }

  render() {
    const me = this.getMe(this.props.event.attendees);
    const othersAttending = this.getOthersAttending(this.props.event.attendees);
    const othersNotAttending = this.getOthersNotAttending(this.props.event.attendees);
    const gameComponent = this.props.event.picker.id !== me.id ? (
      <Typography variant={'subtitle1'}>
        {
          (this.props.event.game && `${this.props.event.picker.name} selected ${this.props.event.game}`)
          || `No game has been chosen yet by ${this.props.event.picker.name}`
        }
      </Typography>
    ) : (
      <Grid container={true} alignItems={'center'}>
        <Grid item={true}>
          <Typography>
            You are the Sommelier. Your pick is
          </Typography>
        </Grid>
        <Grid item={true}>
          <TextField
            variant="outlined"
            label="Game Choice"
            margin="dense"
            InputProps={{
              classes: {
                root: styles.textField,
              },
            }}
            value={this.props.game || ''}
            onChange={this.handleGameChange}
          />
        </Grid>
        <Grid item={true}>
          <Button
            variant="contained"
            color="primary"
            className={styles.loginButton}
            disabled={this.props.event.game === this.props.game}
            onClick={this.props.handleGameChangeSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item={true}>
          {this.props.loading && <CircularProgress size={24} color={'secondary'} className={styles.buttonProgress} />}
        </Grid>
      </Grid>
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
                  <FormControlLabel
                    control={
                      <Switch checked={me.attending} onChange={this.handleAttendingChange}
                              value="checkedA"/>
                    }
                    label="Attending"
                  />
                </Grid>
                <Grid item={true}>
                  {this.props.loading && <CircularProgress size={30} color={'secondary'} className={styles.buttonProgressAttending} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            {gameComponent}
          </Grid>
          <Grid container={true} direction={'row'} justify={'space-between'} alignItems={'center'}>
            <Grid item={true} xs={6}>
              <Typography variant={'h6'}>
                Who's Attending
              </Typography>
              {othersAttending && othersAttending.map(this.createAttendee)}
              {othersAttending.length === 0 &&
              <Typography variant={'body1'}>No one else is currently attending</Typography>}
            </Grid>
            <Grid item={true} xs={6}>
              <Typography variant={'h6'}>
                Who's Not Attending
              </Typography>
              {othersNotAttending && othersNotAttending.map(this.createAttendee)}
              {othersNotAttending.length === 0 &&
              <Typography variant={'body1'}>Everyone is coming!</Typography>}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    )
  }
}