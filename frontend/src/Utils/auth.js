const BASE_URL = 'https://api.lugo.nomoredomains.icu';

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
  .then(handleResponse);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
  .then(handleResponse);
}

export async function checkToken() {
  return await fetch(`${BASE_URL}`, { ///users/me
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-TYPE": "application/json",
    }
  })
  .then(handleResponse);
}