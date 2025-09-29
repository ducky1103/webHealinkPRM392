export const UPDATE_PODCAST_REQUEST = "UPDATE_PODCAST_REQUEST";
export const UPDATE_PODCAST_SUCCESS = "UPDATE_PODCAST_SUCCESS";
export const UPDATE_PODCAST_FAIL = "UPDATE_PODCAST_FAIL";

export const updatePodcastRequest = (data) => ({
  type: UPDATE_PODCAST_REQUEST,
  payload: data,
});
export const updatePodcastSuccess = (data) => ({
  type: UPDATE_PODCAST_SUCCESS,
  payload: data,
});
export const updatePodcastFail = (error) => ({
  type: UPDATE_PODCAST_FAIL,
  payload: error,
});
const initialState = {
  loading: false,
  updatePodcast: [],
  error: null,
};
const updatePodcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PODCAST_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PODCAST_SUCCESS:
      return { ...state, loading: false, updatePodcast: action.payload };
    case UPDATE_PODCAST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default updatePodcastReducer;
