import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";
import {
  GET_FAVORITE_REQUEST,
  getFavoriteFailure,
  getFavoriteSuccess,
} from "./getFavoriteSlice";

function* getFavoriteSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const { page, size } = action.payload;

    const response = yield call(axios.get, `${URL_API}/favorite-podcasts`, {
      params: {
        page,
        size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    yield put(getFavoriteSuccess(response.data));
  } catch (error) {
    console.error("Get favorite podcasts failed:", error);
    yield put(getFavoriteFailure(error.response?.data || error.message));
    message.error("Lấy danh sách yêu thích thất bại!");
  }
}

export default function* watchGetFavoriteSaga() {
  yield takeLatest(GET_FAVORITE_REQUEST, getFavoriteSaga);
}
