import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_ORDER_USER,
  getOrderUserSuccess,
  getOrderUserFail,
} from "./getAllOrderByUserSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getOrderUserSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    // ✅ Lấy đúng các field trong payload
    const { userId, page, size } = action.payload;

    const response = yield call(axios.get, `${URL_API}/orders/user/${userId}`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(getOrderUserSuccess(response.data));
    } else {
      yield put(getOrderUserFail(response.status));
    }
  } catch (error) {
    yield put(
      getOrderUserFail(error?.response?.data?.message || error.message)
    );
  }
}
function* watchGetOrderUser() {
  yield takeLatest(GET_ORDER_USER, getOrderUserSaga);
}
export default watchGetOrderUser;
