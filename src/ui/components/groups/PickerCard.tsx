import * as React from 'react';
import { Gamer } from 'services/adminService';
import { Button, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import styles from 'ui/containers/admin/group/EditGroupContainer.module.css';
import moment from 'moment';


interface IProps {
  date: number;
  gamers: Gamer[];
  currentPicker?: Gamer;

  onUpdate(gamerId: number): void;

}

interface IState {
  picker?: number;
}

export class PickerCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      picker: props.currentPicker ? props.currentPicker.id : undefined
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if (prevProps.currentPicker !== this.props.currentPicker) {
      this.setState({picker: this.props.currentPicker ? this.props.currentPicker.id : undefined})
    }
  }

  changePicker = (event: React.ChangeEvent<{ value: unknown }>) => {
    const picker = (event.target.value as number);
    this.setState({
      picker,
    })
  }

  onUpdate = () => {
    this.state.picker && this.props.onUpdate(this.state.picker)
  }

  render() {
    return (
      <Grid container={true} alignItems={'center'} justify={'space-between'}
            className={styles.selector}>
        <Grid item={true}>
          <Typography>
            {moment(this.props.date).format('MMM Do h:mmA')}
          </Typography>
        </Grid>
        <Grid item={true}>
          <Select
            value={this.state.picker || -1}
            onChange={this.changePicker}
            inputProps={{
              name: 'Sommelier',
              id: 'picker',
            }}
          >
            {this.props.gamers.map((gamer) =>
              <MenuItem key={`gamer-choice${gamer.id}`}
                        value={gamer.id}>{gamer.name}</MenuItem>,
            )}
            <MenuItem key={`gamer-choice--1`} value={-1}>Nobody</MenuItem>
          </Select>
        </Grid>
        <Grid item={true}>
          <Button variant={'contained'} onClick={this.onUpdate} disabled={this.state.picker === undefined ||
          (this.props.currentPicker && this.state.picker === this.props.currentPicker.id)}>
            Update
          </Button>
        </Grid>
      </Grid>
    );
  }
}
