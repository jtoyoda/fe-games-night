import * as React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { GameEvent } from 'services/eventService'
import styles from 'ui/components/events/EventsDisplay.module.css';
import { EventGrid } from 'ui/components/events/EventGrid';
import moment from 'moment';

interface IProps {
  events: GameEvent[],
  gameMap: {[key: number]: string},
  handleAttendingChange(eventId: number, isAttending: boolean): void,
  handleGameChange(eventId: number, game: string): void,
  handleGameChangeSubmit(eventId: number): void,
  loadingMap: {[key: number]: boolean},
}

export class EventsDisplay extends React.Component<IProps> {

  handleAttendingChange = (eventId: number) => (checked: boolean) => {
    this.props.handleAttendingChange(eventId, checked);
  }

  handleGameChange = (eventId: number) => (value: string) => {
    this.props.handleGameChange(eventId, value);
  }

  handleGameChangeSubmit = (eventId: number) => () => {
    this.props.handleGameChangeSubmit(eventId);
  }

  createEventGrid = (event: GameEvent) => {
    return (
      <EventGrid
        key={`${event.name}-${event.date}`}
        event={event}
        game={this.props.gameMap[event.id]}
        handleAttendingChange={this.handleAttendingChange(event.id)}
        handleGameChange={this.handleGameChange(event.id)}
        handleGameChangeSubmit={this.handleGameChangeSubmit(event.id)}
        loading={this.props.loadingMap[event.id]}
      />
    )
  }

  render() {
    return (
      <Grid className={styles.root} container={true}>
        {this.props.events.length === 0 && <Typography>You have no upcoming events</Typography>}
        {this.props.events.sort((eventa, eventb) =>{
          const momentA = moment(eventa.date);
          const momentB = moment(eventb.date);
          if (momentA > momentB) {
            return 1
          } else if (momentB > momentA) {
            return -1
          } else {
            if (eventa.id > eventb.id) {
              return 1
            } else {
              return -1
            }
          }
        }).map(this.createEventGrid)}
      </Grid>
    )
  }
}
