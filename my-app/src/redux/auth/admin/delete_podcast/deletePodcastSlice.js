export const DELETE_PODCAST_REQUEST = "DELETE_PODCAST_REQUEST";
export const DELETE_PODCAST_SUCCESS = "DELETE_PODCAST_SUCCESS";
export const DELETE_PODCAST_FAIL = "DELETE_PODCAST_FAIL";

export const deletePodcastRequest = (id) => ({
  type: DELETE_PODCAST_REQUEST,
  payload: id,
});
export const deletePodcastSuccess = (id) => ({
  type: DELETE_PODCAST_SUCCESS,
  payload: id,
});
export const deletePodcastFail = (error) => ({
  type: DELETE_PODCAST_FAIL,
  payload: error,
});
const initialState = {
  loading: false,
  deletedPodcastId: [],
  error: null,
};
const deletePodcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PODCAST_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PODCAST_SUCCESS:
      return { ...state, loading: false, deletedPodcastId: action.payload };
    case DELETE_PODCAST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default deletePodcastReducer;
