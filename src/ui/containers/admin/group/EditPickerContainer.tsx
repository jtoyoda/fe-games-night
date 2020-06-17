import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, Typography,
} from '@material-ui/core';
import { adminService, Group, PickerMap, UpcomingEventMap } from 'services/adminService';
import { PickerCard } from 'ui/components/groups/PickerCard';
import styles from 'ui/containers/admin/group/EditPickerContainer.module.css';
import { GameEvent } from 'services/eventService';


interface IProps {
  handleClose(): void;
  group: Group
}

interface IState {
  pickers: PickerMap;
  upcomingNights: UpcomingEventMap;
  currentEvents: GameEvent[];
}

export class EditPickerContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pickers: {},
      upcomingNights: {},
      currentEvents: []
    }
    this.loadPickers();
    this.loadUpcoming();
    this.loadCurrentNights();
  }

  loadCurrentNights = () => {
    adminService.loadEventsForGroup(this.props.group).then((currentEvents) => {
      this.setState({
          currentEvents
      })
    })
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

  onCurrentPickerUpdate = (event: GameEvent) => (gamerId: number) => {
    adminService.updateEvent(event.id, {picker: gamerId}).then(
      this.loadCurrentNights
    )
  }

  createPickerCardForCurrentEvent = (event: GameEvent) => {
    return (
      <Grid item={true} key={event.id} className={styles.row}>
        <PickerCard
          date={Date.parse(event.date)}
          gamers={this.props.group.attendees}
          currentPicker={event.picker}
          onUpdate={this.onCurrentPickerUpdate(event)}
        />
      </Grid>
    )
  }

  createPickerCard = (weekNumber: number, date: number) => {
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
    return (
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">Assign Sommeliers</DialogTitle>
        <DialogContent>
          <Typography variant={'subtitle1'} className={styles.underlined}>
            Scheduled Nights
          </Typography>
            <Grid container={true} alignItems={'center'} justify={'space-between'}>
              {this.state.currentEvents.length > 0 ? this.state.currentEvents
                .sort(function(a,b){
                    return Date.parse(a.date) - Date.parse(b.date)}
                  )
                .map((event) => this.createPickerCardForCurrentEvent(event)) :
                <Typography> No Events Scheduled</Typography>}
            </Grid>
          <Typography variant={'subtitle1'} className={styles.underlined}>
            Upcoming Nights
          </Typography>
          <Grid container={true} alignItems={'center'} justify={'space-between'}>
            {Object.keys(this.state.upcomingNights).map((key) =>
              this.createPickerCard(+key, this.state.upcomingNights[key]))}
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
