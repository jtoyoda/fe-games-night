import * as React from 'react';
import { Admin } from 'ui/containers/admin/AdminContainer';


interface IProps {}

export class AdminEvent extends React.Component<IProps> {

  render() {
    return (
      <Admin type={'event'}/>
    );
  }
}

export class AdminGroup extends React.Component<IProps> {
  render() {
    return (
      <Admin type={'group'}/>
    );
  }
}

export class AdminGamer extends React.Component<IProps> {
  render() {
    return (
      <Admin type={'gamer'}/>
    );
  }
}
