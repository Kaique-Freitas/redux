import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { addProductCartSuccess, addProductCartFailure } from "./actions";
import api from "../../../services/api";

function* checkProductStock({ payload }) {
  const { product } = payload;
    const currentQuantity = yield select(
      (state) =>
        state.cart.items.find((item) => item.product.id === product.id)
          ?.quantity ?? 0
    );

    const availableStockResponse = yield call(api.get, `stock/${product.id}`);

    if (availableStockResponse.data.quantity > currentQuantity) {
      yield put(addProductCartSuccess(product));
    } else yield put(addProductCartFailure(product.id));
}

export default all([takeLatest("ADD_PRODUCT_TO_CART_REQUEST", checkProductStock)]);
