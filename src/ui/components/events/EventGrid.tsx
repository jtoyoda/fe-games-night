import * as React from 'react';
import {
  Button,
  Card,
  CircularProgress, Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { GameEvent, GamerAttending } from 'services/eventService'
import styles from 'ui/components/events/EventGrid.module.css';
import moment from 'moment';
import { authenticationService } from 'services/authenticationService';
import { AttendeeCard } from 'ui/components/attendees/AttendeeCard';

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


  render() {
    const me = this.getMe(this.props.event.attendees);
    const othersAttending = this.getOthersAttending(this.props.event.attendees);
    const othersNotAttending = this.getOthersNotAttending(this.props.event.attendees);
    const gameComponent = this.props.event.picker.id !== me.id ? (
      <Typography variant={'subtitle1'} className={styles.gameComponent}>
        {
          (this.props.event.game && `${this.props.event.picker.name} is the Sommelier. Their pick is ${this.props.event.game}`)
          || `${this.props.event.picker.name} is the Sommelier. They have not picked a game yet`
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
            disabled={this.props.event.game === this.props.game || this.props.loading}
            onClick={this.props.handleGameChangeSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item={true}>
          {this.props.loading &&
          <CircularProgress size={24} color={'secondary'} className={styles.buttonProgress}/>}
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
                              value="checkedA" disabled={this.props.loading}/>
                    }
                    label="Attending"
                  />
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
          <Grid container={true} direction={'row'} justify={'space-between'} alignItems={'center'}>
            <Grid item={true} xs={6}>
              <AttendeeCard
                attendees={othersAttending}
                title={"Who's Attending"}
                emptyText={'No one else is currently attending'}
              />
            </Grid>
            <Grid item={true} xs={6}>
              <AttendeeCard
                attendees={othersNotAttending}
                title={"Who's Not Attending"}
                emptyText={'No one is currently not attending'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    )
  }
}
