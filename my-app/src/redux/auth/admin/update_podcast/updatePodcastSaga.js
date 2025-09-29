import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import { updatePodcastFail, updatePodcastSuccess } from "./updatePodcastSlice";
import {
  fetchPodcastFail,
  fetchPodcastSuccess,
} from "../fetch_podcast/fetchPodcastSlice";

function* updatePodcastSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const { id, updateData } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/podcasts/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const response = yield call(axios.get, `${URL_API}/podcasts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        yield put(fetchPodcastSuccess(response.data));
        toast.success("Fetch podcast successfully");
      } else {
        yield put(fetchPodcastFail("Failed to fetch podcast"));
        toast.error("Failed to fetch podcast");
      }
      yield put(updatePodcastSuccess(response.data));
      toast.success("Update podcast successfully");
      console.log(response.data);
    } else {
      yield put(updatePodcastFail("Failed to update podcast"));
      toast.error("Failed to update podcast");
    }
  } catch (error) {
    console.error("Update podcast error:", error);
    yield put(
      updatePodcastFail(error.response?.data?.message || error.message)
    );
    toast.error("An error occurred while updating the podcast");
  }
}

function* watchUpdatePodcast() {
  yield takeLatest("UPDATE_PODCAST_REQUEST", updatePodcastSaga);
}

export default watchUpdatePodcast;
