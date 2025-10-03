import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_ALL_ORDER,
  getAllOrderSuccess,
  getAllOrderFail,
} from "./getAllOrderSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getAllOrderSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(getAllOrderSuccess(response.data));
    } else {
      yield put(getAllOrderFail(response.status));
    }
  } catch (error) {
    yield put(
      getAllOrderFail(error?.response.data.message || error.data.message)
    );
  }
}
function* watchGetAllOrder() {
  yield takeLatest(GET_ALL_ORDER, getAllOrderSaga);
}
export default watchGetAllOrder;
