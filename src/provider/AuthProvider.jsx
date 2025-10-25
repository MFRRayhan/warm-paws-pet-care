import {
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sign Up
  const signUp = async (email, password, displayName, photoURL) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName || photoURL) {
      await firebaseUpdateProfile(res.user, { displayName, photoURL });
    }
    setUser({ ...res.user });
    return res.user;
  };

  // Sign In
  const signIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
    return res.user;
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    setUser(res.user);
    return res.user;
  };

  // Logout
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Reset Password
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Update Profile
  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) return;
    await firebaseUpdateProfile(auth.currentUser, profile);
    setUser({ ...auth.currentUser });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        signUp,
        signIn,
        signInWithGoogle,
        logOut,
        resetPassword,
        updateUserProfile,
      }}
    >
      {authLoading ? <Loading></Loading> : children}
    </AuthContext.Provider>
  );
};
