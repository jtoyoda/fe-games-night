import { Grid, Typography } from '@material-ui/core';
import styles from 'ui/components/gamePick/GameDisplay.module.css';
import * as React from 'react';
import { GameEvent } from 'services/eventService';

interface IProps {
  event: GameEvent;
}

export class GameDisplay extends React.Component<IProps> {
  render() {
    const event = this.props.event;
    return (
      <div>
        {
          event.game && <Grid container={true}>
            <Typography variant={'subtitle1'}>
              {event.picker ? `${event.picker.name} is the Sommelier. Their pick` : 'The game choice'} is: &nbsp;
            </Typography>
            <Typography variant={'subtitle1'} className={styles.gameComponent} color={'secondary'}>
              {event.game}
            </Typography>
          </Grid>
        }
        {
          (event.game === null || event.game === '') &&
          <Typography variant={'subtitle1'} className={styles.gameComponent}>
            {event.picker ? `${event.picker.name} is the Sommelier. They have not picked a game yet` : 'A game has not been picked yet'}
          </Typography>
        }
      </div>
    );
  }
}
