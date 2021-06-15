import React, { Component } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
import Colors from "./Colors";
import "../css/Details.css";
import "../css/Cart.css";

export class Cart extends Component {
  static contextType = DataContext;

  componentDidMount() {
    this.context.getTotal();
  }

  render() {
    const { cart, increase, reduction, removeProduct, total } = this.context;
    console.log();
    if (cart.length === 0) {
      return (
        <div className="no-prodact">
          <h2 className="alert-danger" style={{ textAlign: "center" }}>
            Nothings Product
          </h2>
          <h2 style={{ textAlign: "center" }}>
            <Link className="btn btn-outline-danger" to="/product">
              Go To Product
            </Link>
          </h2>
        </div>
      );
    } else {
      return (
        <div className="no-prodact">
          {cart.map((item) => (
            <div className="details cart" key={item.id}>
              <img src={item.src} alt="" />
              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>${item.price * item.count}</span>
                </div>
                <Colors colors={item.colors} />
                <p>{item.description}</p>
                <p>{item.content}</p>
                <div className="amount">
                  <button className="count" onClick={() => reduction(item.id)}>
                    {" "}
                    -{" "}
                  </button>
                  <span>{item.count}</span>
                  <button className="count" onClick={() => increase(item.id)}>
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <div className="delete" onClick={() => removeProduct(item.id)}>
                X
              </div>
            </div>
          ))}
          <div className="total">
            <Link to="/payment">Payment</Link>
            <h3>Total: ${total}</h3>
          </div>
        </div>
      );
    }
  }
}

export default Cart;
