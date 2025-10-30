export const ADD_FAVORITE_REQUEST = "ADD_FAVORITE_REQUEST";
export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";
export const ADD_FAVORITE_FAILURE = "ADD_FAVORITE_FAILURE";

export const addFavoriteRequest = (podcastId) => ({
  type: ADD_FAVORITE_REQUEST,
  payload: { podcastId },
});

export const addFavoriteSuccess = (data) => ({
  type: ADD_FAVORITE_SUCCESS,
  payload: data,
});

export const addFavoriteFailure = (error) => ({
  type: ADD_FAVORITE_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  addedFavorite: null,
  error: null,
};

export const addFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FAVORITE_SUCCESS:
      return { ...state, loading: false, addedFavorite: action.payload };
    case ADD_FAVORITE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addFavoriteReducer;
