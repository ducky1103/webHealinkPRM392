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
import watchCheckoutCart from "./redux/User/cartApi/checkoutCart/checkoutCartSaga";
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
import watchUpdateProductSaga from "./redux/auth/admin/Product/update_Product/updateProductSaga";
import watchDeleteProductSaga from "./redux/auth/admin/Product/delete_product/deleteProductSaga";

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
    watchAddToCart(),
    watchCheckEmailExists(),
    watchGetAllOrder(),
    watchGetAllOrderItem(),
    watchGetOrderUser(),
    watchCheckoutCart(),
    watchForgotPassword(),
    watchVerifyResetToken(),
    watchResetPassword(),

    //category
    watchPostCategorySaga(),
    watchFetchCategorySaga(),
    watchUpdateCategory(),
    watchDeleteCategory(),
    //prodcut
    watchPostProductSaga(),
    watchUpdateProductSaga(),
    watchDeleteProductSaga(),
  ]);
}
