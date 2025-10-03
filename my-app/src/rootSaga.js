import { all } from "redux-saga/effects";
import { watchFetchLogin, watchFetchLogout } from "./redux/auth/authSaga";
import watchPostPodcast from "./redux/auth/admin/post_postcard/postPoscastSaga";
import watchFetchPodcast from "./redux/auth/admin/fetch_podcast/fetchPodcastSaga";
import watchUpdatePodcast from "./redux/auth/admin/update_podcast/updatePodcastSaga";
import watchDeletePodcast from "./redux/auth/admin/delete_podcast/deletePodcastSaga";
import watchGetAllCart from "./redux/User/cartApi/fetchCart/getAllCartSaga";
import watchUpdateCartItem from "./redux/User/cartApi/updateCartItem/updateCartItemSaga";
import watchDeleteCartItem from "./redux/User/cartApi/deleteCartItem/deleteCartItemSaga";
import watchGetAllProduct from "./redux/User/product/fetchProduct/getAllProductSaga";
import watchAddToCart from "./redux/User/product/postProductToCart/postProductToCartSaga";
import watchGetAllOrder from "./redux/User/order/fetchOrder/getAllOrderSaga";
import watchGetAllOrderItem from "./redux/User/order/fetchOrderItem/getAllOrderItemSaga";
import watchGetOrderUser from "./redux/User/order/fetchOrderByUser/getAllOrderByUserSaga";
import watchCheckoutCart from "./redux/User/cartApi/checkoutCart/checkoutCartSaga";
export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchLogout(),
    watchPostPodcast(),
    watchFetchPodcast(),
    watchUpdatePodcast(),
    watchDeletePodcast(),
    watchGetAllCart(),
    watchUpdateCartItem(),
    watchDeleteCartItem(),
    watchGetAllProduct(),
    watchAddToCart(),
    watchGetAllOrder(),
    watchGetAllOrderItem(),
    watchGetOrderUser(),
    watchCheckoutCart(),
  ]);
}
