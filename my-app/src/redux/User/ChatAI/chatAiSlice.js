export const POST__CHAT = "POST__CHAT";
export const POST__CHAT__SUCCESS = "POST__CHAT_SUCCESS";
export const POST__CHAT__FAIL = "POST__CHAT__FAIL";
export const RESET_CHAT = "RESET_CHAT";

export const postChat = (context) => ({
  type: POST__CHAT,
  payload: context,
});

export const postChatSuccess = (data) => ({
  type: POST__CHAT__SUCCESS,
  payload: data,
});

export const postChatFail = (error) => ({
  type: POST__CHAT__FAIL,
  payload: error,
});

export const resetChat = () => ({
  type: RESET_CHAT,
});

const initialState = {
  messages: [],
  currentResponse: null,
  loading: false,
  error: null,
};

const postChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__CHAT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST__CHAT__SUCCESS:
      return {
        ...state,
        loading: false,
        currentResponse: action.payload,
        messages: [...state.messages, action.payload],
        error: null,
      };
    case POST__CHAT__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_CHAT:
      return initialState;
    default:
      return state;
  }
};

export default postChatReducer;
