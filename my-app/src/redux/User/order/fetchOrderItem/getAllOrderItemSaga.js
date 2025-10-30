import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_ALL_ORDER_ITEM,
  getAllOrderItemSuccess,
  getAllOrderItemFail,
} from "./getAllOrderItemSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getAllOrderItemSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/order-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(getAllOrderItemSuccess(response.data));
    } else {
      yield put(getAllOrderItemFail(response.status));
    }
  } catch (error) {
    yield put(
      getAllOrderItemFail(error?.response.data.message || error.data.message)
    );
  }
}
function* watchGetAllOrderItem() {
  yield takeLatest(GET_ALL_ORDER_ITEM, getAllOrderItemSaga);
}
export default watchGetAllOrderItem;
