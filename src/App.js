import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCartRequest } from "./store/modules/cart/actions";
import api from "./services/api";

function App() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const response = await api.get("products");
    setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const { cart } = useSelector((state) => state);

  const failedsStockCheck = useSelector((state) => {
    return state.cart.failedStockCheck;
  });

  const handleAddProductToCart = useCallback(
    (product) => dispatch(addProductToCartRequest(product)),
    [dispatch]
  );

  return (
    <div>
      {products.map((item) => (
        <p key={item.id}>
          {item.title} -{" "}
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}{" "}
          <button type="button" onClick={() => handleAddProductToCart(item)}>
            Buy
          </button>
          {failedsStockCheck.includes(item.id) && <span> Out of stock</span>}

        </p>
      ))}
      <br></br>
      <br></br>
      {cart.items &&
        cart.items.map((item) => {
          return (
            <p key={item.product.id}>
              Title: {item.product.title} - Quantity: {item.quantity} -
              Subtotal: Price{" "}
              {item.product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
            </p>
          );
        })}
    </div>
  );
}

export default App;
