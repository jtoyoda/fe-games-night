import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Grid, MenuItem, Select,
  TextField, Typography,
} from '@material-ui/core';
import {
  adminService,
  CreateEvent,
} from 'services/adminService';
import styles from 'ui/containers/admin/group/EditGroupContainer.module.css';
import { AttendeeSelector } from 'ui/components/attendees/AttendeeSelector';
import { GameEvent, Gamer } from 'services/eventService';
import moment from 'moment';


interface IProps {
  displayed: boolean
  initialValues?: GameEvent;
  submitButtonTitle: string;

  handleClose(): void;

  handleSubmit(createEvent: CreateEvent): void
}

interface IState extends CreateEvent {
  gamers: Gamer[]
}

interface TextConfig {
  value: string | number;
  label: string;
  id: string;

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export class EditEventContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const defaultDate = moment(moment.now()).hour(18).minute(30);
    if (props.initialValues) {
      this.state = {
        name: props.initialValues.name,
        date: props.initialValues.date ? moment(props.initialValues.date).valueOf() : defaultDate.valueOf(),
        attendees: props.initialValues.attendees.map(gamer => gamer.id),
        picker: props.initialValues.picker && props.initialValues.picker.id,
        game: props.initialValues.game,
        gamers: [],
      };
    } else {
      this.state = {
        name: '',
        date: defaultDate.valueOf(),
        gamers: [],
      };
    }
    this.loadGamers()
  }

  loadGamers = () => {
    adminService.loadGamers().then((gamers) => {
      this.setState({gamers: gamers})
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

  changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = moment(event.currentTarget.value);
    this.setState({
      date: date.valueOf(),
    })

  }

  changeGame = (event: React.ChangeEvent<HTMLInputElement>) => {
    const game = event.currentTarget.value;
    this.setState({
      game,
    });
  }

  changeAttendees = (event: React.ChangeEvent<{ value: unknown }>) => {
    const attendees = (event.target.value as number[]);
    this.setState({
        attendees,
      },
    );
  }

  changePicker = (event: React.ChangeEvent<{ value: unknown }>) => {
    const picker = (event.target.value as number);
    this.setState({
      picker,
    })
  }

  render() {
    return (
      <Dialog open={this.props.displayed}>
        <DialogTitle id="form-dialog-title">Create Special Event</DialogTitle>
        <DialogContent>
          {
            this.createTextField({
              value: this.state.name,
              label: 'Name',
              id: 'name',
              onChange: this.changeName,
            })
          }
          <TextField
            id="datetime-local"
            label="Date"
            type="datetime-local"
            defaultValue={moment(this.state.date).format('YYYY-MM-DDTHH:mm')}
            fullWidth
            margin={'dense'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.changeDate}
          />
          {
            this.createTextField({
              value: this.state.game || '',
              label: 'Game (Optional)',
              id: 'game',
              onChange: this.changeGame,
            })
          }
          <Grid container={true} alignItems={'center'} justify={'space-between'}
                className={styles.selector}>
            <Grid item={true}>
              <Typography>
                Sommelier:
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
                {this.state.gamers.map((gamer) =>
                  <MenuItem key={`gamer-choice${gamer.id}`}
                            value={gamer.id}>{gamer.name}</MenuItem>,
                )}
                <MenuItem key={`gamer-choice--1`} value={-1}>Nobody</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <AttendeeSelector
            attendees={this.state.attendees || []}
            choices={this.state.gamers}
            changeAttendees={this.changeAttendees}
            title={'Attendees'}
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
    );
  }
}
