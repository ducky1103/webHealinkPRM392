import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
  DELETE_PRODUCT_REQUEST,
  deleteProductFail,
  deleteProductSuccess,
} from "./deleteProductSlice";

function* deleteProductSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const productId = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      yield put(deleteProductSuccess(productId));
      toast.success("Delete product successfully");
    } else {
      yield put(deleteProductFail("Failed to delete product"));
      toast.error("Failed to delete product");
    }
  } catch (error) {
    yield put(
      deleteProductFail(error.response?.data?.message || error.message)
    );
  }
}
function* watchDeleteProductSaga() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
}
export default watchDeleteProductSaga;
