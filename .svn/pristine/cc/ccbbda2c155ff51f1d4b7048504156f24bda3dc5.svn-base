import { login, logout } from '../services/app'
// 395516
// 185725
export default{
    namespace: 'app',
    state: {
        login: false,
        loginButtonLoading: false,
        siderOpen: true,
        user: {
            name: 'Boss'
        }
    },
    subscriptions: {

    },
    effects: {
    },
    reducers: {
        changeNavStatus(state,action) {
            console.log(action);
            return {...state,siderOpen: !state.siderOpen}
        }
    }
}
