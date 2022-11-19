class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  setUserInfo(userName, userAbout) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then(this._checkResponse);
  }

  addCard(link, title) {
    return fetch(this._baseUrl + "/cards/", {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeStatusLikeCard(id, isLiked) {
    const changeStatus = isLiked ? "deleteLikeCard" : "setLikeCard";
    return api[changeStatus](id);
  }

  setLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data, //avatar_url
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  // http://localhost:3000
  baseUrl: "https://api.lugo.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
