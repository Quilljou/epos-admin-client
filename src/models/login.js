import { login, logout } from '../services/app'
import Auth from '../utils/auth';
import { routerRedux } from 'dva/router';
// 395516
// 185725
export default{
    namespace: 'login',
    state: {
        loginButtonLoading: false,
        user: {
            name: 'quill'
        }
    },
    subscriptions: {
        setup ({ dispatch,history }) {
            history.listen((location) => {
                if(location.pathname === '/login' && Auth.isLoggedIn()) {
                    // dispatch({
                    //     type: 'loginSuccess',
                    // })
                    dispatch(routerRedux.replace('/tenant'));
                }
            })

        }
    },
    effects: {
        *login ({ payload }, { call, put}) {
            const data = yield call(login,payload)
            if(data) {
                Auth.login(data);
                // 存储data一定要先于router change
                yield put(routerRedux.replace('/tenant'));
                // yield put({
                //     type: 'loginSuccess',
                //     payload: data
                // })
            }
        },
        *logout ({ payload }, { call, put}) {
            Auth.logout();
            yield put(routerRedux.replace('/login'));
        }
    },
    reducers: {
        // loginSuccess ( state, action ) {
        //     console.log(state);
        //     if(action.payload) {
        //         Auth.login(action.payload)
        //     }
        //     console.log(routerRedux);
        //     routerRedux.push('/')
        //     return state;
        // },
        // logout (state, action ) {
        //     delete localStorage.token;
        //     routerRedux.push('/login')
        //     return state
        // }
    }
}
