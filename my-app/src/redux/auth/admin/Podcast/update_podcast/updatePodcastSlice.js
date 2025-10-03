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
  updateLoading: false, // Fix: Use consistent naming
  updatedPodcast: null, // Fix: Use consistent naming
  error: null,
};

const updatePodcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PODCAST_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: null,
        updatedPodcast: null, // Reset on new request
      };
    case UPDATE_PODCAST_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updatedPodcast: action.payload, // Fix: Use consistent naming
        error: null,
      };
    case UPDATE_PODCAST_FAIL:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
        updatedPodcast: null,
      };
    default:
      return state;
  }
};

export default updatePodcastReducer;
