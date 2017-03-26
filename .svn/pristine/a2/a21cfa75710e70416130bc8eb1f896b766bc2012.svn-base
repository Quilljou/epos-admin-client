import { query, add } from '../services/version'


export default {
  namespace: 'version',
  state: {
      total: 0,
      VersionModalVisible: false,
      page: 1,
      apk: null,
      productID: null,
      updateRecords: [],
      currentStep: 0,
      infoDone: false,
      uploadPercent: 0,
      apkUrl: ''
  },
  reducers: {
    uploading (state,action) {
      return {...state, uploadPercent: action.payload}
    },
    uploadDone (state,action) {
      return {...state, apkUrl: action.payload}
    },
    changeStep (state,action) {
      switch (action.payload.type) {
        case 'next':
          return {...state, currentStep: state.currentStep + 1 }
          break;
        default:
          return {...state, currentStep: state.currentStep - 1 }
      }
    },
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
      // 关闭modal,重置step
      return {...state, VersionModalVisible: false, currentStep: 0, apkUrl: ''}
    },
    showUploadLoading (state, action) {
      return {...state, uploadLoading: true}
    },
    addSuccess (state, action) {
      state.updateRecords.unshift(action.payload);
      const updateRecords = state.updateRecords;

      return {...state,
        updateRecords,
        currentStep: state.currentStep + 1}
    },
    saveProductId (state, action) {
      if(!state.productID) {
        return {...state, productID: action.payload}
      }
      return state;
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
        yield put({
          type: 'saveProductId',
          payload: payload.productID
        })
      },
      *add ({payload}, { call, put, select}) {
          const { version } = yield select();
          const productID = version.productID
          payload.productID = productID;
          const data = yield call(add,payload);
          if(data) {
            yield put({
              type: 'addSuccess',
              payload: data
            })
        }
      }
      // *seeMore ({payload}, { call, put}) {
      //     const data = yield call(query,payload);
      //     if(data) {
      //       data.page = payload.page;
      //       yield put({
      //         type: 'seeMoreSuccess',
      //         payload: data
      //       })
      //     }
      // },
  },
  subscriptions: {

  },
};
