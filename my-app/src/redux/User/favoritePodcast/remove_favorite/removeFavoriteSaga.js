import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";
import {
  REMOVE_FAVORITE_REQUEST,
  removeFavoriteFailure,
  removeFavoriteSuccess,
} from "./removeFavoriteSlice";

function* removeFavoriteSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const { podcastId } = action.payload;

    const response = yield call(
      axios.delete,
      `${URL_API}/favorite-podcasts/${podcastId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(removeFavoriteSuccess(response.data));
    message.success("Đã xóa khỏi danh sách yêu thích!");
  } catch (error) {
    console.error("Remove favorite podcast failed:", error);
    yield put(removeFavoriteFailure(error.response?.data || error.message));
    message.error("Xóa khỏi yêu thích thất bại!");
  }
}

export default function* watchRemoveFavoriteSaga() {
  yield takeLatest(REMOVE_FAVORITE_REQUEST, removeFavoriteSaga);
}
