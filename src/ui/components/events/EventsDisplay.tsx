import * as React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { GameEvent, IGame } from 'services/eventService'
import styles from 'ui/components/events/EventsDisplay.module.css';
import { EventGrid } from 'ui/components/events/EventGrid';
import moment from 'moment';

interface IProps {
  events: GameEvent[],
  gameMap: { [key: number]: IGame },

  handleAttendingChange(eventId: number, isAttending?: boolean, message?: string): void,

  handleGameChange(eventId: number, game: string, id?: number): void,

  handleGameChangeSubmit(eventId: number): void,

  loadingMap: { [key: number]: boolean },
}

export class EventsDisplay extends React.Component<IProps> {

  handleAttendingChange = (eventId: number) => (isAttending?: boolean, message?: string) => {
    this.props.handleAttendingChange(eventId, isAttending, message);
  }

  handleGameChange = (eventId: number) => (value: string) => {
    this.props.handleGameChange(eventId, value);
  }

  handleGameChangeSubmit = (eventId: number) => () => {
    this.props.handleGameChangeSubmit(eventId);
  }

  handleGameSelect = (eventId: number) => (value: string, id: number) => {
    this.props.handleGameChange(eventId, value, id)
  }

  createEventGrid = (event: GameEvent) => {
    return (
      <EventGrid
        key={`${event.name}-${event.date}`}
        event={event}
        game={this.props.gameMap[event.id]}
        handleAttendingChange={this.handleAttendingChange(event.id)}
        handleGameChange={this.handleGameChange(event.id)}
        handleGameSelect={this.handleGameSelect(event.id)}
        handleGameChangeSubmit={this.handleGameChangeSubmit(event.id)}
        loading={this.props.loadingMap[event.id]}
      />
    )
  }

  render() {
    return (
      <Grid className={styles.root} container={true}>
        {this.props.events.length === 0 && <Typography>You have no upcoming events</Typography>}
        {this.props.events.sort((eventa, eventb) => {
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
