import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import * as React from 'react';
import { Button } from '@material-ui/core';

interface IProps {
  open: boolean,
  message?: string,

  handleClose(message?: string): void
}

export function EditMessageDialog(props: IProps) {

  const [message, setMessage] = React.useState<string | undefined>(props.message);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClose = () => {
    setMessage(props.message)
    props.handleClose(undefined)
  }

  const handleSubmit = () => {
    props.handleClose(message)
  }

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
          Optionally provide an RSVP message
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Message"
          value={message}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
