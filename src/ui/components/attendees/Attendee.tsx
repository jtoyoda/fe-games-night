import { Grid, Typography } from '@material-ui/core';
import styles from 'ui/components/attendees/AttendeeCard.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import MessageIcon from '@material-ui/icons/Message';
import * as React from 'react';
import { GamerAttending } from 'services/eventService';

interface IProps {
  attendee: GamerAttending
  highlighted?: boolean
}

export function Attendee(props: IProps) {
  const attendee = props.attendee
  return (
    <div key={`${attendee.name}-${attendee.email}`}>
      <Grid container={true} direction={'row'} alignItems='center'>
        <Grid item={true}>
          <Typography variant={'body1'} className={styles.withMargin}>
            {
              props.highlighted ? <strong>{attendee.name} ({attendee.email})</strong> :
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
