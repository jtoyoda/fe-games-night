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

export class AdminNight extends React.Component<IProps> {
  render() {
    return (
      <Admin type={'night'}/>
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
