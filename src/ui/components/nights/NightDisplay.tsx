import * as React from 'react';
import {
  Button,
  Card, Fab,
  Grid, Typography,
} from '@material-ui/core';
import styles from 'ui/components/nights/NightDisplay.module.css';
import { Night } from 'services/adminService';
import EditIcon from '@material-ui/icons/Edit';
import { AttendeeCard } from 'ui/components/attendees/AttendeeCard';


interface IProps {
  nights: Night[];

  onEdit(nightId: number): () => void;

  onCreateNight(): void;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export class NightDisplay extends React.Component<IProps> {

  createNightGrid = (night: Night) => {
    let repeatText = '';
    if (night.repeat === 'WEEKLY') {
      repeatText = 'Every week on';
    } else if (night.repeat === 'BIWEEKLY') {
      repeatText = 'Every other week on';
    }
    const timeDisplay = night.repeat !== 'NEVER' && (<Grid item={true}>
      <Typography variant={'subtitle1'}>
        {repeatText} {capitalize(night.dayOfWeek)} at {night.hour % 12}:{night.minute}{night.hour > 12 ? 'pm' : 'am'}
      </Typography>
    </Grid>);

    return (
      <Card className={styles.nightCard} key={`night-${night.id}`}>
        <Grid container={true} direction={'column'}>
          <Grid container={true} justify={'space-between'}>
            <Grid item={true}>
              <Typography variant={'h6'}>
                {night.name}
              </Typography>
            </Grid>
            <Grid item={true}>
              <Fab color="secondary" size={'small'} aria-label="edit"
                   onClick={this.props.onEdit(night.id)}>
                <EditIcon/>
              </Fab>
            </Grid>
          </Grid>
          {timeDisplay}
          <Grid item={true}>
            <AttendeeCard
              attendees={night.attendees}
              title={'Members'}
              emptyText={'There are currently no members'}
            />
          </Grid>
        </Grid>
      </Card>
    )
  }

  render() {
    return (
      <Grid container={true} className={styles.root} direction={'column'}>
        <Grid item={true}>
          {this.props.nights.map(this.createNightGrid)}
        </Grid>
        <Grid item={true} className={styles.createButtonGrid}>
          <Button onClick={this.props.onCreateNight} variant={'outlined'} color={'secondary'}
                  className={styles.createButton}>
            Create Night
          </Button>
        </Grid>
      </Grid>
    )
  }
}
