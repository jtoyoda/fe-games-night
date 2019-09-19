import { getCurrentUserToken } from 'services/authenticationService';
import { Gamer } from 'services/adminService';

export const eventService = {
  loadEvents,
  updateEventGame,
  updateEventAttendance,
};

export interface GamerAttending extends Gamer {
  attending?: boolean;
}

export interface GameEvent {
  id: number;
  name: string;
  game?: string;
  date: string;
  attendees: GamerAttending[];
  picker?: Gamer;
  gameId?: number;
}

export interface IGame {
  name: string,
  id?: number,
}

function loadEvents(): Promise<GameEvent[]> {
  const currentUserToken = getCurrentUserToken();
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUserToken}`},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/events`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}



function updateEventAttendance(eventId: number, attending: boolean) {
  return _updateEvent(eventId, {attending: attending})
}

function updateEventGame(eventId: number, game: IGame) {
  return _updateEvent(eventId, {game: game.name, gameId: game.id})
}

function _updateEvent(eventId: number, body: {[key: string]: any}) {
  const currentUserToken = getCurrentUserToken();

  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUserToken}`},
    body: JSON.stringify(body),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/events/${eventId}`, requestOptions)
    .then((response: Response) => {
      return response.text().then(text => {
        return text && JSON.parse(text);
      })
    })
}
