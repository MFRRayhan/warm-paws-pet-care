import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Sign up
  const createUser = (email, password, name, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL,
        });
      }
    );
  };

  // Login
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // Forgot password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update Profile
  const updateUserProfile = (profile) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile).then(() =>
        setUser({ ...auth.currentUser })
      );
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        resetPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
