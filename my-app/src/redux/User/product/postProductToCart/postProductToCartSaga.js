import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_TO_CART,
  addToCartSuccess,
  addToCartFail,
} from "./postProductToCartSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* addToCartSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.post,
      `${URL_API}/cartItem`,
      null, // body = null, vì API chỉ nhận query param
      {
        params: {
          productId: action.payload.productId,
          quantity: action.payload.quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(addToCartSuccess(response.data));
      toast.success("Add to cart successfully");
    } else {
      yield put(addToCartFail(response.status));
      toast.error("Fail to add to cart ");
    }
  } catch (error) {
    yield put(addToCartFail(error.response?.data?.message || error.message));
  }
}
function* watchAddToCart() {
  yield takeLatest(ADD_TO_CART, addToCartSaga);
}
export default watchAddToCart;
