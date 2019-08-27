import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';

interface IProps extends RouteComponentProps {}

class LoginDeterminerContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!authenticationService.currentUserValue) {
      this.props.history.push('/login');
    } else if (authenticationService.currentUserValue.type === 'admin') {
      this.props.history.push('/admin');
    } else if (authenticationService.currentUserValue.type === 'regular') {
      this.props.history.push('/dashboard')
    } else {
      authenticationService.logout();
      this.props.history.push('/login')
    }
  }
  render() {
    return null;
  }
}

export const LoginDeterminer = withRouter(LoginDeterminerContainer);
