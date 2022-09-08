import axios from "axios";
import React, { useEffect } from "react";
import getConfig from "../../utils/getConfig";

const ProductCartInfo = ({
  product,
  getAllProductsCart,
  setTotal,
  total,
  setIsEmpty,
}) => {
  useEffect(() => {
    setTotal(
      total +
        parseInt(product.price) * parseInt(product.productsInCart.quantity)
    );
  }, []);

  const handleDeleteProduct = () => {
    const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${product.id}`;
    axios
      .delete(URL, getConfig())
      .then(() => {
        getAllProductsCart();
        setTotal(
          total -
            parseInt(product.price) * parseInt(product.productsInCart.quantity)
        );
      })
      .catch(() => getAllProductsCart());

    if (product === undefined) {
      setIsEmpty(true);
      setTotal(0);
    }
  };

  return (
    <article className="cart__product-card">
      <div className="cart__product-header">
        <div className="cart__product-brand">
          <p className="cart__product-brand-title">{product.brand}</p>
          <i
            className="fa-solid fa-trash-can"
            onClick={handleDeleteProduct}
          ></i>
        </div>
        <h4 className="cart__product-title">{product.title}</h4>
        <span className="cart__product-quantity">
          {product.productsInCart.quantity}
        </span>
      </div>
      <div className="cart__product-footer">
        <p className="cart__product-total">Total:</p>
        <span className="cart__product-value">
          $ {product.productsInCart.quantity * product.price}
        </span>
      </div>
    </article>
  );
};

export default ProductCartInfo;
