import { all } from "redux-saga/effects";
import { watchFetchLogin, watchFetchLogout } from "./redux/auth/authSaga";
import watchPostPodcast from "./redux/auth/admin/post_postcard/postPoscastSaga";
import watchFetchPodcast from "./redux/auth/admin/fetch_podcast/fetchPodcastSaga";
import watchUpdatePodcast from "./redux/auth/admin/update_podcast/updatePodcastSaga";
import watchDeletePodcast from "./redux/auth/admin/delete_podcast/deletePodcastSaga";
import watchForgotPassword, {
  watchResetPassword,
  watchVerifyResetToken,
} from "./redux/auth/forgotPassword/forgotPasswordSaga";
import watchRegister from "./redux/auth/register/registerSaga";
import watchGetAllCart from "./redux/User/cartApi/fetchCart/getAllCartSaga";
import watchUpdateCartItem from "./redux/User/cartApi/updateCartItem/updateCartItemSaga";
import watchDeleteCartItem from "./redux/User/cartApi/deleteCartItem/deleteCartItemSaga";
import watchGetAllProduct from "./redux/User/product/fetchProduct/getAllProductSaga";
import watchAddToCart from "./redux/User/product/postProductToCart/postProductToCartSaga";
export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchLogout(),
    watchRegister(),
    watchPostPodcast(),
    watchFetchPodcast(),
    watchUpdatePodcast(),
    watchDeletePodcast(),
    watchForgotPassword(),
    watchVerifyResetToken(),
    watchResetPassword(),
    watchGetAllCart(),
    watchUpdateCartItem(),
    watchDeleteCartItem(),
    watchGetAllProduct(),
    watchAddToCart(),
  ]);
}
