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
import deleteOrderReducer from "./redux/User/order/deleteOrder/deleteOrderSlice";
import checkoutCartReducer from "./redux/User/cartApi/checkoutCart/checkoutCartSlice";
import createPayosReducer from "./redux/User/payos/createPayosSlice";
import accountReducers from "./redux/auth/authSlice";
import postPostcardReducer from "./redux/auth/admin/Podcast/post_postcard/postPoscastSlice";
import fetchPodcastReducer from "./redux/auth/admin/Podcast/fetch_podcast/fetchPodcastSlice";
import updatePodcastReducer from "./redux/auth/admin/Podcast/update_podcast/updatePodcastSlice";
import deletePodcastReducer from "./redux/auth/admin/Podcast/delete_podcast/deletePodcastSlice";
import fetchCategoryReducer from "./redux/auth/admin/Categories/fetch_category/fetchCategorySlice";
import postCategoryReducer from "./redux/auth/admin/Categories/post_category/postCategorySlice";
import deleteCategoryReducer from "./redux/auth/admin/Categories/delete_category/deleteCategorySlice";
import updateCategoryReducer from "./redux/auth/admin/Categories/update_category/updateCategorySlice";
import getProfileReducer from "./redux/User/profile/getProfileSlice";
import updateProductReducer from "./redux/auth/admin/Product/update_Product/updateProductSlice";
import postProductReducer from "./redux/auth/admin/Product/post_product/postProductSlice";
import deleteProductReducer from "./redux/auth/admin/Product/delete_product/deleteProductSlice";
import postLetterReducer from "./redux/User/letter/postLetterSlice";
import getCommentsReducer from "./redux/User/comment/fetch_comment/fetchCommentSlice";
import postCommentReducer from "./redux/User/comment/post_comment/postCommentSilce";
import postChatReducer from "./redux/User/ChatAI/chatAiSlice";
import postFlashCardReducer from "./redux/User/flashCardAI/postFlashCardSlice";
import updateCommentReducer from "./redux/User/comment/update_comment/updateCommentSlice";
import deleteCommentReducer from "./redux/User/comment/delete_comment/deleteCommentSlice";
import getFavoriteReducer from "./redux/User/favoritePodcast/get_favorite/getFavoriteSlice";
import addFavoriteReducer from "./redux/User/favoritePodcast/add_favorite/addFavoriteSlice";
import removeFavoriteReducer from "./redux/User/favoritePodcast/remove_favorite/removeFavoriteSlice";

import getAllUserReducer from "./redux/User/ManageUser/getUser/getAllUserSlice";
import banUserReducer from "./redux/User/ManageUser/banUser/banUserSlice";
import unbanUserReducer from "./redux/User/ManageUser/unbanUser/unBanUserSlice";
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
  deleteOrderId: deleteOrderReducer,
  checkoutCart: checkoutCartReducer,

  //category
  fetchCategory: fetchCategoryReducer,
  postCategory: postCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,

  //profile
  getProfile: getProfileReducer,
  //letter
  postLetter: postLetterReducer,

  //payment
  createPayos: createPayosReducer,
  //comment
  postComment: postCommentReducer,
  getComments: getCommentsReducer,
  putComment: updateCommentReducer,
  deleteComment: deleteCommentReducer,
  //favorite podcast
  getFavorite: getFavoriteReducer,
  addFavorite: addFavoriteReducer,
  removeFavorite: removeFavoriteReducer,

  //ai
  postChat: postChatReducer,
  postFlashCard: postFlashCardReducer,
  //user management
  getAllUser: getAllUserReducer,
  banUser: banUserReducer,
  unbanUser: unbanUserReducer,
});

export default rootReducer;
