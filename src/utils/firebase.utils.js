import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import {doc,getDoc,setDoc,getFirestore} from "firebase/firestore"




const firebaseConfig = {
  apiKey: "AIzaSyA0Sr1iATkh1r8dL7YNXFfUqENGEnkmNsY",
  authDomain: "axen-clothing-ecommerce.firebaseapp.com",
  projectId: "axen-clothing-ecommerce",
  storageBucket: "axen-clothing-ecommerce.appspot.com",
  messagingSenderId: "417351368008",
  appId: "1:417351368008:web:ea2887516318444a66877d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumnetFromAuth = async (userAuth) => {
    const userDocRef = doc(db,"users",userAuth.uid)
    console.log(userDocRef)


    const userSnapshot = await getDoc(userDocRef)

    console.log(userSnapshot);
    console.log(userSnapshot.exists())


    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(
                userDocRef,{
                    displayName,
                    email,
                    createdAt
                }
            )
        }catch(error){
            console.log("error while fetching data",error.message)
        }
    }

    return userDocRef;

}
