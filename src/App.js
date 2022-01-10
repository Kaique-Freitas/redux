import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCart } from "./store/modules/cart/actions";
import api from "./services/api";

function App() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  // const { value } = useSelector((state) => state);

  async function getProducts() {
    const response = await api.get("products");
    setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const { cart } = useSelector((state) => state);

  const handleAddProductToCart = useCallback(
    (product) => dispatch(addProductToCart(product)),
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
        </p>
      ))}
      <br></br>
      <br></br>
      {cart.items &&
        cart.items.map((item) => {
          return (
            <p key={item.product.id}>
              Title: {item.product.title} - Quantity: {item.quantity} -
              Subtotal:{" "}
              Price {item.product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
              <br></br>
            </p>
          );
        })}
    </div>
  );
}

export default App;
