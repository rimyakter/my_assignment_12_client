import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //Create user or register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign-In or login

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //current user or observer

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);

      //Post request for JWT using user email
      //Api end-point : JWT (post method)
      if (currentUser?.email) {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: currentUser?.email,
            },
            {
              withCredentials: true, //mandatory for store cookie in browser cookie
            }
          )
          .then((res) => {
            console.log(res.data);
            //for store token local storage method
            // localStorage.setItem("token", res.data.token);
          });
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //Update user method

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    login,
    logOut,
    updateUser,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
