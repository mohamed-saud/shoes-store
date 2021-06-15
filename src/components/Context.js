import React, { Component } from "react";
import firebase from "../config/Config";
import { auth } from "../config/Config";
import { Redirect, useHistory, Route } from "react-router-dom";
export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [],
    cart: [],
    total: 0,
    authId: null,
  };

  componentDidMount() {
    //////////get authId/////
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authId: user.uid });
        firebase
          .firestore()
          .collection("cart")
          .doc(user.uid)
          .collection("item")
          .onSnapshot((snap) => {
            let cart = snap.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });

            this.setState({ cart: cart });
          });
      }
    });

    ////////////get produact///////////
    const getProducts = firebase
      .firestore()
      .collection("products")
      .onSnapshot((snap) => {
        let products = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        this.setState({ products });
      });

    return { getProducts };
  }
  /////////////////end componentDidMount///////////

  addCart = (id) => {
    const { products, cart, authId } = this.state;
    if (authId) {
      const check = cart.every((item) => {
        return item.id !== id;
      });
      if (check) {
        const data = products.filter((product) => {
          return product.id === id;
        });
        const ref = firebase.firestore().collection("cart").doc(authId);
        // ref.collection("item").add({ ...data[0] });
        ref.collection("item").add({ ...data[0] });
        // this.setState({ ...cart, cart: data[0] });
      } else {
        alert("The product has been added to cart.");
      }
    } else {
      return <Redirect to="login" />;
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  removeProduct = (id) => {
    const { authId } = this.state;
    if (window.confirm("Do you want to delete this product?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item.id === id) {
          cart.splice(index, 1);
          firebase
            .firestore()
            .collection("cart")
            .doc(authId)
            .collection("item")
            .doc(item.id)
            .delete();
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };

  render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;
    return (
      <DataContext.Provider
        value={{
          products,
          addCart,
          cart,
          reduction,
          increase,
          removeProduct,
          total,
          getTotal,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
