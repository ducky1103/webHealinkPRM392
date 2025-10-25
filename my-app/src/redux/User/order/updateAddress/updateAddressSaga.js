import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  UPDATE_ADDRESS_REQUEST,
  updateAddressSuccess,
  updateAddressFailure,
} from "./updateAddressSlice";
import { toast } from "react-toastify";
import {
  getAllOrderFail,
  getAllOrderSuccess,
} from "../fetchOrder/getAllOrderSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* updateAddressSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, address } = action.payload;
    console.log("🟢 Payload gửi đi:", { id, address });
    const response = yield call(
      axios.put,
      `${URL_API}/orders/update-address`,
      { orderId: Number(id), address },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      yield put(updateAddressSuccess(response.data));
      toast.success("Cập nhật địa chỉ thành công");
      const fetch = yield call(axios.get, `${URL_API}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(getAllOrderSuccess(fetch.data));
      } else {
        yield put(getAllOrderFail(fetch.status));
      }
    } else {
      yield put(updateAddressFailure(response.status));
      toast.error("Cập nhật địa chỉ thất bại");
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    yield put(updateAddressFailure(message));
    toast.error(message);
  }
}

export function* watchUpdateAddressSaga() {
  yield takeLatest(UPDATE_ADDRESS_REQUEST, updateAddressSaga);
}
