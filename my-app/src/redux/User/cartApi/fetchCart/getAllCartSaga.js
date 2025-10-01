import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_ALL_CART,
  getAllCartSuccess,
  getAllCartFail,
} from "./getAllCartSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getAllCartSaga() {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(getAllCartSuccess(response.data));
    } else {
      yield put(getAllCartFail(response.status));
    }
  } catch (error) {
    yield put(getAllCartFail(error.message));
  }
}

function* watchGetAllCart() {
  yield takeLatest(GET_ALL_CART, getAllCartSaga);
}
export default watchGetAllCart;
