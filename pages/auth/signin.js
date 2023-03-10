import {getProviders, signIn} from "next-auth/react"
import Header from "@/components/Header";

export default function signin({providers}) {
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
            {Object.values(providers).map((provider)=>(
                <div key={provider.name} className="flex flex-col items-center">
                <img 
                className="w-32 object-cover " 
                src="https://eltallerdehector.com/wp-content/uploads/2022/06/7fac6-logo-instagram-transparent.png" 
                /> 
    
                <p className="text-sm italic my-10 text-center m-10">Esta pagina es creada como proyecto para portafolio con fines de aprendizaje puedes loguearte con Google para testearla.</p>
                <button 
                onClick={()=> signIn(provider.id, {callbackUrl: "/"})}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500" 
                >Sign in with {provider.name}</button>    
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context){
    const providers = await getProviders();
    return {
        props: {providers}
    }
}