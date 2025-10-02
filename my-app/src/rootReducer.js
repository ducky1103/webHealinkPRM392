import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./redux/auth/authSlice";
import forgotPasswordReducer from "./redux/auth/forgotPassword/forgotPasswordSlice";
import registerReducer from "./redux/auth/register/registerSlice"; // Add this import
import deletePodcastReducer from "./redux/auth/admin/delete_podcast/deletePodcastSlice";
import fetchPodcastReducer from "./redux/auth/admin/fetch_podcast/fetchPodcastSlice";
import postPostcardReducer from "./redux/auth/admin/post_postcard/postPoscastSlice";
import updatePodcastReducer from "./redux/auth/admin/update_podcast/updatePodcastSlice";

import accountReducers from "./redux/auth/authSlice";
import getAllCartReducer from "./redux/User/cartApi/fetchCart/getAllCartSlice";
import updateCartItemReducer from "./redux/User/cartApi/updateCartItem/updateCartItemSlice";
import deleteCartItemReducer from "./redux/User/cartApi/deleteCartItem/deleteCartItemSlice";
import getAllProductReducer from "./redux/User/product/fetchProduct/getAllProductSlice";
import addToCartReducer from "./redux/User/product/postProductToCart/postProductToCartSlice";


const rootReducer = combineReducers({
  account: accountReducers,
  forgotPassword: forgotPasswordReducer,
  register: registerReducer,
  postPodcast: postPostcardReducer,
  fetchPodcast: fetchPodcastReducer,
  updatePodcast: updatePodcastReducer,
  deletePodcast: deletePodcastReducer,
  cart: getAllCartReducer,
  updateCart: updateCartItemReducer,
  deleteCart: deleteCartItemReducer,
  fetchProduct: getAllProductReducer,
  addProduct: addToCartReducer,
});

export default rootReducer;
