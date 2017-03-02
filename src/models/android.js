import { query, add } from '../services/android'


export default {
  namespace: 'android',
  state: {
      total: 0,
      VersionModalVisible: false,
      page: 1,
      apk: null,
      uploadLoading: false,
      updateRecords: []
  },
  reducers: {
    querySuccess (state,action) {
      const { total, records, page } = action.payload;
      return {...state, total, page, updateRecords: records }
    },
    seeMoreSuccess (state,action) {
      const { total, records, page } = action.payload;
      const updateRecords = state.updateRecords.concat(records);
      return {...state, total, page, updateRecords }
    },
    showVersionModal (state, action) {
      return {...state, VersionModalVisible: true}
    },
    hideVersionModal (state, action ) {
      console.log('hide');
      return {...state, VersionModalVisible: false}
    },
    upload(state, action) {
      const apk  = action.payload;
      return Object.assign(state,{apk});
    },
    showUploadLoading (state, action) {
      return {...state, uploadLoading: true}
    },
    addSuccess (state, action) {
      state.updateRecords.unshift(action.payload);
      const updateRecords = state.updateRecords;

      return {...state,
        uploadLoading: false,
        updateRecords,
        VersionModalVisible: false}
    }
  },
  effects: {
      *query ({payload}, { call, put}) {
          const data = yield call(query,payload);
          if(data) {
            data.page = payload.page;
            yield put({
              type: 'querySuccess',
              payload: data
            })
          }
      },
      *add ({payload}, { call, put}) {
          yield put({type: 'showUploadLoading'})
          const data = yield call(add,payload);
          if(data) {
            yield put({
              type: 'addSuccess',
              payload: data
            })
          }
      },
      *seeMore ({payload}, { call, put}) {
          const data = yield call(query,payload);
          if(data) {
            data.page = payload.page;
            yield put({
              type: 'seeMoreSuccess',
              payload: data
            })
          }
      },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
         history.listen(location => {
             if(location.pathname === '/android') {
                 dispatch({
                     type: 'query',
                     payload: {
                       productID: 1,
                       perPage: 5,
                       page: 1
                     }
                 })
             }
         })
       }
  },
};
