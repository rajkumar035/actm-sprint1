import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./../config/firebaseConfig";
import { AdminMails } from "./../App";

const GoogleAuthContext = React.createContext();
export const useGoogleAuth = () => {
  return useContext(GoogleAuthContext);
};

const GoogleAuthenticationProvider = ({ children }) => {
  const naviagte = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const gAuthProvider = new GoogleAuthProvider();
  const [pending, setPending] = useState(true);

  const googleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, gAuthProvider)
        .then(() => {
          const user = auth.currentUser;
          if (AdminMails.includes(user.email)) {
            naviagte("/admin");
          } else {
            naviagte("/user");
          }
        })
        .catch((err) => {
          return err;
        });
    } catch (err) {
      setError("Failed To SignIn", err);
    }
  };

  const googleSignOut = async () => {
    try {
      setError("");
      setLoading(true);
      await signOut(auth);
      setCurrentUser(null);
    } catch {
      setError("Failed To SignOut");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          const usr = {
            ...user,
            userType: AdminMails.includes(user.email) ? "admin" : "user",
          };
          setCurrentUser(usr);
          setPending(false);
        } else {
          setCurrentUser(user);
          setPending(false);
        }
      }),
    []
  );

  const value = {
    currentUser,
    googleSignIn,
    googleSignOut,
    error,
    loading,
  };
  return pending ? <p>Please Wait 🔐</p> : <GoogleAuthContext.Provider value={value}>{children}</GoogleAuthContext.Provider>;
};

export default GoogleAuthenticationProvider;
