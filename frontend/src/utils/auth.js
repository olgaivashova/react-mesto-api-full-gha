class Auth {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //for registration
  signup(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //for authorization
  signin(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //check token
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
}

const auth = new Auth({
  baseUrl: "http://localhost:3000",
});

export default auth;
