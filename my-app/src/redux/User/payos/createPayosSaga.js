// createPayosSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_PAYOS,
  createPayosSuccess,
  createPayosFail,
} from "./createPayosSlice";
import { toast } from "react-toastify";

const URL_API = "http://localhost:8080";

function* createPayosSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const orderId = action.payload; // ✅ Lấy orderId từ payload
    const response = yield call(
      axios.post,
      `${URL_API}/payos/create?orderId=${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PayOS response:", response);
    console.log("PayOS response.data:", response.data);

    if (response.status === 200 && response.data?.error === 0) {
      const payosData = response.data.data;
      yield put(createPayosSuccess(payosData));
      toast.success("Khởi tạo thanh toán PayOS thành công 🎉");
      window.location.href = payosData.checkoutUrl;
    } else {
      console.error("PayOS error:", response.data?.message);
      yield put(createPayosFail(response.data?.message));
      toast.error("Lỗi PayOS: " + (response.data?.message || "Không xác định"));
    }
  } catch (error) {
    console.error("Create PayOS error:", error);
    yield put(createPayosFail(error.message));
    toast.error("Lỗi khi tạo thanh toán PayOS");
  }
}

function* watchCreatePayos() {
  yield takeLatest(CREATE_PAYOS, createPayosSaga);
}

export default watchCreatePayos;
