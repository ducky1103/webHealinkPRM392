/* eslint-disable no-unused-vars */
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_ALL_PRODUCT,
  getAllProductSuccess,
  getAllProductFail,
} from "./getAllProductSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getAllProductSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/products`, {
      params: {
        page: action.payload.page,
        size: action.payload.size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(getAllProductSuccess(response.data));
    } else {
      yield put(getAllProductFail(response.status));
    }
  } catch (error) {
    yield put(
      getAllProductFail(error.response?.data?.message || error.message)
    );
  }
}
function* watchGetAllProduct() {
  yield takeLatest(GET_ALL_PRODUCT, getAllProductSaga);
}
export default watchGetAllProduct;
