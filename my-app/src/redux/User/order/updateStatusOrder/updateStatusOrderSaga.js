// updateStatusOrderSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  UPDATE_STATUS_ORDER,
  updateStatusOrderSuccess,
  updateStatusOrderFail,
} from "./updateStatusOrderSlice";
import { toast } from "react-toastify";
import {
  getOrderUserFail,
  getOrderUserSuccess,
} from "../fetchOrderByUser/getAllOrderByUserSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* updateStatusOrderSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    // payload: { id, status, userId, page, size }
    const { id, status, userId, page = 1, size = 50 } = action.payload;

    // body phải là object status: 'confirmed' (không đóng gói thêm)
    const body = { status };

    const response = yield call(axios.put, `${URL_API}/orders/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 204) {
      // response.data có thể là order mới hoặc rỗng tuỳ API
      yield put(updateStatusOrderSuccess(response.data));
      toast.success("Cập nhật trạng thái đơn hàng thành công");

      // fetch lại danh sách order của user (có Authorization)
      const fetch = yield call(axios.get, `${URL_API}/orders/user/${userId}`, {
        params: { page, size },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(getOrderUserSuccess(fetch.data));
      } else {
        yield put(getOrderUserFail(fetch.status));
      }
    } else {
      yield put(updateStatusOrderFail(response.status));
      toast.error("Cập nhật trạng thái thất bại");
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    yield put(updateStatusOrderFail(message));
    toast.error(message);
  }
}

function* watchUpdateStatusOrder() {
  yield takeLatest(UPDATE_STATUS_ORDER, updateStatusOrderSaga);
}

export default watchUpdateStatusOrder;
