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
    const game = event.gameId ? (
      <a href={`https://boardgamegeek.com/boardgame/${event.gameId}`} target="_blank" rel="noopener noreferrer">
        <Typography variant={'subtitle1'} className={styles.gameComponent} color={'secondary'}>
          {event.game}
        </Typography>
      </a>
    ): (
      <Typography variant={'subtitle1'} className={styles.gameComponent} color={'secondary'}>
        {event.game}
      </Typography>
    )
    return (
      <div>
        {
          event.game && <Grid container={true}>
            <Typography variant={'subtitle1'}>
              {event.picker ? `${event.picker.name} is the Sommelier. Their pick` : 'The game choice'} is: &nbsp;
            </Typography>
            {game}
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
