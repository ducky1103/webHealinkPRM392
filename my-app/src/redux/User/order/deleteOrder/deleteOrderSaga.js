import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE_ORDER,
  deleteOrderSuccess,
  deleteOrderFail,
} from "./deleteOrderSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* deleteOrderSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id } = action.payload;

    // <CHANGE> Sửa lại cách gọi API và xử lý response
    const response = yield call(axios.delete, `${URL_API}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // <CHANGE> Kiểm tra response status đúng cách
    if (response.status === 200 || response.status === 204) {
      yield put(deleteOrderSuccess({ id }));
      toast.success("Xóa đơn hàng thành công!");
    } else {
      yield put(deleteOrderFail(`Lỗi: ${response.status}`));
      toast.error("Không thể xóa đơn hàng");
    }
  } catch (error) {
    // <CHANGE> Sửa lại cách lấy error message từ axios
    console.error("Delete order error:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Có lỗi xảy ra khi xóa đơn hàng";

    yield put(deleteOrderFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* watchDeleteOrder() {
  yield takeLatest(DELETE_ORDER, deleteOrderSaga);
}

export default watchDeleteOrder;
