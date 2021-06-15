import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../config/Config";
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscrip = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unSubscrip;
  }, []);
  /////////////sing up////////////
  const singup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  /////////////login ///////////
  const login = (email, password) => {
    // return auth.singInWithEmailAndPassword(email, password);
    return auth.signInWithEmailAndPassword(email, password);
  };

  /////// LogOut////////////
  function logout() {
    return auth.signOut();
  }
  ////////////////reset password///////////
  function resetpassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const value = {
    currentUser,
    singup,
    login,
    logout,
    resetpassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
