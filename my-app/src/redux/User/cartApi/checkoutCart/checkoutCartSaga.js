import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CHECKOUT_CART,
  checkoutCartSuccess,
  checkoutCartFail,
} from "./checkoutCartSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* checkoutCartSaga() {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.post,
      `${URL_API}/cart/checkout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(checkoutCartSuccess(response.data));
      toast.success("Order Successfully");
    } else {
      yield put(checkoutCartFail(response.status));
      toast.error("Fail to order item");
    }
  } catch (error) {
    yield put(checkoutCartFail(error?.response.data.message));
  }
}
function* watchCheckoutCart() {
  yield takeLatest(CHECKOUT_CART, checkoutCartSaga);
}
export default watchCheckoutCart;
