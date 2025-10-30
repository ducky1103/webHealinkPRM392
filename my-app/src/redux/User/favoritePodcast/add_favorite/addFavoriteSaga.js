import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";
import {
  ADD_FAVORITE_REQUEST,
  addFavoriteFailure,
  addFavoriteSuccess,
} from "./addFavoriteSlice";

function* addFavoriteSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const { podcastId } = action.payload;

    const response = yield call(
      axios.post,
      `${URL_API}/favorite-podcasts/${podcastId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(addFavoriteSuccess(response.data));
    message.success("Đã thêm vào danh sách yêu thích!");
  } catch (error) {
    console.error("Add favorite podcast failed:", error);
    yield put(addFavoriteFailure(error.response?.data || error.message));
    message.error("Thêm vào yêu thích thất bại!");
  }
}

export default function* watchAddFavoriteSaga() {
  yield takeLatest(ADD_FAVORITE_REQUEST, addFavoriteSaga);
}
