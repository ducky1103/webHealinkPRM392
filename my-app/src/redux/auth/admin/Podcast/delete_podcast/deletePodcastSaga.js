import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import { deletePodcastFail, deletePodcastSuccess } from "./deletePodcastSlice";

function* deletePodcastSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(axios.delete, `${URL_API}/podcasts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 204) {
      yield put(deletePodcastSuccess(id));
      toast.success("Xóa podcast thành công!");
    } else {
      yield put(deletePodcastFail("Failed to delete podcast"));
      toast.error("Không thể xóa podcast");
    }
  } catch (error) {
    yield put(deletePodcastFail(error));
  }
}

export function* watchDeletePodcast() {
  yield takeLatest("DELETE_PODCAST_REQUEST", deletePodcastSaga);
}

export default watchDeletePodcast;
