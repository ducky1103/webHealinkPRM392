import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CANCEL_PAYMENT,
  cancelPaymentSuccess,
  cancelPaymentFail,
} from "./cancelPaymentSlice";
import { toast } from "react-toastify";

const URL_API = "https://podcast-shoppings-1.onrender.com";
function* cancelPaymentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const transactionId = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/payos/cancel?transactionId=${transactionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      yield put(cancelPaymentSuccess(response.data));
      toast.success("Cancel payment successfully");
    } else {
      yield put(cancelPaymentFail(response.status));
      toast.error("Fail to cancel payment");
    }
  } catch (error) {
    yield put(cancelPaymentFail(error));
    toast.error(
      error?.response?.data?.message || "Đã xảy ra lỗi khi hủy thanh toán"
    );
  }
}
function* watchCancelPayment() {
  yield takeLatest(CANCEL_PAYMENT, cancelPaymentSaga);
}
export default watchCancelPayment;
