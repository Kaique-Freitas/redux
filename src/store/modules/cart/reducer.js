import produce from "immer";
const INITIAL_STATE = { items: [] };

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART": {
      const { product } = action.payload;

      return produce(state, (draft) => {
        const productInCartIndex = state.items.findIndex(
          (item) => item.product.id === product.id
        );
        if (productInCartIndex >= 0) draft.items[productInCartIndex].quantity++;
        else draft.items.push({ product, quantity: 1 });
      });
    }
    default: {
      return state;
    }
  }
};

export default cart;
