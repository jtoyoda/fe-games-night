import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, TextField,
} from '@material-ui/core';
import {
  CreateGamer, Gamer,
} from 'services/adminService';


interface IProps {
  displayed: boolean
  initialValues?: Gamer;
  submitButtonTitle: string;
  handleClose(): void;
  handleSubmit(createGamer: CreateGamer): void
}

interface IState extends CreateGamer {
}

interface TextConfig {
  value: string | number;
  label: string;
  id: string;
  type?: string;

  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  keyPressHandler?(event: React.KeyboardEvent): void;
}

export class EditGamerContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (props.initialValues) {
      this.state = {
        name: props.initialValues.name,
        email: props.initialValues.email
      };
    } else {
      this.state = {
        name: '',
        email: '',
      };
    }
  }

  handleCreate = () => {
    this.props.handleSubmit(this.state);
  }

  createTextField = (textConfig: TextConfig) => {
    return (
      <TextField
        fullWidth
        margin="dense"
        type={textConfig.type}
        id={textConfig.id}
        label={textConfig.label}
        value={textConfig.value}
        onChange={textConfig.onChange}
        onKeyPress={textConfig.keyPressHandler}
      />
    );
  }

  changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value;
    this.setState({
      name,
    });
  }

  changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    this.setState({
      email,
    });
  }

  keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleCreate();
    }
  }

  render() {
    return (
      <Dialog open={this.props.displayed}>
        <DialogTitle id="form-dialog-title">Create Gamer</DialogTitle>
        <DialogContent>
          {
            this.createTextField({
              value: this.state.name,
              label: 'Name',
              id: 'name',
              onChange: this.changeName,
            })
          }
          {
            this.createTextField({
              value: this.state.email,
              label: 'Email',
              id: 'email',
              type: 'email',
              onChange: this.changeEmail,
              keyPressHandler: this.keyPressHandler
            })
          }
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
