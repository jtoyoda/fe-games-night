import {
  Checkbox,
  Grid,
  Input,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import styles from 'ui/components/attendees/AttendeeSelector.module.css';
import { Gamer } from 'services/eventService';


interface IProps {
  attendees: number[];
  choices: Gamer[];
  title: string;

  changeAttendees(event: React.ChangeEvent<{ value: unknown }>): void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export class AttendeeSelector extends React.Component<IProps> {
  render() {
    return (
      <Grid container={true} justify={'space-between'}
            className={styles.selector} direction={'column'}>
        <Grid item={true}>
          <Typography>
            {this.props.title}:
          </Typography>
        </Grid>
        <Grid item={true}>
          <Select
            multiple
            fullWidth
            value={this.props.attendees || undefined}
            placeholder={'Please select your first member'}
            onChange={this.props.changeAttendees}
            input={<Input id="select-multiple"/>}
            renderValue={selected => (selected as number[]).map((gamerId) =>
              this.props.choices.find((gamer) => gamer.id === gamerId),
            ).map((gamer) => gamer && gamer.name).join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.choices.map(choice => (
              <MenuItem key={choice.id} value={choice.id}>
                <Checkbox checked={this.props.attendees.indexOf(choice.id) > -1}/>
                <ListItemText primary={choice.name}/>
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    )
  }
}
