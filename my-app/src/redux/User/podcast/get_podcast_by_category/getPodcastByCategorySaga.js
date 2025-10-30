import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  FETCH_PODCAST_BY_CATEGORY_REQUEST,
  fetchPodcastByCategoryFail,
  fetchPodcastByCategorySuccess,
} from "./getPodcastByCategorySlice";

const URL_API = import.meta.env.VITE_API_URL;

function* fetchPodcastByCategorySaga(action) {
  console.log("🎯 SAGA CALLED WITH ACTION:", action);
  console.log("🎯 SAGA PAYLOAD:", action.payload);

  try {
    const token = yield select((state) => state.account.token);
    const categoryName = action.payload; // Use category NAME, not ID

    let apiUrl;

    // If categoryName is 'all' or empty, fetch all podcasts
    if (!categoryName || categoryName === "all") {
      apiUrl = `${URL_API}/podcasts?page=1&size=100`;
    } else {
      // Fetch podcasts by category NAME
      apiUrl = `${URL_API}/podcasts/category/${categoryName}`;
    }

    console.log("🌐 Fetching podcasts from URL:", apiUrl);
    console.log("📝 Category Name:", categoryName);

    const response = yield call(axios.get, apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📡 Response status code:", response.status);

    console.log("📦 Full response:", response.data);
    console.log("📦 Response type:", typeof response.data);
    console.log("📦 Is array?", Array.isArray(response.data));
    console.log("📦 Response.content?", response.data?.content);
    console.log("📦 Response status:", response.status);

    // Handle 204 No Content
    if (response.status === 204) {
      console.log("⚠️ 204 No Content - Category has no podcasts");
      yield put(fetchPodcastByCategorySuccess([]));
      return;
    }

    if (response.status === 200) {
      // Handle both array and paginated response
      let podcasts = [];

      if (Array.isArray(response.data)) {
        // Direct array
        podcasts = response.data;
      } else if (
        response.data.content &&
        Array.isArray(response.data.content)
      ) {
        // Paginated response
        podcasts = response.data.content;
      } else if (Array.isArray(response.data.data)) {
        // Alternative structure
        podcasts = response.data.data;
      } else if (response.data) {
        // Single object, wrap in array
        podcasts = [response.data];
      }

      console.log("✅ Parsed podcasts:", podcasts);
      console.log("✅ Number of podcasts:", podcasts.length);
      yield put(fetchPodcastByCategorySuccess(podcasts));
    } else {
      yield put(fetchPodcastByCategoryFail("Failed to fetch podcasts"));
    }
  } catch (error) {
    console.error("❌ Fetch Podcast by Category Error:", error);
    console.error("❌ Error response:", error.response);
    console.error("❌ Error response data:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);

    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    yield put(fetchPodcastByCategoryFail(errorMessage));
    toast.error(`Không thể tải podcast theo danh mục: ${errorMessage}`);

    // Reset podcasts to empty array on error
    yield put(fetchPodcastByCategorySuccess([]));
  }
}

function* watchFetchPodcastByCategory() {
  yield takeLatest(
    FETCH_PODCAST_BY_CATEGORY_REQUEST,
    fetchPodcastByCategorySaga
  );
}

export default watchFetchPodcastByCategory;
