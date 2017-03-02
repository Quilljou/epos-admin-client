export default class Auth {

    static login (token) {
        localStorage.setItem ('token', token);
    }

    static getToken () {
        return localStorage.token;
    }

    static isLoggedIn () {
        return localStorage.getItem('token') !== null;
    }

    static logout() {
       localStorage.removeItem('token');
    }
}
