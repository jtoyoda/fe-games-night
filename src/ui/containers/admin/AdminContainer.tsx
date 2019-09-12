import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import styles from 'ui/containers/admin/AdminContainer.module.css';
import { EditGroupContainer } from 'ui/containers/admin/group/EditGroupContainer';
import { GroupsDisplay } from 'ui/components/groups/GroupsDisplay';
import {
  adminService,
  CreateEvent,
  CreateGamer,
  CreateGroup,
  Gamer,
  Group,
} from 'services/adminService';
import { Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from '@material-ui/core/utils';
import { GameEvent} from 'services/eventService';
import { DeleteDialog } from 'ui/components/delete/DeleteDialog';
import { AdminEventsDisplay } from 'ui/components/adminEvents/AdminEventsDisplay';
import { EditEventContainer } from 'ui/containers/admin/event/EditEventContainer';
import { GamersDisplay } from 'ui/components/gamers/GamersDisplay';
import { EditGamerContainer } from 'ui/containers/admin/gamer/EditGamerContainer';
import { EditPickerContainer } from 'ui/containers/admin/group/EditPickerContainer';

type AdminType = 'event' | 'group' | 'gamer';

interface IProps extends RouteComponentProps {
  type: AdminType;
}

interface IState {
  groups: Group[];
  editGroupId?: number;
  createGroupPopupVisible: boolean;
  assignPickerGroupId?: number;
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
      createGroupPopupVisible: false,
      events: [],
      gamers: [],
      groups: [],
      deleteConfirmationDialogType: 'event',
      deleteConfirmationDialogTitle: '',
    };
    this.reloadGroups();
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
   * Group functions
   */

  onEditGroup = (groupId: number) => () => {
    this.setState({editGroupId: groupId});
  }

  onCreateGroup = () => {
    this.setState({createGroupPopupVisible: true})
  }

  handleCreateGroup = (group: CreateGroup) => {
    adminService.createGroup(group).then(() => {
      this.reloadGroups();
      this.handleCloseCreateGroup();
    })
  }

  handleCloseCreateGroup = () => {
    this.setState({createGroupPopupVisible: false})
  }

  handleEditGroup = (group: CreateGroup) => {
    if (this.state.editGroupId && this.state.editGroupId >= 0) {
      adminService.updateGroup(this.state.editGroupId, group).then(() => {
        this.reloadGroups();
        this.handleCloseEditGroup();
      })
    }
  }

  handleCloseEditGroup = () => {
    this.setState({editGroupId: undefined})
  }

  reloadGroups = () => {
    adminService.loadGroups().then((groups: Group[]) => {
      this.setState({
        groups,
      });
    });
  }

  onAssignPickers = (groupId: number) => () => {
    this.setState({
      assignPickerGroupId: groupId
    })
  }

  handleCloseAssignPicker = () => {
    this.setState({assignPickerGroupId: undefined})
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

  handleSubmitDeletePopup = (type: AdminType, id: number) => () => {
    if (type === 'event') {
      adminService.deleteEvent(id).then(this.reloadEvents).then(this.handleCloseDeletePopup);
    } else if (type === 'group') {
      adminService.deleteGroup(id).then(this.reloadGroups).then(this.handleCloseDeletePopup);
    } else if (type === 'gamer') {
      adminService.deleteGamer(id).then(this.reloadGamers).then(this.handleCloseDeletePopup);
    }
  }

  handleCloseDeletePopup = () => {
    this.setState({deleteConfirmationDialogId: undefined})
  }

  render() {
    const assignPickerGroup = this.state.groups.find((group) => group.id === this.state.assignPickerGroupId)
    const groups = (
      <div>
        <GroupsDisplay
          groups={this.state.groups}
          onEdit={this.onEditGroup}
          onCreate={this.onCreateGroup}
          onDelete={this.onDelete('group', "Group")}
          onAssignPickers={this.onAssignPickers}
        />
        {this.state.createGroupPopupVisible && <EditGroupContainer
          displayed={this.state.createGroupPopupVisible}
          submitButtonTitle={'Create'}
          handleClose={this.handleCloseCreateGroup}
          handleSubmit={this.handleCreateGroup}
        />}
        {this.state.editGroupId && <EditGroupContainer
          displayed={this.state.editGroupId >= 0}
          handleClose={this.handleCloseEditGroup}
          submitButtonTitle={'Update'}
          handleSubmit={this.handleEditGroup}
          initialValues={this.state.groups.find((group) => group.id === this.state.editGroupId)}
        />}
        {this.state.assignPickerGroupId && assignPickerGroup && <EditPickerContainer
          group={assignPickerGroup}
          handleClose={this.handleCloseAssignPicker}
          />}
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
        />}
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
        />}
      </div>
    );
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container={true} justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
              <Grid item={true}>
                <Link to={'/admin/events'} component={RouterLink} color={'inherit'}
                      className={styles.paddingRight}>Events</Link>
                <Link to={'/admin/groups'} component={RouterLink} color={'inherit'}
                      className={styles.paddingRight}>Groups</Link>
                <Link to={'/admin/gamers'} component={RouterLink} color={'inherit'}
                      className={styles.paddingRight}>Gamers</Link>

              </Grid>
              <Grid item={true}>
                <Grid container={true} alignItems={'center'} spacing={1}>
                  <Grid item={true}>
                    <Typography>{authenticationService.currentUserValue && authenticationService.currentUserValue.name}</Typography>
                  </Grid>
                  <Grid item={true}>
                    <Button color="inherit" onClick={this.logout}
                            variant={'outlined'}>Logout</Button>
                  </Grid>
                </Grid>
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
          {this.props.type === 'group' && groups}
          {this.props.type === 'event' && events}
          {this.props.type === 'gamer' && gamers}
        </div>

      </div>
    )
  }
}

export const Admin = withRouter(AdminContainer);
