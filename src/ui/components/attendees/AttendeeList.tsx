import * as React from 'react';
import { Gamer } from 'services/adminService';
import { GamerAttending } from 'services/eventService';
import { Attendee } from 'ui/components/attendees/Attendee';

interface IProps {
  attendees: GamerAttending[]
  highlighted?: Gamer
}

export class AttendeeList extends React.Component<IProps> {
  createAttendee = (attendee: GamerAttending) => {
    return (
      <Attendee attendee={attendee} highlighted={this.props.highlighted && attendee.id === this.props.highlighted.id}/>
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
