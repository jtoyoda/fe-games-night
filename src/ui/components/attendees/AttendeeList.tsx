import { Grid, Typography } from '@material-ui/core';
import styles from 'ui/components/attendees/AttendeeCard.module.css';
import * as React from 'react';
import { Gamer } from 'services/adminService';
import MessageIcon from '@material-ui/icons/Message';
import Tooltip from '@material-ui/core/Tooltip';
import { GamerAttending } from 'services/eventService';

interface IProps {
  attendees: GamerAttending[]
  highlighted?: Gamer
}

export class AttendeeList extends React.Component<IProps> {
  createAttendee = (attendee: GamerAttending) => {
    return (
      <div key={`${attendee.name}-${attendee.email}`}>
        <Grid container={true} direction={'row'} alignItems='center'>
          <Grid item={true}>
            <Typography variant={'body1'} className={styles.withMargin}>
              {
                this.props.highlighted && attendee.id === this.props.highlighted.id ?
                  <strong>{attendee.name} ({attendee.email})</strong> :
                  `${attendee.name} (${attendee.email})`
              }
            </Typography>
          </Grid>
          <Grid item={true}>
            {attendee.message &&
            <Tooltip title={<Typography>{attendee.message}</Typography>} placement='right'>
              <MessageIcon/>
            </Tooltip>
            }
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.attendees.map(this.createAttendee)}
      </div>
    )
  }
}
