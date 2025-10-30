import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_PRODUCT_DETAIL,
  fetchProductDetailSuccess,
  fetchProductDetailFail,
} from "./fetchProductDetailSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchProductDetailSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.get,
      `${URL_API}/products/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchProductDetailSuccess(response.data));
    } else {
      yield put(fetchProductDetailFail(response.status));
    }
  } catch (error) {
    yield put(
      fetchProductDetailFail(error.response?.data?.message || error.message)
    );
  }
}
function* watchFetchProductDetailSaga() {
  yield takeLatest(FETCH_PRODUCT_DETAIL, fetchProductDetailSaga);
}
export default watchFetchProductDetailSaga;
