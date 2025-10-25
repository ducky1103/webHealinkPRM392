import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  FETCH_PODCAST_REQUEST,
  fetchPodcastFail,
  fetchPodcastSuccess,
} from "./fetchPodcastSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchPodcastSaga() {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/podcasts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      yield put(fetchPodcastSuccess(response.data));
    } else {
      yield put(fetchPodcastFail("Failed to fetch podcast"));
      toast.error("Failed to fetch podcast");
    }
  } catch (error) {
    console.error("❌ Fetch Podcast Error:", error);
    yield put(fetchPodcastFail(error.response?.data?.message || error.message));
    toast.error("An error occurred while fetching the podcast");
  }
}
function* watchFetchPodcast() {
  yield takeLatest(FETCH_PODCAST_REQUEST, fetchPodcastSaga);
}
export default watchFetchPodcast;
