import { Button, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import * as React from 'react';

interface IProps {
  title: string;
  onSubmit(): void;
  onClose(): void;
}

export class DeleteDialog extends React.Component<IProps> {
  render() {
    return (
      <Dialog open={true} title={`Delete ${this.props.title}`}>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {this.props.title.toLowerCase()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.props.onSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
