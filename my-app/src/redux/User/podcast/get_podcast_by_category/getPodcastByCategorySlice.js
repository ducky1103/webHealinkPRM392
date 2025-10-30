export const FETCH_PODCAST_BY_CATEGORY_REQUEST =
  "FETCH_PODCAST_BY_CATEGORY_REQUEST";
export const FETCH_PODCAST_BY_CATEGORY_SUCCESS =
  "FETCH_PODCAST_BY_CATEGORY_SUCCESS";
export const FETCH_PODCAST_BY_CATEGORY_FAIL = "FETCH_PODCAST_BY_CATEGORY_FAIL";

export const fetchPodcastByCategoryRequest = (categoryName) => ({
  type: FETCH_PODCAST_BY_CATEGORY_REQUEST,
  payload: categoryName,
});

export const fetchPodcastByCategorySuccess = (data) => ({
  type: FETCH_PODCAST_BY_CATEGORY_SUCCESS,
  payload: data,
});

export const fetchPodcastByCategoryFail = (error) => ({
  type: FETCH_PODCAST_BY_CATEGORY_FAIL,
  payload: error,
});

const initialState = {
  podcastsByCategory: [],
  loading: false,
  error: null,
};

const fetchPodcastByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PODCAST_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PODCAST_BY_CATEGORY_SUCCESS:
      return { ...state, loading: false, podcastsByCategory: action.payload };
    case FETCH_PODCAST_BY_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default fetchPodcastByCategoryReducer;
