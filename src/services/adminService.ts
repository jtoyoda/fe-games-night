import { GameEvent, Gamer } from 'services/eventService';

export const adminService = {
  loadNights,
  updateNight,
  createNight,
  deleteNight,
  loadGamers,
  updateGamer,
  createGamer,
  deleteGamer,
  loadEvents,
  updateEvent,
  createEvent,
  deleteEvent,
};

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type RepeatType = 'WEEKLY' | 'BIWEEKLY' | 'NEVER'

export interface Night {
  id: number;
  name: string;
  dayOfWeek: DayOfWeek;
  repeat: RepeatType;
  hour: number
  minute: number;
  attendees: Gamer[];
  createOn: string;
}

export interface CreateNight {
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
}

function loadNights(): Promise<Night[]> {
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

function updateNight(nightId: number, body: CreateNight) {
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

function createNight(createNight: CreateNight) {
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

function updateEvent(eventId: number, body: CreateEvent) {
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
