import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import logo from 'assets/logo.jpg';
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import styles from 'ui/containers/register/RegisterContainer.module.css';
import { authenticationService } from 'services/authenticationService';
import * as queryString from 'querystring';

interface IProps extends RouteComponentProps {

};

interface IOwnState {
  password: string;
  confirmedPassword: string;
  passwordsDontMatch: boolean;
  loggingIn: boolean;
  loginFailed: boolean;
}

class RegisterContainer extends React.Component<IProps, IOwnState> {
  constructor(props: IProps) {
    super(props);
    const values = queryString.parse(this.props.location.search.replace('?', ''));
    const email = values.email;
    if (typeof email == 'string') {
      this.email = email
    } else {
      this.props.history.push('/')
    }
    this.state = {
      password: '',
      confirmedPassword: '',
      passwordsDontMatch: false,
      loggingIn: false,
      loginFailed: false,
    };
  }

  private readonly email: string = '';

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    const passwordsDontMatch = !(this.state.confirmedPassword === password);
    this.setState({
      password,
      passwordsDontMatch,
    });
  }

  onConfirmedPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmedPassword = event.currentTarget.value;
    const passwordsDontMatch = !(this.state.password === confirmedPassword);
    this.setState({
      confirmedPassword,
      passwordsDontMatch,
    });
  }

  login = async () => {
    this.setState({loggingIn: true});
    await authenticationService.setPassword(this.email, this.state.password).catch(() => {
      this.setState({loginFailed: true});
      return;
    })
      .finally(() =>
        this.setState({loggingIn: false}),
      );
    await authenticationService.login(this.email, this.state.password).then(() => {
        this.props.history.push('/');
        return null;
      },
    ).catch(() =>
      this.setState({loginFailed: true}),
    );
  }

  keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  render() {
    const inputProps = {
      classes: {
        root: styles.textField,
      },
    };
    const passwordsMatchingWarning = this.state.passwordsDontMatch && (
      <Typography variant={'body2'} color={'error'}>
        Passwords do not Match
      </Typography>
    );
    const loginFailed = this.state.loginFailed && (
      <Typography variant={'body2'} color={'error'}>
        There was a problem setting your password. If this persist please contact your admin.
      </Typography>
    )
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={logo} alt="logo" className={styles.logo}/>
          <Typography variant={'h6'}>
            Complete Registration
          </Typography>
          <TextField
            variant="outlined"
            label="Password"
            InputProps={inputProps}
            value={this.state.password}
            onChange={this.onPasswordChange}
            type="password"
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            InputProps={inputProps}
            value={this.state.confirmedPassword}
            onChange={this.onConfirmedPasswordChange}
            type="password"
            onKeyPress={this.keyPressHandler}

          />
          <Button
            variant="contained"
            color="primary"
            className={styles.loginButton}
            onClick={this.login}
            disabled={this.state.passwordsDontMatch}
          >
            Set Password and Login
          </Button>
          {this.state.loggingIn && <CircularProgress size={24} className={styles.buttonProgress}/>}
          {passwordsMatchingWarning}
          {loginFailed}
        </div>
      </div>
    );
  }
}

export const Register = withRouter(RegisterContainer);
