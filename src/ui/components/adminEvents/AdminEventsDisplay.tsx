import * as React from 'react';
import {
  Button,
  Card, Divider, Fab, Grid, Typography,
} from '@material-ui/core';
import styles from 'ui/components/adminEvents/AdminEventsDisplay.module.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AttendeeCard } from 'ui/components/attendees/AttendeeCard';
import { GameEvent, GamerAttending } from 'services/eventService';
import moment from 'moment';


interface IProps {
  events: GameEvent[];

  onEdit(id: number): () => void;

  onCreate(): void;

  onDelete(id: number): () => void;
}

export class AdminEventsDisplay extends React.Component<IProps> {


  getAttending = (attendees: GamerAttending[]) => {
    return attendees.filter((gamer) =>
      gamer.attending,
    );
  }

  getNotAttending = (attendees: GamerAttending[]) => {
    return attendees.filter((gamer) =>
      !gamer.attending,
    );
  }

  createEventGrid = (event: GameEvent) => {
    const othersAttending = this.getAttending(event.attendees);
    const othersNotAttending = this.getNotAttending(event.attendees);
    const gameComponent = (
      <div>
        {
          event.game && <Grid container={true}>
            <Typography variant={'subtitle1'} className={styles.gameComponent}>
              {`${event.picker.name} is the Sommelier. Their pick is:`}&nbsp;
            </Typography>
            <Typography variant={'subtitle1'} className={styles.gameComponent} color={'secondary'}>
              {event.game}
            </Typography>
          </Grid>
        }
        {
          event.game === null &&
          <Typography variant={'subtitle1'} className={styles.gameComponent}>
            {`${event.picker.name} is the Sommelier. They have not picked a game yet`}
          </Typography>
        }
      </div>
    );
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

  render() {
    return (
      <Grid container={true} className={styles.root} direction={'column'}>
        <Grid item={true}>
          {this.props.events.map(this.createEventGrid)}
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
