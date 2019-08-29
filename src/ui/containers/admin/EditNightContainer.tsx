import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Grid, MenuItem, Select,
  TextField, Typography,
} from '@material-ui/core';
import { adminService, CreateNight, DayOfWeek, Night, RepeatType } from 'services/adminService';
import styles from 'ui/containers/admin/EditNightContainer.module.css';
import { AttendeeSelector } from 'ui/components/attendees/AttendeeSelector';
import { Gamer } from 'services/eventService';


interface IProps {
  displayed: boolean
  initialValues?: Night;
  submitButtonTitle: string;
  handleClose(): void;
  handleSubmit(createNight: CreateNight): void
}

interface IState extends CreateNight {
  gamers: Gamer[]
}

interface TextConfig {
  value: string | number;
  label: string;
  id: string;

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export class EditNightContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (props.initialValues) {
      this.state = {
        name: props.initialValues.name,
        dayOfWeek: props.initialValues.dayOfWeek,
        hour: props.initialValues.hour,
        minute: props.initialValues.minute,
        repeat: props.initialValues.repeat,
        attendees: props.initialValues.attendees.map(gamer => gamer.id),
        gamers: [],
      };
    } else {
      this.state = {
        name: '',
        dayOfWeek: 'MONDAY',
        hour: 18,
        minute: 0,
        repeat: 'WEEKLY',
        attendees: [],
        gamers: [],
      };
    }
    this.loadGamers()
  }

  loadGamers = () => {
    adminService.loadGamers().then((gamers) => {
      this.setState({gamers})
    })

  }

  handleCreate = () => {
    this.props.handleSubmit(this.state);
  }

  createTextField = (textConfig: TextConfig) => {
    return (
      <TextField
        fullWidth
        margin="dense"
        id={textConfig.id}
        label={textConfig.label}
        value={textConfig.value}
        onChange={textConfig.onChange}
      />
    );
  }

  changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value;
    this.setState({
      name,
    });
  }

  changeHour = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || event.target.value === '0') {
      const hour = +event.target.value;
      this.setState({
        hour,
      });
    } else {
      this.setState({
        hour: -1,
      });
    }
  }

  changeMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || event.target.value === '0') {
      const minute = +event.target.value;
      this.setState({
        minute,
      });
    } else {
      this.setState({
        minute: -1,
      });
    }
  }

  changeDayOfWeek = (event: React.ChangeEvent<{ value: unknown }>) => {
    const dayOfWeek: DayOfWeek = event.target.value as DayOfWeek;
    this.setState({
      dayOfWeek,
    });
  }

  changeRepeat = (event: React.ChangeEvent<{ value: unknown }>) => {
    const repeat: RepeatType = event.target.value as RepeatType;
    this.setState({
      repeat,
    });
  }

  changeAttendees = (event: React.ChangeEvent<{ value: unknown }>) => {
    const attendees = (event.target.value as number[]);
    this.setState({
        attendees,
      },
    );
  }

  render() {
    return (
      <Dialog open={this.props.displayed}>
        <DialogTitle id="form-dialog-title">Create Night</DialogTitle>
        <DialogContent>
          {
            this.createTextField({
              value: this.state.name,
              label: 'Name',
              id: 'name',
              onChange: this.changeName,
            })
          }
          <Grid container={true} alignItems={'center'} justify={'space-between'}
                className={styles.selector}>
            <Grid item={true}>
              <Typography>
                Day of Week:
              </Typography>
            </Grid>
            <Grid item={true}>
              <Select
                value={this.state.dayOfWeek}
                onChange={this.changeDayOfWeek}
                inputProps={{
                  name: 'Day of Week',
                  id: 'day-of-week',
                }}
              >
                <MenuItem id={'MONDAY'} value={'MONDAY'}>Monday</MenuItem>
                <MenuItem value={'TUESDAY'}>Tuesday</MenuItem>
                <MenuItem value={'WEDNESDAY'}>Wednesday</MenuItem>
                <MenuItem value={'THURSDAY'}>Thursday</MenuItem>
                <MenuItem value={'FRIDAY'}>Friday</MenuItem>
                <MenuItem value={'SATURDAY'}>Saturday</MenuItem>
                <MenuItem value={'SUNDAY'}>Sunday</MenuItem>
              </Select>
            </Grid>
          </Grid>
          {
            this.createTextField({
              value: this.state.hour >= 0 ? this.state.hour : '',
              label: 'Hour (0-24)',
              id: 'hour',
              onChange: this.changeHour,
            })
          }
          {
            this.createTextField({
              value: this.state.minute >= 0 ? this.state.minute : '',
              label: 'Minute (0-60)',
              id: 'minute',
              onChange: this.changeMinute,
            })
          }
          <Grid container={true} alignItems={'center'} justify={'space-between'}
                className={styles.selector}>
            <Grid item={true}>
              <Typography>
                Repeat:
              </Typography>
            </Grid>
            <Grid item={true}>
              <Select
                value={this.state.repeat}
                onChange={this.changeRepeat}
                inputProps={{
                  name: 'Repeat',
                  id: 'repeat',
                }}
              >
                <MenuItem value={'WEEKLY'}>Weekly</MenuItem>
                <MenuItem value={'BIWEEKLY'}>Bi-weekly</MenuItem>
                <MenuItem value={'NEVER'}>Never</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <AttendeeSelector
            attendees={this.state.attendees}
            choices={this.state.gamers}
            changeAttendees={this.changeAttendees}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleCreate} color="primary">
            {this.props.submitButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
