import React, { useContext, useState, useEffect } from "react";
import Menu from "./svg/bars-solid.svg";
import Close from "./svg/times-solid.svg";
import CartIcon from "./svg/shopping-cart-solid.svg";
import { Link } from "react-router-dom";
import "./css/Header.css";
import { DataContext } from "./Context";
import { useAuth } from "../context/authContect";

export function Header() {
  const context = useContext(DataContext);
  const [toggle, setToggel] = useState(false);
  const { currentUser, logout } = useAuth();

  const { cart } = context;
  const toggelAll = () => {
    if (toggle == false) {
      setToggel(true);
    } else {
      setToggel(false);
    }
  };
  async function handelLOgOut() {
    try {
      logout();
      console.log("logOut is seccues");
    } catch {}
  }

  return (
    <header>
      <div className="menu" onClick={toggelAll}>
        <img src={Menu} alt="" width="20" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/shopping-cart-react">Nike</Link>
        </h1>
      </div>
      <nav>
        <ul className={toggle == true ? "toggle" : ""}>
          <li>
            <Link onClick={toggelAll} to="/shopping-cart-react">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={toggelAll} to="/product">
              Product
            </Link>
          </li>

          <li>
            {currentUser ? (
              <Link
                onClick={toggelAll}
                onClick={handelLOgOut}
                to="/login"
                className="text-danger"
              >
                LogOut
              </Link>
            ) : (
              <Link onClick={toggelAll} to="/login">
                Login
              </Link>
            )}
          </li>
          <li className="close" onClick={toggelAll}>
            <img src={Close} alt="" width="20" />
          </li>
        </ul>
        <div className="nav-cart">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={CartIcon} alt="" width="20" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
