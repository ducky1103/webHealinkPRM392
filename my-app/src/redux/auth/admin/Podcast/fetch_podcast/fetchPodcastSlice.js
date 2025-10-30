export const FETCH_PODCAST_REQUEST = "FETCH_PODCAST_REQUEST";
export const FETCH_PODCAST_SUCCESS = "FETCH_PODCAST_SUCCESS";
export const FETCH_PODCAST_FAIL = "FETCH_PODCAST_FAIL";
export const fetchPostcastRequest = (data = { page: 1, size: 10 }) => ({
  // Change default page to 1
  type: FETCH_PODCAST_REQUEST,
  payload: data,
});
export const fetchPodcastSuccess = (data) => ({
  type: FETCH_PODCAST_SUCCESS,
  payload: data,
});
export const fetchPodcastFail = (error) => ({
  type: FETCH_PODCAST_FAIL,
  payload: error,
});
const initialState = {
  fetchPodcast: [],
  loading: false,
  error: null,
};
const fetchPodcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PODCAST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PODCAST_SUCCESS:
      return { ...state, loading: false, fetchPodcast: action.payload };
    case FETCH_PODCAST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default fetchPodcastReducer;
