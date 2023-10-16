import React from "react";
import { signInWithGooglePopup,createUserDocumnetFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumnetFromAuth(user)
  };



  return (
    <div>
    <h3> Sign In</h3>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
