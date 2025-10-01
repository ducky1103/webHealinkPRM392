import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE_CART_ITEM,
  deleteCartItemSuccess,
  deleteCartItemFail,
} from "./deleteCartItemSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* deleteCartItemSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const cartItemId = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/cartItem/${cartItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      yield put(deleteCartItemSuccess(response.data));
      toast.success("Delete cart item successfully");
    } else {
      yield put(deleteCartItemFail(response.status));
      toast.error("Fail to delete cart item");
    }
  } catch (error) {
    yield put(deleteCartItemFail(error.message));
    toast.error("Fail to delete cart item");
  }
}

function* watchDeleteCartItem() {
  yield takeLatest(DELETE_CART_ITEM, deleteCartItemSaga);
}
export default watchDeleteCartItem;
