import {query, add, del, update} from '../services/version'

export default {
  namespace : 'version',
  state : {
    total: 0,
    VersionModalVisible: false,
    updateVersionModalVisible: false,
    page: 1,
    apk: null,
    productID: null,
    updateRecords: [],
    currentStep: 0,
    infoDone: false,
    uploadPercent: 0,
    apkUrl: '',
      currentItem: {}
  },
  reducers : {
    hideUpdateVersionModal(state, action) {
      return {
        ...state,
        updateVersionModalVisible: false
      }
    },
    uploading(state, action) {
      return {
        ...state,
        uploadPercent: action.payload
      }
    },
    uploadDone(state, action) {
      return {
        ...state,
        apkUrl: action.payload
      }
    },
    changeStep(state, action) {
      switch (action.payload.type) {
        case 'next':
          return {
            ...state,
            currentStep: state.currentStep + 1
          }
          break;
        default:
          return {
            ...state,
            currentStep: state.currentStep - 1
          }
      }
    },
    querySuccess(state, action) {
      const {total, records, page} = action.payload;
      return {
        ...state,
        total,
        page,
        updateRecords: records
      }
    },
    seeMoreSuccess(state, action) {
      const {total, records, page} = action.payload;
      const updateRecords = state.updateRecords.concat(records);
      return {
        ...state,
        total,
        page,
        updateRecords
      }
    },
    showVersionModal(state, action) {
      const {type, currentItem} = action.payload;
      if (type === 'add') {
        return {
          ...state,
          VersionModalVisible: true
        }
      }
      return {
        ...state,
        updateVersionModalVisible: true,
        currentItem
      }
    },
    hideVersionModal(state, action) {
      // 关闭modal,重置step
      return {
        ...state,
        VersionModalVisible: false,
        currentStep: 0,
        apkUrl: ''
      }
    },
    showUploadLoading(state, action) {
      return {
        ...state,
        uploadLoading: true
      }
    },
    addSuccess(state, action) {
      state.updateRecords.unshift(action.payload);
      const updateRecords = state.updateRecords;

      return {
        ...state,
        updateRecords,
        currentStep: state.currentStep + 1
      }
    },
    saveProductId(state, action) {
      if (!state.productID) {
        return {
          ...state,
          productID: action.payload
        }
      }
      return state;
    },
    updateSuccess(state, action) {
      const updateRecords = state.updateRecords.map((p) => {
        if (p.id === action.payload.id) {
          return action.payload;
        }
        return p;
      })
      return {
        ...state,
        updateRecords,
        productModalVisible: false
      }
    }
  },
  effects : {
    *query({
      payload
    }, {call, put, select}) {
      const version = yield select(state => state.version);
      const { productID } = version;

      if(!payload.productID) {
        payload.productID = productID;
      }

      const data = yield call(query, payload);


      if (data) {
        data.page = payload.page;
        yield put({type: 'querySuccess', payload: data})
      }
      yield put({type: 'saveProductId', payload: payload.productID})
    },
    *add({
      payload
    }, {call, put, select}) {
      const version = yield select(state => state.version);
      const {productID, apkUrl} = version;

      payload.productID = productID;
      payload['apk_url'] = apkUrl;

      const data = yield call(add, payload);
      if (data) {
        yield put({type: 'addSuccess', payload: data})
      }
    },
    *update({
      payload
    }, {call, put, select}) {
        const version = yield select(state => state.version);
        const {currentItem} = version;
      payload = {
        ...currentItem,
        ...payload
      };
      console.log(payload);
      const data = yield call(update, payload);
      if (data) {
        yield put({type: 'updateSuccess', payload: data})
      }
    },
    /**
      *   @param payload => id
      **/
    *del({
      payload
    }, {call, put, select }) {
      const version = yield select(state => state.version);
      const {page, updateRecords} = version;
      const response = yield call(del, payload);
      console.log(response);
      if (response.success) {
        if (page !== 1 && updateRecords.length === 1) {
          yield put({
            type: 'query',
            payload: {
              page: page - 1
            }
          })
        } else {
          yield put({
            type: 'query',
            payload: {
              page: page
            }
          })
        }
      }
    },
    subscriptions: {}
  }
}
