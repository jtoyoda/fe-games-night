import * as React from 'react';
import {
  Button,
  Card, Fab,
  Grid, Typography,
} from '@material-ui/core';
import styles from 'ui/components/groups/GroupsDisplay.module.css';
import { Group } from 'services/adminService';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AttendeeCard } from 'ui/components/attendees/AttendeeCard';
import { capitalize } from '@material-ui/core/utils';


interface IProps {
  groups: Group[];
  onEdit(groupId: number): () => void;
  onCreate(): void;
  onDelete(groupId: number): () => void;
}

export class GroupsDisplay extends React.Component<IProps> {

  createGroupGrid = (group: Group) => {
    let repeatText = '';
    if (group.repeat === 'WEEKLY') {
      repeatText = 'Every week on';
    } else if (group.repeat === 'BIWEEKLY') {
      repeatText = 'Every other week on';
    }
    const minuteDisplay = group.minute < 10 ? `0${group.minute}` : group.minute
    const timeDisplay = group.repeat !== 'NEVER' && (<Grid item={true}>
      <Typography variant={'subtitle1'}>
        {repeatText} {capitalize(group.dayOfWeek.toLowerCase())} at {group.hour % 12}:{minuteDisplay}{group.hour > 12 ? 'pm' : 'am'}
      </Typography>
    </Grid>);

    return (
      <Card className={styles.groupCard} key={`group-${group.id}`}>
        <Grid container={true} direction={'column'}>
          <Grid container={true} justify={'space-between'}>
            <Grid item={true}>
              <Typography variant={'h6'}>
                {group.name}
              </Typography>
            </Grid>
            <Grid item={true}>
              <Grid container={true}>
                <Grid item={true} className={styles.fab}>
                  <Fab color="primary" size={'small'} aria-label="edit"
                       onClick={this.props.onEdit(group.id)}>
                    <EditIcon/>
                  </Fab>
                </Grid>
                <Grid item={true} className={styles.fab}>
                  <Fab color="secondary" size={'small'} aria-label="edit"
                       onClick={this.props.onDelete(group.id)}>
                    <DeleteIcon/>
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {timeDisplay}
          <Grid item={true}>
            <AttendeeCard
              attendees={group.attendees}
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
          {this.props.groups.sort((a, b)=>a.name > b.name ? 1 : -1).map(this.createGroupGrid)}
        </Grid>
        <Grid item={true} className={styles.createButtonGrid}>
          <Button onClick={this.props.onCreate} variant={'outlined'} color={'secondary'}
                  className={styles.createButton}>
            Create Group
          </Button>
        </Grid>
      </Grid>
    )
  }
}
