import { Gamer } from 'services/eventService';
import { Typography } from '@material-ui/core';
import styles from 'ui/components/events/EventGrid.module.css';
import * as React from 'react';

interface IProps {
  attendees: Gamer[]
}

export class AttendeeList extends React.Component<IProps> {
  createAttendee = (attendee: Gamer) => {
    return (
      <div key={`${attendee.name}-${attendee.email}`}>
        <Typography variant={'body1'} className={styles.withMargin}>
          {attendee.name} ({attendee.email})
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
