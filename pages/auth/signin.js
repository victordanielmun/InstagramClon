import Header from "@/components/Header";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";

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
    <>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-48 "
          src="https://superviral.com.au/wp-content/uploads/2021/10/Buy-Instagram-Followers-Australia.png"
          alt="instagram"
        />
        <div className="">
          <div className="flex flex-col items-center">
            <img
              className="w-32 object-cover "
              src="https://eltallerdehector.com/wp-content/uploads/2022/06/7fac6-logo-instagram-transparent.png"
            />

            <p className="text-sm italic my-10 text-center m-10">
              Esta pagina es creada como proyecto para portafolio con fines de
              aprendizaje puedes loguearte con Google para testearla.
            </p>
            <button
              onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Login con Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
