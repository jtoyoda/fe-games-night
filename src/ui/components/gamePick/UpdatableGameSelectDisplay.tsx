import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import styles from 'ui/components/gamePick/UpdatableGameSelectDisplay.module.css';
import * as React from 'react';
import { GameEvent } from 'services/eventService';

interface IProps {
  event: GameEvent;
  game: string;
  loading: boolean

  handleGameChange(event: React.ChangeEvent<HTMLInputElement>): void

  handleGameChangeSubmit(): void,

}

export class UpdatableGameSelectDisplay extends React.Component<IProps> {
  render() {
    return (
      <Grid container={true} alignItems={'center'}>
        <Grid item={true}>
          <Typography>
            You are the Sommelier. Your pick is
          </Typography>
        </Grid>
        <Grid item={true}>
          <TextField
            variant="outlined"
            label="Game Choice"
            margin="dense"
            InputProps={{
              classes: {
                root: styles.textField,
              },
            }}
            value={this.props.game || ''}
            onChange={this.props.handleGameChange}
          />
        </Grid>
        <Grid item={true}>
          <Button
            variant="contained"
            color="primary"
            disabled={this.props.event.game === this.props.game || this.props.loading}
            onClick={this.props.handleGameChangeSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item={true}>
          {this.props.loading &&
          <CircularProgress size={24} color={'secondary'} className={styles.buttonProgress}/>}
        </Grid>
      </Grid>
    );
  }
}
