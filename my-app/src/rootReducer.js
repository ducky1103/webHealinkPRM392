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
import getAllOrderReducer from "./redux/User/order/fetchOrder/getAllOrderSlice";
import getAllOrderItemReducer from "./redux/User/order/fetchOrderItem/getAllOrderItemSlice";
import getOrderUserReducer from "./redux/User/order/fetchOrderByUser/getAllOrderByUserSlice";
import checkoutCartReducer from "./redux/User/cartApi/checkoutCart/checkoutCartSlice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  account: accountReducers,
  postPodcast: postPostcardReducer,
  fetchPodcast: fetchPodcastReducer,
  updatePodcast: updatePodcastReducer,
  deletePodcast: deletePodcastReducer,
  cart: getAllCartReducer,
  updateCart: updateCartItemReducer,
  deleteCart: deleteCartItemReducer,
  fetchProduct: getAllProductReducer,
  addProduct: addToCartReducer,
  order: getAllOrderReducer,
  orderItem: getAllOrderItemReducer,
  orderUser: getOrderUserReducer,
  checkoutCart: checkoutCartReducer,
});

export default rootReducer;
