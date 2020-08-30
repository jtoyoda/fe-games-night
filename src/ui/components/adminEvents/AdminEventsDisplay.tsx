import * as React from 'react';
import {
  Button,
  Card, Divider, Fab, Grid, Typography,
} from '@material-ui/core';
import styles from 'ui/components/adminEvents/AdminEventsDisplay.module.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { GameEvent } from 'services/eventService';
import moment from 'moment';
import { GameDisplay } from 'ui/components/gamePick/GameDisplay';
import { EditableAttendeeLists } from 'ui/components/adminEvents/EditableAttendeeLists';


interface IProps {
  events: GameEvent[];

  onEditAttendee(eventId: number, attendeeId: number, isAttending: boolean): void;

  onEdit(id: number): () => void;

  onCreate(): void;

  onDelete(id: number): () => void;
}

export class AdminEventsDisplay extends React.Component<IProps> {
  onEditAttendee = (eventId: number) => (attendeeId: number, isAttending: boolean) => {
    this.props.onEditAttendee(eventId, attendeeId, isAttending)
  }

  createEventGrid = (event: GameEvent) => {
    return (
      <Card className={styles.eventCard} key={`event-${event.id}`}>
        <Grid container={true} direction={'column'}>
          <Grid container={true} justify={'space-between'}>
            <Grid item={true}>
              <Typography variant={'subtitle1'}>
                {moment(event.date).format('MMM Do h:mmA')}
              </Typography>
              <Typography variant={'h5'}>
                {event.name}
              </Typography>
            </Grid>
            <Grid item={true}>
              <Grid container={true}>
                <Grid item={true} className={styles.fab}>
                  <Fab color="primary" size={'small'} aria-label="edit"
                       onClick={this.props.onEdit(event.id)}>
                    <EditIcon/>
                  </Fab>
                </Grid>
                <Grid item={true} className={styles.fab}>
                  <Fab color="secondary" size={'small'} aria-label="edit"
                       onClick={this.props.onDelete(event.id)}>
                    <DeleteIcon/>
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            <GameDisplay event={event}/>
          </Grid>
          <Divider className={styles.divider}/>
          <EditableAttendeeLists attendees={event.attendees} onEdit={this.onEditAttendee(event.id)}/>
        </Grid>
      </Card>
    )
  }

  render() {
    return (
      <Grid container={true} className={styles.root} direction={'column'} justify={'flex-start'}>
        <Grid item={true}>
          {this.props.events.sort((a, b) => a.date > b.date ? 1 : -1).map(this.createEventGrid)}
        </Grid>
        <Grid item={true} className={styles.createButtonGrid}>
          <Button onClick={this.props.onCreate} variant={'outlined'} color={'secondary'}
                  className={styles.createButton}>
            Create Special Event
          </Button>
        </Grid>
      </Grid>
    )
  }
}
