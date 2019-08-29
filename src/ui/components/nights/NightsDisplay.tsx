import * as React from 'react';
import {
  Button,
  Card, Fab,
  Grid, Typography,
} from '@material-ui/core';
import styles from 'ui/components/nights/NightsDisplay.module.css';
import { Night } from 'services/adminService';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AttendeeCard } from 'ui/components/attendees/AttendeeCard';
import { capitalize } from '@material-ui/core/utils';


interface IProps {
  nights: Night[];
  onEdit(nightId: number): () => void;
  onCreate(): void;
  onDelete(nightId: number): () => void;
}

export class NightsDisplay extends React.Component<IProps> {

  createNightGrid = (night: Night) => {
    let repeatText = '';
    if (night.repeat === 'WEEKLY') {
      repeatText = 'Every week on';
    } else if (night.repeat === 'BIWEEKLY') {
      repeatText = 'Every other week on';
    }
    const timeDisplay = night.repeat !== 'NEVER' && (<Grid item={true}>
      <Typography variant={'subtitle1'}>
        {repeatText} {capitalize(night.dayOfWeek.toLowerCase())} at {night.hour % 12}:{night.minute}{night.hour > 12 ? 'pm' : 'am'}
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
              <Grid container={true}>
                <Grid item={true} className={styles.fab}>
                  <Fab color="primary" size={'small'} aria-label="edit"
                       onClick={this.props.onEdit(night.id)}>
                    <EditIcon/>
                  </Fab>
                </Grid>
                <Grid item={true} className={styles.fab}>
                  <Fab color="secondary" size={'small'} aria-label="edit"
                       onClick={this.props.onDelete(night.id)}>
                    <DeleteIcon/>
                  </Fab>
                </Grid>
              </Grid>
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
          {this.props.nights.sort((a, b)=>a.name > b.name ? 1 : -1).map(this.createNightGrid)}
        </Grid>
        <Grid item={true} className={styles.createButtonGrid}>
          <Button onClick={this.props.onCreate} variant={'outlined'} color={'secondary'}
                  className={styles.createButton}>
            Create Night
          </Button>
        </Grid>
      </Grid>
    )
  }
}
