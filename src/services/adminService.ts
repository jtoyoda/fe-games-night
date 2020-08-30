import { GameEvent } from 'services/eventService';

export const adminService = {
  loadGroups: loadNights,
  updateGroup: updateNight,
  createGroup: createNight,
  deleteGroup: deleteNight,
  loadPickers,
  updatePicker,
  loadGamers,
  updateGamer,
  createGamer,
  deleteGamer,
  loadEvents,
  updateEvent,
  createEvent,
  deleteEvent,
  loadUpcomingEvents,
  loadEventsForGroup,
  editAttendee,
};

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type RepeatType = 'WEEKLY' | 'BIWEEKLY' | 'NEVER'

export interface Gamer {
  id: number;
  name: string;
  email: string;
}

export interface Group {
  id: number;
  name: string;
  dayOfWeek: DayOfWeek;
  repeat: RepeatType;
  hour: number
  minute: number;
  attendees: Gamer[];
  createOn: string;
}

export interface CreateGroup {
  name: string;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  attendees: number[];
  repeat: 'WEEKLY' | 'BIWEEKLY' | 'NEVER';
  hour: number;
  minute: number;
}

export interface CreateGamer {
  name: string;
  email: string;
}

export interface CreateEvent {
  name: string;
  attendees?: number[];
  night?: number[];
  picker?: number;
  date: number;
  game?: string;
  gameId?: number;
}

export interface UpdateEvent {
  name?: string;
  attendees?: number[];
  picker?: number;
  date?: number;
  game?: string;
  gameId?: number;
}

export interface UpdatePicker {
  gamerId: number,
  weekNumber: number,
}

export interface PickerMap {
  [key: number]: Gamer
}

export interface UpcomingEventMap {
  [key: number]: number
}

function loadNights(): Promise<Group[]> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function loadEventsForGroup(group: Group): Promise<GameEvent[]> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights/${group.id}/events`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function updateNight(nightId: number, body: CreateGroup) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights/${nightId}`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function createNight(createNight: CreateGroup) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(createNight),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function deleteNight(nightId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights/${nightId}`, requestOptions)
}

function loadUpcomingEvents(nightId: number): Promise<UpcomingEventMap> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights/${nightId}/upcoming`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function loadPickers(nightId: number): Promise<PickerMap> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights/${nightId}/pickers`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function updatePicker(nightId: number, body: UpdatePicker) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/nights/${nightId}/pickers`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function loadGamers(): Promise<Gamer[]> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/gamers`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function updateGamer(gamerId: number, body: CreateGamer) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/gamers/${gamerId}`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function createGamer(createGamer: CreateGamer) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(createGamer),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/gamers`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function deleteGamer(gamerId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/gamers/${gamerId}`, requestOptions)
}

function loadEvents(): Promise<GameEvent[]> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/admin/events`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function updateEvent(eventId: number, body: UpdateEvent) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/admin/events/${eventId}`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function editAttendee(eventId: number, gamerId: number, attending: boolean) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({attending}),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/admin/events/${eventId}/gamers/${gamerId}`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function createEvent(createEvent: CreateEvent) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(createEvent),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/admin/events`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}

function deleteEvent(eventId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/admin/events/${eventId}`, requestOptions)
}
