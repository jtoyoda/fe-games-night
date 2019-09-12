import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Grid,

} from '@material-ui/core';
import { adminService, Group, PickerMap, UpcomingEventMap } from 'services/adminService';
import { PickerCard } from 'ui/components/groups/PickerCard';
import styles from 'ui/containers/admin/group/EditPickerContainer.module.css';


interface IProps {
  handleClose(): void;
  group: Group
}

interface IState {
  pickers: PickerMap;
  upcomingNights: UpcomingEventMap;
}

export class EditPickerContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pickers: {},
      upcomingNights: [],
    }
    this.loadPickers();
    this.loadUpcoming();
  }

  loadPickers = () => {
    adminService.loadPickers(this.props.group.id).then((pickers) => {
      this.setState({
        pickers
      })
    })
  }

  loadUpcoming = () => {
    adminService.loadUpcomingEvents(this.props.group.id).then((upcomingNights) => {
      this.setState({
        upcomingNights
      })
    })
  }

  onPickerUpdate = (weekNumber: number) => (gamerId: number) => {
    adminService.updatePicker(this.props.group.id, {weekNumber, gamerId}).then(
      this.loadPickers
    )
  }

  createPickerCard = (number: number, currentWeekNumber: number, date: number) => {
    const weekNumber = number + currentWeekNumber;
    const currentPicker = this.state.pickers[weekNumber];
    return (
      <Grid item={true} key={weekNumber} className={styles.row}>
        <PickerCard
          date={date}
          gamers={this.props.group.attendees}
          currentPicker={currentPicker}
          onUpdate={this.onPickerUpdate(weekNumber)}
        />
        </Grid>
    )
  }

  render() {
    var i = 0;
    return (
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">Assign Sommeliers</DialogTitle>
        <DialogContent>
          <Grid container={true} alignItems={'center'} justify={'space-between'}>
            {Object.keys(this.state.upcomingNights).map((key) => {
              const card = this.createPickerCard(i, +key, this.state.upcomingNights[key]);
              i = i + 1;
              return card;
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
