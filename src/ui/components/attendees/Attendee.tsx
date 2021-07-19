import { Grid, IconButton, Popover, Typography } from '@material-ui/core';
import styles from 'ui/components/attendees/AttendeeCard.module.css';
import MessageIcon from '@material-ui/icons/Message';
import * as React from 'react';
import { GamerAttending } from 'services/eventService';

interface IProps {
  attendee: GamerAttending
  highlighted?: boolean
}

export function Attendee(props: IProps) {
  const attendee = props.attendee
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

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
            <IconButton onClick={handlePopoverOpen}>
              <MessageIcon/>
            </IconButton>

          }
          <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>{attendee.message}</Typography>
          </Popover>
        </Grid>
      </Grid>
    </div>
  )
}
