import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  UPDATE_CART_ITEM,
  updateCartItemSuccess,
  updateCartItemFail,
} from "./updateCartItemSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* updateCartItemSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { cartItemId, quantity } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/cartItem/${cartItemId}?quantity=${quantity}`,
      {}, // body rỗng
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(updateCartItemSuccess(response.data));
      toast.success("Update cart item successfully");
    } else {
      yield put(updateCartItemFail(response.status));
      toast.error("Fail to update cart item");
    }
  } catch (error) {
    yield put(updateCartItemFail(error.message));
    toast.error("Fail to update cart item");
  }
}

function* watchUpdateCartItem() {
  yield takeLatest(UPDATE_CART_ITEM, updateCartItemSaga);
}
export default watchUpdateCartItem;
