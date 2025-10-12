// createPayosSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_PAYOS,
  createPayosSuccess,
  createPayosFail,
} from "./createPayosSlice";
import { toast } from "react-toastify";

const URL_API = "https://podcast-shoppings-1.onrender.com";

function* createPayosSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const orderId = action.payload;

    const response = yield call(
      axios.post,
      `${URL_API}/payos/create`,
      { orderId }, // ✅ orderId gửi trong body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data?.error === 0) {
      const payosData = response.data.data;
      yield put(createPayosSuccess(payosData));
      toast.success("Khởi tạo thanh toán PayOS thành công");
      window.location.href = payosData.checkoutUrl; // ✅ chuyển hướng sang PayOS
    } else {
      yield put(createPayosFail(response.data?.message));
      toast.error("Lỗi PayOS: " + (response.data?.message || "Không xác định"));
    }
  } catch (error) {
    yield put(createPayosFail(error.message));
    toast.error("Lỗi khi tạo thanh toán PayOS");
  }
}

function* watchCreatePayos() {
  yield takeLatest(CREATE_PAYOS, createPayosSaga);
}

export default watchCreatePayos;
