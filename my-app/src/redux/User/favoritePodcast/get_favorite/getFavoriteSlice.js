export const GET_FAVORITE_REQUEST = "GET_FAVORITE_REQUEST";
export const GET_FAVORITE_SUCCESS = "GET_FAVORITE_SUCCESS";
export const GET_FAVORITE_FAILURE = "GET_FAVORITE_FAILURE";

export const getFavoriteRequest = (payload) => ({
  type: GET_FAVORITE_REQUEST,
  payload,
});

export const getFavoriteSuccess = (data) => ({
  type: GET_FAVORITE_SUCCESS,
  payload: data,
});

export const getFavoriteFailure = (error) => ({
  type: GET_FAVORITE_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  favoritePodcasts: [],
  error: null,
};

export const getFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_FAVORITE_SUCCESS:
      return { ...state, loading: false, favoritePodcasts: action.payload };
    case GET_FAVORITE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getFavoriteReducer;
