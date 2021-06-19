import * as React from 'react';
import {
  Button,
  Card,
  CircularProgress, Divider,
  Grid, TextField,
  Typography,
} from '@material-ui/core';
import { GameEvent, GamerAttending, IGame } from 'services/eventService'
import moment from 'moment';
import { authenticationService } from 'services/authenticationService';
import { GameDisplay } from 'ui/components/gamePick/GameDisplay';
import { UpdatableGameSelectDisplay } from 'ui/components/gamePick/UpdatableGameSelectDisplay';
import { AttendeeLists } from 'ui/components/attendees/AttendeeLists';
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import styles from 'ui/components/events/EventGrid.module.css';
import 'ui/components/events/AddToCalendar.css'
import { EditMessageDialog } from 'ui/components/events/EditMessageDialog';

interface IProps {
  event: GameEvent,
  game: IGame,
  loading: boolean,

  handleAttendingChange(isAttending?: boolean, message?: string): void,

  handleGameChange(game: string): void,

  handleGameSelect(game: string, id?: number): void,

  handleMaxPlayersChange(maxPlayers?: number): void,

  handleMaxPlayersSubmit(): void,

  handleGameChangeSubmit(): void,
}

interface IState {
  editMessageOpen: boolean
}

export class EventGrid extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      editMessageOpen: false
    }
  }

  handleAttendingChange = (attending?: boolean) => () => {
    this.props.handleAttendingChange(attending);
  }

  openMessageDialog = () => {
    this.setState({
      editMessageOpen: true
    })
  }

  handleEditMessageSubmit = (message?: string) => {
    console.log(message)
    message && this.props.handleAttendingChange(undefined, message)
    this.setState({
      editMessageOpen: false
    })
  }

  handleChangeMaxPlayers = (event: React.ChangeEvent<{ value: unknown }>) => {
    const maxPlayers = (event.target.value as number);
    this.props.handleMaxPlayersChange(maxPlayers)
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
    const existingGame = this.props.event.game ? {
      name: this.props.event.game,
      id: this.props.event.gameId,
    } : undefined
    const prompt = 'You are the Sommelier. Your pick is'
    const gameComponent = this.props.event.picker && this.props.event.picker.id === me.id ?
      (
        <UpdatableGameSelectDisplay
          existingGame={existingGame}
          loading={this.props.loading}
          game={this.props.game}
          handleGameChange={this.props.handleGameChange}
          handleGameSelect={this.props.handleGameSelect}
          handleGameChangeSubmit={this.props.handleGameChangeSubmit}
          prompt={prompt}
        />
      ) : (
        <GameDisplay event={event}/>
      );
    const maxPlayersComponent = this.props.event.picker && this.props.event.picker.id === me.id ?
      (
        <Grid container={true} alignItems={'center'} spacing={1}>
          <Grid item={true}>
            <TextField
              id="maxPlayerCount"
              label="Max Players"
              type="number"
              defaultValue={this.props.event.maxPlayers}
              fullWidth
              margin={'dense'}
              onChange={this.handleChangeMaxPlayers}
            />
          </Grid>
          <Grid item={true}>
            <Button
              variant="contained"
              color="primary"
              disabled={this.props.loading}
              onClick={this.props.handleMaxPlayersSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      ) :
      <></>
    const calendarDescription = this.props.game ? `We are playing ${this.props.game.name}` : 'The game has not been chosen yet';
    const dateMoment = moment(this.props.event.date);
    const calendarEvent = {
      title: this.props.event.name,
      description: calendarDescription,
      location: process.env.REACT_APP_ADDRESS,
      startTime: dateMoment.toISOString(true),
      endTime: moment(dateMoment.valueOf()).add(4, 'hour').toISOString(true),
    };
    const eventFull = event.maxPlayers &&
      event.attendees &&
      event.attendees.filter(attendee => attendee.attending).length >= event.maxPlayers
    return (
      <Card key={`${this.props.event.name}-${this.props.event.date}`} className={styles.card}>
        <Grid container={true} direction={'column'} className={styles.root}>
          <Grid container={true} direction={'row'} justify={'space-between'} alignItems={'center'}>
            <Grid item={true}>
              <Typography variant={'subtitle1'}>
                {dateMoment.format('MMM Do h:mmA')}
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
                        disabled={eventFull || false}
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
                    <Grid item={true}>
                      <Button
                        onClick={this.openMessageDialog}
                        variant='outlined'
                        color='default'
                      >
                        {me.message ? 'Edit' : 'Add'} Message
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
            <Grid container={true} direction={'row'} justify={'space-between'}
                  alignItems={'center'}>
              <Grid item={true}>
                {gameComponent}
                {maxPlayersComponent}
              </Grid>
              <Grid item={true} className={styles.addToCalendar}>
                <AddToCalendar event={calendarEvent}/>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={styles.divider}/>
          <AttendeeLists attendees={this.props.event.attendees} highlighted={me} maxPlayers={this.props.event.maxPlayers}/>
        </Grid>
        <EditMessageDialog
          open={this.state.editMessageOpen}
          handleClose={this.handleEditMessageSubmit}
          message={me.message}
        />
      </Card>
    )
  }
}
