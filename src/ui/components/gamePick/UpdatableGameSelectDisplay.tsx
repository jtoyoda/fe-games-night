import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import styles from 'ui/components/gamePick/UpdatableGameSelectDisplay.module.css';
import * as React from 'react';
import { IGame } from 'services/eventService';
import Async from 'react-select/async';
import { bggService, IOption } from 'services/bggService';
import { InputActionMeta } from 'react-select/src/types';


interface IProps {
  existingGame?: IGame;
  game?: IGame;
  loading: boolean;
  prompt: string;

  handleGameChange(game: string): void;

  handleGameSelect(game: string, id?: number): void;

  handleGameChangeSubmit?(): void;

}

export class UpdatableGameSelectDisplay extends React.Component<IProps> {
  handleGameChange = (name: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change') {
      this.props.handleGameChange(name);
    }
  }
  handleGameSelect = (option?: readonly IOption[] | IOption | null) => {
    if (option && !Array.isArray(option)) {
      const singleOption = option as IOption;
      this.props.handleGameSelect(singleOption.label, singleOption.value);
    }
  }

  render() {
    const defaultOption: IOption | undefined = this.props.game ? {
      value: this.props.game.id,
      label: this.props.game.name,
    } : undefined;
    return (
      <Grid container={true} alignItems={'center'} spacing={1}>
        <Grid item={true}>
          <Typography>
            {this.props.prompt}
          </Typography>
        </Grid>
        <Grid item={true} className={styles.autocomplete}>
          <Async
            defaultValue={defaultOption}
            defaultOptions={defaultOption && [defaultOption]}
            cacheOptions
            loadOptions={bggService.getAutoComplete}
            onInputChange={this.handleGameChange}
            onChange={this.handleGameSelect}
          />
        </Grid>
        {this.props.handleGameChangeSubmit &&
        <Grid item={true}>
          <Button
            variant="contained"
            color="primary"
            disabled={(this.props.game && this.props.existingGame === this.props.game) || this.props.loading}
            onClick={this.props.handleGameChangeSubmit}
          >
            Submit
          </Button>
        </Grid>
        }
        <Grid item={true}>
          {this.props.loading &&
          <CircularProgress size={24} color={'secondary'} className={styles.buttonProgress}/>}
        </Grid>
      </Grid>
    );
  }
}
