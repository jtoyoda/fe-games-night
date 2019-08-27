import * as React from 'react';
import { Card, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import { GameEvent, GamerAttending } from 'services/eventService'
import styles from 'ui/components/EventDisplay.module.css';

interface IProps {
  events: GameEvent[],
  email: string,
  handleAttendingChange(isAttending: boolean): void,
}

export class EventDisplay extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    console.log(props);
  }

  handleAttendingChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.props.handleAttendingChange(checked);
  }

  getMe = (attendees: GamerAttending[]) => {
    return attendees.find((gamer) =>
      gamer.email === this.props.email
    ) || {
      email: '',
      name: '',
      attending: false,
    };
  }

  getOthers = (attendees: GamerAttending[]) => {
    return attendees.filter((gamer) =>
      gamer.email !== this.props.email
    );
  }

  createEventGrid = (gameEvent: GameEvent) => {
    const me = this.getMe(gameEvent.attendees);
    // const others = this.getOthers(gameEvent.attendees);
    return (
      <Card>
         <Typography variant={'h4'}>
           {gameEvent.name}
         </Typography>
        <Grid container={true}>
          <Grid item={true}>
            <Typography variant={'body1'}>
              On {gameEvent.date}
            </Typography>
          </Grid>
          <Grid item={true}>
            <FormControlLabel
              control={
                <Switch checked={me.attending} onChange={this.handleAttendingChange} value="checkedA" />
              }
              label="Attending"
            />
          </Grid>
        </Grid>
      </Card>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {this.props.events.length === 0 && <Typography>You have no upcoming events</Typography>}
        {this.props.events.map(this.createEventGrid)}
      </div>
    )
  }
}
