// import React, { Children } from 'react';
// import { AuthContext } from './AuthContext';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth } from './firebase.config';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { signOut } from "firebase/auth";
// import {  GoogleAuthProvider } from "firebase/auth";


// import { onAuthStateChanged } from 'firebase/auth';

// const AuthProvider = ({children}) => {

//       const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//     const createUser =(email,password) =>
//     {
//         return createUserWithEmailAndPassword(auth,email,password)
//     }

//     const signIn =(email,password)=>
//     {
//        return signInWithEmailAndPassword(auth,email,password)
//     }
//  useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const logOut = () => {
//   return signOut(auth); // returns a promise
// };






// const goggle =(provider)=>
// {
//     return signInWithPopup(auth,provider)
// }











//     const userInfo ={
//         createUser,
//         signIn,
//         user,
//         loading,
//         logOut,
//         goggle

//     }

//     return (
//         <AuthContext value={userInfo}>
//             {children}
//         </AuthContext>
//     );
// };

// export default AuthProvider;



import React, { Children, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from './firebase.config';

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // NEW: Profile state to store name and email globally
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  // Firebase create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Firebase sign in
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Firebase Google login
  const goggle = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // Firebase logout
  const logOut = () => {
    // Clear profile when logging out
    setProfile({ name: "", email: "" });
    sessionStorage.removeItem("profile");
    return signOut(auth); 
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Initialize profile from Firebase user
        setProfile({
          name: currentUser.displayName || "",
          email: currentUser.email || ""
        });
        // Also store in sessionStorage for persistence
        sessionStorage.setItem(
          "profile",
          JSON.stringify({
            name: currentUser.displayName || "",
            email: currentUser.email || ""
          })
        );
      } else {
        // Clear profile if not logged in
        setProfile({ name: "", email: "" });
        sessionStorage.removeItem("profile");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    createUser,
    signIn,
    user,
    loading,
    logOut,
    goggle,
    profile,       // <-- NEW: profile state
    setProfile     // <-- NEW: function to update profile
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
