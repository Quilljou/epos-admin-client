import { query, create, del, renew, updatePassword } from '../services/tenant';


export default {
  namespace: 'tenant',
  state: {
    total: 0,
    dataSource: [],
    page: 1,
    pwdModalVisible: false,
    userModalVisible: false,
    currentItem: null
  },
  reducers: {
    querySuccess (state, action) {
      const { total, records: dataSource, page  } = action.payload;
      console.log(page);
      return {...state, total, dataSource, page};
    },
    createSuccess(state,action) {
      return {
        ...state,
        dataSource: [...state.dataSource,action.payload],
        total: state.total + 1
      }
    },
    updateSuccess(state,action) {
      const id = action.payload.id;
      const newData = state.dataSource.map((item) => {
        if(item.id === id) {
          return action.payload
        }else {
          return item;
        }
      })

      return {...state,
        dataSource: newData,
      }
    },
    showUserModal (state, action) {
      return {...state,userModalVisible: true}
    },
    hideUserModal (state, action) {
      return {...state,userModalVisible: false}
    },
    hidePwdModal (state, action) {
      return {...state,pwdModalVisible: false}
    },
    showPwdModal (state, action) {
      const {currentItem} = action.payload;
      return {...state,currentItem,pwdModalVisible: true}
    }
  },
  effects: {
      *query({ payload }, { call, put, select }) {

          const data = yield call(query, payload);

          if(data) {
              yield put({
                type: 'querySuccess',
                payload: {...data, page: payload.page}
              })
          }
      },
      *create({ payload }, { call, put }) {
        yield put({type: 'hideUserModal'})
        const data = yield call(create,payload);
        if(data) {
          yield put({
            type: 'createSuccess',
            payload : data
          })
        }
      },
      *del( {payload}, {call, put, select}) {
        const tenant = yield  select((state) => state.tenant);
        const { page, dataSource } = tenant;
        const response = yield call(del,payload);
        // 不返回data，所以需要把response拉出来判断
        if(response.success) {
          if(page !== 1 && dataSource.length === 1 ) {
            yield put({
              type: 'query',
              payload: {page: page - 1}
            })
          }else {
            yield put(query,{ page })
          }
        }
      },
      *renew ({payload}, { call, put }) {
        const data = yield call(renew, payload);
        if(data) {
            yield put({
                type: 'updateSuccess',
                payload: data
            })
        }
      },
      *updatePassword ({payload}, { call, put, select }) {
        yield put({type: 'hidePwdModal'})

        const state = yield select();
        const {currentItem} = state.tenant;
        payload = {...payload, currentItem}
        const data = yield call(updatePassword, payload);
        if(data) {
          yield put({
            type: 'updateSuccess',
            payload: data
          })
        }
      }
  },
  subscriptions: {
      setup ({ dispatch, history }) {
        history.listen(location => {
            if(location.pathname === '/tenant') {
                dispatch({
                    type: 'query',
                    payload: {
                      page: 1,
                      perPage: 10
                    }
                })
            }
        })
      }
  }
};
