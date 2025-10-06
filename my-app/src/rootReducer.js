import { combineReducers } from "@reduxjs/toolkit";
import forgotPasswordReducer from "./redux/auth/forgotPassword/forgotPasswordSlice";
import registerReducer from "./redux/auth/register/registerSlice"; // Add this import
import getAllCartReducer from "./redux/User/cartApi/fetchCart/getAllCartSlice";
import updateCartItemReducer from "./redux/User/cartApi/updateCartItem/updateCartItemSlice";
import deleteCartItemReducer from "./redux/User/cartApi/deleteCartItem/deleteCartItemSlice";
import getAllProductReducer from "./redux/User/product/fetchProduct/getAllProductSlice";
import addToCartReducer from "./redux/User/product/postProductToCart/postProductToCartSlice";
import getAllOrderReducer from "./redux/User/order/fetchOrder/getAllOrderSlice";
import getAllOrderItemReducer from "./redux/User/order/fetchOrderItem/getAllOrderItemSlice";
import getOrderUserReducer from "./redux/User/order/fetchOrderByUser/getAllOrderByUserSlice";
import checkoutCartReducer from "./redux/User/cartApi/checkoutCart/checkoutCartSlice";
import accountReducers from "./redux/auth/authSlice";
import postPostcardReducer from "./redux/auth/admin/Podcast/post_postcard/postPoscastSlice";
import fetchPodcastReducer from "./redux/auth/admin/Podcast/fetch_podcast/fetchPodcastSlice";
import updatePodcastReducer from "./redux/auth/admin/Podcast/update_podcast/updatePodcastSlice";
import deletePodcastReducer from "./redux/auth/admin/Podcast/delete_podcast/deletePodcastSlice";
import fetchCategoryReducer from "./redux/auth/admin/Categories/fetch_category/fetchCategorySlice";
import postCategoryReducer from "./redux/auth/admin/Categories/post_category/postCategorySlice";
import deleteCategoryReducer from "./redux/auth/admin/Categories/delete_category/deleteCategorySlice";
import updateCategoryReducer from "./redux/auth/admin/Categories/update_category/updateCategorySlice";
import updateProductReducer from "./redux/auth/admin/Product/update_Product/updateProductSlice";
import postProductReducer from "./redux/auth/admin/Product/post_product/postProductSlice";
import deleteProductReducer from "./redux/auth/admin/Product/delete_product/deleteProductSlice";
const rootReducer = combineReducers({
  account: accountReducers,
  forgotPassword: forgotPasswordReducer,
  register: registerReducer,
  //podcast
  postPodcast: postPostcardReducer,
  fetchPodcast: fetchPodcastReducer,
  updatePodcast: updatePodcastReducer,
  deletePodcast: deletePodcastReducer,
  cart: getAllCartReducer,
  updateCart: updateCartItemReducer,
  deleteCart: deleteCartItemReducer,
  //product
  fetchProduct: getAllProductReducer,
  addProduct: addToCartReducer,
  updateProduct: updateProductReducer,
  postProduct: postProductReducer,
  deleteProduct: deleteProductReducer,
  //order
  order: getAllOrderReducer,
  orderItem: getAllOrderItemReducer,
  orderUser: getOrderUserReducer,
  checkoutCart: checkoutCartReducer,

  //category
  fetchCategory: fetchCategoryReducer,
  postCategory: postCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
});

export default rootReducer;
