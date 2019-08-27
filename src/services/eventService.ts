import { handleResponse } from 'services/helpers';
import { authenticationService } from 'services/authenticationService';

export const eventService = {
  loadEvents,
  updateEvent,
};

export interface Gamer {
  name: string,
  email: string,
}

export interface GamerAttending extends Gamer {
  attending: boolean,
}

export interface GameEvent {
  id: number,
  name: string,
  game: string,
  date: string,
  attendees: GamerAttending[]
  picker: Gamer
}

function loadEvents(): Promise<GameEvent[]> {
  const currentUserToken = authenticationService.currentUserValue && authenticationService.currentUserValue.token;
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

function updateEvent(attending?: boolean, game?: string) {

}
