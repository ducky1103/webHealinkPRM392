import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
  UPDATE_PRODUCT_REQUEST,
  updateProductFail,
  updateProductSuccess,
} from "./updateProductSlice";
function* updateProductSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const { formData, productId } = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/products/${productId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      yield put(updateProductSuccess(response.data));
      toast.success("Update product successfully");
    } else {
      yield put(updateProductFail("Failed to update product"));
      toast.error("Failed to update product");
    }
  } catch (error) {
    yield put(
      updateProductFail(error.response?.data?.message || error.message)
    );
  }
}
function* watchUpdateProductSaga() {
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProductSaga);
}
export default watchUpdateProductSaga;
