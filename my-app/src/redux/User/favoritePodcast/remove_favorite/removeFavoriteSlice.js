export const REMOVE_FAVORITE_REQUEST = "REMOVE_FAVORITE_REQUEST";
export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";
export const REMOVE_FAVORITE_FAILURE = "REMOVE_FAVORITE_FAILURE";

export const removeFavoriteRequest = (podcastId) => ({
  type: REMOVE_FAVORITE_REQUEST,
  payload: { podcastId },
});

export const removeFavoriteSuccess = (data) => ({
  type: REMOVE_FAVORITE_SUCCESS,
  payload: data,
});

export const removeFavoriteFailure = (error) => ({
  type: REMOVE_FAVORITE_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  removedFavorite: null,
  error: null,
};

export const removeFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FAVORITE_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_FAVORITE_SUCCESS:
      return { ...state, loading: false, removedFavorite: action.payload };
    case REMOVE_FAVORITE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default removeFavoriteReducer;
