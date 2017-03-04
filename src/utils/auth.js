export default class Auth {

    static login (token) {
        localStorage.setItem ('token', token);
    }

    static getToken () {
        return localStorage.token;
    }

    static isLoggedIn () {
        // 当有token时还要检测是否过期
        const token = localStorage.getItem('token');
        if( token ) {
            var info;
            try {
                // token 不能解析
                info = JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return false;
            }

            const exp = info.exp;
            const now = Date.now() / 1000;
            if(exp > now) {
                return true;
            }
        }
        return false;
    }

    static logout() {
       localStorage.removeItem('token');
    }
}
