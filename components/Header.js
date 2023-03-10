import Image from "next/legacy/image";
import React from "react";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
    const {data: session} = useSession();
    
  return (
  <div className="shadow-sm border-b  sticky top-0 bg-white z-30">
    <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/*left logo*/}
        <div className=" cursor-pointer h-24 w-24 relative hidden lg:inline-grid ">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className=" cursor-pointer h-24 w-10 relative lg:hidden ">
          <Image
            src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png"
            layout="fill"
            className="object-contain"
          />
        </div>
        {/*center search*/}
        <div className="relative mt-1">
        <div className="absolute top-2 left-2">
          <MagnifyingGlassIcon 
          className="h-5 text-gray-500 text-sm " />
        </div>
        <input 
        type="text"  
        placeholder="Search" 
        className=" bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"  />
        </div>

        {/*right perfil*/}
        <div className="flex space-x-4 items-center">
          
          <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {session ? (
            <>
            <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
            <img
            onClick={() => signOut()} 
            src={session.user.image} 
            alt="user-image" 
            className="h-10 rounded-full cursor-pointer" 
            />
            </>
          ): (
            <button onClick={() => signIn()} >Sign In</button>
          )}
          </div>
        </div>
      </div>
  
  );
}
