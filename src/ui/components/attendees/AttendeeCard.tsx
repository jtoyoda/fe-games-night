import { Gamer } from 'services/eventService';
import { Card, Divider, Typography } from '@material-ui/core';
import styles from 'ui/components/attendees/AttendeeCard.module.css';
import * as React from 'react';
import { AttendeeList } from 'ui/components/attendees/AttendeeList';

interface IProps {
  attendees: Gamer[];
  title: string;
  emptyText: string;
  highlighted?: Gamer;
}

export class AttendeeCard extends React.Component<IProps> {
  render() {
    return (
      <Card className={styles.withMargin}>
        <Typography variant={'h6'} className={styles.withMargin}>
          {this.props.title}
        </Typography>
        <Divider/>
        {
          this.props.attendees &&
          <AttendeeList
            attendees={this.props.attendees}
            highlighted={this.props.highlighted}
          />
        }
        {
          this.props.attendees.length === 0 &&
          <Typography variant={'body1'} className={styles.withMargin}>
            {this.props.emptyText}
          </Typography>
        }
      </Card>
    )
  }
}
