import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import logo from 'assets/logo.jpg';
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import styles from 'ui/containers/login/LoginContainer.module.css';
import { authenticationService } from 'services/authenticationService';

interface IProps extends RouteComponentProps {

};

interface IOwnState {
  username: string;
  password: string;
  loginFailed: number;
  loggingIn: boolean;
}

class LoginContainer extends React.Component<IProps, IOwnState> {
  constructor(props: IProps) {
    super(props);
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
    this.state = {
      username: '',
      password: '',
      loginFailed: 0,
      loggingIn: false,
    };
  }

  onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.currentTarget.value;
    this.setState({
      username,
    });
  }

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    this.setState({
      password,
    });
  }

  login = () => {
    this.setState({
      loggingIn: true,
    })
    authenticationService.login(this.state.username, this.state.password).then(() => {
        this.props.history.push('/');
        return null;
      },
    ).catch(() => {
      this.setState({
        loginFailed: this.state.loginFailed + 1,
        loggingIn: false,
      });
    })
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
    const loginFailed = (this.state.loginFailed && (
      <Typography variant={'subtitle2'} color={'error'}>
        Login failed {this.state.loginFailed} time{(this.state.loginFailed > 1 && 's') || ''}.
        Please try again
      </Typography>
    )) || null;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={logo} alt="logo" className={styles.logo}/>
          <TextField
            variant="outlined"
            label="Username"
            InputProps={inputProps}
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
          <TextField
            variant="outlined"
            label="Password"
            InputProps={inputProps}
            value={this.state.password}
            onChange={this.onPasswordChange}
            type="password"
            onKeyPress={this.keyPressHandler}

          />
          <Button
            variant="contained"
            color="primary"
            className={styles.loginButton}
            disabled={this.state.loggingIn}
            onClick={this.login}
          >
            Login
          </Button>
          {this.state.loggingIn && <CircularProgress size={24} className={styles.buttonProgress}/>}
          {loginFailed}
        </div>
      </div>
    );
  }
}

export const Login = withRouter(LoginContainer);
