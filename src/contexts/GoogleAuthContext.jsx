import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "./../config/firebaseConfig";
import { AdminMails } from "./../App";
import { Navigate } from "react-router-dom";

const GoogleAuthContext = React.createContext();
export const useGoogleAuth = () => {
  return useContext(GoogleAuthContext);
};

const GoogleAuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const gAuthProvider = new GoogleAuthProvider();
  const [pending, setPending] = useState(true);

  const googleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, gAuthProvider);
    } catch {
      setError("Failed To SignIn");
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userType = AdminMails.includes(user.email) ? "admin" : "user";
        const usr = { ...user, userType };
        setCurrentUser(usr);
        setPending(false);
        if (userType === "admin") {
          <Navigate to={"/admin"} />;
        } else {
          <Navigate to={"/user"} />;
        }
      } else {
        setCurrentUser(user);
        setPending(false);
      }
    });
  }, []);

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
