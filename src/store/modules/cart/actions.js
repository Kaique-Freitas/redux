export function addProductToCartRequest(product) {
  return {
    type: "ADD_PRODUCT_TO_CART_REQUEST",
    payload: { product },
  };
}

export function addProductCartSuccess(product) {
  return {
    type: "ADD_PRODUCT_TO_CART_SUCCESS",
    payload: { product },
  };
}

export function addProductCartFailure(productId) {
  return {
    type: "ADD_PRODUCT_TO_CART_FAILURE",
    payload: { productId },
  };
}