import { Grid } from '@material-ui/core';
import { AttendeeCard } from 'ui/components/attendees/AttendeeCard';
import * as React from 'react';
import { Gamer, GamerAttending } from 'services/eventService';

interface IProps {
  attendees: Gamer[]
  highlighted?: Gamer
}

export class AttendeeLists extends React.Component<IProps> {
  getAttending = (attendees: GamerAttending[]) => {
    return attendees.filter((gamer) =>
      gamer.attending,
    );
  }

  getNotAttending = (attendees: GamerAttending[]) => {
    return attendees.filter((gamer) =>
      gamer.attending === false,
    );
  }

  getNotResponded = (attendees: GamerAttending[]) => {
    return attendees.filter((gamer) =>
      gamer.attending === null || gamer.attending === undefined,
    );
  }

  render() {
    const attending = this.getAttending(this.props.attendees);
    const notAttending = this.getNotAttending(this.props.attendees);
    const notResponded = this.getNotResponded(this.props.attendees)
    return (
      <Grid container={true} direction={'row'} justify={'space-between'} alignItems={'center'}>
        <Grid item={true} xs={12} sm={6} md={4}>
          <AttendeeCard
            attendees={attending}
            title={"Who's Attending"}
            emptyText={'No one else is currently attending'}
            highlighted={this.props.highlighted}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6} md={4}>
          <AttendeeCard
            attendees={notAttending}
            title={"Who's Not Attending"}
            emptyText={'No one is currently not attending'}
            highlighted={this.props.highlighted}
          />
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <AttendeeCard
            attendees={notResponded}
            title={"Who Hasn't Responded"}
            emptyText={'No one has not responded'}
            highlighted={this.props.highlighted}
          />
        </Grid>
      </Grid>
    )
  }
}