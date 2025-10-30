import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { POST__CHAT, postChatFail, postChatSuccess } from "./chatAiSlice";
import toast from "react-hot-toast";

const URL_API = import.meta.env.VITE_API_URL;

function* postChatSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const requestData = {
      context: action.payload.context || action.payload,
    };

    console.log("Sending chat:", requestData);

    const response = yield call(axios.post, `${URL_API}/ai/chat`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(postChatSuccess(response.data));
      console.log("Chat response:", response.data);
    } else {
      yield put(postChatFail(response.statusText));
      toast.error("Lỗi khi gửi tin nhắn!");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Post chat error:", error);
    yield put(postChatFail(errorMessage));
    toast.error(`Lỗi: ${errorMessage}`);
  }
}

function* watchPostChatSaga() {
  yield takeLatest(POST__CHAT, postChatSaga);
}

export default watchPostChatSaga;
