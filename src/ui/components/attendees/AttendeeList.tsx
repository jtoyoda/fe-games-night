import { Typography } from '@material-ui/core';
import styles from 'ui/components/attendees/AttendeeCard.module.css';
import * as React from 'react';
import { Gamer } from 'services/adminService';

interface IProps {
  attendees: Gamer[]
  highlighted?: Gamer
}

export class AttendeeList extends React.Component<IProps> {
  createAttendee = (attendee: Gamer) => {
    return (
      <div key={`${attendee.name}-${attendee.email}`}>
        <Typography variant={'body1'} className={styles.withMargin}>
          {
            this.props.highlighted && attendee.id === this.props.highlighted.id ?
              <strong>{attendee.name} ({attendee.email})</strong> :
              `${attendee.name} (${attendee.email})`
          }
        </Typography>
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
