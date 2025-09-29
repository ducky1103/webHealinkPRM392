import deletePodcastReducer from "./redux/auth/admin/delete_podcast/deletePodcastSlice";
import fetchPodcastReducer from "./redux/auth/admin/fetch_podcast/fetchPodcastSlice";
import postPostcardReducer from "./redux/auth/admin/post_postcard/postPoscastSlice";
import updatePodcastReducer from "./redux/auth/admin/update_podcast/updatePodcastSlice";
import accountReducers from "./redux/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  account: accountReducers,
  postPodcast: postPostcardReducer,
  fetchPodcast: fetchPodcastReducer,
  updatePodcast: updatePodcastReducer,
  deletePodcast: deletePodcastReducer,
});

export default rootReducer;
