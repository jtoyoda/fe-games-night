import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import styles from 'ui/containers/admin/AdminContainer.module.css';
import { EditNightContainer } from 'ui/containers/admin/EditNightContainer';
import { NightDisplay } from 'ui/components/nights/NightDisplay';
import { adminService, CreateNight, Night } from 'services/adminService';
import { Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';


interface IProps extends RouteComponentProps {
  isEvent?: boolean;
}

interface IState {
  nights: Night[];
  editId?: number;
  createNightPopupVisible: boolean;
}

class AdminContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      nights: [],
      createNightPopupVisible: false,
    }
    this.reload(true)
  }

  logout = () => {
    authenticationService.logout();
    this.props.history.push('/login');
  }

  reload = (initialLoad?: boolean) => {
    adminService.loadNights().then((nights: Night[]) => {
      if (initialLoad) {
        this.setState({
          nights,
        });
      } else {
        this.setState({
          nights,
        })
      }
    });
  }

  onEdit = (nightId: number) => () => {
    this.setState({editId: nightId});
  }

  onCreateNight = () => {
    this.setState({createNightPopupVisible: true})
  }

  handleCreateNight = (night: CreateNight) => {
    adminService.createNight(night).then(() => {
      this.reload();
      this.handleCloseCreateNight();
    })
  }

  handleCloseCreateNight = () => {
    this.setState({createNightPopupVisible: false})
  }

  handleEditNight = (night: CreateNight) => {
    if (this.state.editId && this.state.editId >= 0) {
      adminService.updateNight(this.state.editId, night).then(() => {
        this.reload();
        this.handleCloseEditNight();
      })
    }
  }

  handleCloseEditNight = () => {
    this.setState({editId: undefined})
  }

  render() {
    const nights = (
      <div className={styles.root}>
        <Typography variant={'h4'}>
          Nights
        </Typography>
        <NightDisplay
          nights={this.state.nights}
          onEdit={this.onEdit}
          onCreateNight={this.onCreateNight}
        />
        {this.state.createNightPopupVisible && <EditNightContainer
          displayed={this.state.createNightPopupVisible}
          submitButtonTitle={'Create'}
          handleClose={this.handleCloseCreateNight}
          handleSubmit={this.handleCreateNight}
        />}
        {this.state.editId && <EditNightContainer
          displayed={this.state.editId >= 0}
          handleClose={this.handleCloseEditNight}
          submitButtonTitle={'Update'}
          handleSubmit={this.handleEditNight}
          initialValues={this.state.nights.find((night) => night.id === this.state.editId)}
          />
          }
      </div>
    );
    const events = (
      <div className={styles.root}>
        <Typography variant={'h4'}>
          Events
        </Typography>
      </div>
    );
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container={true} alignItems={'center'}>
              <Grid item={true} xs={1}>
                <Link to={'/admin/nights'} component={RouterLink} color={'inherit'}>Nights</Link>
              </Grid>
              <Grid item={true} xs={10}>
                <Link to={'/admin/events'} component={RouterLink} color={'inherit'}>Events</Link>
              </Grid>
              <Grid item={true} xs={1}>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {this.props.isEvent === undefined && nights}
        {this.props.isEvent && events}
      </div>
    )
  }
}

export const Admin = withRouter(AdminContainer);
