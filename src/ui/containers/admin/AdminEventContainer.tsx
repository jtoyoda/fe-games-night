import * as React from 'react';
import { Admin } from 'ui/containers/admin/AdminContainer';


interface IProps {}

export class AdminEvent extends React.Component<IProps> {

  render() {
    return (
      <Admin isEvent={true}/>
    )
  }
}
