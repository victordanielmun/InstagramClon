import Header from "@/components/Header";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Spline from '@splinetool/react-spline';
import {ContentLogin} from "@/components/ContentLogin";
import { useState } from "react";


export default function SignIn() {
  const router = useRouter();
  
  //Login con google y creacion usuario en firebaseStore
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
        });
      }
      router.push("/");
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div class="flex items-center flex-col">
    <div class="flex-1">
    <Spline className="absolute m-0 w-1/3" scene="https://prod.spline.design/ELm-RoZN8MgFalmh/scene.splinecode" />
    </div>
    <div className="relative">
            <div className="items-center ">
            <img
              className="w-32 object-cover mt-10 pt-10 w-1/3"
              src="https://eltallerdehector.com/wp-content/uploads/2022/06/7fac6-logo-instagram-transparent.png"
            />
    <p className="text-[20px] my-20 text-center font-semibold w-1/3">
              Esta pagina es creada como proyecto para portafolio con fines de
              aprendizaje puedes loguearte con Google para testearla.
            </p>
            <button
              onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 w-1/3"
            >
              Login con Google
            </button>
            </div>
  </div>
  </div>
        

    
  );
}
