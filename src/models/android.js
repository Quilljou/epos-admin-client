import { addProduct, queryProduct, deleteProduct,updateProduct } from '../services/product'


export default {
  namespace: 'android',
  state: {
      total: 0,
      VersionModalVisible: false,
      productModalVisible: false,
      TimeLineVisible: false,
      page: 1,
      apk: null,
      updateRecords: [],
      product: [],
      currentStep: 0,
      infoDone: false,
      uploadPercent: 0,
      apkUrl: '',
      currentItem: {},
      currentShow: null,
      productModalType: 'add'
  },
  reducers: {
    uploading (state,action) {
      return {...state, uploadPercent: action.payload}
    },
    uploadDone (state,action) {
      return {...state, apkUrl: action.payload}
    },
    hideProductModal (state, action ) {
      return {...state, productModalVisible: false,currentItem: {}}
    },
    showProductModal (state, action) {
      return {...state, productModalVisible: true, ...action.payload}
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
      return {...state, total, page, updateRecords: records,TimeLineVisible: true }
    },
    showCurrent (state,action) {
      return {...state,currentShow: action.payload }
    },
    queryProductSuccess (state,action) {
      console.log(action);
      return {...state,product: action.payload }
    },
    seeMoreSuccess (state,action) {
      const { total, records, page } = action.payload;
      const updateRecords = state.updateRecords.concat(records);
      return {...state, total, page, updateRecords }
    },
    showVersionModal (state, action) {
      return {...state, VersionModalVisible: true, currentItem: action.payload}
    },
    hideVersionModal (state, action ) {
      // 关闭modal,重置step
      return {...state, VersionModalVisible: false, currentStep: 0, apkUrl: ''}
    },
    showUploadLoading (state, action) {
      return {...state, uploadLoading: true}
    },
    addSuccess (state, action) {
      if(state.currentShow === null || state.currentItem.id === state.currentShow.id) {
        state.updateRecords.unshift(action.payload);
        const updateRecords = state.updateRecords.slice(0,5);

        return {...state,
          updateRecords,
          currentStep: state.currentStep + 1, TimeLineVisible: true}
      }
      return {...state, currentStep: state.currentStep + 1, TimeLineVisible: true};
    },
    addProductSuccess (state, action) {
      state.product.push(action.payload);
      const product = state.product;

      return {...state,
        product,productModalVisible:false
        }
    },
    updateProductSuccess (state, action) {
      // state.product.push(action.payload);
      // const product = state.product;
      const product = state.product.map( (p) => {
        if(p.id === action.payload.id) {
          return action.payload;
        }
        return p;
      })
      return {...state,
                product,
                productModalVisible:false
              }
    },
    deleteProductSuccess (state, action) {
      let product = state.product.filter( (item) => {
        return item.id !== action.payload
      });
      if(state.currentShow && state.currentShow.id === action.payload) {
        return {...state,product,TimeLineVisible: false}
      }
      return {...state,product}
    }
  },
  effects: {
      *add ({payload}, { call, put}) {
          console.log(payload);
          const data = yield call(addProduct,payload);
          if(data) {
            yield put({
              type: 'addProductSuccess',
              payload: data
            })
        }
      },
      *update ({payload}, { call, put, select}) {
        const state = yield select(state => state.android)
        payload.id = state.currentItem.id;

        const data = yield call(updateProduct,payload);
          if(data) {
            yield put({
              type: 'updateProductSuccess',
              payload: data
            })
        }
      },
      *query ({payload}, { call, put,select}) {
          yield put({type:'showCurrent',payload})
          const data = yield call(query,payload);
          if(data) {
            data.page = payload.page;
            yield put({
              type: 'querySuccess',
              payload: data
            })
        }
      },
      *queryProduct ({payload}, { call, put, select}) {
          const data = yield call(queryProduct,payload);
          if(data) {
            yield put({
              type: 'queryProductSuccess',
              payload: data
            })
        }
      },
      *seeMore ({payload}, { call, put, select}) {
        const productID = select().android.currentShow.productID;
        payload.productID = productID;
          const data = yield call(query,payload);
          if(data) {
            data.page = payload.page;
            yield put({
              type: 'seeMoreSuccess',
              payload: data
            })
          }
      },
      *deleteProduct ({payload}, { call, put}) {
          const id = payload.id;
          const response = yield call(deleteProduct,id);
          if(response.success) {
            yield put({
              type: 'deleteProductSuccess',
              payload: id
            })
          }
      },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
         history.listen(location => {
             if(location.pathname === '/android') {
                //  dispatch({
                //      type: 'query',
                //      payload: {
                //        productID: 1,
                //        perPage: 5,
                //        page: 1
                //      }
                //  })
                 dispatch({
                     type: 'queryProduct',
                 })
             }
         })
       }
  },
};


function getCurrentItem (state) {
  return state.currentItem;
}
