import {
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebaseConfig"; // adjust path if needed

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // observe auth state
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSub();
  }, []);

  // auth functions
  const signUp = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // update profile
        if (displayName || photoURL) {
          return firebaseUpdateProfile(res.user, {
            displayName,
            photoURL,
          }).then(() => res);
        }
        return res;
      })
      .finally(() => setLoading(false));
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateProfile = (profile) => {
    if (!auth.currentUser) return Promise.reject(new Error("No user"));
    return firebaseUpdateProfile(auth.currentUser, profile);
  };

  const value = {
    user,
    loading,
    signUp,
    login,
    logout,
    googleLogin,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
