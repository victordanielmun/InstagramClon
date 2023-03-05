import Image from "next/legacy/image";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    
      <div className="flex items-center justify-between max-w-6xl">
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
        <h1>Right</h1>
      </div>
  
  );
}
