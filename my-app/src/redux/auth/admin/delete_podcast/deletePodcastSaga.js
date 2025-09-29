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
      },
    });
    if (response.status === 200) {
      yield put(deletePodcastSuccess(id));
      toast.success("Podcast deleted successfully");
    } else {
      yield put(deletePodcastFail("Failed to delete podcast"));
      toast.error("Failed to delete podcast");
    }
  } catch (error) {
    yield put(
      deletePodcastFail(error.response?.data?.message || error.message)
    );
    toast.error("Failed to delete podcast");
  }
}
export function* watchDeletePodcast() {
  yield takeLatest("DELETE_PODCAST_REQUEST", deletePodcastSaga);
}
export default watchDeletePodcast;
