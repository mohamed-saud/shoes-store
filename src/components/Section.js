import React, { Component } from "react";
import Products from "./section/Products";
import Details from "./section/Details";
import { Route } from "react-router-dom";
import Cart from "./section/Cart";
import Payment from "./section/Payment";
import LogIn from "./section/LogIn";
import SingUp from "./section/SingUp";
import { ForgotPassword } from "./section/ForgotPassword";

export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/shopping-cart-react" component={Products} exact />
        <Route path="/product" component={Products} exact />
        <Route path="/product/:id" component={Details} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/payment" component={Payment} exact />
        <Route path="/login" component={LogIn} exact />
        <Route path="/singup" component={SingUp} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />
      </section>
    );
  }
}

export default Section;
