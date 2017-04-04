import { query } from '../services/log';
import { queryProduct } from '../services/product';


export default {
  namespace: 'log',
  state: {
    total: 0,
    dataSource: [],
    page: 1,
    currentProduct: {},
    product: []
  },
  reducers: {
    querySuccess (state, {payload}) {
      console.log(payload);
      return {...state, ...payload};
    }
  },
  effects: {
      *query({ payload }, { call, put, select }) {
          let { product, currentProduct } = yield select(state => state.log)

          if(!product.length) {
            const data = yield call(queryProduct)
            if(data) {
              currentProduct = data[0]

              yield put({
                type: 'querySuccess',
                payload: {
                  product: data,
                  currentProduct
                }
              })
            }
          }

          payload.productID = currentProduct.productID;
          const data = yield call(query, payload);

          if(data) {
              yield put({
                type: 'querySuccess',
                payload: {
                  dataSource: data.records,
                  total: data.total
                }
              })
          }
      }
  },
  subscriptions: {
  }
};
