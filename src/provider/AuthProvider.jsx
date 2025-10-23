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
import Loading from "../components/Loading";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Create user (sign up)
  const createUser = async (email, password, name, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name, photoURL });
    setUser({ ...userCredential.user });
    return userCredential.user;
  };

  // Sign in with email/password
  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    return userCredential.user;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
    return result.user;
  };

  // Logout
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Reset password
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, profile);
    setUser({ ...auth.currentUser });
  };

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    authLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {authLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
