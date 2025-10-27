import { all } from "redux-saga/effects";
import { watchFetchLogin, watchFetchLogout } from "./redux/auth/authSaga";

import watchGetAllCart from "./redux/User/cartApi/fetchCart/getAllCartSaga";
import watchUpdateCartItem from "./redux/User/cartApi/updateCartItem/updateCartItemSaga";
import watchDeleteCartItem from "./redux/User/cartApi/deleteCartItem/deleteCartItemSaga";
import watchGetAllProduct from "./redux/User/product/fetchProduct/getAllProductSaga";
import watchAddToCart from "./redux/User/product/postProductToCart/postProductToCartSaga";
import watchGetAllOrder from "./redux/User/order/fetchOrder/getAllOrderSaga";
import watchGetAllOrderItem from "./redux/User/order/fetchOrderItem/getAllOrderItemSaga";
import watchGetOrderUser from "./redux/User/order/fetchOrderByUser/getAllOrderByUserSaga";
import watchDeleteOrder from "./redux/User/order/deleteOrder/deleteOrderSaga";
import watchCheckoutCart from "./redux/User/cartApi/checkoutCart/checkoutCartSaga";
import watchUpdateStatusOrder from "./redux/User/order/updateStatusOrder/updateStatusOrderSaga";
import watchCreatePayos from "./redux/User/payos/createPayosSaga";
import watchCancelPayment from "./redux/User/cancelPayment/cancelPaymentSaga";
import watchForgotPassword, {
  watchCheckEmailExists,
  watchResetPassword,
  watchVerifyResetToken,
} from "./redux/auth/forgotPassword/forgotPasswordSaga";
import watchRegister from "./redux/auth/register/registerSaga";
import watchPostPodcast from "./redux/auth/admin/Podcast/post_postcard/postPoscastSaga";
import watchFetchPodcast from "./redux/auth/admin/Podcast/fetch_podcast/fetchPodcastSaga";
import watchUpdatePodcast from "./redux/auth/admin/Podcast/update_podcast/updatePodcastSaga";
import watchDeletePodcast from "./redux/auth/admin/Podcast/delete_podcast/deletePodcastSaga";
import watchPostProductSaga from "./redux/auth/admin/Product/post_product/postProductSaga";
import watchPostCategorySaga from "./redux/auth/admin/Categories/post_category/postCategorySaga";
import watchFetchCategorySaga from "./redux/auth/admin/Categories/fetch_category/fetchCategorySaga";
import watchDeleteCategory from "./redux/auth/admin/Categories/delete_category/deleteCategorySaga";
import watchUpdateCategory from "./redux/auth/admin/Categories/update_category/updateCategorySaga";
import watchGetProfile from "./redux/User/profile/getProfileSaga";
import watchUpdateProductSaga from "./redux/auth/admin/Product/update_Product/updateProductSaga";
import watchDeleteProductSaga from "./redux/auth/admin/Product/delete_product/deleteProductSaga";
import watchPostLetter from "./redux/User/letter/postLetterSaga";
import watchGetComments from "./redux/User/comment/fetch_comment/fetchCommentSaga";
import watchPostComment from "./redux/User/comment/post_comment/postCommentSaga";
import watchPostChatSaga from "./redux/User/ChatAI/chatAiSaga";
import watchGetAllUserAdmin from "./redux/auth/admin/getUser/getAllUserSaga";
import watchChangePassword from "./redux/User/changePassword/changePasswordSaga";
import watchPostFlashCard from "./redux/User/flashCardAI/postFlashCardSaga";
import watchUpdateCommentSaga from "./redux/User/comment/update_comment/updateCommentSaga";
import watchDeleteCommentSaga from "./redux/User/comment/delete_comment/deleteCommentSaga";
import watchGetFavoriteSaga from "./redux/User/favoritePodcast/get_favorite/getFavoriteSaga";
import watchAddFavoriteSaga from "./redux/User/favoritePodcast/add_favorite/addFavoriteSaga";
import watchRemoveFavoriteSaga from "./redux/User/favoritePodcast/remove_favorite/removeFavoriteSaga";

import watchGetAllUser from "./redux/User/ManageUser/getUser/getAllUserSaga";
import watchBanUser from "./redux/User/ManageUser/banUser/banUserSaga";
import watchUnbanUser from "./redux/User/ManageUser/unbanUser/unBanUserSaga";
import { watchUpdateAddressSaga } from "./redux/User/order/updateAddress/updateAddressSaga";
import watchFetchProductDetailSaga from "./redux/User/product/fetchProductDetail/fetchProductDetailSaga";
import watchCreateCommentSaga from "./redux/User/comment_rating/create_comment/createCommentSaga";
import watchFetchAllCommentByUserSaga from "./redux/User/comment_rating/fetchAllCommentByUser/fetchAllCommentByUserSaga";
import watchFetchAllCommentByProductSaga from "./redux/User/comment_rating/fetchCommentByProduct/fetchAllCommentByProductSaga";
import watchFetchPodcastByCategory from "./redux/User/podcast/get_podcast_by_category/getPodcastByCategorySaga";
import watchFetchAllCommentByOrderItemIdSaga from "./redux/User/comment_rating/fetchAllCommentByOrderItemId/fetchAllCommentByOrderItemIdSaga";

export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchLogout(),
    watchRegister(),
    watchPostPodcast(),
    watchFetchPodcast(),
    watchUpdatePodcast(),
    watchDeletePodcast(),
    watchGetAllCart(),
    watchUpdateCartItem(),
    watchDeleteCartItem(),
    watchGetAllProduct(),

    //order
    watchAddToCart(),
    watchCheckEmailExists(),
    watchGetAllOrder(),
    watchGetAllOrderItem(),
    watchGetOrderUser(),
    watchDeleteOrder(),
    watchCheckoutCart(),
    watchUpdateStatusOrder(),
    watchUpdateAddressSaga(),

    //password
    watchForgotPassword(),
    watchVerifyResetToken(),
    watchResetPassword(),

    //category
    watchPostCategorySaga(),
    watchFetchCategorySaga(),
    watchUpdateCategory(),
    watchDeleteCategory(),

    //profile
    watchGetProfile(),
    //prodcut
    watchPostProductSaga(),
    watchFetchProductDetailSaga(),
    watchUpdateProductSaga(),
    watchDeleteProductSaga(),
    //letter
    watchPostLetter(),

    //payment
    watchCreatePayos(),
    watchCancelPayment(),
    //comment
    watchPostComment(),
    watchGetComments(),
    watchUpdateCommentSaga(),
    watchDeleteCommentSaga(),
    //favorite podcast
    watchGetFavoriteSaga(),
    watchAddFavoriteSaga(),
    watchRemoveFavoriteSaga(),

    //ai
    watchPostChatSaga(),

    //admin
    watchGetAllUserAdmin(),

    //change password
    watchChangePassword(),
    watchPostFlashCard(),
    //user management
    watchGetAllUser(),
    watchBanUser(),
    watchUnbanUser(),

    //user comment rating
    watchCreateCommentSaga(),
    watchFetchAllCommentByUserSaga(),
    watchFetchAllCommentByProductSaga(),

    //podcast by category
    watchFetchPodcastByCategory(),
    watchFetchAllCommentByOrderItemIdSaga(),
  ]);
}
