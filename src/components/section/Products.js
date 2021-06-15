import React, { Component } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "../../config/Config";
import { DataContext } from "../Context";
import "../css/Products.css";

export class Products extends Component {
  state = {
    authId: null,
  };
  static contextType = DataContext;
  componentDidMount() {
    const fundAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authId: user.uid });
      }
    });
    return fundAuth;
  }

  render() {
    const { authId } = this.state;
    console.log(authId);

    const { products, addCart } = this.context;
    const product = products.map((product) => (
      <div className="card" key={product.id}>
        <Link to={`/product/${product.id}`}>
          <img src={product.src} alt="" />
        </Link>
        <div className="content">
          <h3>
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <span>${product.price}</span>
          <p>{product.description}</p>
          {authId ? (
            <button onClick={() => addCart(product.id)}>Add to cart</button>
          ) : (
            <button>
              <Link className="go-to-login" to="/login">
                Add to cart
              </Link>
            </button>
          )}
        </div>
      </div>
    ));

    const loding = () => {
      return (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    };

    return <div id="product">{products ? product : loding()}</div>;
  }
}

export default Products;
