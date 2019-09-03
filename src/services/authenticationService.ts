import { handleResponse } from 'services/helpers';

let currentUserSubject: User | null = (localStorage.getItem('currentUser') &&
  JSON.parse(localStorage.getItem('currentUser') || "{'token': '','type': 'regular'}")) || null;

export const authenticationService = {
  login,
  logout,
  setPassword,
  currentUser: currentUserSubject,
  get currentUserValue() {
    return currentUserSubject
  },
};

interface User {
  id: number;
  token: string;
  type: 'admin' | 'regular';
  email: string;
  name: string;
}


function login(email: string, password: string) {
  if (email === 'admin' && password === 'admin') {
    const gamer: User =  {
      token: '',
      type: 'admin',
      email: 'admin',
      name: 'ADMIN',
      id: -1
    };
    localStorage.setItem('currentUser', JSON.stringify(gamer));
    currentUserSubject = gamer;

    return Promise.resolve(gamer);
  }
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/auth/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      const gamer: User = {
        token: user.token,
        type: 'regular',
        email,
        name: user.name,
        id: user.id,
      };
      localStorage.setItem('currentUser', JSON.stringify(gamer));
      currentUserSubject = gamer;

      return gamer;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject = null;
}

function setPassword(email: string, password: string) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/gamesNight/auth/signup`, requestOptions)
    .then(handleResponse)
}

export function getCurrentUserToken(): string | null {
  return authenticationService.currentUserValue && authenticationService.currentUserValue.token;
}
