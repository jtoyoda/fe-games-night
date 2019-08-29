import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import styles from 'ui/containers/admin/AdminContainer.module.css';
import { EditNightContainer } from 'ui/containers/admin/night/EditNightContainer';
import { NightsDisplay } from 'ui/components/nights/NightsDisplay';
import { adminService, CreateEvent, CreateGamer, CreateNight, Night } from 'services/adminService';
import { Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from '@material-ui/core/utils';
import { GameEvent, Gamer } from 'services/eventService';
import { DeleteDialog } from 'ui/components/delete/DeleteDialog';
import { AdminEventsDisplay } from 'ui/components/adminEvents/AdminEventsDisplay';
import { EditEventContainer } from 'ui/containers/admin/event/EditEventContainer';
import { GamersDisplay } from 'ui/components/gamers/GamersDisplay';
import { EditGamerContainer } from 'ui/containers/admin/gamer/EditGamerContainer';

type AdminType = 'event' | 'night' | 'gamer';

interface IProps extends RouteComponentProps {
  type: AdminType;
}

interface IState {
  nights: Night[];
  editNightId?: number;
  createNightPopupVisible: boolean;
  gamers: Gamer[];
  editGamerId?: number;
  createGamerPopupVisible: boolean;
  events: GameEvent[];
  editEventId?: number;
  createEventPopupVisible: boolean;
  deleteConfirmationDialogType: AdminType;
  deleteConfirmationDialogTitle: string;
  deleteConfirmationDialogId?: number;
}

class AdminContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      createEventPopupVisible: false,
      createGamerPopupVisible: false,
      createNightPopupVisible: false,
      events: [],
      gamers: [],
      nights: [],
      deleteConfirmationDialogType: 'event',
      deleteConfirmationDialogTitle: '',
    };
    this.reloadNights();
    this.reloadEvents();
    this.reloadGamers();
  }

  logout = () => {
    authenticationService.logout();
    this.props.history.push('/login');
  }

  /*
 * Gamer functions
 */

  onEditGamer = (gamerId: number) => () => {
    this.setState({editGamerId: gamerId});
  }

  onCreateGamer = () => {
    this.setState({createGamerPopupVisible: true})
  }

  handleCreateGamer = (gamer: CreateGamer) => {
    adminService.createGamer(gamer).then(() => {
      this.reloadGamers();
      this.handleCloseCreateGamer();
    })
  }

  handleCloseCreateGamer = () => {
    this.setState({createGamerPopupVisible: false})
  }

  handleEditGamer = (gamer: CreateGamer) => {
    if (this.state.editGamerId && this.state.editGamerId >= 0) {
      adminService.updateGamer(this.state.editGamerId, gamer).then(() => {
        this.reloadGamers();
        this.handleCloseEditGamer();
      })
    }
  }

  handleCloseEditGamer = () => {
    this.setState({editGamerId: undefined})
  }

  reloadGamers = () => {
    adminService.loadGamers().then((gamers: Gamer[]) => {
      this.setState({
        gamers,
      });
    });
  }

  /*
   * Event functions
   */

  onEditEvent = (eventId: number) => () => {
    this.setState({editEventId: eventId});
  }

  onCreateEvent = () => {
    this.setState({createEventPopupVisible: true})
  }

  handleCreateEvent = (event: CreateEvent) => {
    adminService.createEvent(event).then(() => {
      this.reloadEvents();
      this.handleCloseCreateEvent();
    })
  }

  handleCloseCreateEvent = () => {
    this.setState({createEventPopupVisible: false})
  }

  handleEditEvent = (event: CreateEvent) => {
    if (this.state.editEventId && this.state.editEventId >= 0) {
      adminService.updateEvent(this.state.editEventId, event).then(() => {
        this.reloadEvents();
        this.handleCloseEditEvent();
      })
    }
  }

  handleCloseEditEvent = () => {
    this.setState({editEventId: undefined})
  }

  reloadEvents = () => {
    adminService.loadEvents().then((events: GameEvent[]) => {
      this.setState({
        events,
      });
    });
  }

  /*
   * Night functions
   */

  onEditNight = (nightId: number) => () => {
    this.setState({editNightId: nightId});
  }

  onCreateNight = () => {
    this.setState({createNightPopupVisible: true})
  }

  handleCreateNight = (night: CreateNight) => {
    adminService.createNight(night).then(() => {
      this.reloadNights();
      this.handleCloseCreateNight();
    })
  }

  handleCloseCreateNight = () => {
    this.setState({createNightPopupVisible: false})
  }

  handleEditNight = (night: CreateNight) => {
    if (this.state.editNightId && this.state.editNightId >= 0) {
      adminService.updateNight(this.state.editNightId, night).then(() => {
        this.reloadNights();
        this.handleCloseEditNight();
      })
    }
  }

  handleCloseEditNight = () => {
    this.setState({editNightId: undefined})
  }

  reloadNights = () => {
    adminService.loadNights().then((nights: Night[]) => {
      this.setState({
        nights,
      });
    });
  }

  /*
   * Delete Popup functions
   */
  onDelete = (type: AdminType, title: string) => (id: number) => () => {
    this.setState({
      deleteConfirmationDialogId: id,
      deleteConfirmationDialogType: type,
      deleteConfirmationDialogTitle: title,
    });
  }

  handleSubmitDeletePopup = (type: 'event' | 'night' | 'gamer', id: number) => () => {
    if (type === 'event') {
      adminService.deleteEvent(id).then(this.reloadEvents).then(this.handleCloseDeletePopup);
    } else if (type === 'night') {
      adminService.deleteNight(id).then(this.reloadNights).then(this.handleCloseDeletePopup);
    } else if (type === 'gamer') {
      adminService.deleteGamer(id).then(this.reloadGamers).then(this.handleCloseDeletePopup);
    }
  }

  handleCloseDeletePopup = () => {
    this.setState({deleteConfirmationDialogId: undefined})
  }

  render() {
    const nights = (
      <div>
        <NightsDisplay
          nights={this.state.nights}
          onEdit={this.onEditNight}
          onCreate={this.onCreateNight}
          onDelete={this.onDelete('night', "Night")}
        />
        {this.state.createNightPopupVisible && <EditNightContainer
          displayed={this.state.createNightPopupVisible}
          submitButtonTitle={'Create'}
          handleClose={this.handleCloseCreateNight}
          handleSubmit={this.handleCreateNight}
        />}
        {this.state.editNightId && <EditNightContainer
          displayed={this.state.editNightId >= 0}
          handleClose={this.handleCloseEditNight}
          submitButtonTitle={'Update'}
          handleSubmit={this.handleEditNight}
          initialValues={this.state.nights.find((night) => night.id === this.state.editNightId)}
        />
        }
      </div>
    );
    const events = (
      <div>
        <AdminEventsDisplay
          events={this.state.events}
          onEdit={this.onEditEvent}
          onCreate={this.onCreateEvent}
          onDelete={this.onDelete('event', "Event")}
        />
        {this.state.createEventPopupVisible && <EditEventContainer
          displayed={this.state.createEventPopupVisible}
          submitButtonTitle={'Create'}
          handleClose={this.handleCloseCreateEvent}
          handleSubmit={this.handleCreateEvent}
        />}
        {this.state.editEventId && <EditEventContainer
          displayed={this.state.editEventId >= 0}
          handleClose={this.handleCloseEditEvent}
          submitButtonTitle={'Update'}
          handleSubmit={this.handleEditEvent}
          initialValues={this.state.events.find((event) => event.id === this.state.editEventId)}
        />
        }
      </div>
    );
    const gamers = (
      <div>
        <GamersDisplay
          gamers={this.state.gamers}
          onEdit={this.onEditGamer}
          onCreate={this.onCreateGamer}
          onDelete={this.onDelete('gamer', "Gamer")}
        />
        {this.state.createGamerPopupVisible && <EditGamerContainer
          displayed={this.state.createGamerPopupVisible}
          submitButtonTitle={'Create'}
          handleClose={this.handleCloseCreateGamer}
          handleSubmit={this.handleCreateGamer}
        />}
        {this.state.editGamerId && <EditGamerContainer
          displayed={this.state.editGamerId >= 0}
          handleClose={this.handleCloseEditGamer}
          submitButtonTitle={'Update'}
          handleSubmit={this.handleEditGamer}
          initialValues={this.state.gamers.find((gamer) => gamer.id === this.state.editGamerId)}
        />
        }
      </div>
    );
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container={true} alignItems={'center'} justify={'space-between'}>
              <Grid item={true}>
                <Link to={'/admin/events'} component={RouterLink} color={'inherit'} className={styles.paddingRight}>Events</Link>
                <Link to={'/admin/nights'} component={RouterLink} color={'inherit'} className={styles.paddingRight}>Nights</Link>
                <Link to={'/admin/gamers'} component={RouterLink} color={'inherit'} className={styles.paddingRight}>Gamers</Link>

              </Grid>
              <Grid item={true}>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {this.state.deleteConfirmationDialogId && <DeleteDialog
          title={this.state.deleteConfirmationDialogTitle}
          onSubmit={this.handleSubmitDeletePopup(this.state.deleteConfirmationDialogType,
            this.state.deleteConfirmationDialogId)}
          onClose={this.handleCloseDeletePopup}
        />
        }
        <div className={styles.root}>
          <Typography variant={'h4'}>
            {capitalize(this.props.type)}s
          </Typography>
          {this.props.type === 'night' && nights}
          {this.props.type === 'event' && events}
          {this.props.type === 'gamer' && gamers}
        </div>

      </div>
    )
  }
}

export const Admin = withRouter(AdminContainer);
